import ne from "@lookingglass/webxr-polyfill/src/WebXRPolyfill";
import ae from "@lookingglass/webxr-polyfill/src/api/XRSystem";
import U from "@lookingglass/webxr-polyfill/src/api/index";
import re from "@lookingglass/webxr-polyfill/src/devices/XRDevice";
import se from "@lookingglass/webxr-polyfill/src/api/XRSpace";
import { mat4 as E } from "gl-matrix";
import oe, { PRIVATE as ce } from "@lookingglass/webxr-polyfill/src/api/XRWebGLLayer";
import * as le from "holoplay-core/dist/holoplaycore.module.js";
import { Shader as he } from "holoplay-core";
const X = 1.6;
let N;
function S() {
  return N === void 0 && (N = ue()), N;
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
    ), this.tileHeight = 512, this.numViews = 45, this.trackballX = 0, this.trackballY = 0, this.targetX = 0, this.targetY = X, this.targetZ = -0.5, this.targetDiam = 2, this.fovy = 13 / 180 * Math.PI, this.depthiness = 1.25, this.inlineView = 1;
  }
  get calibration() {
    return this._calibration;
  }
  set calibration(a) {
    this._calibration = H(a), this._ensureConfigChangeEvent();
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
function H(a) {
  return Object.freeze(a), a === void 0 || Object.getOwnPropertyNames(a).forEach(function(t) {
    a[t] !== null && (typeof a[t] == "object" || typeof a[t] == "function") && !Object.isFrozen(a[t]) && H(a[t]);
  }), a;
}
function fe(a) {
  const t = S(), e = document.createElement("style");
  document.head.appendChild(e), e.sheet.insertRule(
    "#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }"
  );
  const n = document.createElement("div");
  n.id = "LookingGlassWebXRControls", n.style.position = "fixed", n.style.zIndex = 1e3, n.style.padding = "4px", n.style.width = "315px", n.style.height = "360px", n.style.maxWidth = "calc(100vw - 18px)", n.style.maxHeight = "calc(100vh - 18px)", n.style.whiteSpace = "nowrap", n.style.overflowY = "scroll", n.style.scrollbarWidth = "thin", n.style.scrollbarColor = "thistle transparent", n.style.background = "rgba(0, 0, 0, 0.6)", n.style.color = "white", n.style.padding = "2px", n.style.border = "3px solid black", n.style.right = "6px", n.style.bottom = "6px";
  const r = document.createElement("div");
  n.appendChild(r), r.style.width = "100%", r.style.textAlign = "center", r.style.fontWeight = "bold", r.innerText = "LookingGlass View Controls ";
  const g = document.createElement("div");
  n.appendChild(g), g.style.width = "100%", g.style.whiteSpace = "normal", g.style.textAlign = "center", g.innerHTML = "Camera: click popup and use WASD, mouse left/right drag, and scroll.";
  const h = document.createElement("input");
  r.appendChild(h), h.type = "button", h.value = "\u2190", h._otherValue = "\u2192", h.onclick = () => {
    [n.style.right, n.style.left] = [n.style.left, n.style.right], [h.value, h._otherValue] = [h._otherValue, h.value];
  };
  const d = document.createElement("div");
  n.appendChild(d);
  const c = (i, s, l) => {
    const f = l.stringify, u = document.createElement("div");
    d.appendChild(u);
    const R = i, y = t[i], b = document.createElement("label");
    if (u.appendChild(b), b.innerText = l.label, b.setAttribute("for", R), b.style.width = "80px", b.style.display = "inline-block", b.style.textDecoration = "dotted underline 1px", b.title = l.title, s.type !== "checkbox") {
      const p = document.createElement("input");
      u.appendChild(p), p.type = "button", p.value = "\u238C", p.alt = "reset", p.title = "Reset value to default", p.style.padding = "0 4px", p.onclick = () => {
        o.value = y, o.oninput();
      };
    }
    const o = document.createElement("input");
    u.appendChild(o), Object.assign(o, s), o.id = R, o.title = l.title, o.value = s.value !== void 0 ? s.value : y;
    const k = (p) => {
      t[i] = p, D(p);
    };
    o.oninput = () => {
      const p = s.type === "range" ? parseFloat(o.value) : s.type === "checkbox" ? o.checked : o.value;
      k(p);
    };
    const B = (p) => {
      let w = p(t[i]);
      l.fixRange && (w = l.fixRange(w), o.max = Math.max(parseFloat(o.max), w), o.min = Math.min(parseFloat(o.min), w)), o.value = w, k(w);
    };
    s.type === "range" && (o.style.width = "110px", o.style.height = "16px", o.onwheel = (p) => {
      B((w) => w + Math.sign(p.deltaX - p.deltaY) * s.step);
    });
    let D = () => {
    };
    if (f) {
      const p = document.createElement("span");
      u.appendChild(p), D = (w) => {
        p.innerHTML = f(w);
      }, D(y);
    }
    return B;
  };
  c(
    "tileHeight",
    { type: "range", min: 160, max: 455, step: 1 },
    {
      label: "resolution",
      title: "resolution of each view",
      stringify: (i) => `${(i * t.aspect).toFixed()}&times;${i.toFixed()}`
    }
  ), c(
    "numViews",
    { type: "range", min: 1, max: 145, step: 1 },
    {
      label: "# views",
      title: "number of different viewing angles to render",
      stringify: (i) => i.toFixed()
    }
  );
  const A = c(
    "trackballX",
    { type: "range", min: -Math.PI, max: 1.0001 * Math.PI, step: 0.5 / 180 * Math.PI },
    {
      label: "trackball x",
      title: "camera trackball x",
      fixRange: (i) => (i + Math.PI * 3) % (Math.PI * 2) - Math.PI,
      stringify: (i) => `${(i / Math.PI * 180).toFixed()}&deg;`
    }
  ), T = c(
    "trackballY",
    { type: "range", min: -0.5 * Math.PI, max: 0.5001 * Math.PI, step: 1 / 180 * Math.PI },
    {
      label: "trackball y",
      title: "camera trackball y",
      fixRange: (i) => Math.max(-0.5 * Math.PI, Math.min(i, 0.5 * Math.PI)),
      stringify: (i) => `${(i / Math.PI * 180).toFixed()}&deg;`
    }
  ), M = c(
    "targetX",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target x",
      title: "target position x",
      fixRange: (i) => i,
      stringify: (i) => i.toFixed(2) + " m"
    }
  ), I = c(
    "targetY",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target y",
      title: "target position y",
      fixRange: (i) => i,
      stringify: (i) => i.toFixed(2) + " m"
    }
  ), P = c(
    "targetZ",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target z",
      title: "target position z",
      fixRange: (i) => i,
      stringify: (i) => i.toFixed(2) + " m"
    }
  );
  c(
    "fovy",
    { type: "range", min: 1 / 180 * Math.PI, max: 120.1 / 180 * Math.PI, step: 1 / 180 * Math.PI },
    {
      label: "fov",
      title: "perspective fov (degrades stereo effect)",
      fixRange: (i) => Math.max(1 / 180 * Math.PI, Math.min(i, 120.1 / 180 * Math.PI)),
      stringify: (i) => {
        const s = i / Math.PI * 180, l = Math.atan(Math.tan(i / 2) * t.aspect) * 2 / Math.PI * 180;
        return `${s.toFixed()}&deg;&times;${l.toFixed()}&deg;`;
      }
    }
  ), c(
    "depthiness",
    { type: "range", min: 0, max: 2, step: 0.01 },
    {
      label: "depthiness",
      title: 'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',
      fixRange: (i) => Math.max(0, i),
      stringify: (i) => `${i.toFixed(2)}x`
    }
  ), c(
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
    const s = t.targetDiam, l = 1.1, f = Math.log(s) / Math.log(l);
    return t.targetDiam = Math.pow(l, f + i.deltaY * 0.01);
  }), a.addEventListener("mousemove", (i) => {
    const s = i.movementX, l = -i.movementY;
    if (i.buttons & 2 || i.buttons & 1 && (i.shiftKey || i.ctrlKey)) {
      const f = t.trackballX, u = t.trackballY, R = -Math.cos(f) * s + Math.sin(f) * Math.sin(u) * l, y = -Math.cos(u) * l, b = Math.sin(f) * s + Math.cos(f) * Math.sin(u) * l;
      M((o) => o + R * t.targetDiam * 1e-3), I((o) => o + y * t.targetDiam * 1e-3), P((o) => o + b * t.targetDiam * 1e-3);
    } else
      i.buttons & 1 && (A((f) => f - s * 0.01), T((f) => f - l * 0.01));
  });
  const m = { w: 0, a: 0, s: 0, d: 0 };
  a.addEventListener("keydown", (i) => {
    switch (i.code) {
      case "KeyW":
        m.w = 1;
        break;
      case "KeyA":
        m.a = 1;
        break;
      case "KeyS":
        m.s = 1;
        break;
      case "KeyD":
        m.d = 1;
        break;
    }
  }), a.addEventListener("keyup", (i) => {
    switch (i.code) {
      case "KeyW":
        m.w = 0;
        break;
      case "KeyA":
        m.a = 0;
        break;
      case "KeyS":
        m.s = 0;
        break;
      case "KeyD":
        m.d = 0;
        break;
    }
  }), requestAnimationFrame(v);
  function v() {
    let i = m.d - m.a, s = m.w - m.s;
    i && s && (i *= Math.sqrt(0.5), s *= Math.sqrt(0.5));
    const l = t.trackballX, f = t.trackballY, u = Math.cos(l) * i - Math.sin(l) * Math.cos(f) * s, R = -Math.sin(f) * s, y = -Math.sin(l) * i - Math.cos(l) * Math.cos(f) * s;
    M((b) => b + u * t.targetDiam * 0.03), I((b) => b + R * t.targetDiam * 0.03), P((b) => b + y * t.targetDiam * 0.03), requestAnimationFrame(v);
  }
  return n;
}
const C = Symbol("LookingGlassXRWebGLLayer");
class me extends oe {
  constructor(t, e, n) {
    super(t, e, n);
    const r = document.createElement("canvas");
    r.tabIndex = 0;
    const g = r.getContext("2d", { alpha: !1 });
    r.addEventListener("dblclick", function() {
      this.requestFullscreen();
    });
    const h = fe(r), d = S(), c = this[ce].config, A = e.createTexture();
    let T, M;
    const I = e.createFramebuffer(), P = e.enable.bind(e), m = e.disable.bind(e), v = e.getExtension("OES_vertex_array_object"), i = 34229, s = v ? v.bindVertexArrayOES.bind(v) : e.bindVertexArray.bind(e), l = () => {
      const x = e.getParameter(e.TEXTURE_BINDING_2D);
      if (e.bindTexture(e.TEXTURE_2D, A), e.texImage2D(
        e.TEXTURE_2D,
        0,
        e.RGBA,
        d.framebufferWidth,
        d.framebufferHeight,
        0,
        e.RGBA,
        e.UNSIGNED_BYTE,
        null
      ), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.bindTexture(e.TEXTURE_2D, x), T) {
        const F = e.getParameter(e.RENDERBUFFER_BINDING);
        e.bindRenderbuffer(e.RENDERBUFFER, T), e.renderbufferStorage(
          e.RENDERBUFFER,
          M.format,
          d.framebufferWidth,
          d.framebufferHeight
        ), e.bindRenderbuffer(e.RENDERBUFFER, F);
      }
    };
    (c.depth || c.stencil) && (c.depth && c.stencil ? M = { format: e.DEPTH_STENCIL, attachment: e.DEPTH_STENCIL_ATTACHMENT } : c.depth ? M = { format: e.DEPTH_COMPONENT16, attachment: e.DEPTH_ATTACHMENT } : c.stencil && (M = { format: e.STENCIL_INDEX8, attachment: e.STENCIL_ATTACHMENT }), T = e.createRenderbuffer()), l(), d.addEventListener("on-config-changed", l);
    const f = e.getParameter(e.FRAMEBUFFER_BINDING);
    e.bindFramebuffer(e.FRAMEBUFFER, I), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, A, 0), (c.depth || c.stencil) && e.framebufferRenderbuffer(e.FRAMEBUFFER, M.attachment, e.RENDERBUFFER, T), e.bindFramebuffer(e.FRAMEBUFFER, f);
    const u = e.createProgram(), R = e.createShader(e.VERTEX_SHADER);
    e.attachShader(u, R);
    const y = e.createShader(e.FRAGMENT_SHADER);
    e.attachShader(u, y);
    {
      const x = `
       attribute vec2 a_position;
       varying vec2 v_texcoord;
       void main() {
         gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
         v_texcoord = a_position;
       }
     `;
      e.shaderSource(R, x), e.compileShader(R), e.getShaderParameter(R, e.COMPILE_STATUS) || console.warn(e.getShaderInfoLog(R));
    }
    let b, o, k;
    const B = () => {
      const x = he(d);
      if (x === b)
        return;
      if (b = x, e.shaderSource(y, x), e.compileShader(y), !e.getShaderParameter(y, e.COMPILE_STATUS)) {
        console.warn(e.getShaderInfoLog(y));
        return;
      }
      if (e.linkProgram(u), !e.getProgramParameter(u, e.LINK_STATUS)) {
        console.warn(e.getProgramInfoLog(u));
        return;
      }
      o = e.getAttribLocation(u, "a_position"), k = e.getUniformLocation(u, "u_viewType");
      const F = e.getUniformLocation(u, "u_texture"), V = e.getParameter(e.CURRENT_PROGRAM);
      e.useProgram(u), e.uniform1i(F, 0), e.useProgram(V);
    };
    d.addEventListener("on-config-changed", B);
    const D = v ? v.createVertexArrayOES() : e.createVertexArray(), p = e.createBuffer(), w = e.getParameter(e.ARRAY_BUFFER_BINDING), O = e.getParameter(i);
    s(D), e.bindBuffer(e.ARRAY_BUFFER, p), e.bufferData(e.ARRAY_BUFFER, new Float32Array([
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
    ]), e.STATIC_DRAW), e.enableVertexAttribArray(o), e.vertexAttribPointer(o, 2, e.FLOAT, !1, 0, 0), s(O), e.bindBuffer(e.ARRAY_BUFFER, w);
    const Y = () => {
      console.assert(this[C].LookingGlassEnabled), e.bindFramebuffer(e.FRAMEBUFFER, this.framebuffer);
      const x = e.getParameter(e.COLOR_CLEAR_VALUE), F = e.getParameter(e.DEPTH_CLEAR_VALUE), V = e.getParameter(e.STENCIL_CLEAR_VALUE);
      e.clearColor(0, 0, 0, 0), e.clearDepth(1), e.clearStencil(0), e.clear(e.DEPTH_BUFFER_BIT | e.COLOR_BUFFER_BIT | e.STENCIL_BUFFER_BIT), e.clearColor(x[0], x[1], x[2], x[3]), e.clearDepth(F), e.clearStencil(V);
    }, L = e.canvas;
    let G, W;
    const j = () => {
      if (!this[C].LookingGlassEnabled)
        return;
      (L.width !== d.calibration.screenW.value || L.height !== d.calibration.screenH.value) && (G = L.width, W = L.height, L.width = d.calibration.screenW.value, L.height = d.calibration.screenH.value);
      const x = e.getParameter(i), F = e.getParameter(e.CULL_FACE), V = e.getParameter(e.BLEND), z = e.getParameter(e.DEPTH_TEST), K = e.getParameter(e.STENCIL_TEST), Z = e.getParameter(e.SCISSOR_TEST), $ = e.getParameter(e.VIEWPORT), J = e.getParameter(e.FRAMEBUFFER_BINDING), Q = e.getParameter(e.RENDERBUFFER_BINDING), ee = e.getParameter(e.CURRENT_PROGRAM), te = e.getParameter(e.ACTIVE_TEXTURE);
      {
        const ie = e.getParameter(e.TEXTURE_BINDING_2D);
        e.bindFramebuffer(e.FRAMEBUFFER, null), e.useProgram(u), s(D), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, A), e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.STENCIL_TEST), e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), e.uniform1i(k, 0), e.drawArrays(e.TRIANGLES, 0, 6), g.clearRect(0, 0, r.width, r.height), g.drawImage(L, 0, 0), d.inlineView !== 0 && (e.uniform1i(k, d.inlineView), e.drawArrays(e.TRIANGLES, 0, 6)), e.bindTexture(e.TEXTURE_2D, ie);
      }
      e.activeTexture(te), e.useProgram(ee), e.bindRenderbuffer(e.RENDERBUFFER, Q), e.bindFramebuffer(e.FRAMEBUFFER, J), e.viewport(...$), (Z ? P : m)(e.SCISSOR_TEST), (K ? P : m)(e.STENCIL_TEST), (z ? P : m)(e.DEPTH_TEST), (V ? P : m)(e.BLEND), (F ? P : m)(e.CULL_FACE), s(x);
    };
    let _;
    window.addEventListener("unload", () => {
      _ && _.close(), _ = void 0;
    });
    const q = (x, F) => {
      !!_ != x && (x ? (B(), r.style.position = "fixed", r.style.top = "0", r.style.left = "0", r.style.width = "100%", r.style.height = "100%", r.width = d.calibration.screenW.value, r.height = d.calibration.screenH.value, document.body.appendChild(h), _ = window.open("", void 0, "width=640,height=360"), _.document.title = "Looking Glass Window (fullscreen me on Looking Glass!)", _.document.body.style.background = "black", _.document.body.appendChild(r), console.assert(F), _.onbeforeunload = F) : (h.parentElement.removeChild(h), L.width = G, L.height = W, _.onbeforeunload = void 0, _.close(), _ = void 0));
    };
    this[C] = {
      LookingGlassEnabled: !1,
      framebuffer: I,
      clearFramebuffer: Y,
      blitTextureToDefaultFramebufferIfNeeded: j,
      moveCanvasToWindow: q
    };
  }
  get framebuffer() {
    return this[C].LookingGlassEnabled ? this[C].framebuffer : null;
  }
  get framebufferWidth() {
    return S().framebufferWidth;
  }
  get framebufferHeight() {
    return S().framebufferHeight;
  }
}
class be extends re {
  constructor(t) {
    super(t), this.sessions = /* @__PURE__ */ new Map(), this.viewSpaces = [], this.basePoseMatrix = E.create(), this.inlineProjectionMatrix = E.create(), this.inlineInverseViewMatrix = E.create(), this.LookingGlassProjectionMatrices = [], this.LookingGlassInverseViewMatrices = [];
  }
  onBaseLayerSet(t, e) {
    const n = this.sessions.get(t);
    n.baseLayer = e;
    const r = e[C];
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
    const n = this.sessions.get(t), r = S();
    if (n.immersive) {
      const g = Math.tan(0.5 * r.fovy), h = 0.5 * r.targetDiam / g, d = h - r.targetDiam, c = this.basePoseMatrix;
      E.fromTranslation(c, [r.targetX, r.targetY, r.targetZ]), E.rotate(c, c, r.trackballX, [0, 1, 0]), E.rotate(c, c, -r.trackballY, [1, 0, 0]), E.translate(c, c, [0, 0, h]);
      for (let T = 0; T < r.numViews; ++T) {
        const M = (T + 0.5) / r.numViews - 0.5, I = Math.tan(r.viewCone * M), P = h * I, m = this.LookingGlassInverseViewMatrices[T] = this.LookingGlassInverseViewMatrices[T] || E.create();
        E.translate(m, c, [P, 0, 0]), E.invert(m, m);
        const v = Math.max(d + e.depthNear, 0.01), i = d + e.depthFar, s = v * g, l = s, f = -s, u = v * -I, R = r.aspect * s, y = u + R, b = u - R, o = this.LookingGlassProjectionMatrices[T] = this.LookingGlassProjectionMatrices[T] || E.create();
        E.set(
          o,
          2 * v / (y - b),
          0,
          0,
          0,
          0,
          2 * v / (l - f),
          0,
          0,
          (y + b) / (y - b),
          (l + f) / (l - f),
          -(i + v) / (i - v),
          -1,
          0,
          0,
          -2 * i * v / (i - v),
          0
        );
      }
      n.baseLayer[C].clearFramebuffer();
    } else {
      const g = n.baseLayer.context, h = g.drawingBufferWidth / g.drawingBufferHeight;
      E.perspective(
        this.inlineProjectionMatrix,
        e.inlineVerticalFieldOfView,
        h,
        e.depthNear,
        e.depthFar
      ), E.fromTranslation(this.basePoseMatrix, [0, X, 0]), E.invert(this.inlineInverseViewMatrix, this.basePoseMatrix);
    }
  }
  onFrameEnd(t) {
    this.sessions.get(t).baseLayer[C].blitTextureToDefaultFramebufferIfNeeded();
  }
  async requestFrameOfReferenceTransform(t, e) {
    const n = E.create();
    switch (t) {
      case "viewer":
      case "local":
        return E.fromTranslation(n, [0, -X, 0]), n;
      case "local-floor":
        return n;
      default:
        throw new Error("XRReferenceSpaceType not understood");
    }
  }
  endSession(t) {
    const e = this.sessions.get(t);
    e.immersive && e.baseLayer && (e.baseLayer[C].moveCanvasToWindow(!1), this.dispatchEvent("@@webxr-polyfill/vr-present-end", t)), e.ended = !0;
  }
  doesSessionSupportReferenceSpace(t, e) {
    const n = this.sessions.get(t);
    return n.ended ? !1 : n.enabledFeatures.has(e);
  }
  getViewSpaces(t) {
    if (t === "immersive-vr") {
      const e = S();
      for (let n = this.viewSpaces.length; n < e.numViews; ++n)
        this.viewSpaces[n] = new ge(n);
      return this.viewSpaces.length = e.numViews, this.viewSpaces;
    }
  }
  getViewport(t, e, n, r, g) {
    if (g === void 0) {
      const d = this.sessions.get(t).baseLayer.context;
      r.x = 0, r.y = 0, r.width = d.drawingBufferWidth, r.height = d.drawingBufferHeight;
    } else {
      const h = S(), d = g % h.quiltWidth, c = Math.floor(g / h.quiltWidth);
      r.x = h.tileWidth * d, r.y = h.tileHeight * c, r.width = h.tileWidth, r.height = h.tileHeight;
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
    for (const n in U)
      this.global[n] = U[n];
    this.global.XRWebGLLayer = me, this.injected = !0;
    const e = Promise.resolve(new be(this.global));
    this.xr = new ae(e), Object.defineProperty(this.global.navigator, "xr", {
      value: this.xr,
      configurable: !0
    });
  }
}
const Fe = S();
export {
  Fe as LookingGlassConfig,
  Pe as LookingGlassWebXRPolyfill
};
