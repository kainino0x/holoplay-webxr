import ne from "@lookingglass/webxr-polyfill/src/WebXRPolyfill";
import ae from "@lookingglass/webxr-polyfill/src/api/XRSystem";
import H from "@lookingglass/webxr-polyfill/src/api/index";
import re from "@lookingglass/webxr-polyfill/src/devices/XRDevice";
import se from "@lookingglass/webxr-polyfill/src/api/XRSpace";
import { mat4 as E } from "gl-matrix";
import oe, { PRIVATE as ce } from "@lookingglass/webxr-polyfill/src/api/XRWebGLLayer";
import * as le from "holoplay-core/dist/holoplaycore.module.js";
import { Shader as he } from "holoplay-core";
const G = 1.6;
let X;
function A() {
  return X === void 0 && (X = ue()), X;
}
const de = {
  configVersion: "1.0",
  pitch: { value: 45 },
  slope: { value: -5 },
  center: { value: -0.5 },
  viewCone: { value: 40 },
  invView: { value: 1 },
  verticalAngle: { value: 0 },
  DPI: { value: 338 },
  screenW: { value: 250 },
  screenH: { value: 250 },
  flipImageX: { value: 0 },
  flipImageY: { value: 0 },
  flipSubp: { value: 0 }
}, ue = () => new class extends EventTarget {
  constructor() {
    super();
    const a = (t) => {
      t && this.dispatchEvent(new Event("on-config-changed")), new Promise((n) => {
        this._ensureConfigChangeEvent = n;
      }).then(() => a(!0));
    };
    a(!1), this.calibration = de, new le.Client(
      (t) => {
        if (t.devices.length < 1) {
          console.error("No Looking Glass devices found!");
          return;
        }
        t.devices.length > 1 && console.warn("More than one Looking Glass device found... using the first one"), this.calibration = t.devices[0].calibration;
      },
      (t) => {
        console.error("Error creating Looking Glass client:", t);
      }
    ), this.tileHeight = 512, this.numViews = 45, this.trackballX = 0, this.trackballY = 0, this.targetX = 0, this.targetY = G, this.targetZ = -0.5, this.targetDiam = 2, this.fovy = 13 / 180 * Math.PI, this.depthiness = 1.25, this.inlineView = 1;
  }
  get calibration() {
    return this._calibration;
  }
  set calibration(a) {
    this._calibration = O(a), this._ensureConfigChangeEvent();
  }
  get tileHeight() {
    return this._tileHeight;
  }
  set tileHeight(a) {
    this._tileHeight = a, this._ensureConfigChangeEvent();
  }
  get numViews() {
    return this._numViews;
  }
  set numViews(a) {
    this._numViews = a, this._ensureConfigChangeEvent();
  }
  get targetX() {
    return this._targetX;
  }
  set targetX(a) {
    this._targetX = a, this._ensureConfigChangeEvent();
  }
  get targetY() {
    return this._targetY;
  }
  set targetY(a) {
    this._targetY = a, this._ensureConfigChangeEvent();
  }
  get targetZ() {
    return this._targetZ;
  }
  set targetZ(a) {
    this._targetZ = a, this._ensureConfigChangeEvent();
  }
  get trackballX() {
    return this._trackballX;
  }
  set trackballX(a) {
    this._trackballX = a, this._ensureConfigChangeEvent();
  }
  get trackballY() {
    return this._trackballY;
  }
  set trackballY(a) {
    this._trackballY = a, this._ensureConfigChangeEvent();
  }
  get targetDiam() {
    return this._targetDiam;
  }
  set targetDiam(a) {
    this._targetDiam = a, this._ensureConfigChangeEvent();
  }
  get fovy() {
    return this._fovy;
  }
  set fovy(a) {
    this._fovy = a, this._ensureConfigChangeEvent();
  }
  get depthiness() {
    return this._depthiness;
  }
  set depthiness(a) {
    this._depthiness = a, this._ensureConfigChangeEvent();
  }
  get inlineView() {
    return this._inlineView;
  }
  set inlineView(a) {
    this._inlineView = a, this._ensureConfigChangeEvent();
  }
  get aspect() {
    return this.calibration.screenW.value / this.calibration.screenH.value;
  }
  get tileWidth() {
    return Math.round(this.tileHeight * this.aspect);
  }
  get framebufferWidth() {
    const a = this.tileWidth * this.tileHeight * this.numViews;
    return 2 ** Math.ceil(Math.log2(Math.max(Math.sqrt(a), this.tileWidth)));
  }
  get quiltWidth() {
    return Math.floor(this.framebufferWidth / this.tileWidth);
  }
  get quiltHeight() {
    return Math.ceil(this.numViews / this.quiltWidth);
  }
  get framebufferHeight() {
    return 2 ** Math.ceil(Math.log2(this.quiltHeight * this.tileHeight));
  }
  get viewCone() {
    return this.calibration.viewCone.value * this.depthiness / 180 * Math.PI;
  }
  get tilt() {
    return this.calibration.screenH.value / (this.calibration.screenW.value * this.calibration.slope.value) * (this.calibration.flipImageX.value ? -1 : 1);
  }
  get subp() {
    return 1 / (this.calibration.screenW.value * 3);
  }
  get pitch() {
    const a = this.calibration.screenW.value / this.calibration.DPI.value;
    return this.calibration.pitch.value * a * Math.cos(Math.atan(1 / this.calibration.slope.value));
  }
}();
function O(a) {
  return Object.freeze(a), a === void 0 || Object.getOwnPropertyNames(a).forEach(function(t) {
    a[t] !== null && (typeof a[t] == "object" || typeof a[t] == "function") && !Object.isFrozen(a[t]) && O(a[t]);
  }), a;
}
function fe(a) {
  const t = A(), e = document.createElement("style");
  document.head.appendChild(e), e.sheet.insertRule(
    "#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }"
  );
  const n = document.createElement("div");
  n.id = "LookingGlassWebXRControls", n.style.position = "fixed", n.style.zIndex = 1e3, n.style.padding = "4px", n.style.width = "315px", n.style.height = "360px", n.style.maxWidth = "calc(100vw - 18px)", n.style.maxHeight = "calc(100vh - 18px)", n.style.whiteSpace = "nowrap", n.style.overflowY = "scroll", n.style.scrollbarWidth = "thin", n.style.scrollbarColor = "thistle transparent", n.style.background = "rgba(0, 0, 0, 0.6)", n.style.color = "white", n.style.padding = "2px", n.style.border = "3px solid black", n.style.right = "6px", n.style.bottom = "6px";
  const r = document.createElement("div");
  n.appendChild(r), r.style.width = "100%", r.style.textAlign = "center", r.style.fontWeight = "bold", r.innerText = "LookingGlass View Controls ";
  const g = document.createElement("div");
  n.appendChild(g), g.style.width = "100%", g.style.whiteSpace = "normal", g.style.textAlign = "center", g.innerHTML = "Camera: click popup and use WASD, mouse left/right drag, and scroll.";
  const l = document.createElement("input");
  r.appendChild(l), l.type = "button", l.value = "\u2190", l._otherValue = "\u2192", l.onclick = () => {
    [n.style.right, n.style.left] = [n.style.left, n.style.right], [l.value, l._otherValue] = [l._otherValue, l.value];
  };
  const h = document.createElement("div");
  n.appendChild(h);
  const o = (i, s, c, b) => {
    const f = c.stringify, v = document.createElement("div");
    h.appendChild(v);
    const T = i, y = t[i], p = document.createElement("label");
    if (v.appendChild(p), p.innerText = c.label, p.setAttribute("for", T), p.style.width = "80px", p.style.display = "inline-block", p.style.textDecoration = "dotted underline 1px", p.title = c.title, s.type !== "checkbox") {
      const m = document.createElement("input");
      v.appendChild(m), m.type = "button", m.value = "\u238C", m.alt = "reset", m.title = "Reset value to default", m.style.padding = "0 4px", m.onclick = () => {
        d.value = y, d.oninput();
      };
    }
    const d = document.createElement("input");
    v.appendChild(d), Object.assign(d, s), d.id = T, d.title = c.title, d.value = s.value !== void 0 ? s.value : y;
    const D = (m) => {
      t[i] = m, V(m);
    };
    d.oninput = () => {
      const m = s.type === "range" ? parseFloat(d.value) : s.type === "checkbox" ? d.checked : d.value;
      D(m);
    };
    const B = (m) => {
      let _ = m(t[i]);
      c.fixRange && (_ = c.fixRange(_), d.max = Math.max(parseFloat(d.max), _), d.min = Math.min(parseFloat(d.min), _)), d.value = _, D(_);
    };
    s.type === "range" && (d.style.width = "110px", d.style.height = "16px", d.onwheel = (m) => {
      B((_) => _ + Math.sign(m.deltaX - m.deltaY) * s.step);
    });
    let V = () => {
    };
    if (f) {
      const m = document.createElement("span");
      v.appendChild(m), V = (_) => {
        m.innerHTML = f(_);
      }, V(y);
    }
    return B;
  };
  o(
    "tileHeight",
    { type: "range", min: 160, max: 455, step: 1 },
    {
      label: "resolution",
      title: "resolution of each view",
      stringify: (i) => `${(i * t.aspect).toFixed()}&times;${i.toFixed()}`
    }
  ), o(
    "numViews",
    { type: "range", min: 1, max: 145, step: 1 },
    {
      label: "# views",
      title: "number of different viewing angles to render",
      stringify: (i) => i.toFixed()
    }
  );
  const k = o(
    "trackballX",
    { type: "range", min: -Math.PI, max: 1.0001 * Math.PI, step: 0.5 / 180 * Math.PI },
    {
      label: "trackball x",
      title: "camera trackball x",
      fixRange: (i) => (i + Math.PI * 3) % (Math.PI * 2) - Math.PI,
      stringify: (i) => `${(i / Math.PI * 180).toFixed()}&deg;`
    }
  ), w = o(
    "trackballY",
    { type: "range", min: -0.5 * Math.PI, max: 0.5001 * Math.PI, step: 1 / 180 * Math.PI },
    {
      label: "trackball y",
      title: "camera trackball y",
      fixRange: (i) => Math.max(-0.5 * Math.PI, Math.min(i, 0.5 * Math.PI)),
      stringify: (i) => `${(i / Math.PI * 180).toFixed()}&deg;`
    }
  ), P = o(
    "targetX",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target x",
      title: "target position x",
      fixRange: (i) => i,
      stringify: (i) => i.toFixed(2) + " m"
    }
  ), S = o(
    "targetY",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target y",
      title: "target position y",
      fixRange: (i) => i,
      stringify: (i) => i.toFixed(2) + " m"
    }
  ), F = o(
    "targetZ",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target z",
      title: "target position z",
      fixRange: (i) => i,
      stringify: (i) => i.toFixed(2) + " m"
    }
  );
  o(
    "fovy",
    { type: "range", min: 1 / 180 * Math.PI, max: 120.1 / 180 * Math.PI, step: 1 / 180 * Math.PI },
    {
      label: "fov",
      title: "perspective fov (degrades stereo effect)",
      fixRange: (i) => Math.max(1 / 180 * Math.PI, Math.min(i, 120.1 / 180 * Math.PI)),
      stringify: (i) => {
        const s = i / Math.PI * 180, c = Math.atan(Math.tan(i / 2) * t.aspect) * 2 / Math.PI * 180;
        return `${s.toFixed()}&deg;&times;${c.toFixed()}&deg;`;
      }
    }
  ), o(
    "depthiness",
    { type: "range", min: 0, max: 2, step: 0.01 },
    {
      label: "depthiness",
      title: 'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',
      fixRange: (i) => Math.max(0, i),
      stringify: (i) => `${i.toFixed(2)}x`
    }
  ), o(
    "inlineView",
    { type: "range", min: 0, max: 2, step: 1 },
    {
      label: "inline view",
      title: "what to show inline on the original canvas (swizzled = no overwrite)",
      fixRange: (i) => Math.max(0, Math.min(i, 2)),
      stringify: (i) => i === 0 ? "swizzled" : i === 1 ? "center" : i === 2 ? "quilt" : "?"
    }
  ), a.oncontextmenu = (i) => {
    i.preventDefault();
  }, a.addEventListener("wheel", (i) => {
    const s = t.targetDiam, c = 1.1, b = Math.log(s) / Math.log(c);
    return t.targetDiam = Math.pow(c, b + i.deltaY * 0.01);
  }), a.addEventListener("mousemove", (i) => {
    const s = i.movementX, c = -i.movementY;
    if (i.buttons & 2 || i.buttons & 1 && (i.shiftKey || i.ctrlKey)) {
      const b = t.trackballX, f = t.trackballY, v = -Math.cos(b) * s + Math.sin(b) * Math.sin(f) * c, T = -Math.cos(f) * c, y = Math.sin(b) * s + Math.cos(b) * Math.sin(f) * c;
      P((p) => p + v * t.targetDiam * 1e-3), S((p) => p + T * t.targetDiam * 1e-3), F((p) => p + y * t.targetDiam * 1e-3);
    } else
      i.buttons & 1 && (k((b) => b - s * 0.01), w((b) => b - c * 0.01));
  });
  const u = { w: 0, a: 0, s: 0, d: 0 };
  a.addEventListener("keydown", (i) => {
    switch (i.code) {
      case "KeyW":
        u.w = 1;
        break;
      case "KeyA":
        u.a = 1;
        break;
      case "KeyS":
        u.s = 1;
        break;
      case "KeyD":
        u.d = 1;
        break;
    }
  }), a.addEventListener("keyup", (i) => {
    switch (i.code) {
      case "KeyW":
        u.w = 0;
        break;
      case "KeyA":
        u.a = 0;
        break;
      case "KeyS":
        u.s = 0;
        break;
      case "KeyD":
        u.d = 0;
        break;
    }
  }), requestAnimationFrame(x);
  function x() {
    let i = u.d - u.a, s = u.w - u.s;
    i && s && (i *= Math.sqrt(0.5), s *= Math.sqrt(0.5));
    const c = t.trackballX, b = t.trackballY, f = Math.cos(c) * i - Math.sin(c) * Math.cos(b) * s, v = -Math.sin(b) * s, T = -Math.sin(c) * i - Math.cos(c) * Math.cos(b) * s;
    P((y) => y + f * t.targetDiam * 0.03), S((y) => y + v * t.targetDiam * 0.03), F((y) => y + T * t.targetDiam * 0.03), requestAnimationFrame(x);
  }
  return n;
}
const I = Symbol("LookingGlassXRWebGLLayer");
class me extends oe {
  constructor(t, e, n) {
    super(t, e, n);
    const r = document.createElement("canvas");
    r.tabIndex = 0;
    const g = r.getContext("2d", { alpha: !1 });
    r.addEventListener("dblclick", function() {
      this.requestFullscreen();
    });
    const l = fe(r), h = A(), o = this[ce].config, k = e.createTexture();
    let w, P;
    const S = e.createFramebuffer(), F = e.enable.bind(e), u = e.disable.bind(e), x = e.getExtension("OES_vertex_array_object"), i = 34229, s = x ? x.bindVertexArrayOES.bind(x) : e.bindVertexArray.bind(e), c = () => {
      const R = e.getParameter(e.TEXTURE_BINDING_2D);
      if (e.bindTexture(e.TEXTURE_2D, k), e.texImage2D(
        e.TEXTURE_2D,
        0,
        e.RGBA,
        h.framebufferWidth,
        h.framebufferHeight,
        0,
        e.RGBA,
        e.UNSIGNED_BYTE,
        null
      ), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.bindTexture(e.TEXTURE_2D, R), w) {
        const L = e.getParameter(e.RENDERBUFFER_BINDING);
        e.bindRenderbuffer(e.RENDERBUFFER, w), e.renderbufferStorage(
          e.RENDERBUFFER,
          P.format,
          h.framebufferWidth,
          h.framebufferHeight
        ), e.bindRenderbuffer(e.RENDERBUFFER, L);
      }
    };
    (o.depth || o.stencil) && (o.depth && o.stencil ? P = { format: e.DEPTH_STENCIL, attachment: e.DEPTH_STENCIL_ATTACHMENT } : o.depth ? P = { format: e.DEPTH_COMPONENT16, attachment: e.DEPTH_ATTACHMENT } : o.stencil && (P = { format: e.STENCIL_INDEX8, attachment: e.STENCIL_ATTACHMENT }), w = e.createRenderbuffer()), c(), h.addEventListener("on-config-changed", c);
    const b = e.getParameter(e.FRAMEBUFFER_BINDING);
    e.bindFramebuffer(e.FRAMEBUFFER, S), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, k, 0), (o.depth || o.stencil) && e.framebufferRenderbuffer(e.FRAMEBUFFER, P.attachment, e.RENDERBUFFER, w), e.bindFramebuffer(e.FRAMEBUFFER, b);
    const f = e.createProgram(), v = e.createShader(e.VERTEX_SHADER);
    e.attachShader(f, v);
    const T = e.createShader(e.FRAGMENT_SHADER);
    e.attachShader(f, T);
    {
      const R = `
       attribute vec2 a_position;
       varying vec2 v_texcoord;
       void main() {
         gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
         v_texcoord = a_position;
       }
     `;
      e.shaderSource(v, R), e.compileShader(v), e.getShaderParameter(v, e.COMPILE_STATUS) || console.warn(e.getShaderInfoLog(v));
    }
    let y, p, d;
    const D = () => {
      const R = he(h);
      if (R === y)
        return;
      if (y = R, e.shaderSource(T, R), e.compileShader(T), !e.getShaderParameter(T, e.COMPILE_STATUS)) {
        console.warn(e.getShaderInfoLog(T));
        return;
      }
      if (e.linkProgram(f), !e.getProgramParameter(f, e.LINK_STATUS)) {
        console.warn(e.getProgramInfoLog(f));
        return;
      }
      p = e.getAttribLocation(f, "a_position"), d = e.getUniformLocation(f, "u_viewType");
      const L = e.getUniformLocation(f, "u_texture"), N = e.getParameter(e.CURRENT_PROGRAM);
      e.useProgram(f), e.uniform1i(L, 0), e.useProgram(N);
    };
    h.addEventListener("on-config-changed", D);
    const B = x ? x.createVertexArrayOES() : e.createVertexArray(), V = e.createBuffer(), m = e.getParameter(e.ARRAY_BUFFER_BINDING), _ = e.getParameter(i);
    s(B), e.bindBuffer(e.ARRAY_BUFFER, V), e.bufferData(e.ARRAY_BUFFER, new Float32Array([
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      1
    ]), e.STATIC_DRAW), e.enableVertexAttribArray(p), e.vertexAttribPointer(p, 2, e.FLOAT, !1, 0, 0), s(_), e.bindBuffer(e.ARRAY_BUFFER, m);
    const Y = () => {
      console.assert(this[I].LookingGlassEnabled), e.bindFramebuffer(e.FRAMEBUFFER, this.framebuffer);
      const R = e.getParameter(e.COLOR_CLEAR_VALUE), L = e.getParameter(e.DEPTH_CLEAR_VALUE), N = e.getParameter(e.STENCIL_CLEAR_VALUE);
      e.clearColor(0, 0, 0, 0), e.clearDepth(1), e.clearStencil(0), e.clear(e.DEPTH_BUFFER_BIT | e.COLOR_BUFFER_BIT | e.STENCIL_BUFFER_BIT), e.clearColor(R[0], R[1], R[2], R[3]), e.clearDepth(L), e.clearStencil(N);
    }, C = e.canvas;
    let W, U;
    const j = () => {
      if (!this[I].LookingGlassEnabled)
        return;
      (C.width !== h.calibration.screenW.value || C.height !== h.calibration.screenH.value) && (W = C.width, U = C.height, C.width = h.calibration.screenW.value, C.height = h.calibration.screenH.value);
      const R = e.getParameter(i), L = e.getParameter(e.CULL_FACE), N = e.getParameter(e.BLEND), z = e.getParameter(e.DEPTH_TEST), K = e.getParameter(e.STENCIL_TEST), Z = e.getParameter(e.SCISSOR_TEST), $ = e.getParameter(e.VIEWPORT), J = e.getParameter(e.FRAMEBUFFER_BINDING), Q = e.getParameter(e.RENDERBUFFER_BINDING), ee = e.getParameter(e.CURRENT_PROGRAM), te = e.getParameter(e.ACTIVE_TEXTURE);
      {
        const ie = e.getParameter(e.TEXTURE_BINDING_2D);
        e.bindFramebuffer(e.FRAMEBUFFER, null), e.useProgram(f), s(B), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, k), e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.STENCIL_TEST), e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), e.uniform1i(d, 0), e.drawArrays(e.TRIANGLES, 0, 6), g.clearRect(0, 0, r.width, r.height), g.drawImage(C, 0, 0), h.inlineView !== 0 && (e.uniform1i(d, h.inlineView), e.drawArrays(e.TRIANGLES, 0, 6)), e.bindTexture(e.TEXTURE_2D, ie);
      }
      e.activeTexture(te), e.useProgram(ee), e.bindRenderbuffer(e.RENDERBUFFER, Q), e.bindFramebuffer(e.FRAMEBUFFER, J), e.viewport(...$), (Z ? F : u)(e.SCISSOR_TEST), (K ? F : u)(e.STENCIL_TEST), (z ? F : u)(e.DEPTH_TEST), (N ? F : u)(e.BLEND), (L ? F : u)(e.CULL_FACE), s(R);
    };
    let M;
    window.addEventListener("unload", () => {
      M && M.close(), M = void 0;
    });
    const q = (R, L) => {
      !!M != R && (R ? (D(), r.style.position = "fixed", r.style.top = "0", r.style.left = "0", r.style.width = "100%", r.style.height = "100%", r.width = h.calibration.screenW.value, r.height = h.calibration.screenH.value, document.body.appendChild(l), M = window.open("", void 0, "width=640,height=360"), M.document.title = "Looking Glass Window (fullscreen me on Looking Glass!)", M.document.body.style.background = "black", M.document.body.appendChild(r), console.assert(L), M.onbeforeunload = L) : (l.parentElement.removeChild(l), C.width = W, C.height = U, M.onbeforeunload = void 0, M.close(), M = void 0));
    };
    this[I] = {
      LookingGlassEnabled: !1,
      framebuffer: S,
      clearFramebuffer: Y,
      blitTextureToDefaultFramebufferIfNeeded: j,
      moveCanvasToWindow: q
    };
  }
  get framebuffer() {
    return this[I].LookingGlassEnabled ? this[I].framebuffer : null;
  }
  get framebufferWidth() {
    return A().framebufferWidth;
  }
  get framebufferHeight() {
    return A().framebufferHeight;
  }
}
class be extends re {
  constructor(t) {
    super(t), this.sessions = /* @__PURE__ */ new Map(), this.viewSpaces = [], this.basePoseMatrix = E.create(), this.inlineProjectionMatrix = E.create(), this.inlineInverseViewMatrix = E.create(), this.LookingGlassProjectionMatrices = [], this.LookingGlassInverseViewMatrices = [];
  }
  onBaseLayerSet(t, e) {
    const n = this.sessions.get(t);
    n.baseLayer = e;
    const r = e[I];
    r.LookingGlassEnabled = n.immersive, n.immersive && r.moveCanvasToWindow(!0, () => {
      this.endSession(t);
    });
  }
  isSessionSupported(t) {
    return t === "inline" || t === "immersive-vr";
  }
  isFeatureSupported(t) {
    switch (t) {
      case "viewer":
        return !0;
      case "local":
        return !0;
      case "local-floor":
        return !0;
      case "bounded-floor":
        return !1;
      case "unbounded":
        return !1;
      default:
        return console.warn("LookingGlassXRDevice.isFeatureSupported: feature not understood:", t), !1;
    }
  }
  async requestSession(t, e) {
    if (!this.isSessionSupported(t))
      return Promise.reject();
    const n = t !== "inline", r = new Ee(t, e);
    return this.sessions.set(r.id, r), n && this.dispatchEvent("@@webxr-polyfill/vr-present-start", r.id), Promise.resolve(r.id);
  }
  requestAnimationFrame(t) {
    return this.global.requestAnimationFrame(t);
  }
  cancelAnimationFrame(t) {
    this.global.cancelAnimationFrame(t);
  }
  onFrameStart(t, e) {
    const n = this.sessions.get(t), r = A();
    if (n.immersive) {
      const g = Math.tan(0.5 * r.fovy), l = 0.5 * r.targetDiam / g, h = l - r.targetDiam, o = this.basePoseMatrix;
      E.fromTranslation(o, [r.targetX, r.targetY, r.targetZ]), E.rotate(o, o, r.trackballX, [0, 1, 0]), E.rotate(o, o, -r.trackballY, [1, 0, 0]), E.translate(o, o, [0, 0, l]);
      for (let w = 0; w < r.numViews; ++w) {
        const P = (w + 0.5) / r.numViews - 0.5, S = Math.tan(r.viewCone * P), F = l * S, u = this.LookingGlassInverseViewMatrices[w] = this.LookingGlassInverseViewMatrices[w] || E.create();
        E.translate(u, o, [F, 0, 0]), E.invert(u, u);
        const x = Math.max(h + e.depthNear, 0.01), i = h + e.depthFar, s = x * g, c = s, b = -s, f = x * -S, v = r.aspect * s, T = f + v, y = f - v, p = this.LookingGlassProjectionMatrices[w] = this.LookingGlassProjectionMatrices[w] || E.create();
        E.set(
          p,
          2 * x / (T - y),
          0,
          0,
          0,
          0,
          2 * x / (c - b),
          0,
          0,
          (T + y) / (T - y),
          (c + b) / (c - b),
          -(i + x) / (i - x),
          -1,
          0,
          0,
          -2 * i * x / (i - x),
          0
        );
      }
      n.baseLayer[I].clearFramebuffer();
    } else {
      const g = n.baseLayer.context, l = g.drawingBufferWidth / g.drawingBufferHeight;
      E.perspective(
        this.inlineProjectionMatrix,
        e.inlineVerticalFieldOfView,
        l,
        e.depthNear,
        e.depthFar
      ), E.fromTranslation(this.basePoseMatrix, [0, G, 0]), E.invert(this.inlineInverseViewMatrix, this.basePoseMatrix);
    }
  }
  onFrameEnd(t) {
    this.sessions.get(t).baseLayer[I].blitTextureToDefaultFramebufferIfNeeded();
  }
  async requestFrameOfReferenceTransform(t, e) {
    const n = E.create();
    switch (t) {
      case "viewer":
      case "local":
        return E.fromTranslation(n, [0, -G, 0]), n;
      case "local-floor":
        return n;
      default:
        throw new Error("XRReferenceSpaceType not understood");
    }
  }
  endSession(t) {
    const e = this.sessions.get(t);
    e.immersive && e.baseLayer && (e.baseLayer[I].moveCanvasToWindow(!1), this.dispatchEvent("@@webxr-polyfill/vr-present-end", t)), e.ended = !0;
  }
  doesSessionSupportReferenceSpace(t, e) {
    const n = this.sessions.get(t);
    return n.ended ? !1 : n.enabledFeatures.has(e);
  }
  getViewSpaces(t) {
    if (t === "immersive-vr") {
      const e = A();
      for (let n = this.viewSpaces.length; n < e.numViews; ++n)
        this.viewSpaces[n] = new ge(n);
      return this.viewSpaces.length = e.numViews, this.viewSpaces;
    }
  }
  getViewport(t, e, n, r, g) {
    if (g === void 0) {
      const h = this.sessions.get(t).baseLayer.context;
      r.x = 0, r.y = 0, r.width = h.drawingBufferWidth, r.height = h.drawingBufferHeight;
    } else {
      const l = A(), h = g % l.quiltWidth, o = Math.floor(g / l.quiltWidth);
      r.x = l.tileWidth * h, r.y = l.tileHeight * o, r.width = l.tileWidth, r.height = l.tileHeight;
    }
    return !0;
  }
  getProjectionMatrix(t, e) {
    return e === void 0 ? this.inlineProjectionMatrix : this.LookingGlassProjectionMatrices[e] || E.create();
  }
  getBasePoseMatrix() {
    return this.basePoseMatrix;
  }
  getBaseViewMatrix() {
    return this.inlineInverseViewMatrix;
  }
  _getViewMatrixByIndex(t) {
    return this.LookingGlassInverseViewMatrices[t] = this.LookingGlassInverseViewMatrices[t] || E.create();
  }
  getInputSources() {
    return [];
  }
  getInputPose(t, e, n) {
    return null;
  }
  onWindowResize() {
  }
}
let pe = 0;
class Ee {
  constructor(t, e) {
    this.mode = t, this.immersive = t === "immersive-vr" || t === "immersive-ar", this.id = ++pe, this.baseLayer = null, this.inlineVerticalFieldOfView = Math.PI * 0.5, this.ended = !1, this.enabledFeatures = e;
  }
}
class ge extends se {
  constructor(t) {
    super(), this.viewIndex = t;
  }
  get eye() {
    return "none";
  }
  _onPoseUpdate(t) {
    this._inverseBaseMatrix = t._getViewMatrixByIndex(this.viewIndex);
  }
}
class Pe extends ne {
  constructor(t) {
    super(), console.warn(t || 'Looking Glass WebXR "polyfill" overriding native WebXR API.');
    for (const n in H)
      this.global[n] = H[n];
    this.global.XRWebGLLayer = me, this.injected = !0;
    const e = Promise.resolve(new be(this.global));
    this.xr = new ae(e), Object.defineProperty(this.global.navigator, "xr", {
      value: this.xr,
      configurable: !0
    });
  }
}
const Fe = A();
export {
  Fe as LookingGlassConfig,
  Pe as LookingGlassWebXRPolyfill
};
