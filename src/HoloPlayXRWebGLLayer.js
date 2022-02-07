/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import XRWebGLLayer, { PRIVATE as XRWebGLLayer_PRIVATE } from 'webxr-polyfill/src/api/XRWebGLLayer';
import { getHoloPlayConfig } from './HoloPlayConfig';

export const PRIVATE = Symbol('HoloPlayXRWebGLLayer');

export default class HoloPlayXRWebGLLayer extends XRWebGLLayer {
  constructor(session, gl, layerInit) {
    super(session, gl, layerInit);

    const cfg = getHoloPlayConfig();

    // Set up framebuffer/texture.

    const config = this[XRWebGLLayer_PRIVATE].config;
    const texture = gl.createTexture();
    let depthStencil, dsConfig;
    const framebuffer = gl.createFramebuffer();
    const glEnable = gl.enable.bind(gl);
    const glDisable = gl.disable.bind(gl);

    const OES_VAO = gl.getExtension('OES_vertex_array_object');
    const GL_VERTEX_ARRAY_BINDING = 0x85B5;
    const glBindVertexArray = OES_VAO ? OES_VAO.bindVertexArrayOES.bind(OES_VAO) : gl.bindVertexArray.bind(gl);

    const allocateFramebufferAttachments = () => {
      const oldTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
      {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
          cfg.framebufferWidth, cfg.framebufferHeight,
          0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
      gl.bindTexture(gl.TEXTURE_2D, oldTextureBinding);

      if (depthStencil) {
        const oldRenderbufferBinding = gl.getParameter(gl.RENDERBUFFER_BINDING);
        {
          gl.bindRenderbuffer(gl.RENDERBUFFER, depthStencil);
          gl.renderbufferStorage(gl.RENDERBUFFER, dsConfig.format,
            cfg.framebufferWidth, cfg.framebufferHeight);
        }
        gl.bindRenderbuffer(gl.RENDERBUFFER, oldRenderbufferBinding);
      }
    };

    if (config.depth || config.stencil) {
      if (config.depth && config.stencil) {
        dsConfig = { format: gl.DEPTH_STENCIL, attachment: gl.DEPTH_STENCIL_ATTACHMENT };
      } else if (config.depth) {
        dsConfig = { format: gl.DEPTH_COMPONENT16, attachment: gl.DEPTH_ATTACHMENT };
      } else if (config.stencil) {
        dsConfig = { format: gl.STENCIL_INDEX8, attachment: gl.STENCIL_ATTACHMENT };
      }
      depthStencil = gl.createRenderbuffer();
    }
    allocateFramebufferAttachments();
    cfg.addEventListener('on-config-changed', allocateFramebufferAttachments);

    const oldFramebufferBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    {
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      if (config.depth || config.stencil) {
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, dsConfig.attachment, gl.RENDERBUFFER, depthStencil);
      }
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, oldFramebufferBinding);

    // Set up blit from texture to screen.

    const program = gl.createProgram();
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.attachShader(program, vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.attachShader(program, fs);

    {
      const vsSource = `
        attribute vec2 a_position;
        varying vec2 v_texcoord;
        void main() {
          gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
          v_texcoord = a_position;
        }
      `;
      gl.shaderSource(vs, vsSource);
      gl.compileShader(vs);
      if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(vs));
    }

    let lastGeneratedFSSource;
    let a_location;
    let u_viewType;
    const recompileProgram = () => {
      const fsSource = glslifyNumbers`
        // Shader copied from HoloPlay.js

        precision mediump float;

        uniform int u_viewType;
        uniform sampler2D u_texture;
        varying vec2 v_texcoord;

        const float pitch    = ${cfg.pitch};
        const float tilt     = ${cfg.tilt};
        const float center   = ${cfg.calibration.center.value};
        const float invView  = ${cfg.calibration.invView.value};
        const float flipX    = ${cfg.calibration.flipImageX.value};
        const float flipY    = ${cfg.calibration.flipImageY.value};
        const float subp     = ${cfg.subp};
        const float numViews = ${cfg.numViews};
        const float tilesX   = ${cfg.quiltWidth};
        const float tilesY   = ${cfg.quiltHeight};
        const vec2 quiltViewPortion = vec2(
          ${cfg.quiltWidth * cfg.tileWidth / cfg.framebufferWidth},
          ${cfg.quiltHeight * cfg.tileHeight / cfg.framebufferHeight});

        vec2 texArr(vec3 uvz) {
          float z = floor(uvz.z * numViews);
          float x = (mod(z, tilesX) + uvz.x) / tilesX;
          float y = (floor(z / tilesX) + uvz.y) / tilesY;
          return vec2(x, y) * quiltViewPortion;
        }

        float remap(float value, float from1, float to1, float from2, float to2) {
          return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
        }

        void main() {
          if (u_viewType == 2) { // "quilt" view
            gl_FragColor = texture2D(u_texture, v_texcoord);
            return;
          }
          if (u_viewType == 1) { // middle view
            gl_FragColor = texture2D(u_texture, texArr(vec3(v_texcoord.x, v_texcoord.y, 0.5)));
            return;
          }

          vec4 rgb[3];
          vec3 nuv = vec3(v_texcoord.xy, 0.0);

          // Flip UVs if necessary
          nuv.x = (1.0 - flipX) * nuv.x + flipX * (1.0 - nuv.x);
          nuv.y = (1.0 - flipY) * nuv.y + flipY * (1.0 - nuv.y);

          for (int i = 0; i < 3; i++) {
            nuv.z = (v_texcoord.x + float(i) * subp + v_texcoord.y * tilt) * pitch - center;
            nuv.z = mod(nuv.z + ceil(abs(nuv.z)), 1.0);
            nuv.z = (1.0 - invView) * nuv.z + invView * (1.0 - nuv.z);
            rgb[i] = texture2D(u_texture, texArr(vec3(v_texcoord.x, v_texcoord.y, nuv.z)));
          }

          gl_FragColor = vec4(rgb[0].r, rgb[1].g, rgb[2].b, 1);
        }
      `;
      if (fsSource === lastGeneratedFSSource) return;
      lastGeneratedFSSource = fsSource;

      gl.shaderSource(fs, fsSource);
      gl.compileShader(fs);
      if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(fs));
        return;
      }

      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn(gl.getProgramInfoLog(program));
        return;
      }

      a_location = gl.getAttribLocation(program, 'a_position');
      u_viewType = gl.getUniformLocation(program, 'u_viewType');
      const u_texture = gl.getUniformLocation(program, 'u_texture');

      const oldProgram = gl.getParameter(gl.CURRENT_PROGRAM);
      {
        gl.useProgram(program);
        gl.uniform1i(u_texture, 0); // Always use texture unit 0 for u_texture
      }
      gl.useProgram(oldProgram);
    };
    cfg.addEventListener('on-config-changed', recompileProgram);

    const vao = OES_VAO ? OES_VAO.createVertexArrayOES() : gl.createVertexArray();
    const vbo = gl.createBuffer();
    const oldBufferBinding = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
    const oldVAO = gl.getParameter(GL_VERTEX_ARRAY_BINDING);
    {
      glBindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0, 0, 1, 0, 0, 1,
        0, 1, 1, 0, 1, 1,
      ]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(a_location);
      gl.vertexAttribPointer(a_location, 2, gl.FLOAT, false, 0, 0);
    }
    glBindVertexArray(oldVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, oldBufferBinding);

    const clearFramebuffer = () => {
      console.assert(this[PRIVATE].holoplayEnabled);

      // If session is not an inline session, XRWebGLLayer's composition disabled boolean
      // should be false and then framebuffer should be marked as opaque.
      // The buffers attached to an opaque framebuffer must be cleared prior to the
      // processing of each XR animation frame.
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
      const currentClearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
      const currentClearDepth = gl.getParameter(gl.DEPTH_CLEAR_VALUE);
      const currentClearStencil = gl.getParameter(gl.STENCIL_CLEAR_VALUE);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clearDepth(1.0);
      gl.clearStencil(0);
      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
      gl.clearColor(currentClearColor[0], currentClearColor[1], currentClearColor[2], currentClearColor[3]);
      gl.clearDepth(currentClearDepth);
      gl.clearStencil(currentClearStencil);
    };

    const appCanvas = gl.canvas;

    const lkgCanvas = document.createElement('canvas');
    lkgCanvas.tabIndex = 0;
    const ctx = lkgCanvas.getContext('2d', { alpha: false });
    lkgCanvas.addEventListener('dblclick', function () {
      this.requestFullscreen();
    });

    const controls = makeControls(() => popup, lkgCanvas);

    let origWidth, origHeight;

    const blitTextureToDefaultFramebufferIfNeeded = () => {
      if (!this[PRIVATE].holoplayEnabled) return;

      // Make sure the default framebuffer has the correct size (undo any resizing
      // the host page did, and updating for the latest calibration value).
      // But store off any resizing the host page DID do, so we can restore it on exit.
      if (appCanvas.width !== cfg.calibration.screenW.value ||
          appCanvas.height !== cfg.calibration.screenH.value) {
        origWidth = appCanvas.width;
        origHeight = appCanvas.height;
        appCanvas.width = cfg.calibration.screenW.value;
        appCanvas.height = cfg.calibration.screenH.value;
      }

      const oldVAO = gl.getParameter(GL_VERTEX_ARRAY_BINDING);
      const oldCullFace = gl.getParameter(gl.CULL_FACE);
      const oldBlend = gl.getParameter(gl.BLEND);
      const oldDepthTest = gl.getParameter(gl.DEPTH_TEST);
      const oldStencilTest = gl.getParameter(gl.STENCIL_TEST);
      const oldScissorTest = gl.getParameter(gl.SCISSOR_TEST);
      const oldViewport = gl.getParameter(gl.VIEWPORT);
      const oldFramebufferBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);
      const oldRenderbufferBinding = gl.getParameter(gl.RENDERBUFFER_BINDING);
      const oldProgram = gl.getParameter(gl.CURRENT_PROGRAM);
      const oldActiveTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
      {
        const oldTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
        {
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.useProgram(program);

          glBindVertexArray(vao);

          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);

          gl.disable(gl.BLEND);
          gl.disable(gl.CULL_FACE);
          gl.disable(gl.DEPTH_TEST);
          gl.disable(gl.STENCIL_TEST);
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

          // Render the swizzled view for the display
          gl.uniform1i(u_viewType, 0);
          gl.drawArrays(gl.TRIANGLES, 0, 6);

          // Copy it into the canvas that's actually on the display
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.drawImage(appCanvas, 0, 0);

          // And optionally render over with a "nicer" inline view
          if (cfg.inlineView !== 0) {
            gl.uniform1i(u_viewType, cfg.inlineView);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
          }
        }
        gl.bindTexture(gl.TEXTURE_2D, oldTextureBinding);
      }
      gl.activeTexture(oldActiveTexture);
      gl.useProgram(oldProgram);
      gl.bindRenderbuffer(gl.RENDERBUFFER, oldRenderbufferBinding);
      gl.bindFramebuffer(gl.FRAMEBUFFER, oldFramebufferBinding);
      gl.viewport(...oldViewport);
      (oldScissorTest ? glEnable : glDisable)(gl.SCISSOR_TEST);
      (oldStencilTest ? glEnable : glDisable)(gl.STENCIL_TEST);
      (oldDepthTest ? glEnable : glDisable)(gl.DEPTH_TEST);
      (oldBlend ? glEnable : glDisable)(gl.BLEND);
      (oldCullFace ? glEnable : glDisable)(gl.CULL_FACE);
      glBindVertexArray(oldVAO);
    };

    let popup;
    window.addEventListener('unload', () => {
      if (popup) popup.close();
      popup = undefined;
    });
    const moveCanvasToWindow = (enabled, onbeforeunload) => {
      if (!!popup == enabled) return;

      if (enabled) {
        recompileProgram();

        lkgCanvas.style.position = 'fixed';
        lkgCanvas.style.top = '0';
        lkgCanvas.style.left = '0';
        lkgCanvas.style.width = '100%';
        lkgCanvas.style.height = '100%';

        lkgCanvas.width = cfg.calibration.screenW.value;
        lkgCanvas.height = cfg.calibration.screenH.value;

        document.body.appendChild(controls);

        popup = window.open('', undefined, 'width=640,height=360');
        popup.document.title = 'HoloPlay Window (fullscreen me on Looking Glass!)';
        popup.document.body.style.background = 'black';
        popup.document.body.appendChild(lkgCanvas);
        console.assert(onbeforeunload);
        popup.onbeforeunload = onbeforeunload;
      } else {
        controls.parentElement.removeChild(controls);

        appCanvas.width = origWidth;
        appCanvas.height = origHeight;

        popup.onbeforeunload = undefined;
        popup.close();
        popup = undefined;
      }
    };

    this[PRIVATE] = {
      holoplayEnabled: false,
      framebuffer,
      clearFramebuffer,
      blitTextureToDefaultFramebufferIfNeeded,
      moveCanvasToWindow,
    };
  }

  get framebuffer() { return this[PRIVATE].holoplayEnabled ? this[PRIVATE].framebuffer : null; }
  get framebufferWidth() { return getHoloPlayConfig().framebufferWidth; }
  get framebufferHeight() { return getHoloPlayConfig().framebufferHeight; }
}

function glslifyNumbers(strings, ...values) {
  let s = strings[0];
  for (let i = 1; i < strings.length; ++i) {
    const v = values[i - 1];
    s += typeof v === 'number' ? v.toPrecision(10) : v;
    s += strings[i];
  }
  return s;
}

function makeControls(getPopup, lkgCanvas) {
  const cfg = getHoloPlayConfig();

  const styleElement = document.createElement('style');
  document.head.appendChild(styleElement);
  styleElement.sheet.insertRule(
    '#HoloPlayWebXRControls * { all: revert; font-family: sans-serif }');

  const c = document.createElement('div');
  c.id = 'HoloPlayWebXRControls';
  c.style.position = 'fixed';
  c.style.zIndex = 1000;
  c.style.padding = '4px';
  c.style.width = '315px';
  c.style.height = '360px';
  c.style.maxWidth = 'calc(100vw - 18px)';
  c.style.maxHeight = 'calc(100vh - 18px)';
  c.style.whiteSpace = 'nowrap';
  c.style.overflowY = 'scroll';
  c.style.scrollbarWidth = 'thin';
  c.style.scrollbarColor = 'thistle transparent';
  c.style.background = 'rgba(0, 0, 0, 0.6)';
  c.style.color = 'white';
  c.style.padding = '2px';
  c.style.border = '3px solid black';
  c.style.right = '6px';
  c.style.bottom = '6px';

  const title = document.createElement('div');
  c.appendChild(title);
  title.style.width = '100%';
  title.style.textAlign = 'center';
  title.style.fontWeight = 'bold';
  title.innerText = 'HoloPlay View Controls ';

  const help = document.createElement('div');
  c.appendChild(help);
  help.style.width = '100%';
  help.style.whiteSpace = 'normal';
  help.style.textAlign = 'center';
  help.innerHTML = 'Camera: click popup and use WASD, mouse left/right drag, and scroll.';

  const lrToggle = document.createElement('input');
  title.appendChild(lrToggle);
  lrToggle.type = 'button';
  lrToggle.value = '←';
  lrToggle._otherValue = '→';
  lrToggle.onclick = () => {
    [c.style.right, c.style.left] = [c.style.left, c.style.right];
    [lrToggle.value, lrToggle._otherValue] = [lrToggle._otherValue, lrToggle.value];
  };

  const controlListDiv = document.createElement('div');
  c.appendChild(controlListDiv);

  const addControl = (name, attrs, opts) => {
    const stringify = opts.stringify;

    const controlLineDiv = document.createElement('div');
    controlListDiv.appendChild(controlLineDiv);

    const controlID = name;
    const initialValue = cfg[name];

    const label = document.createElement('label');
    controlLineDiv.appendChild(label);
    label.innerText = opts.label;
    label.setAttribute('for', controlID);
    label.style.width = '80px';
    label.style.display = 'inline-block';
    label.style.textDecoration = 'dotted underline 1px';
    label.title = opts.title;

    if (attrs.type !== 'checkbox') {
      const reset = document.createElement('input');
      controlLineDiv.appendChild(reset);
      reset.type = 'button';
      reset.value = '⎌';
      reset.alt = 'reset';
      reset.title = 'Reset value to default';
      reset.style.padding = '0 4px';
      reset.onclick = () => {
        control.value = initialValue;
        control.oninput();
      };
    }

    const control = document.createElement('input');
    controlLineDiv.appendChild(control);
    Object.assign(control, attrs);
    control.id = controlID;
    control.title = opts.title;
    control.value = attrs.value !== undefined ? attrs.value : initialValue;

    // The source of truth for the control value is in cfg, not the element's
    // 'value' field. The text next to the control shows the real value.
    const updateValue = newValue => {
      cfg[name] = newValue;
      updateNumberText(newValue);
    };
    control.oninput = () => {
      // Only in oninput do we actually read the control's value.
      const newValue =
        attrs.type === 'range' ? parseFloat(control.value) :
          attrs.type === 'checkbox' ? control.checked :
            control.value;
      updateValue(newValue);
    };

    const updateExternally = callback => {
      let newValue = callback(cfg[name]);
      if (opts.fixRange) {
        newValue = opts.fixRange(newValue);
        control.max = Math.max(parseFloat(control.max), newValue);
        control.min = Math.min(parseFloat(control.min), newValue);
      }
      control.value = newValue;
      updateValue(newValue);
    };

    if (attrs.type === 'range') {
      control.style.width = '110px';
      control.style.height = '16px';
      control.onwheel = ev => {
        updateExternally(oldValue => oldValue + Math.sign(ev.deltaX - ev.deltaY) * attrs.step);
      };
    }

    let updateNumberText = () => { };
    if (stringify) {
      const numberText = document.createElement('span');
      controlLineDiv.appendChild(numberText);
      updateNumberText = v => { numberText.innerHTML = stringify(v); };
      updateNumberText(initialValue);
    }

    return updateExternally;
  };

  addControl('tileHeight',
    { type: 'range', min: 160, max: 455, step: 1 },
    {
      label: 'resolution',
      title: 'resolution of each view',
      stringify: v => `${(v * cfg.aspect).toFixed()}&times;${v.toFixed()}`,
    });
  addControl('numViews',
    { type: 'range', min: 1, max: 145, step: 1 },
    {
      label: '# views',
      title: 'number of different viewing angles to render',
      stringify: v => v.toFixed(),
    });

  const setTrackballX = addControl('trackballX',
    { type: 'range', min: -Math.PI, max: 1.0001 * Math.PI, step: 0.5 / 180 * Math.PI },
    {
      label: 'trackball x',
      title: 'camera trackball x',
      fixRange: v => (v + Math.PI * 3) % (Math.PI * 2) - Math.PI,
      stringify: v => `${(v / Math.PI * 180).toFixed()}&deg;`,
    });
  const setTrackballY = addControl('trackballY',
    { type: 'range', min: -0.5 * Math.PI, max: 0.5001 * Math.PI, step: 1.0 / 180 * Math.PI },
    {
      label: 'trackball y',
      title: 'camera trackball y',
      fixRange: v => Math.max(-0.5 * Math.PI, Math.min(v, 0.5 * Math.PI)),
      stringify: v => `${(v / Math.PI * 180).toFixed()}&deg;`,
    });

  const setTargetX = addControl('targetX',
    { type: 'range', min: -20, max: 20, step: 0.1 },
    {
      label: 'target x',
      title: 'target position x',
      fixRange: v => v,
      stringify: v => v.toFixed(2) + ' m',
    });
  const setTargetY = addControl('targetY',
    { type: 'range', min: -20, max: 20, step: 0.1 },
    {
      label: 'target y',
      title: 'target position y',
      fixRange: v => v,
      stringify: v => v.toFixed(2) + ' m',
    });
  const setTargetZ = addControl('targetZ',
    { type: 'range', min: -20, max: 20, step: 0.1 },
    {
      label: 'target z',
      title: 'target position z',
      fixRange: v => v,
      stringify: v => v.toFixed(2) + ' m',
    });
  const setTargetDiam = addControl('targetDiam',
    { type: 'range', min: 0.2, max: 20, step: 0.1 },
    {
      label: 'target size',
      title: 'diameter of the target sphere to fit in the screen',
      fixRange: v => Math.max(0.2, v),
      stringify: v => `${(v * 100).toFixed()} cm`,
    });

  addControl('fovy',
    { type: 'range', min: 1.0 / 180 * Math.PI, max: 120.1 / 180 * Math.PI, step: 1.0 / 180 * Math.PI },
    {
      label: 'fov',
      title: 'perspective fov (degrades stereo effect)',
      fixRange: v => Math.max(1.0 / 180 * Math.PI, Math.min(v, 120.1 / 180 * Math.PI)),
      stringify: v => {
        const xdeg = (v / Math.PI * 180);
        const ydeg = Math.atan(Math.tan(v / 2) * cfg.aspect) * 2 / Math.PI * 180;
        return `${xdeg.toFixed()}&deg;&times;${ydeg.toFixed()}&deg;`;
      },
    });

  addControl('depthiness',
    { type: 'range', min: 0, max: 2, step: 0.01 },
    {
      label: 'depthiness',
      title: 'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',
      fixRange: v => Math.max(0, v),
      stringify: v => `${v.toFixed(2)}x`,
    });

  addControl('inlineView',
    { type: 'range', min: 0, max: 2, step: 1 },
    {
      label: 'inline view',
      title: 'what to show inline on the original canvas (swizzled = no overwrite)',
      fixRange: v => Math.max(0, Math.min(v, 2)),
      stringify: v => v === 0 ? 'swizzled' : v === 1 ? 'center' : v === 2 ? 'quilt' : '?',
    });

  lkgCanvas.oncontextmenu = ev => { ev.preventDefault() };

  lkgCanvas.addEventListener('wheel', ev => {
    setTargetDiam(old => {
      const GAMMA = 1.1;
      const logOld = Math.log(old) / Math.log(GAMMA);
      return Math.pow(GAMMA, logOld + ev.deltaY * 0.01);
    });
  });

  lkgCanvas.addEventListener('mousemove', ev => {
    const mx = ev.movementX, my = -ev.movementY;
    if ((ev.buttons & 2) || ((ev.buttons & 1) && (ev.shiftKey || ev.ctrlKey))) {
      const tx = cfg.trackballX, ty = cfg.trackballY;
      const dx = -Math.cos(tx) * mx + Math.sin(tx) * Math.sin(ty) * my;
      const dy =                                    -Math.cos(ty) * my;
      const dz =  Math.sin(tx) * mx + Math.cos(tx) * Math.sin(ty) * my;
      setTargetX(v => v + dx * cfg.targetDiam * 0.001);
      setTargetY(v => v + dy * cfg.targetDiam * 0.001);
      setTargetZ(v => v + dz * cfg.targetDiam * 0.001);
    } else if (ev.buttons & 1) {
      setTrackballX(v => v - mx * 0.01);
      setTrackballY(v => v - my * 0.01);
    }
  });

  const keys = { w: 0, a: 0, s: 0, d: 0 };
  lkgCanvas.addEventListener('keydown', ev => {
    switch (ev.code) {
      case 'KeyW': keys.w = 1; break;
      case 'KeyA': keys.a = 1; break;
      case 'KeyS': keys.s = 1; break;
      case 'KeyD': keys.d = 1; break;
    }
  });
  lkgCanvas.addEventListener('keyup', ev => {
    switch (ev.code) {
      case 'KeyW': keys.w = 0; break;
      case 'KeyA': keys.a = 0; break;
      case 'KeyS': keys.s = 0; break;
      case 'KeyD': keys.d = 0; break;
    }
  });

  requestAnimationFrame(flyCamera);
  function flyCamera() {
    let kx = keys.d - keys.a;
    let ky = keys.w - keys.s;
    if (kx && ky) {
      kx *= Math.sqrt(0.5);
      ky *= Math.sqrt(0.5);
    }
    const tx = cfg.trackballX, ty = cfg.trackballY;
    const dx =  Math.cos(tx) * kx - Math.sin(tx) * Math.cos(ty) * ky;
    const dy =                                    -Math.sin(ty) * ky;
    const dz = -Math.sin(tx) * kx - Math.cos(tx) * Math.cos(ty) * ky;
    setTargetX(v => v + dx * cfg.targetDiam * 0.03);
    setTargetY(v => v + dy * cfg.targetDiam * 0.03);
    setTargetZ(v => v + dz * cfg.targetDiam * 0.03);
    requestAnimationFrame(flyCamera);
  }

  return c;
}
