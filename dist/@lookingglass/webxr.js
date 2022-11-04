var ae = Object.defineProperty;
var re = (r, t, e) => t in r ? ae(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var M = (r, t, e) => (re(r, typeof t != "symbol" ? t + "" : t, e), e);
import se from "@lookingglass/webxr-polyfill/src/WebXRPolyfill";
import oe from "@lookingglass/webxr-polyfill/src/api/XRSystem";
import Y from "@lookingglass/webxr-polyfill/src/api/index";
import ce from "@lookingglass/webxr-polyfill/src/devices/XRDevice";
import le from "@lookingglass/webxr-polyfill/src/api/XRSpace";
import { mat4 as E } from "gl-matrix";
import he, { PRIVATE as de } from "@lookingglass/webxr-polyfill/src/api/XRWebGLLayer";
import * as fe from "holoplay-core";
import { Shader as ue } from "holoplay-core";
const me = {
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
}, H = 1.6, be = {
  tileHeight: 512,
  numViews: 45,
  trackballX: 0,
  trackballY: 0,
  targetX: 0,
  targetY: H,
  targetZ: -0.5,
  targetDiam: 2,
  fovy: 13 / 180 * Math.PI,
  depthiness: 1.25,
  inlineView: 1
};
class ge extends EventTarget {
  constructor(e) {
    super();
    M(this, "_calibration", U(me));
    M(this, "_config", U(be));
    this._config = { ...this._config, ...e }, this.syncCalibration();
  }
  syncCalibration() {
    new fe.Client((e) => {
      if (e.devices.length < 1) {
        console.error("No Looking Glass devices found!");
        return;
      }
      e.devices.length > 1 && console.warn("More than one Looking Glass device found... using the first one"), this.calibration = e.devices[0].calibration;
    }, (e) => {
      console.error("Error creating Looking Glass client:", e);
    });
  }
  onConfigChange() {
    this.dispatchEvent(new Event("on-config-changed"));
  }
  get calibration() {
    return this._calibration;
  }
  set calibration(e) {
    this._calibration = {
      ...this._calibration,
      ...e
    }, this.onConfigChange();
  }
  get config() {
    return this._config;
  }
  set config(e) {
    e != null && (this._config = {
      ...this._config,
      ...e
    }, this.onConfigChange());
  }
  get tileHeight() {
    return this._config.tileHeight;
  }
  set tileHeight(e) {
    this._config.tileHeight = e, this.onConfigChange();
  }
  get numViews() {
    return this._config.numViews;
  }
  set numViews(e) {
    this._config.numViews = e, this.onConfigChange();
  }
  get targetX() {
    return this._config.targetX;
  }
  set targetX(e) {
    this._config.targetX = e, this.onConfigChange();
  }
  get targetY() {
    return this._config.targetY;
  }
  set targetY(e) {
    this._config.targetY = e, this.onConfigChange();
  }
  get targetZ() {
    return this._config.targetZ;
  }
  set targetZ(e) {
    this._config.targetZ = e, this.onConfigChange();
  }
  get trackballX() {
    return this._config.trackballX;
  }
  set trackballX(e) {
    this._config.trackballX = e, this.onConfigChange();
  }
  get trackballY() {
    return this._config.trackballY;
  }
  set trackballY(e) {
    this._config.trackballY = e, this.onConfigChange();
  }
  get targetDiam() {
    return this._config.targetDiam;
  }
  set targetDiam(e) {
    this._config.targetDiam = e, this.onConfigChange();
  }
  get fovy() {
    return this._config.fovy;
  }
  set fovy(e) {
    this._config.fovy = e, this.onConfigChange();
  }
  get depthiness() {
    return this._config.depthiness;
  }
  set depthiness(e) {
    this._config.depthiness = e, this.onConfigChange();
  }
  get inlineView() {
    return this._config.inlineView;
  }
  set inlineView(e) {
    this._config.inlineView = e, this.onConfigChange();
  }
  get aspect() {
    return this._calibration.screenW.value / this._calibration.screenH.value;
  }
  get tileWidth() {
    return Math.round(this.tileHeight * this.aspect);
  }
  get framebufferWidth() {
    const e = this.tileWidth * this.tileHeight * this.numViews;
    return 2 ** Math.ceil(Math.log2(Math.max(Math.sqrt(e), this.tileWidth)));
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
    return this._calibration.viewCone.value * this.depthiness / 180 * Math.PI;
  }
  get tilt() {
    return this._calibration.screenH.value / (this._calibration.screenW.value * this._calibration.slope.value) * (this._calibration.flipImageX.value ? -1 : 1);
  }
  get subp() {
    return 1 / (this._calibration.screenW.value * 3);
  }
  get pitch() {
    const e = this._calibration.screenW.value / this._calibration.DPI.value;
    return this._calibration.pitch.value * e * Math.cos(Math.atan(1 / this._calibration.slope.value));
  }
}
let G = null;
function S(r) {
  return G == null ? G = new ge(r) : G.config = r, G;
}
function U(r) {
  return Object.freeze(r), r === void 0 || Object.getOwnPropertyNames(r).forEach(function(t) {
    r[t] !== null && (typeof r[t] == "object" || typeof r[t] == "function") && !Object.isFrozen(r[t]) && U(r[t]);
  }), r;
}
function pe(r) {
  var L;
  const t = S(), e = document.createElement("style");
  document.head.appendChild(e), (L = e.sheet) == null || L.insertRule("#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }");
  const n = document.createElement("div");
  n.id = "LookingGlassWebXRControls", n.style.position = "fixed", n.style.zIndex = "1000", n.style.padding = "4px", n.style.width = "315px", n.style.height = "360px", n.style.maxWidth = "calc(100vw - 18px)", n.style.maxHeight = "calc(100vh - 18px)", n.style.whiteSpace = "nowrap", n.style.overflowY = "scroll", n.style.background = "rgba(0, 0, 0, 0.6)", n.style.color = "white", n.style.padding = "2px", n.style.border = "3px solid black", n.style.right = "6px", n.style.bottom = "6px";
  const a = document.createElement("div");
  n.appendChild(a), a.style.width = "100%", a.style.textAlign = "center", a.style.fontWeight = "bold", a.innerText = "LookingGlass View Controls ";
  const m = document.createElement("div");
  n.appendChild(m), m.style.width = "100%", m.style.whiteSpace = "normal", m.style.textAlign = "center", m.innerHTML = "Camera: click popup and use WASD, mouse left/right drag, and scroll.";
  const h = document.createElement("input");
  a.appendChild(h), h.type = "button", h.value = "\u2190", h.dataset.otherValue = "\u2192", h.onclick = () => {
    [n.style.right, n.style.left] = [n.style.left, n.style.right], [h.value, h.dataset.otherValue] = [h.dataset.otherValue || "", h.value];
  };
  const f = document.createElement("div");
  n.appendChild(f);
  const o = (i, c, d) => {
    const s = d.stringify, p = document.createElement("div");
    f.appendChild(p);
    const x = i, w = t[i], g = document.createElement("label");
    if (p.appendChild(g), g.innerText = d.label, g.setAttribute("for", x), g.style.width = "80px", g.style.display = "inline-block", g.style.textDecoration = "dotted underline 1px", g.title = d.title, c.type !== "checkbox") {
      const u = document.createElement("input");
      p.appendChild(u), u.type = "button", u.value = "\u238C", u.alt = "reset", u.title = "Reset value to default", u.style.padding = "0 4px", u.onclick = (T) => {
        l.value = w, l.oninput(T);
      };
    }
    const l = document.createElement("input");
    p.appendChild(l), Object.assign(l, c), l.id = x, l.title = d.title, l.value = c.value !== void 0 ? c.value : w;
    const B = (u) => {
      t[i] = u, X(u);
    };
    l.oninput = () => {
      const u = c.type === "range" ? parseFloat(l.value) : c.type === "checkbox" ? l.checked : l.value;
      B(u);
    };
    const N = (u) => {
      let T = u(t[i]);
      d.fixRange && (T = d.fixRange(T), l.max = Math.max(parseFloat(l.max), T).toString(), l.min = Math.min(parseFloat(l.min), T).toString()), l.value = T, B(T);
    };
    c.type === "range" && (l.style.width = "110px", l.style.height = "16px", l.onwheel = (u) => {
      N((T) => T + Math.sign(u.deltaX - u.deltaY) * c.step);
    });
    let X = (u) => {
    };
    if (s) {
      const u = document.createElement("span");
      p.appendChild(u), X = (T) => {
        u.innerHTML = s(T);
      }, X(w);
    }
    return N;
  };
  o("tileHeight", { type: "range", min: 160, max: 455, step: 1 }, {
    label: "resolution",
    title: "resolution of each view",
    stringify: (i) => `${(i * t.aspect).toFixed()}&times;${i.toFixed()}`
  }), o("numViews", { type: "range", min: 1, max: 145, step: 1 }, {
    label: "# views",
    title: "number of different viewing angles to render",
    stringify: (i) => i.toFixed()
  });
  const V = o("trackballX", {
    type: "range",
    min: -Math.PI,
    max: 1.0001 * Math.PI,
    step: 0.5 / 180 * Math.PI
  }, {
    label: "trackball x",
    title: "camera trackball x",
    fixRange: (i) => (i + Math.PI * 3) % (Math.PI * 2) - Math.PI,
    stringify: (i) => `${(i / Math.PI * 180).toFixed()}&deg;`
  }), R = o("trackballY", {
    type: "range",
    min: -0.5 * Math.PI,
    max: 0.5001 * Math.PI,
    step: 1 / 180 * Math.PI
  }, {
    label: "trackball y",
    title: "camera trackball y",
    fixRange: (i) => Math.max(-0.5 * Math.PI, Math.min(i, 0.5 * Math.PI)),
    stringify: (i) => `${(i / Math.PI * 180).toFixed()}&deg;`
  }), P = o("targetX", { type: "range", min: -20, max: 20, step: 0.1 }, {
    label: "target x",
    title: "target position x",
    fixRange: (i) => i,
    stringify: (i) => i.toFixed(2) + " m"
  }), D = o("targetY", { type: "range", min: -20, max: 20, step: 0.1 }, {
    label: "target y",
    title: "target position y",
    fixRange: (i) => i,
    stringify: (i) => i.toFixed(2) + " m"
  }), F = o("targetZ", { type: "range", min: -20, max: 20, step: 0.1 }, {
    label: "target z",
    title: "target position z",
    fixRange: (i) => i,
    stringify: (i) => i.toFixed(2) + " m"
  });
  o("fovy", {
    type: "range",
    min: 1 / 180 * Math.PI,
    max: 120.1 / 180 * Math.PI,
    step: 1 / 180 * Math.PI
  }, {
    label: "fov",
    title: "perspective fov (degrades stereo effect)",
    fixRange: (i) => Math.max(1 / 180 * Math.PI, Math.min(i, 120.1 / 180 * Math.PI)),
    stringify: (i) => {
      const c = i / Math.PI * 180, d = Math.atan(Math.tan(i / 2) * t.aspect) * 2 / Math.PI * 180;
      return `${c.toFixed()}&deg;&times;${d.toFixed()}&deg;`;
    }
  }), o("depthiness", { type: "range", min: 0, max: 2, step: 0.01 }, {
    label: "depthiness",
    title: 'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',
    fixRange: (i) => Math.max(0, i),
    stringify: (i) => `${i.toFixed(2)}x`
  }), o("inlineView", { type: "range", min: 0, max: 2, step: 1 }, {
    label: "inline view",
    title: "what to show inline on the original canvas (swizzled = no overwrite)",
    fixRange: (i) => Math.max(0, Math.min(i, 2)),
    stringify: (i) => i === 0 ? "swizzled" : i === 1 ? "center" : i === 2 ? "quilt" : "?"
  }), r.oncontextmenu = (i) => {
    i.preventDefault();
  }, r.addEventListener("wheel", (i) => {
    const c = t.targetDiam, d = 1.1, s = Math.log(c) / Math.log(d);
    return t.targetDiam = Math.pow(d, s + i.deltaY * 0.01);
  }), r.addEventListener("mousemove", (i) => {
    const c = i.movementX, d = -i.movementY;
    if (i.buttons & 2 || i.buttons & 1 && (i.shiftKey || i.ctrlKey)) {
      const s = t.trackballX, p = t.trackballY, x = -Math.cos(s) * c + Math.sin(s) * Math.sin(p) * d, w = -Math.cos(p) * d, g = Math.sin(s) * c + Math.cos(s) * Math.sin(p) * d;
      P((l) => l + x * t.targetDiam * 1e-3), D((l) => l + w * t.targetDiam * 1e-3), F((l) => l + g * t.targetDiam * 1e-3);
    } else
      i.buttons & 1 && (V((s) => s - c * 0.01), R((s) => s - d * 0.01));
  });
  const b = { w: 0, a: 0, s: 0, d: 0 };
  r.addEventListener("keydown", (i) => {
    switch (i.code) {
      case "KeyW":
        b.w = 1;
        break;
      case "KeyA":
        b.a = 1;
        break;
      case "KeyS":
        b.s = 1;
        break;
      case "KeyD":
        b.d = 1;
        break;
    }
  }), r.addEventListener("keyup", (i) => {
    switch (i.code) {
      case "KeyW":
        b.w = 0;
        break;
      case "KeyA":
        b.a = 0;
        break;
      case "KeyS":
        b.s = 0;
        break;
      case "KeyD":
        b.d = 0;
        break;
    }
  }), requestAnimationFrame(v);
  function v() {
    let i = b.d - b.a, c = b.w - b.s;
    i && c && (i *= Math.sqrt(0.5), c *= Math.sqrt(0.5));
    const d = t.trackballX, s = t.trackballY, p = Math.cos(d) * i - Math.sin(d) * Math.cos(s) * c, x = -Math.sin(s) * c, w = -Math.sin(d) * i - Math.cos(d) * Math.cos(s) * c;
    P((g) => g + p * t.targetDiam * 0.03), D((g) => g + x * t.targetDiam * 0.03), F((g) => g + w * t.targetDiam * 0.03), requestAnimationFrame(v);
  }
  return n;
}
const A = Symbol("LookingGlassXRWebGLLayer");
class Ee extends he {
  constructor(t, e, n) {
    super(t, e, n);
    const a = document.createElement("canvas");
    a.tabIndex = 0;
    const m = a.getContext("2d", { alpha: !1 });
    a.addEventListener("dblclick", function() {
      this.requestFullscreen();
    });
    const h = pe(a), f = S(), o = this[de].config, V = e.createTexture();
    let R, P;
    const D = e.createFramebuffer(), F = e.enable.bind(e), b = e.disable.bind(e), v = e.getExtension("OES_vertex_array_object"), L = 34229, i = v ? v.bindVertexArrayOES.bind(v) : e.bindVertexArray.bind(e), c = () => {
      const y = e.getParameter(e.TEXTURE_BINDING_2D);
      if (e.bindTexture(e.TEXTURE_2D, V), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, f.framebufferWidth, f.framebufferHeight, 0, e.RGBA, e.UNSIGNED_BYTE, null), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.bindTexture(e.TEXTURE_2D, y), R) {
        const C = e.getParameter(e.RENDERBUFFER_BINDING);
        e.bindRenderbuffer(e.RENDERBUFFER, R), e.renderbufferStorage(e.RENDERBUFFER, P.format, f.framebufferWidth, f.framebufferHeight), e.bindRenderbuffer(e.RENDERBUFFER, C);
      }
    };
    (o.depth || o.stencil) && (o.depth && o.stencil ? P = {
      format: e.DEPTH_STENCIL,
      attachment: e.DEPTH_STENCIL_ATTACHMENT
    } : o.depth ? P = {
      format: e.DEPTH_COMPONENT16,
      attachment: e.DEPTH_ATTACHMENT
    } : o.stencil && (P = {
      format: e.STENCIL_INDEX8,
      attachment: e.STENCIL_ATTACHMENT
    }), R = e.createRenderbuffer()), c(), f.addEventListener("on-config-changed", c);
    const d = e.getParameter(e.FRAMEBUFFER_BINDING);
    e.bindFramebuffer(e.FRAMEBUFFER, D), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, V, 0), (o.depth || o.stencil) && e.framebufferRenderbuffer(e.FRAMEBUFFER, P.attachment, e.RENDERBUFFER, R), e.bindFramebuffer(e.FRAMEBUFFER, d);
    const s = e.createProgram(), p = e.createShader(e.VERTEX_SHADER);
    e.attachShader(s, p);
    const x = e.createShader(e.FRAGMENT_SHADER);
    e.attachShader(s, x);
    {
      const y = `
       attribute vec2 a_position;
       varying vec2 v_texcoord;
       void main() {
         gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
         v_texcoord = a_position;
       }
     `;
      e.shaderSource(p, y), e.compileShader(p), e.getShaderParameter(p, e.COMPILE_STATUS) || console.warn(e.getShaderInfoLog(p));
    }
    let w, g, l;
    const B = () => {
      const y = ue(f);
      if (y === w)
        return;
      if (w = y, e.shaderSource(x, y), e.compileShader(x), !e.getShaderParameter(x, e.COMPILE_STATUS)) {
        console.warn(e.getShaderInfoLog(x));
        return;
      }
      if (e.linkProgram(s), !e.getProgramParameter(s, e.LINK_STATUS)) {
        console.warn(e.getProgramInfoLog(s));
        return;
      }
      g = e.getAttribLocation(s, "a_position"), l = e.getUniformLocation(s, "u_viewType");
      const C = e.getUniformLocation(s, "u_texture"), k = e.getParameter(e.CURRENT_PROGRAM);
      e.useProgram(s), e.uniform1i(C, 0), e.useProgram(k);
    };
    f.addEventListener("on-config-changed", B);
    const N = v ? v.createVertexArrayOES() : e.createVertexArray(), X = e.createBuffer(), u = e.getParameter(e.ARRAY_BUFFER_BINDING), T = e.getParameter(L);
    i(N), e.bindBuffer(e.ARRAY_BUFFER, X), e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), e.STATIC_DRAW), e.enableVertexAttribArray(g), e.vertexAttribPointer(g, 2, e.FLOAT, !1, 0, 0), i(T), e.bindBuffer(e.ARRAY_BUFFER, u);
    const j = () => {
      console.assert(this[A].LookingGlassEnabled), e.bindFramebuffer(e.FRAMEBUFFER, this.framebuffer);
      const y = e.getParameter(e.COLOR_CLEAR_VALUE), C = e.getParameter(e.DEPTH_CLEAR_VALUE), k = e.getParameter(e.STENCIL_CLEAR_VALUE);
      e.clearColor(0, 0, 0, 0), e.clearDepth(1), e.clearStencil(0), e.clear(e.DEPTH_BUFFER_BIT | e.COLOR_BUFFER_BIT | e.STENCIL_BUFFER_BIT), e.clearColor(y[0], y[1], y[2], y[3]), e.clearDepth(C), e.clearStencil(k);
    }, I = e.canvas;
    let W, O;
    const q = () => {
      if (!this[A].LookingGlassEnabled)
        return;
      (I.width !== f.calibration.screenW.value || I.height !== f.calibration.screenH.value) && (W = I.width, O = I.height, I.width = f.calibration.screenW.value, I.height = f.calibration.screenH.value);
      const y = e.getParameter(L), C = e.getParameter(e.CULL_FACE), k = e.getParameter(e.BLEND), K = e.getParameter(e.DEPTH_TEST), Z = e.getParameter(e.STENCIL_TEST), $ = e.getParameter(e.SCISSOR_TEST), J = e.getParameter(e.VIEWPORT), Q = e.getParameter(e.FRAMEBUFFER_BINDING), ee = e.getParameter(e.RENDERBUFFER_BINDING), te = e.getParameter(e.CURRENT_PROGRAM), ie = e.getParameter(e.ACTIVE_TEXTURE);
      {
        const ne = e.getParameter(e.TEXTURE_BINDING_2D);
        e.bindFramebuffer(e.FRAMEBUFFER, null), e.useProgram(s), i(N), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, V), e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.STENCIL_TEST), e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), e.uniform1i(l, 0), e.drawArrays(e.TRIANGLES, 0, 6), m == null || m.clearRect(0, 0, a.width, a.height), m == null || m.drawImage(I, 0, 0), f.inlineView !== 0 && (e.uniform1i(l, f.inlineView), e.drawArrays(e.TRIANGLES, 0, 6)), e.bindTexture(e.TEXTURE_2D, ne);
      }
      e.activeTexture(ie), e.useProgram(te), e.bindRenderbuffer(e.RENDERBUFFER, ee), e.bindFramebuffer(e.FRAMEBUFFER, Q), e.viewport(...J), ($ ? F : b)(e.SCISSOR_TEST), (Z ? F : b)(e.STENCIL_TEST), (K ? F : b)(e.DEPTH_TEST), (k ? F : b)(e.BLEND), (C ? F : b)(e.CULL_FACE), i(y);
    };
    let _;
    window.addEventListener("unload", () => {
      _ && _.close(), _ = void 0;
    });
    const z = (y, C) => {
      var k;
      !!_ != y && (y ? (B(), a.style.position = "fixed", a.style.top = "0", a.style.left = "0", a.style.width = "100%", a.style.height = "100%", a.width = f.calibration.screenW.value, a.height = f.calibration.screenH.value, document.body.appendChild(h), _ = window.open("", void 0, "width=640,height=360"), _.document.title = "Looking Glass Window (fullscreen me on Looking Glass!)", _.document.body.style.background = "black", _.document.body.appendChild(a), console.assert(C), _.onbeforeunload = C) : ((k = h.parentElement) == null || k.removeChild(h), I.width = W, I.height = O, _.onbeforeunload = void 0, _.close(), _ = void 0));
    };
    this[A] = {
      LookingGlassEnabled: !1,
      framebuffer: D,
      clearFramebuffer: j,
      blitTextureToDefaultFramebufferIfNeeded: q,
      moveCanvasToWindow: z
    };
  }
  get framebuffer() {
    return this[A].LookingGlassEnabled ? this[A].framebuffer : null;
  }
  get framebufferWidth() {
    return S().framebufferWidth;
  }
  get framebufferHeight() {
    return S().framebufferHeight;
  }
}
class ve extends ce {
  constructor(t) {
    super(t), this.sessions = /* @__PURE__ */ new Map(), this.viewSpaces = [], this.basePoseMatrix = E.create(), this.inlineProjectionMatrix = E.create(), this.inlineInverseViewMatrix = E.create(), this.LookingGlassProjectionMatrices = [], this.LookingGlassInverseViewMatrices = [];
  }
  onBaseLayerSet(t, e) {
    const n = this.sessions.get(t);
    n.baseLayer = e;
    const a = e[A];
    a.LookingGlassEnabled = n.immersive, n.immersive && a.moveCanvasToWindow(!0, () => {
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
    const n = t !== "inline", a = new xe(t, e);
    return this.sessions.set(a.id, a), n && this.dispatchEvent("@@webxr-polyfill/vr-present-start", a.id), Promise.resolve(a.id);
  }
  requestAnimationFrame(t) {
    return this.global.requestAnimationFrame(t);
  }
  cancelAnimationFrame(t) {
    this.global.cancelAnimationFrame(t);
  }
  onFrameStart(t, e) {
    const n = this.sessions.get(t), a = S();
    if (n.immersive) {
      const m = Math.tan(0.5 * a.fovy), h = 0.5 * a.targetDiam / m, f = h - a.targetDiam, o = this.basePoseMatrix;
      E.fromTranslation(o, [a.targetX, a.targetY, a.targetZ]), E.rotate(o, o, a.trackballX, [0, 1, 0]), E.rotate(o, o, -a.trackballY, [1, 0, 0]), E.translate(o, o, [0, 0, h]);
      for (let R = 0; R < a.numViews; ++R) {
        const P = (R + 0.5) / a.numViews - 0.5, D = Math.tan(a.viewCone * P), F = h * D, b = this.LookingGlassInverseViewMatrices[R] = this.LookingGlassInverseViewMatrices[R] || E.create();
        E.translate(b, o, [F, 0, 0]), E.invert(b, b);
        const v = Math.max(f + e.depthNear, 0.01), L = f + e.depthFar, i = v * m, c = i, d = -i, s = v * -D, p = a.aspect * i, x = s + p, w = s - p, g = this.LookingGlassProjectionMatrices[R] = this.LookingGlassProjectionMatrices[R] || E.create();
        E.set(g, 2 * v / (x - w), 0, 0, 0, 0, 2 * v / (c - d), 0, 0, (x + w) / (x - w), (c + d) / (c - d), -(L + v) / (L - v), -1, 0, 0, -2 * L * v / (L - v), 0);
      }
      n.baseLayer[A].clearFramebuffer();
    } else {
      const m = n.baseLayer.context, h = m.drawingBufferWidth / m.drawingBufferHeight;
      E.perspective(this.inlineProjectionMatrix, e.inlineVerticalFieldOfView, h, e.depthNear, e.depthFar), E.fromTranslation(this.basePoseMatrix, [0, H, 0]), E.invert(this.inlineInverseViewMatrix, this.basePoseMatrix);
    }
  }
  onFrameEnd(t) {
    this.sessions.get(t).baseLayer[A].blitTextureToDefaultFramebufferIfNeeded();
  }
  async requestFrameOfReferenceTransform(t, e) {
    const n = E.create();
    switch (t) {
      case "viewer":
      case "local":
        return E.fromTranslation(n, [0, -H, 0]), n;
      case "local-floor":
        return n;
      default:
        throw new Error("XRReferenceSpaceType not understood");
    }
  }
  endSession(t) {
    const e = this.sessions.get(t);
    e.immersive && e.baseLayer && (e.baseLayer[A].moveCanvasToWindow(!1), this.dispatchEvent("@@webxr-polyfill/vr-present-end", t)), e.ended = !0;
  }
  doesSessionSupportReferenceSpace(t, e) {
    const n = this.sessions.get(t);
    return n.ended ? !1 : n.enabledFeatures.has(e);
  }
  getViewSpaces(t) {
    if (t === "immersive-vr") {
      const e = S();
      for (let n = this.viewSpaces.length; n < e.numViews; ++n)
        this.viewSpaces[n] = new Re(n);
      return this.viewSpaces.length = e.numViews, this.viewSpaces;
    }
  }
  getViewport(t, e, n, a, m) {
    if (m === void 0) {
      const f = this.sessions.get(t).baseLayer.context;
      a.x = 0, a.y = 0, a.width = f.drawingBufferWidth, a.height = f.drawingBufferHeight;
    } else {
      const h = S(), f = m % h.quiltWidth, o = Math.floor(m / h.quiltWidth);
      a.x = h.tileWidth * f, a.y = h.tileHeight * o, a.width = h.tileWidth, a.height = h.tileHeight;
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
let ye = 0;
class xe {
  constructor(t, e) {
    M(this, "mode");
    M(this, "immersive");
    M(this, "id");
    M(this, "baseLayer");
    M(this, "inlineVerticalFieldOfView");
    M(this, "ended");
    M(this, "enabledFeatures");
    this.mode = t, this.immersive = t === "immersive-vr" || t === "immersive-ar", this.id = ++ye, this.baseLayer = null, this.inlineVerticalFieldOfView = Math.PI * 0.5, this.ended = !1, this.enabledFeatures = e;
  }
}
class Re extends le {
  constructor(e) {
    super();
    M(this, "viewIndex");
    this.viewIndex = e;
  }
  get eye() {
    return "none";
  }
  _onPoseUpdate(e) {
    this._inverseBaseMatrix = e._getViewMatrixByIndex(this.viewIndex);
  }
}
class we extends se {
  constructor(t) {
    super(), S(t), console.warn('Looking Glass WebXR "polyfill" overriding native WebXR API.');
    for (const n in Y)
      this.global[n] = Y[n];
    this.global.XRWebGLLayer = Ee, this.injected = !0;
    const e = Promise.resolve(new ve(this.global));
    this.xr = new oe(e), Object.defineProperty(this.global.navigator, "xr", {
      value: this.xr,
      configurable: !0
    });
  }
  get config() {
    return S();
  }
  set config(t) {
    S(t);
  }
}
const Te = new we();
Te.config = { tileHeight: 3 };
export {
  we as LookingGlassWebXRPolyfill
};
