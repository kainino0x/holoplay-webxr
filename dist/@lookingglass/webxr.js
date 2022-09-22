import ne from "@lookingglass/webxr-polyfill/src/WebXRPolyfill";
import ae from "@lookingglass/webxr-polyfill/src/api/XRSystem";
import H from "@lookingglass/webxr-polyfill/src/api/index";
import re from "@lookingglass/webxr-polyfill/src/devices/XRDevice";
import se from "@lookingglass/webxr-polyfill/src/api/XRSpace";
import { mat4 as p } from "gl-matrix";
import oe, { PRIVATE as ce } from "@lookingglass/webxr-polyfill/src/api/XRWebGLLayer";
import * as le from "holoplay-core/dist/holoplaycore.module.js";
import { Shader as he } from "holoplay-core";
const W = 1.6;
let G;
function I() {
  return G === void 0 && (G = ue()), G;
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
    const a = (i) => {
      i && this.dispatchEvent(new Event("on-config-changed")), new Promise((n) => {
        this._ensureConfigChangeEvent = n;
      }).then(() => a(!0));
    };
    a(!1), this.calibration = de, new le.Client(
      (i) => {
        if (i.devices.length < 1) {
          console.error("No Looking Glass devices found!");
          return;
        }
        i.devices.length > 1 && console.warn("More than one Looking Glass device found... using the first one"), this.calibration = i.devices[0].calibration;
      },
      (i) => {
        console.error("Error creating Looking Glass client:", i);
      }
    ), this.tileHeight = 320, this.numViews = 2, this.trackballX = 0, this.trackballY = 0, this.targetX = 0, this.targetY = W, this.targetZ = -0.5, this.targetDiam = 2, this.fovy = 13 / 180 * Math.PI, this.depthiness = 1.25, this.inlineView = 1;
  }
  get calibration() {
    return this._calibration;
  }
  set calibration(a) {
    this._calibration = Y(a), this._ensureConfigChangeEvent();
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
function Y(a) {
  return Object.freeze(a), a === void 0 || Object.getOwnPropertyNames(a).forEach(function(i) {
    a[i] !== null && (typeof a[i] == "object" || typeof a[i] == "function") && !Object.isFrozen(a[i]) && Y(a[i]);
  }), a;
}
function fe(a) {
  const i = I(), e = document.createElement("style");
  document.head.appendChild(e), e.sheet.insertRule(
    "#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }"
  );
  const n = document.createElement("div");
  n.id = "LookingGlassWebXRControls", n.style.position = "fixed", n.style.zIndex = 1e3, n.style.padding = "4px", n.style.width = "315px", n.style.height = "360px", n.style.maxWidth = "calc(100vw - 18px)", n.style.maxHeight = "calc(100vh - 18px)", n.style.whiteSpace = "nowrap", n.style.overflowY = "scroll", n.style.scrollbarWidth = "thin", n.style.scrollbarColor = "thistle transparent", n.style.background = "rgba(0, 0, 0, 0.6)", n.style.color = "white", n.style.padding = "2px", n.style.border = "3px solid black", n.style.right = "6px", n.style.bottom = "6px";
  const r = document.createElement("div");
  n.appendChild(r), r.style.width = "100%", r.style.textAlign = "center", r.style.fontWeight = "bold", r.innerText = "LookingGlass View Controls ";
  const u = document.createElement("div");
  n.appendChild(u), u.style.width = "100%", u.style.whiteSpace = "normal", u.style.textAlign = "center", u.innerHTML = "Camera: click popup and use WASD, mouse left/right drag, and scroll.";
  const h = document.createElement("input");
  r.appendChild(h), h.type = "button", h.value = "\u2190", h._otherValue = "\u2192", h.onclick = () => {
    [n.style.right, n.style.left] = [n.style.left, n.style.right], [h.value, h._otherValue] = [h._otherValue, h.value];
  };
  const v = document.createElement("div");
  n.appendChild(v);
  const l = (t, s, c) => {
    const m = c.stringify, E = document.createElement("div");
    v.appendChild(E);
    const x = t, R = i[t], b = document.createElement("label");
    if (E.appendChild(b), b.innerText = c.label, b.setAttribute("for", x), b.style.width = "80px", b.style.display = "inline-block", b.style.textDecoration = "dotted underline 1px", b.title = c.title, s.type !== "checkbox") {
      const o = document.createElement("input");
      E.appendChild(o), o.type = "button", o.value = "\u238C", o.alt = "reset", o.title = "Reset value to default", o.style.padding = "0 4px", o.onclick = () => {
        d.value = R, d.oninput();
      };
    }
    const d = document.createElement("input");
    E.appendChild(d), Object.assign(d, s), d.id = x, d.title = c.title, d.value = s.value !== void 0 ? s.value : R;
    const V = (o) => {
      i[t] = o, D(o);
    };
    d.oninput = () => {
      const o = s.type === "range" ? parseFloat(d.value) : s.type === "checkbox" ? d.checked : d.value;
      V(o);
    };
    const N = (o) => {
      let w = o(i[t]);
      c.fixRange && (w = c.fixRange(w), d.max = Math.max(parseFloat(d.max), w), d.min = Math.min(parseFloat(d.min), w)), d.value = w, V(w);
    };
    s.type === "range" && (d.style.width = "110px", d.style.height = "16px", d.onwheel = (o) => {
      N((w) => w + Math.sign(o.deltaX - o.deltaY) * s.step);
    });
    let D = () => {
    };
    if (m) {
      const o = document.createElement("span");
      E.appendChild(o), D = (w) => {
        o.innerHTML = m(w);
      }, D(R);
    }
    return N;
  };
  l(
    "tileHeight",
    { type: "range", min: 160, max: 455, step: 1 },
    {
      label: "resolution",
      title: "resolution of each view",
      stringify: (t) => `${(t * i.aspect).toFixed()}&times;${t.toFixed()}`
    }
  ), l(
    "numViews",
    { type: "range", min: 1, max: 145, step: 1 },
    {
      label: "# views",
      title: "number of different viewing angles to render",
      stringify: (t) => t.toFixed()
    }
  );
  const k = l(
    "trackballX",
    { type: "range", min: -Math.PI, max: 1.0001 * Math.PI, step: 0.5 / 180 * Math.PI },
    {
      label: "trackball x",
      title: "camera trackball x",
      fixRange: (t) => (t + Math.PI * 3) % (Math.PI * 2) - Math.PI,
      stringify: (t) => `${(t / Math.PI * 180).toFixed()}&deg;`
    }
  ), y = l(
    "trackballY",
    { type: "range", min: -0.5 * Math.PI, max: 0.5001 * Math.PI, step: 1 / 180 * Math.PI },
    {
      label: "trackball y",
      title: "camera trackball y",
      fixRange: (t) => Math.max(-0.5 * Math.PI, Math.min(t, 0.5 * Math.PI)),
      stringify: (t) => `${(t / Math.PI * 180).toFixed()}&deg;`
    }
  ), P = l(
    "targetX",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target x",
      title: "target position x",
      fixRange: (t) => t,
      stringify: (t) => t.toFixed(2) + " m"
    }
  ), M = l(
    "targetY",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target y",
      title: "target position y",
      fixRange: (t) => t,
      stringify: (t) => t.toFixed(2) + " m"
    }
  ), S = l(
    "targetZ",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target z",
      title: "target position z",
      fixRange: (t) => t,
      stringify: (t) => t.toFixed(2) + " m"
    }
  ), F = l(
    "targetDiam",
    { type: "range", min: 0.2, max: 20, step: 0.1 },
    {
      label: "target size",
      title: "diameter of the target sphere to fit in the screen",
      fixRange: (t) => Math.max(0.2, t),
      stringify: (t) => `${(t * 100).toFixed()} cm`
    }
  );
  l(
    "fovy",
    { type: "range", min: 1 / 180 * Math.PI, max: 120.1 / 180 * Math.PI, step: 1 / 180 * Math.PI },
    {
      label: "fov",
      title: "perspective fov (degrades stereo effect)",
      fixRange: (t) => Math.max(1 / 180 * Math.PI, Math.min(t, 120.1 / 180 * Math.PI)),
      stringify: (t) => {
        const s = t / Math.PI * 180, c = Math.atan(Math.tan(t / 2) * i.aspect) * 2 / Math.PI * 180;
        return `${s.toFixed()}&deg;&times;${c.toFixed()}&deg;`;
      }
    }
  ), l(
    "depthiness",
    { type: "range", min: 0, max: 2, step: 0.01 },
    {
      label: "depthiness",
      title: 'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',
      fixRange: (t) => Math.max(0, t),
      stringify: (t) => `${t.toFixed(2)}x`
    }
  ), l(
    "inlineView",
    { type: "range", min: 0, max: 2, step: 1 },
    {
      label: "inline view",
      title: "what to show inline on the original canvas (swizzled = no overwrite)",
      fixRange: (t) => Math.max(0, Math.min(t, 2)),
      stringify: (t) => t === 0 ? "swizzled" : t === 1 ? "center" : t === 2 ? "quilt" : "?"
    }
  ), a.oncontextmenu = (t) => {
    t.preventDefault();
  }, a.addEventListener("wheel", (t) => {
    F((s) => {
      const m = Math.log(s) / Math.log(1.1);
      return Math.pow(1.1, m + t.deltaY * 0.01);
    });
  }), a.addEventListener("mousemove", (t) => {
    const s = t.movementX, c = -t.movementY;
    if (t.buttons & 2 || t.buttons & 1 && (t.shiftKey || t.ctrlKey)) {
      const m = i.trackballX, E = i.trackballY, x = -Math.cos(m) * s + Math.sin(m) * Math.sin(E) * c, R = -Math.cos(E) * c, b = Math.sin(m) * s + Math.cos(m) * Math.sin(E) * c;
      P((d) => d + x * i.targetDiam * 1e-3), M((d) => d + R * i.targetDiam * 1e-3), S((d) => d + b * i.targetDiam * 1e-3);
    } else
      t.buttons & 1 && (k((m) => m - s * 0.01), y((m) => m - c * 0.01));
  });
  const f = { w: 0, a: 0, s: 0, d: 0 };
  a.addEventListener("keydown", (t) => {
    switch (t.code) {
      case "KeyW":
        f.w = 1;
        break;
      case "KeyA":
        f.a = 1;
        break;
      case "KeyS":
        f.s = 1;
        break;
      case "KeyD":
        f.d = 1;
        break;
    }
  }), a.addEventListener("keyup", (t) => {
    switch (t.code) {
      case "KeyW":
        f.w = 0;
        break;
      case "KeyA":
        f.a = 0;
        break;
      case "KeyS":
        f.s = 0;
        break;
      case "KeyD":
        f.d = 0;
        break;
    }
  }), requestAnimationFrame(C);
  function C() {
    let t = f.d - f.a, s = f.w - f.s;
    t && s && (t *= Math.sqrt(0.5), s *= Math.sqrt(0.5));
    const c = i.trackballX, m = i.trackballY, E = Math.cos(c) * t - Math.sin(c) * Math.cos(m) * s, x = -Math.sin(m) * s, R = -Math.sin(c) * t - Math.cos(c) * Math.cos(m) * s;
    P((b) => b + E * i.targetDiam * 0.03), M((b) => b + x * i.targetDiam * 0.03), S((b) => b + R * i.targetDiam * 0.03), requestAnimationFrame(C);
  }
  return n;
}
const A = Symbol("LookingGlassXRWebGLLayer"), T = document.createElement("canvas");
T.tabIndex = 0;
const O = T.getContext("2d", { alpha: !1 });
T.addEventListener("dblclick", function() {
  this.requestFullscreen();
});
const X = fe(T);
class me extends oe {
  constructor(i, e, n) {
    super(i, e, n);
    const r = I(), u = this[ce].config, h = e.createTexture();
    let v, l;
    const k = e.createFramebuffer(), y = e.enable.bind(e), P = e.disable.bind(e), M = e.getExtension("OES_vertex_array_object"), S = 34229, F = M ? M.bindVertexArrayOES.bind(M) : e.bindVertexArray.bind(e), f = () => {
      const g = e.getParameter(e.TEXTURE_BINDING_2D);
      if (e.bindTexture(e.TEXTURE_2D, h), e.texImage2D(
        e.TEXTURE_2D,
        0,
        e.RGBA,
        r.framebufferWidth,
        r.framebufferHeight,
        0,
        e.RGBA,
        e.UNSIGNED_BYTE,
        null
      ), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.bindTexture(e.TEXTURE_2D, g), v) {
        const L = e.getParameter(e.RENDERBUFFER_BINDING);
        e.bindRenderbuffer(e.RENDERBUFFER, v), e.renderbufferStorage(
          e.RENDERBUFFER,
          l.format,
          r.framebufferWidth,
          r.framebufferHeight
        ), e.bindRenderbuffer(e.RENDERBUFFER, L);
      }
    };
    (u.depth || u.stencil) && (u.depth && u.stencil ? l = { format: e.DEPTH_STENCIL, attachment: e.DEPTH_STENCIL_ATTACHMENT } : u.depth ? l = { format: e.DEPTH_COMPONENT16, attachment: e.DEPTH_ATTACHMENT } : u.stencil && (l = { format: e.STENCIL_INDEX8, attachment: e.STENCIL_ATTACHMENT }), v = e.createRenderbuffer()), f(), r.addEventListener("on-config-changed", f);
    const C = e.getParameter(e.FRAMEBUFFER_BINDING);
    e.bindFramebuffer(e.FRAMEBUFFER, k), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, h, 0), (u.depth || u.stencil) && e.framebufferRenderbuffer(e.FRAMEBUFFER, l.attachment, e.RENDERBUFFER, v), e.bindFramebuffer(e.FRAMEBUFFER, C);
    const t = e.createProgram(), s = e.createShader(e.VERTEX_SHADER);
    e.attachShader(t, s);
    const c = e.createShader(e.FRAGMENT_SHADER);
    e.attachShader(t, c);
    {
      const g = `
       attribute vec2 a_position;
       varying vec2 v_texcoord;
       void main() {
         gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
         v_texcoord = a_position;
       }
     `;
      e.shaderSource(s, g), e.compileShader(s), e.getShaderParameter(s, e.COMPILE_STATUS) || console.warn(e.getShaderInfoLog(s));
    }
    let m, E, x;
    const R = () => {
      const g = he(r);
      if (g === m)
        return;
      if (m = g, e.shaderSource(c, g), e.compileShader(c), !e.getShaderParameter(c, e.COMPILE_STATUS)) {
        console.warn(e.getShaderInfoLog(c));
        return;
      }
      if (e.linkProgram(t), !e.getProgramParameter(t, e.LINK_STATUS)) {
        console.warn(e.getProgramInfoLog(t));
        return;
      }
      E = e.getAttribLocation(t, "a_position"), x = e.getUniformLocation(t, "u_viewType");
      const L = e.getUniformLocation(t, "u_texture"), B = e.getParameter(e.CURRENT_PROGRAM);
      e.useProgram(t), e.uniform1i(L, 0), e.useProgram(B);
    };
    r.addEventListener("on-config-changed", R);
    const b = M ? M.createVertexArrayOES() : e.createVertexArray(), d = e.createBuffer(), V = e.getParameter(e.ARRAY_BUFFER_BINDING), N = e.getParameter(S);
    F(b), e.bindBuffer(e.ARRAY_BUFFER, d), e.bufferData(e.ARRAY_BUFFER, new Float32Array([
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
    ]), e.STATIC_DRAW), e.enableVertexAttribArray(E), e.vertexAttribPointer(E, 2, e.FLOAT, !1, 0, 0), F(N), e.bindBuffer(e.ARRAY_BUFFER, V);
    const D = () => {
      console.assert(this[A].LookingGlassEnabled), e.bindFramebuffer(e.FRAMEBUFFER, this.framebuffer);
      const g = e.getParameter(e.COLOR_CLEAR_VALUE), L = e.getParameter(e.DEPTH_CLEAR_VALUE), B = e.getParameter(e.STENCIL_CLEAR_VALUE);
      e.clearColor(0, 0, 0, 0), e.clearDepth(1), e.clearStencil(0), e.clear(e.DEPTH_BUFFER_BIT | e.COLOR_BUFFER_BIT | e.STENCIL_BUFFER_BIT), e.clearColor(g[0], g[1], g[2], g[3]), e.clearDepth(L), e.clearStencil(B);
    }, o = e.canvas;
    let w, U;
    const j = () => {
      if (!this[A].LookingGlassEnabled)
        return;
      (o.width !== r.calibration.screenW.value || o.height !== r.calibration.screenH.value) && (w = o.width, U = o.height, o.width = r.calibration.screenW.value, o.height = r.calibration.screenH.value);
      const g = e.getParameter(S), L = e.getParameter(e.CULL_FACE), B = e.getParameter(e.BLEND), z = e.getParameter(e.DEPTH_TEST), K = e.getParameter(e.STENCIL_TEST), $ = e.getParameter(e.SCISSOR_TEST), Z = e.getParameter(e.VIEWPORT), J = e.getParameter(e.FRAMEBUFFER_BINDING), Q = e.getParameter(e.RENDERBUFFER_BINDING), ee = e.getParameter(e.CURRENT_PROGRAM), te = e.getParameter(e.ACTIVE_TEXTURE);
      {
        const ie = e.getParameter(e.TEXTURE_BINDING_2D);
        e.bindFramebuffer(e.FRAMEBUFFER, null), e.useProgram(t), F(b), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, h), e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.STENCIL_TEST), e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), e.uniform1i(x, 0), e.drawArrays(e.TRIANGLES, 0, 6), O.clearRect(0, 0, T.width, T.height), O.drawImage(o, 0, 0), r.inlineView !== 0 && (e.uniform1i(x, r.inlineView), e.drawArrays(e.TRIANGLES, 0, 6)), e.bindTexture(e.TEXTURE_2D, ie);
      }
      e.activeTexture(te), e.useProgram(ee), e.bindRenderbuffer(e.RENDERBUFFER, Q), e.bindFramebuffer(e.FRAMEBUFFER, J), e.viewport(...Z), ($ ? y : P)(e.SCISSOR_TEST), (K ? y : P)(e.STENCIL_TEST), (z ? y : P)(e.DEPTH_TEST), (B ? y : P)(e.BLEND), (L ? y : P)(e.CULL_FACE), F(g);
    };
    let _;
    window.addEventListener("unload", () => {
      _ && _.close(), _ = void 0;
    });
    const q = (g, L) => {
      !!_ != g && (g ? (R(), T.style.position = "fixed", T.style.top = "0", T.style.left = "0", T.style.width = "100%", T.style.height = "100%", T.width = r.calibration.screenW.value, T.height = r.calibration.screenH.value, document.body.appendChild(X), _ = window.open("", void 0, "width=640,height=360"), _.document.title = "Looking Glass Window (fullscreen me on Looking Glass!)", _.document.body.style.background = "black", _.document.body.appendChild(T), console.assert(L), _.onbeforeunload = L) : (X.parentElement.removeChild(X), o.width = w, o.height = U, _.onbeforeunload = void 0, _.close(), _ = void 0));
    };
    this[A] = {
      LookingGlassEnabled: !1,
      framebuffer: k,
      clearFramebuffer: D,
      blitTextureToDefaultFramebufferIfNeeded: j,
      moveCanvasToWindow: q
    };
  }
  get framebuffer() {
    return this[A].LookingGlassEnabled ? this[A].framebuffer : null;
  }
  get framebufferWidth() {
    return I().framebufferWidth;
  }
  get framebufferHeight() {
    return I().framebufferHeight;
  }
}
class be extends re {
  constructor(i) {
    super(i), this.sessions = /* @__PURE__ */ new Map(), this.viewSpaces = [], this.basePoseMatrix = p.create(), this.inlineProjectionMatrix = p.create(), this.inlineInverseViewMatrix = p.create(), this.LookingGlassProjectionMatrices = [], this.LookingGlassInverseViewMatrices = [];
  }
  onBaseLayerSet(i, e) {
    const n = this.sessions.get(i);
    n.baseLayer = e;
    const r = e[A];
    r.LookingGlassEnabled = n.immersive, n.immersive && r.moveCanvasToWindow(!0, () => {
      this.endSession(i);
    });
  }
  isSessionSupported(i) {
    return i === "inline" || i === "immersive-vr";
  }
  isFeatureSupported(i) {
    switch (i) {
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
        return console.warn("LookingGlassXRDevice.isFeatureSupported: feature not understood:", i), !1;
    }
  }
  async requestSession(i, e) {
    if (!this.isSessionSupported(i))
      return Promise.reject();
    const n = i !== "inline", r = new Ee(i, e);
    return this.sessions.set(r.id, r), n && this.dispatchEvent("@@webxr-polyfill/vr-present-start", r.id), Promise.resolve(r.id);
  }
  requestAnimationFrame(i) {
    return this.global.requestAnimationFrame(i);
  }
  cancelAnimationFrame(i) {
    this.global.cancelAnimationFrame(i);
  }
  onFrameStart(i, e) {
    const n = this.sessions.get(i), r = I();
    if (n.immersive) {
      const u = Math.tan(0.5 * r.fovy), h = 0.5 * r.targetDiam / u, v = h - r.targetDiam, l = this.basePoseMatrix;
      p.fromTranslation(l, [r.targetX, r.targetY, r.targetZ]), p.rotate(l, l, r.trackballX, [0, 1, 0]), p.rotate(l, l, -r.trackballY, [1, 0, 0]), p.translate(l, l, [0, 0, h]);
      for (let y = 0; y < r.numViews; ++y) {
        const P = (y + 0.5) / r.numViews - 0.5, M = Math.tan(r.viewCone * P), S = h * M, F = this.LookingGlassInverseViewMatrices[y] = this.LookingGlassInverseViewMatrices[y] || p.create();
        p.translate(F, l, [S, 0, 0]), p.invert(F, F);
        const f = Math.max(v + e.depthNear, 0.01), C = v + e.depthFar, t = f * u, s = t, c = -t, m = f * -M, E = r.aspect * t, x = m + E, R = m - E, b = this.LookingGlassProjectionMatrices[y] = this.LookingGlassProjectionMatrices[y] || p.create();
        p.set(
          b,
          2 * f / (x - R),
          0,
          0,
          0,
          0,
          2 * f / (s - c),
          0,
          0,
          (x + R) / (x - R),
          (s + c) / (s - c),
          -(C + f) / (C - f),
          -1,
          0,
          0,
          -2 * C * f / (C - f),
          0
        );
      }
      n.baseLayer[A].clearFramebuffer();
    } else {
      const u = n.baseLayer.context, h = u.drawingBufferWidth / u.drawingBufferHeight;
      p.perspective(
        this.inlineProjectionMatrix,
        e.inlineVerticalFieldOfView,
        h,
        e.depthNear,
        e.depthFar
      ), p.fromTranslation(this.basePoseMatrix, [0, W, 0]), p.invert(this.inlineInverseViewMatrix, this.basePoseMatrix);
    }
  }
  onFrameEnd(i) {
    this.sessions.get(i).baseLayer[A].blitTextureToDefaultFramebufferIfNeeded();
  }
  async requestFrameOfReferenceTransform(i, e) {
    const n = p.create();
    switch (i) {
      case "viewer":
      case "local":
        return p.fromTranslation(n, [0, -W, 0]), n;
      case "local-floor":
        return n;
      default:
        throw new Error("XRReferenceSpaceType not understood");
    }
  }
  endSession(i) {
    const e = this.sessions.get(i);
    e.immersive && e.baseLayer && (e.baseLayer[A].moveCanvasToWindow(!1), this.dispatchEvent("@@webxr-polyfill/vr-present-end", i)), e.ended = !0;
  }
  doesSessionSupportReferenceSpace(i, e) {
    const n = this.sessions.get(i);
    return n.ended ? !1 : n.enabledFeatures.has(e);
  }
  getViewSpaces(i) {
    if (i === "immersive-vr") {
      const e = I();
      for (let n = this.viewSpaces.length; n < e.numViews; ++n)
        this.viewSpaces[n] = new ge(n);
      return this.viewSpaces.length = e.numViews, this.viewSpaces;
    }
  }
  getViewport(i, e, n, r, u) {
    if (u === void 0) {
      const v = this.sessions.get(i).baseLayer.context;
      r.x = 0, r.y = 0, r.width = v.drawingBufferWidth, r.height = v.drawingBufferHeight;
    } else {
      const h = I(), v = u % h.quiltWidth, l = Math.floor(u / h.quiltWidth);
      r.x = h.tileWidth * v, r.y = h.tileHeight * l, r.width = h.tileWidth, r.height = h.tileHeight;
    }
    return !0;
  }
  getProjectionMatrix(i, e) {
    return e === void 0 ? this.inlineProjectionMatrix : this.LookingGlassProjectionMatrices[e] || p.create();
  }
  getBasePoseMatrix() {
    return this.basePoseMatrix;
  }
  getBaseViewMatrix() {
    return this.inlineInverseViewMatrix;
  }
  _getViewMatrixByIndex(i) {
    return this.LookingGlassInverseViewMatrices[i] = this.LookingGlassInverseViewMatrices[i] || p.create();
  }
  getInputSources() {
    return [];
  }
  getInputPose(i, e, n) {
    return null;
  }
  onWindowResize() {
  }
}
let pe = 0;
class Ee {
  constructor(i, e) {
    this.mode = i, this.immersive = i === "immersive-vr" || i === "immersive-ar", this.id = ++pe, this.baseLayer = null, this.inlineVerticalFieldOfView = Math.PI * 0.5, this.ended = !1, this.enabledFeatures = e;
  }
}
class ge extends se {
  constructor(i) {
    super(), this.viewIndex = i;
  }
  get eye() {
    return "none";
  }
  _onPoseUpdate(i) {
    this._inverseBaseMatrix = i._getViewMatrixByIndex(this.viewIndex);
  }
}
class Pe extends ne {
  constructor(i) {
    super(), console.warn(i || 'Looking Glass WebXR "polyfill" overriding native WebXR API.');
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
const Fe = I();
export {
  Fe as LookingGlassConfig,
  Pe as LookingGlassWebXRPolyfill
};
