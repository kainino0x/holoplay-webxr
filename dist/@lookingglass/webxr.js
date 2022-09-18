const ki = typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {}, ut = Symbol("@@webxr-polyfill/EventTarget");
class si {
  constructor() {
    this[ut] = {
      listeners: /* @__PURE__ */ new Map()
    };
  }
  addEventListener(e, t) {
    if (typeof e != "string")
      throw new Error("`type` must be a string");
    if (typeof t != "function")
      throw new Error("`listener` must be a function");
    const s = this[ut].listeners.get(e) || [];
    s.push(t), this[ut].listeners.set(e, s);
  }
  removeEventListener(e, t) {
    if (typeof e != "string")
      throw new Error("`type` must be a string");
    if (typeof t != "function")
      throw new Error("`listener` must be a function");
    const s = this[ut].listeners.get(e) || [];
    for (let l = s.length; l >= 0; l--)
      s[l] === t && s.pop();
  }
  dispatchEvent(e, t) {
    const s = this[ut].listeners.get(e) || [], l = [];
    for (let h = 0; h < s.length; h++)
      l[h] = s[h];
    for (let h of l)
      h(t);
    typeof this[`on${e}`] == "function" && this[`on${e}`](t);
  }
}
const Dr = 1e-6;
let ge = typeof Float32Array < "u" ? Float32Array : Array;
function Ye() {
  let i = new ge(16);
  return ge != Float32Array && (i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0), i[0] = 1, i[5] = 1, i[10] = 1, i[15] = 1, i;
}
function Ir(i, e) {
  return i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], i[4] = e[4], i[5] = e[5], i[6] = e[6], i[7] = e[7], i[8] = e[8], i[9] = e[9], i[10] = e[10], i[11] = e[11], i[12] = e[12], i[13] = e[13], i[14] = e[14], i[15] = e[15], i;
}
function Ze(i) {
  return i[0] = 1, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = 1, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = 1, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, i;
}
function Pt(i, e) {
  let t = e[0], s = e[1], l = e[2], h = e[3], d = e[4], u = e[5], m = e[6], w = e[7], b = e[8], _ = e[9], B = e[10], C = e[11], L = e[12], P = e[13], G = e[14], v = e[15], N = t * u - s * d, R = t * m - l * d, D = t * w - h * d, O = s * m - l * u, I = s * w - h * u, W = l * w - h * m, Q = b * P - _ * L, U = b * G - B * L, $ = b * v - C * L, T = _ * G - B * P, k = _ * v - C * P, M = B * v - C * G, x = N * M - R * k + D * T + O * $ - I * U + W * Q;
  return x ? (x = 1 / x, i[0] = (u * M - m * k + w * T) * x, i[1] = (l * k - s * M - h * T) * x, i[2] = (P * W - G * I + v * O) * x, i[3] = (B * I - _ * W - C * O) * x, i[4] = (m * $ - d * M - w * U) * x, i[5] = (t * M - l * $ + h * U) * x, i[6] = (G * D - L * W - v * R) * x, i[7] = (b * W - B * D + C * R) * x, i[8] = (d * k - u * $ + w * Q) * x, i[9] = (s * $ - t * k - h * Q) * x, i[10] = (L * I - P * D + v * N) * x, i[11] = (_ * D - b * I - C * N) * x, i[12] = (u * U - d * T - m * Q) * x, i[13] = (t * T - s * U + l * Q) * x, i[14] = (P * R - L * O - G * N) * x, i[15] = (b * O - _ * R + B * N) * x, i) : null;
}
function qe(i, e, t) {
  let s = e[0], l = e[1], h = e[2], d = e[3], u = e[4], m = e[5], w = e[6], b = e[7], _ = e[8], B = e[9], C = e[10], L = e[11], P = e[12], G = e[13], v = e[14], N = e[15], R = t[0], D = t[1], O = t[2], I = t[3];
  return i[0] = R * s + D * u + O * _ + I * P, i[1] = R * l + D * m + O * B + I * G, i[2] = R * h + D * w + O * C + I * v, i[3] = R * d + D * b + O * L + I * N, R = t[4], D = t[5], O = t[6], I = t[7], i[4] = R * s + D * u + O * _ + I * P, i[5] = R * l + D * m + O * B + I * G, i[6] = R * h + D * w + O * C + I * v, i[7] = R * d + D * b + O * L + I * N, R = t[8], D = t[9], O = t[10], I = t[11], i[8] = R * s + D * u + O * _ + I * P, i[9] = R * l + D * m + O * B + I * G, i[10] = R * h + D * w + O * C + I * v, i[11] = R * d + D * b + O * L + I * N, R = t[12], D = t[13], O = t[14], I = t[15], i[12] = R * s + D * u + O * _ + I * P, i[13] = R * l + D * m + O * B + I * G, i[14] = R * h + D * w + O * C + I * v, i[15] = R * d + D * b + O * L + I * N, i;
}
function bt(i, e, t) {
  let s = e[0], l = e[1], h = e[2], d = e[3], u = s + s, m = l + l, w = h + h, b = s * u, _ = s * m, B = s * w, C = l * m, L = l * w, P = h * w, G = d * u, v = d * m, N = d * w;
  return i[0] = 1 - (C + P), i[1] = _ + N, i[2] = B - v, i[3] = 0, i[4] = _ - N, i[5] = 1 - (b + P), i[6] = L + G, i[7] = 0, i[8] = B + v, i[9] = L - G, i[10] = 1 - (b + C), i[11] = 0, i[12] = t[0], i[13] = t[1], i[14] = t[2], i[15] = 1, i;
}
function Vi(i, e) {
  return i[0] = e[12], i[1] = e[13], i[2] = e[14], i;
}
function Ui(i, e) {
  let t = e[0] + e[5] + e[10], s = 0;
  return t > 0 ? (s = Math.sqrt(t + 1) * 2, i[3] = 0.25 * s, i[0] = (e[6] - e[9]) / s, i[1] = (e[8] - e[2]) / s, i[2] = (e[1] - e[4]) / s) : e[0] > e[5] && e[0] > e[10] ? (s = Math.sqrt(1 + e[0] - e[5] - e[10]) * 2, i[3] = (e[6] - e[9]) / s, i[0] = 0.25 * s, i[1] = (e[1] + e[4]) / s, i[2] = (e[8] + e[2]) / s) : e[5] > e[10] ? (s = Math.sqrt(1 + e[5] - e[0] - e[10]) * 2, i[3] = (e[8] - e[2]) / s, i[0] = (e[1] + e[4]) / s, i[1] = 0.25 * s, i[2] = (e[6] + e[9]) / s) : (s = Math.sqrt(1 + e[10] - e[0] - e[5]) * 2, i[3] = (e[1] - e[4]) / s, i[0] = (e[8] + e[2]) / s, i[1] = (e[6] + e[9]) / s, i[2] = 0.25 * s), i;
}
function zi(i, e, t, s, l) {
  let h = 1 / Math.tan(e / 2), d;
  return i[0] = h / t, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = h, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[11] = -1, i[12] = 0, i[13] = 0, i[15] = 0, l != null && l !== 1 / 0 ? (d = 1 / (s - l), i[10] = (l + s) * d, i[14] = 2 * l * s * d) : (i[10] = -1, i[14] = -2 * s), i;
}
function Be() {
  let i = new ge(3);
  return ge != Float32Array && (i[0] = 0, i[1] = 0, i[2] = 0), i;
}
function pi(i) {
  var e = new ge(3);
  return e[0] = i[0], e[1] = i[1], e[2] = i[2], e;
}
function Br(i) {
  let e = i[0], t = i[1], s = i[2];
  return Math.sqrt(e * e + t * t + s * s);
}
function Te(i, e, t) {
  let s = new ge(3);
  return s[0] = i, s[1] = e, s[2] = t, s;
}
function mi(i, e) {
  return i[0] = e[0], i[1] = e[1], i[2] = e[2], i;
}
function ft(i, e, t) {
  return i[0] = e[0] + t[0], i[1] = e[1] + t[1], i[2] = e[2] + t[2], i;
}
function vi(i, e, t) {
  return i[0] = e[0] * t, i[1] = e[1] * t, i[2] = e[2] * t, i;
}
function ei(i, e) {
  let t = e[0], s = e[1], l = e[2], h = t * t + s * s + l * l;
  return h > 0 && (h = 1 / Math.sqrt(h), i[0] = e[0] * h, i[1] = e[1] * h, i[2] = e[2] * h), i;
}
function ai(i, e) {
  return i[0] * e[0] + i[1] * e[1] + i[2] * e[2];
}
function Qt(i, e, t) {
  let s = e[0], l = e[1], h = e[2], d = t[0], u = t[1], m = t[2];
  return i[0] = l * m - h * u, i[1] = h * d - s * m, i[2] = s * u - l * d, i;
}
function je(i, e, t) {
  let s = t[0], l = t[1], h = t[2], d = t[3], u = e[0], m = e[1], w = e[2], b = l * w - h * m, _ = h * u - s * w, B = s * m - l * u, C = l * B - h * _, L = h * b - s * B, P = s * _ - l * b, G = d * 2;
  return b *= G, _ *= G, B *= G, C *= 2, L *= 2, P *= 2, i[0] = u + b + C, i[1] = m + _ + L, i[2] = w + B + P, i;
}
function Lr(i, e) {
  let t = Te(i[0], i[1], i[2]), s = Te(e[0], e[1], e[2]);
  ei(t, t), ei(s, s);
  let l = ai(t, s);
  return l > 1 ? 0 : l < -1 ? Math.PI : Math.acos(l);
}
const Or = Br;
(function() {
  let i = Be();
  return function(e, t, s, l, h, d) {
    let u, m;
    for (t || (t = 3), s || (s = 0), l ? m = Math.min(l * t + s, e.length) : m = e.length, u = s; u < m; u += t)
      i[0] = e[u], i[1] = e[u + 1], i[2] = e[u + 2], h(i, i, d), e[u] = i[0], e[u + 1] = i[1], e[u + 2] = i[2];
    return e;
  };
})();
function Nr() {
  let i = new ge(9);
  return ge != Float32Array && (i[1] = 0, i[2] = 0, i[3] = 0, i[5] = 0, i[6] = 0, i[7] = 0), i[0] = 1, i[4] = 1, i[8] = 1, i;
}
function Gr() {
  let i = new ge(4);
  return ge != Float32Array && (i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 0), i;
}
function kr(i) {
  let e = new ge(4);
  return e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e;
}
function Vr(i, e, t, s) {
  let l = new ge(4);
  return l[0] = i, l[1] = e, l[2] = t, l[3] = s, l;
}
function Ur(i, e) {
  return i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], i;
}
function zr(i, e) {
  let t = e[0], s = e[1], l = e[2], h = e[3], d = t * t + s * s + l * l + h * h;
  return d > 0 && (d = 1 / Math.sqrt(d), i[0] = t * d, i[1] = s * d, i[2] = l * d, i[3] = h * d), i;
}
(function() {
  let i = Gr();
  return function(e, t, s, l, h, d) {
    let u, m;
    for (t || (t = 4), s || (s = 0), l ? m = Math.min(l * t + s, e.length) : m = e.length, u = s; u < m; u += t)
      i[0] = e[u], i[1] = e[u + 1], i[2] = e[u + 2], i[3] = e[u + 3], h(i, i, d), e[u] = i[0], e[u + 1] = i[1], e[u + 2] = i[2], e[u + 3] = i[3];
    return e;
  };
})();
function Fe() {
  let i = new ge(4);
  return ge != Float32Array && (i[0] = 0, i[1] = 0, i[2] = 0), i[3] = 1, i;
}
function Qr(i, e, t) {
  t = t * 0.5;
  let s = Math.sin(t);
  return i[0] = s * e[0], i[1] = s * e[1], i[2] = s * e[2], i[3] = Math.cos(t), i;
}
function wi(i, e, t) {
  let s = e[0], l = e[1], h = e[2], d = e[3], u = t[0], m = t[1], w = t[2], b = t[3];
  return i[0] = s * b + d * u + l * w - h * m, i[1] = l * b + d * m + h * u - s * w, i[2] = h * b + d * w + s * m - l * u, i[3] = d * b - s * u - l * m - h * w, i;
}
function wt(i, e, t, s) {
  let l = e[0], h = e[1], d = e[2], u = e[3], m = t[0], w = t[1], b = t[2], _ = t[3], B, C, L, P, G;
  return C = l * m + h * w + d * b + u * _, C < 0 && (C = -C, m = -m, w = -w, b = -b, _ = -_), 1 - C > Dr ? (B = Math.acos(C), L = Math.sin(B), P = Math.sin((1 - s) * B) / L, G = Math.sin(s * B) / L) : (P = 1 - s, G = s), i[0] = P * l + G * m, i[1] = P * h + G * w, i[2] = P * d + G * b, i[3] = P * u + G * _, i;
}
function yi(i, e) {
  let t = e[0], s = e[1], l = e[2], h = e[3], d = t * t + s * s + l * l + h * h, u = d ? 1 / d : 0;
  return i[0] = -t * u, i[1] = -s * u, i[2] = -l * u, i[3] = h * u, i;
}
function Xr(i, e) {
  let t = e[0] + e[4] + e[8], s;
  if (t > 0)
    s = Math.sqrt(t + 1), i[3] = 0.5 * s, s = 0.5 / s, i[0] = (e[5] - e[7]) * s, i[1] = (e[6] - e[2]) * s, i[2] = (e[1] - e[3]) * s;
  else {
    let l = 0;
    e[4] > e[0] && (l = 1), e[8] > e[l * 3 + l] && (l = 2);
    let h = (l + 1) % 3, d = (l + 2) % 3;
    s = Math.sqrt(e[l * 3 + l] - e[h * 3 + h] - e[d * 3 + d] + 1), i[l] = 0.5 * s, s = 0.5 / s, i[3] = (e[h * 3 + d] - e[d * 3 + h]) * s, i[h] = (e[h * 3 + l] + e[l * 3 + h]) * s, i[d] = (e[d * 3 + l] + e[l * 3 + d]) * s;
  }
  return i;
}
function Wr(i, e, t, s) {
  let l = 0.5 * Math.PI / 180;
  e *= l, t *= l, s *= l;
  let h = Math.sin(e), d = Math.cos(e), u = Math.sin(t), m = Math.cos(t), w = Math.sin(s), b = Math.cos(s);
  return i[0] = h * m * b - d * u * w, i[1] = d * u * b + h * m * w, i[2] = d * m * w - h * u * b, i[3] = d * m * b + h * u * w, i;
}
const bi = kr, Hr = Vr, Xt = Ur, Ct = zr;
(function() {
  let i = Be(), e = Te(1, 0, 0), t = Te(0, 1, 0);
  return function(s, l, h) {
    let d = ai(l, h);
    return d < -0.999999 ? (Qt(i, e, l), Or(i) < 1e-6 && Qt(i, t, l), ei(i, i), Qr(s, i, Math.PI), s) : d > 0.999999 ? (s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 1, s) : (Qt(i, l, h), s[0] = i[0], s[1] = i[1], s[2] = i[2], s[3] = 1 + d, Ct(s, s));
  };
})();
(function() {
  let i = Fe(), e = Fe();
  return function(t, s, l, h, d, u) {
    return wt(i, s, d, u), wt(e, l, h, u), wt(t, i, e, 2 * u * (1 - u)), t;
  };
})();
(function() {
  let i = Nr();
  return function(e, t, s, l) {
    return i[0] = s[0], i[3] = s[1], i[6] = s[2], i[1] = l[0], i[4] = l[1], i[7] = l[2], i[2] = -t[0], i[5] = -t[1], i[8] = -t[2], Ct(e, Xr(e, i));
  };
})();
const ee = Symbol("@@webxr-polyfill/XRRigidTransform");
class It {
  constructor() {
    if (this[ee] = {
      matrix: null,
      position: null,
      orientation: null,
      inverse: null
    }, arguments.length === 0)
      this[ee].matrix = Ze(new Float32Array(16));
    else if (arguments.length === 1)
      arguments[0] instanceof Float32Array ? this[ee].matrix = arguments[0] : (this[ee].position = this._getPoint(arguments[0]), this[ee].orientation = DOMPointReadOnly.fromPoint({
        x: 0,
        y: 0,
        z: 0,
        w: 1
      }));
    else if (arguments.length === 2)
      this[ee].position = this._getPoint(arguments[0]), this[ee].orientation = this._getPoint(arguments[1]);
    else
      throw new Error("Too many arguments!");
    if (this[ee].matrix) {
      let e = Be();
      Vi(e, this[ee].matrix), this[ee].position = DOMPointReadOnly.fromPoint({
        x: e[0],
        y: e[1],
        z: e[2]
      });
      let t = Fe();
      Ui(t, this[ee].matrix), this[ee].orientation = DOMPointReadOnly.fromPoint({
        x: t[0],
        y: t[1],
        z: t[2],
        w: t[3]
      });
    } else
      this[ee].matrix = Ze(new Float32Array(16)), bt(
        this[ee].matrix,
        Hr(
          this[ee].orientation.x,
          this[ee].orientation.y,
          this[ee].orientation.z,
          this[ee].orientation.w
        ),
        Te(
          this[ee].position.x,
          this[ee].position.y,
          this[ee].position.z
        )
      );
  }
  _getPoint(e) {
    return e instanceof DOMPointReadOnly ? e : DOMPointReadOnly.fromPoint(e);
  }
  get matrix() {
    return this[ee].matrix;
  }
  get position() {
    return this[ee].position;
  }
  get orientation() {
    return this[ee].orientation;
  }
  get inverse() {
    if (this[ee].inverse === null) {
      let e = Ze(new Float32Array(16));
      Pt(e, this[ee].matrix), this[ee].inverse = new It(e), this[ee].inverse[ee].inverse = this;
    }
    return this[ee].inverse;
  }
}
const ae = Symbol("@@webxr-polyfill/XRSpace");
class $e {
  constructor(e = null, t = null) {
    this[ae] = {
      specialType: e,
      inputSource: t,
      baseMatrix: null,
      inverseBaseMatrix: null,
      lastFrameId: -1
    };
  }
  get _specialType() {
    return this[ae].specialType;
  }
  get _inputSource() {
    return this[ae].inputSource;
  }
  _ensurePoseUpdated(e, t) {
    t != this[ae].lastFrameId && (this[ae].lastFrameId = t, this._onPoseUpdate(e));
  }
  _onPoseUpdate(e) {
    this[ae].specialType == "viewer" && (this._baseMatrix = e.getBasePoseMatrix());
  }
  set _baseMatrix(e) {
    this[ae].baseMatrix = e, this[ae].inverseBaseMatrix = null;
  }
  get _baseMatrix() {
    return this[ae].baseMatrix || this[ae].inverseBaseMatrix && (this[ae].baseMatrix = new Float32Array(16), Pt(this[ae].baseMatrix, this[ae].inverseBaseMatrix)), this[ae].baseMatrix;
  }
  set _inverseBaseMatrix(e) {
    this[ae].inverseBaseMatrix = e, this[ae].baseMatrix = null;
  }
  get _inverseBaseMatrix() {
    return this[ae].inverseBaseMatrix || this[ae].baseMatrix && (this[ae].inverseBaseMatrix = new Float32Array(16), Pt(this[ae].inverseBaseMatrix, this[ae].baseMatrix)), this[ae].inverseBaseMatrix;
  }
  _getSpaceRelativeTransform(e) {
    if (!this._inverseBaseMatrix || !e._baseMatrix)
      return null;
    let t = new Float32Array(16);
    return qe(t, this._inverseBaseMatrix, e._baseMatrix), new It(t);
  }
}
const Yr = 1.6, Ne = Symbol("@@webxr-polyfill/XRReferenceSpace"), Dt = [
  "viewer",
  "local",
  "local-floor",
  "bounded-floor",
  "unbounded"
];
function jr(i) {
  return i === "bounded-floor" || i === "local-floor";
}
class gt extends $e {
  constructor(e, t = null) {
    if (!Dt.includes(e))
      throw new Error(`XRReferenceSpaceType must be one of ${Dt}`);
    if (super(e), e === "bounded-floor" && !t)
      throw new Error("XRReferenceSpace cannot use 'bounded-floor' type if the platform does not provide the floor level");
    jr(e) && !t && (t = Ze(new Float32Array(16)), t[13] = Yr), this._inverseBaseMatrix = t || Ze(new Float32Array(16)), this[Ne] = {
      type: e,
      transform: t,
      originOffset: Ze(new Float32Array(16))
    };
  }
  _transformBasePoseMatrix(e, t) {
    qe(e, this._inverseBaseMatrix, t);
  }
  _originOffsetMatrix() {
    return this[Ne].originOffset;
  }
  _adjustForOriginOffset(e) {
    let t = new Float32Array(16);
    Pt(t, this[Ne].originOffset), qe(e, t, e);
  }
  _getSpaceRelativeTransform(e) {
    let t = super._getSpaceRelativeTransform(e);
    return this._adjustForOriginOffset(t.matrix), new XRRigidTransform(t.matrix);
  }
  getOffsetReferenceSpace(e) {
    let t = new gt(
      this[Ne].type,
      this[Ne].transform,
      this[Ne].bounds
    );
    return qe(t[Ne].originOffset, this[Ne].originOffset, e.matrix), t;
  }
}
const ve = Symbol("@@webxr-polyfill/XR"), Zr = ["inline", "immersive-vr", "immersive-ar"], qr = {
  inline: {
    requiredFeatures: ["viewer"],
    optionalFeatures: []
  },
  "immersive-vr": {
    requiredFeatures: ["viewer", "local"],
    optionalFeatures: []
  },
  "immersive-ar": {
    requiredFeatures: ["viewer", "local"],
    optionalFeatures: []
  }
}, $r = `Polyfill Error: Must call navigator.xr.isSessionSupported() with any XRSessionMode
or navigator.xr.requestSession('inline') prior to requesting an immersive
session. This is a limitation specific to the WebXR Polyfill and does not apply
to native implementations of the API.`;
class Qi extends si {
  constructor(e) {
    super(), this[ve] = {
      device: null,
      devicePromise: e,
      immersiveSession: null,
      inlineSessions: /* @__PURE__ */ new Set()
    }, e.then((t) => {
      this[ve].device = t;
    });
  }
  async isSessionSupported(e) {
    return this[ve].device || await this[ve].devicePromise, e != "inline" ? Promise.resolve(this[ve].device.isSessionSupported(e)) : Promise.resolve(!0);
  }
  async requestSession(e, t) {
    if (!this[ve].device) {
      if (e != "inline")
        throw new Error($r);
      await this[ve].devicePromise;
    }
    if (!Zr.includes(e))
      throw new TypeError(
        `The provided value '${e}' is not a valid enum value of type XRSessionMode`
      );
    const s = qr[e], l = s.requiredFeatures.concat(
      t && t.requiredFeatures ? t.requiredFeatures : []
    ), h = s.optionalFeatures.concat(
      t && t.optionalFeatures ? t.optionalFeatures : []
    ), d = /* @__PURE__ */ new Set();
    let u = !1;
    for (let _ of l)
      this[ve].device.isFeatureSupported(_) ? d.add(_) : (console.error(`The required feature '${_}' is not supported`), u = !0);
    if (u)
      throw new DOMException("Session does not support some required features", "NotSupportedError");
    for (let _ of h)
      this[ve].device.isFeatureSupported(_) ? d.add(_) : console.log(`The optional feature '${_}' is not supported`);
    const m = await this[ve].device.requestSession(e, d), w = new XRSession(this[ve].device, e, m);
    e == "inline" ? this[ve].inlineSessions.add(w) : this[ve].immersiveSession = w;
    const b = () => {
      e == "inline" ? this[ve].inlineSessions.delete(w) : this[ve].immersiveSession = null, w.removeEventListener("end", b);
    };
    return w.addEventListener("end", b), w;
  }
}
let ti;
if ("performance" in ki)
  ti = () => performance.now();
else {
  let i = Date.now();
  ti = () => Date.now() - i;
}
const Xi = ti, Wt = Symbol("@@webxr-polyfill/XRPose");
class Wi {
  constructor(e, t) {
    this[Wt] = {
      transform: e,
      emulatedPosition: t
    };
  }
  get transform() {
    return this[Wt].transform;
  }
  get emulatedPosition() {
    return this[Wt].emulatedPosition;
  }
}
const gi = Symbol("@@webxr-polyfill/XRViewerPose");
class Hi extends Wi {
  constructor(e, t, s = !1) {
    super(e, s), this[gi] = {
      views: t
    };
  }
  get views() {
    return this[gi].views;
  }
}
const pt = Symbol("@@webxr-polyfill/XRViewport");
class Yi {
  constructor(e) {
    this[pt] = { target: e };
  }
  get x() {
    return this[pt].target.x;
  }
  get y() {
    return this[pt].target.y;
  }
  get width() {
    return this[pt].target.width;
  }
  get height() {
    return this[pt].target.height;
  }
}
const Ei = ["left", "right", "none"], De = Symbol("@@webxr-polyfill/XRView");
class ji {
  constructor(e, t, s, l, h) {
    if (!Ei.includes(s))
      throw new Error(`XREye must be one of: ${Ei}`);
    const d = /* @__PURE__ */ Object.create(null), u = new Yi(d);
    this[De] = {
      device: e,
      eye: s,
      viewport: u,
      temp: d,
      sessionId: l,
      transform: t,
      viewIndex: h
    };
  }
  get eye() {
    return this[De].eye;
  }
  get projectionMatrix() {
    return this[De].device.getProjectionMatrix(this.eye, this[De].viewIndex);
  }
  get transform() {
    return this[De].transform;
  }
  _getViewport(e) {
    if (this[De].device.getViewport(
      this[De].sessionId,
      this.eye,
      e,
      this[De].temp,
      this[De].viewIndex
    ))
      return this[De].viewport;
  }
}
const Ae = Symbol("@@webxr-polyfill/XRFrame"), xi = "XRFrame access outside the callback that produced it is invalid.", Kr = "getViewerPose can only be called on XRFrame objects passed to XRSession.requestAnimationFrame callbacks.";
let Jr = 0;
class ii {
  constructor(e, t, s) {
    this[Ae] = {
      id: ++Jr,
      active: !1,
      animationFrame: !1,
      device: e,
      session: t,
      sessionId: s
    };
  }
  get session() {
    return this[Ae].session;
  }
  getViewerPose(e) {
    if (!this[Ae].animationFrame)
      throw new DOMException(Kr, "InvalidStateError");
    if (!this[Ae].active)
      throw new DOMException(xi, "InvalidStateError");
    const t = this[Ae].device, s = this[Ae].session;
    s[g].viewerSpace._ensurePoseUpdated(t, this[Ae].id), e._ensurePoseUpdated(t, this[Ae].id);
    let l = e._getSpaceRelativeTransform(s[g].viewerSpace);
    const h = [];
    for (const u of s[g].viewSpaces) {
      u._ensurePoseUpdated(t, this[Ae].id);
      let m = e._getSpaceRelativeTransform(u), w = new ji(t, m, u.eye, this[Ae].sessionId, u.viewIndex);
      h.push(w);
    }
    return new Hi(l, h, !1);
  }
  getPose(e, t) {
    if (!this[Ae].active)
      throw new DOMException(xi, "InvalidStateError");
    const s = this[Ae].device;
    if (e._specialType === "target-ray" || e._specialType === "grip")
      return s.getInputPose(
        e._inputSource,
        t,
        e._specialType
      );
    {
      e._ensurePoseUpdated(s, this[Ae].id), t._ensurePoseUpdated(s, this[Ae].id);
      let l = t._getSpaceRelativeTransform(e);
      return l ? new XRPose(l, !1) : null;
    }
  }
}
const mt = Symbol("@@webxr-polyfill/XRRenderState"), en = Object.freeze({
  depthNear: 0.1,
  depthFar: 1e3,
  inlineVerticalFieldOfView: null,
  baseLayer: null
});
class ri {
  constructor(e = {}) {
    const t = Object.assign({}, en, e);
    this[mt] = { config: t };
  }
  get depthNear() {
    return this[mt].config.depthNear;
  }
  get depthFar() {
    return this[mt].config.depthFar;
  }
  get inlineVerticalFieldOfView() {
    return this[mt].config.inlineVerticalFieldOfView;
  }
  get baseLayer() {
    return this[mt].config.baseLayer;
  }
}
const Ht = Symbol("@@webxr-polyfill/XRInputSourceEvent");
class Bt extends Event {
  constructor(e, t) {
    super(e, t), this[Ht] = {
      frame: t.frame,
      inputSource: t.inputSource
    }, Object.setPrototypeOf(this, Bt.prototype);
  }
  get frame() {
    return this[Ht].frame;
  }
  get inputSource() {
    return this[Ht].inputSource;
  }
}
const Si = Symbol("@@webxr-polyfill/XRSessionEvent");
class Et extends Event {
  constructor(e, t) {
    super(e, t), this[Si] = {
      session: t.session
    }, Object.setPrototypeOf(this, Et.prototype);
  }
  get session() {
    return this[Si].session;
  }
}
const Ft = Symbol("@@webxr-polyfill/XRInputSourcesChangeEvent");
class Lt extends Event {
  constructor(e, t) {
    super(e, t), this[Ft] = {
      session: t.session,
      added: t.added,
      removed: t.removed
    }, Object.setPrototypeOf(this, Lt.prototype);
  }
  get session() {
    return this[Ft].session;
  }
  get added() {
    return this[Ft].added;
  }
  get removed() {
    return this[Ft].removed;
  }
}
const g = Symbol("@@webxr-polyfill/XRSession");
class Yt extends $e {
  constructor(e) {
    super(e);
  }
  get eye() {
    return this._specialType;
  }
  _onPoseUpdate(e) {
    this._inverseBaseMatrix = e.getBaseViewMatrix(this._specialType);
  }
}
class Zi extends si {
  constructor(e, t, s) {
    super();
    let l = t != "inline", h = new ri({
      inlineVerticalFieldOfView: l ? null : Math.PI * 0.5
    });
    const d = l ? [new Yt("left"), new Yt("right")] : [new Yt("none")];
    Object.freeze(d), this[g] = {
      device: e,
      mode: t,
      immersive: l,
      ended: !1,
      suspended: !1,
      frameCallbacks: [],
      currentFrameCallbacks: null,
      frameHandle: 0,
      deviceFrameHandle: null,
      id: s,
      activeRenderState: h,
      pendingRenderState: null,
      viewerSpace: new gt("viewer"),
      get viewSpaces() {
        return e.getViewSpaces(t) || d;
      },
      currentInputSources: []
    }, this[g].onDeviceFrame = () => {
      if (this[g].ended || this[g].suspended || (this[g].deviceFrameHandle = null, this[g].startDeviceFrameLoop(), this[g].pendingRenderState !== null && (this[g].activeRenderState = new ri(this[g].pendingRenderState), this[g].pendingRenderState = null, this[g].activeRenderState.baseLayer && this[g].device.onBaseLayerSet(
        this[g].id,
        this[g].activeRenderState.baseLayer
      )), this[g].activeRenderState.baseLayer === null))
        return;
      const u = new ii(e, this, this[g].id), m = this[g].currentFrameCallbacks = this[g].frameCallbacks;
      this[g].frameCallbacks = [], u[Ae].active = !0, u[Ae].animationFrame = !0, this[g].device.onFrameStart(this[g].id, this[g].activeRenderState), this._checkInputSourcesChange();
      const w = Xi();
      for (let b = 0; b < m.length; b++)
        try {
          !m[b].cancelled && typeof m[b].callback == "function" && m[b].callback(w, u);
        } catch (_) {
          console.error(_);
        }
      this[g].currentFrameCallbacks = null, u[Ae].active = !1, this[g].device.onFrameEnd(this[g].id);
    }, this[g].startDeviceFrameLoop = () => {
      this[g].deviceFrameHandle === null && (this[g].deviceFrameHandle = this[g].device.requestAnimationFrame(
        this[g].onDeviceFrame
      ));
    }, this[g].stopDeviceFrameLoop = () => {
      const u = this[g].deviceFrameHandle;
      u !== null && (this[g].device.cancelAnimationFrame(u), this[g].deviceFrameHandle = null);
    }, this[g].onPresentationEnd = (u) => {
      if (u !== this[g].id) {
        this[g].suspended = !1, this[g].startDeviceFrameLoop(), this.dispatchEvent("focus", { session: this });
        return;
      }
      this[g].ended = !0, this[g].stopDeviceFrameLoop(), e.removeEventListener("@@webxr-polyfill/vr-present-end", this[g].onPresentationEnd), e.removeEventListener("@@webxr-polyfill/vr-present-start", this[g].onPresentationStart), e.removeEventListener("@@webxr-polyfill/input-select-start", this[g].onSelectStart), e.removeEventListener("@@webxr-polyfill/input-select-end", this[g].onSelectEnd), this.dispatchEvent("end", new Et("end", { session: this }));
    }, e.addEventListener("@@webxr-polyfill/vr-present-end", this[g].onPresentationEnd), this[g].onPresentationStart = (u) => {
      u !== this[g].id && (this[g].suspended = !0, this[g].stopDeviceFrameLoop(), this.dispatchEvent("blur", { session: this }));
    }, e.addEventListener("@@webxr-polyfill/vr-present-start", this[g].onPresentationStart), this[g].onSelectStart = (u) => {
      u.sessionId === this[g].id && this[g].dispatchInputSourceEvent("selectstart", u.inputSource);
    }, e.addEventListener("@@webxr-polyfill/input-select-start", this[g].onSelectStart), this[g].onSelectEnd = (u) => {
      u.sessionId === this[g].id && (this[g].dispatchInputSourceEvent("selectend", u.inputSource), this[g].dispatchInputSourceEvent("select", u.inputSource));
    }, e.addEventListener("@@webxr-polyfill/input-select-end", this[g].onSelectEnd), this[g].onSqueezeStart = (u) => {
      u.sessionId === this[g].id && this[g].dispatchInputSourceEvent("squeezestart", u.inputSource);
    }, e.addEventListener("@@webxr-polyfill/input-squeeze-start", this[g].onSqueezeStart), this[g].onSqueezeEnd = (u) => {
      u.sessionId === this[g].id && (this[g].dispatchInputSourceEvent("squeezeend", u.inputSource), this[g].dispatchInputSourceEvent("squeeze", u.inputSource));
    }, e.addEventListener("@@webxr-polyfill/input-squeeze-end", this[g].onSqueezeEnd), this[g].dispatchInputSourceEvent = (u, m) => {
      const w = new ii(e, this, this[g].id), b = new Bt(u, { frame: w, inputSource: m });
      w[Ae].active = !0, this.dispatchEvent(u, b), w[Ae].active = !1;
    }, this[g].startDeviceFrameLoop(), this.onblur = void 0, this.onfocus = void 0, this.onresetpose = void 0, this.onend = void 0, this.onselect = void 0, this.onselectstart = void 0, this.onselectend = void 0;
  }
  get renderState() {
    return this[g].activeRenderState;
  }
  get environmentBlendMode() {
    return this[g].device.environmentBlendMode || "opaque";
  }
  async requestReferenceSpace(e) {
    if (this[g].ended)
      return;
    if (!Dt.includes(e))
      throw new TypeError(`XRReferenceSpaceType must be one of ${Dt}`);
    if (!this[g].device.doesSessionSupportReferenceSpace(this[g].id, e))
      throw new DOMException(`The ${e} reference space is not supported by this session.`, "NotSupportedError");
    if (e === "viewer")
      return this[g].viewerSpace;
    let t = await this[g].device.requestFrameOfReferenceTransform(e);
    if (e === "bounded-floor")
      throw t ? this[g].device.requestStageBounds() ? new DOMException(`The WebXR polyfill does not support the ${e} reference space yet.`, "NotSupportedError") : new DOMException(`${e} XRReferenceSpace not supported by this device.`, "NotSupportedError") : new DOMException(`${e} XRReferenceSpace not supported by this device.`, "NotSupportedError");
    return new gt(e, t);
  }
  requestAnimationFrame(e) {
    if (this[g].ended)
      return;
    const t = ++this[g].frameHandle;
    return this[g].frameCallbacks.push({
      handle: t,
      callback: e,
      cancelled: !1
    }), t;
  }
  cancelAnimationFrame(e) {
    let t = this[g].frameCallbacks, s = t.findIndex((l) => l && l.handle === e);
    s > -1 && (t[s].cancelled = !0, t.splice(s, 1)), t = this[g].currentFrameCallbacks, t && (s = t.findIndex((l) => l && l.handle === e), s > -1 && (t[s].cancelled = !0));
  }
  get inputSources() {
    return this[g].device.getInputSources();
  }
  async end() {
    if (!this[g].ended)
      return this[g].immersive && (this[g].ended = !0, this[g].device.removeEventListener(
        "@@webxr-polyfill/vr-present-start",
        this[g].onPresentationStart
      ), this[g].device.removeEventListener(
        "@@webxr-polyfill/vr-present-end",
        this[g].onPresentationEnd
      ), this[g].device.removeEventListener(
        "@@webxr-polyfill/input-select-start",
        this[g].onSelectStart
      ), this[g].device.removeEventListener(
        "@@webxr-polyfill/input-select-end",
        this[g].onSelectEnd
      ), this.dispatchEvent("end", new Et("end", { session: this }))), this[g].stopDeviceFrameLoop(), this[g].device.endSession(this[g].id);
  }
  updateRenderState(e) {
    if (this[g].ended) {
      const s = "Can't call updateRenderState on an XRSession that has already ended.";
      throw new Error(s);
    }
    if (e.baseLayer && e.baseLayer._session !== this) {
      const s = "Called updateRenderState with a base layer that was created by a different session.";
      throw new Error(s);
    }
    if (e.inlineVerticalFieldOfView !== null && e.inlineVerticalFieldOfView !== void 0)
      if (this[g].immersive) {
        const s = "inlineVerticalFieldOfView must not be set for an XRRenderState passed to updateRenderState for an immersive session.";
        throw new Error(s);
      } else
        e.inlineVerticalFieldOfView = Math.min(
          3.13,
          Math.max(0.01, e.inlineVerticalFieldOfView)
        );
    if (this[g].pendingRenderState === null) {
      const s = this[g].activeRenderState;
      this[g].pendingRenderState = {
        depthNear: s.depthNear,
        depthFar: s.depthFar,
        inlineVerticalFieldOfView: s.inlineVerticalFieldOfView,
        baseLayer: s.baseLayer
      };
    }
    Object.assign(this[g].pendingRenderState, e);
  }
  _checkInputSourcesChange() {
    const e = [], t = [], s = this.inputSources, l = this[g].currentInputSources;
    for (const h of s)
      l.includes(h) || e.push(h);
    for (const h of l)
      s.includes(h) || t.push(h);
    (e.length > 0 || t.length > 0) && this.dispatchEvent("inputsourceschange", new Lt("inputsourceschange", {
      session: this,
      added: e,
      removed: t
    })), this[g].currentInputSources.length = 0;
    for (const h of s)
      this[g].currentInputSources.push(h);
  }
}
const Ge = Symbol("@@webxr-polyfill/XRInputSource");
class qi {
  constructor(e) {
    this[Ge] = {
      impl: e,
      gripSpace: new $e("grip", this),
      targetRaySpace: new $e("target-ray", this)
    };
  }
  get handedness() {
    return this[Ge].impl.handedness;
  }
  get targetRayMode() {
    return this[Ge].impl.targetRayMode;
  }
  get gripSpace() {
    let e = this[Ge].impl.targetRayMode;
    return e === "gaze" || e === "screen" ? null : this[Ge].gripSpace;
  }
  get targetRaySpace() {
    return this[Ge].targetRaySpace;
  }
  get profiles() {
    return this[Ge].impl.profiles;
  }
  get gamepad() {
    return this[Ge].impl.gamepad;
  }
}
const $i = Symbol("@@webxr-polyfill/polyfilled-xr-compatible"), oi = Symbol("@@webxr-polyfill/xr-compatible"), He = Symbol("@@webxr-polyfill/XRWebGLLayer"), tn = Object.freeze({
  antialias: !0,
  depth: !0,
  stencil: !1,
  alpha: !0,
  multiview: !1,
  ignoreDepthValues: !1,
  framebufferScaleFactor: 1
});
class Ki {
  constructor(e, t, s = {}) {
    const l = Object.assign({}, tn, s);
    if (!(e instanceof Zi))
      throw new Error("session must be a XRSession");
    if (e.ended)
      throw new Error("InvalidStateError");
    if (t[$i] && t[oi] !== !0)
      throw new Error("InvalidStateError");
    this[He] = {
      context: t,
      config: l,
      session: e
    };
  }
  get context() {
    return this[He].context;
  }
  get antialias() {
    return this[He].config.antialias;
  }
  get ignoreDepthValues() {
    return !0;
  }
  get framebuffer() {
    return null;
  }
  get framebufferWidth() {
    return this[He].context.drawingBufferWidth;
  }
  get framebufferHeight() {
    return this[He].context.drawingBufferHeight;
  }
  get _session() {
    return this[He].session;
  }
  getViewport(e) {
    return e._getViewport(this);
  }
  static getNativeFramebufferScaleFactor(e) {
    if (!e)
      throw new TypeError("getNativeFramebufferScaleFactor must be passed a session.");
    return e[g].ended ? 0 : 1;
  }
}
const jt = Symbol("@@webxr-polyfill/XRReferenceSpaceEvent");
class li extends Event {
  constructor(e, t) {
    super(e, t), this[jt] = {
      referenceSpace: t.referenceSpace,
      transform: t.transform || null
    }, Object.setPrototypeOf(this, li.prototype);
  }
  get referenceSpace() {
    return this[jt].referenceSpace;
  }
  get transform() {
    return this[jt].transform;
  }
}
const yt = {
  XRSystem: Qi,
  XRSession: Zi,
  XRSessionEvent: Et,
  XRFrame: ii,
  XRView: ji,
  XRViewport: Yi,
  XRViewerPose: Hi,
  XRWebGLLayer: Ki,
  XRSpace: $e,
  XRReferenceSpace: gt,
  XRReferenceSpaceEvent: li,
  XRInputSource: qi,
  XRInputSourceEvent: Bt,
  XRInputSourcesChangeEvent: Lt,
  XRRenderState: ri,
  XRRigidTransform: It,
  XRPose: Wi
}, Mi = (i) => (i.prototype.makeXRCompatible, i.prototype.makeXRCompatible = function() {
  return this[oi] = !0, Promise.resolve();
}, !0), _i = (i) => {
  const e = i.prototype.getContext;
  i.prototype.getContext = function(t, s) {
    const l = e.call(this, t, s);
    return l && (l[$i] = !0, s && "xrCompatible" in s && (l[oi] = s.xrCompatible)), l;
  };
}, rn = (i) => !!(i.ImageBitmapRenderingContext && i.createImageBitmap), nn = (i) => {
  var e = !1;
  return function(t) {
    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0);
  }(i.navigator.userAgent || i.navigator.vendor || i.opera), e;
}, sn = (i) => {
  i.style.display = "block", i.style.position = "absolute", i.style.width = i.style.height = "1px", i.style.top = i.style.left = "0px";
};
var Zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function an(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Ji = { exports: {} };
/**
 * @license
 * cardboard-vr-display
 * Copyright (c) 2015-2017 Google
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(i, e) {
  /**
   * @license
   * gl-preserve-state
   * Copyright (c) 2016, Brandon Jones.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  /**
   * @license
   * webvr-polyfill-dpdb
   * Copyright (c) 2015-2017 Google
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  /**
   * @license
   * nosleep.js
   * Copyright (c) 2017, Rich Tibbett
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  (function(t, s) {
    i.exports = s();
  })(Zt, function() {
    var t = function(r, n) {
      if (!(r instanceof n))
        throw new TypeError("Cannot call a class as a function");
    }, s = function() {
      function r(n, a) {
        for (var o = 0; o < a.length; o++) {
          var c = a[o];
          c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(n, c.key, c);
        }
      }
      return function(n, a, o) {
        return a && r(n.prototype, a), o && r(n, o), n;
      };
    }(), l = function() {
      function r(n, a) {
        var o = [], c = !0, A = !1, f = void 0;
        try {
          for (var S = n[Symbol.iterator](), E; !(c = (E = S.next()).done) && (o.push(E.value), !(a && o.length === a)); c = !0)
            ;
        } catch (p) {
          A = !0, f = p;
        } finally {
          try {
            !c && S.return && S.return();
          } finally {
            if (A)
              throw f;
          }
        }
        return o;
      }
      return function(n, a) {
        if (Array.isArray(n))
          return n;
        if (Symbol.iterator in Object(n))
          return r(n, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(), h = 1e-3, d = 1, u = function(n, a) {
      return "data:" + n + "," + encodeURIComponent(a);
    }, m = function(n, a, o) {
      return n + (a - n) * o;
    }, w = function() {
      var r = /iPad|iPhone|iPod/.test(navigator.platform);
      return function() {
        return r;
      };
    }(), b = function() {
      var r = navigator.userAgent.indexOf("Version") !== -1 && navigator.userAgent.indexOf("Android") !== -1 && navigator.userAgent.indexOf("Chrome") !== -1;
      return function() {
        return r;
      };
    }(), _ = function() {
      var r = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      return function() {
        return r;
      };
    }(), B = function() {
      var r = navigator.userAgent.indexOf("Firefox") !== -1 && navigator.userAgent.indexOf("Android") !== -1;
      return function() {
        return r;
      };
    }(), C = function() {
      var r = navigator.userAgent.match(/.*Chrome\/([0-9]+)/), n = r ? parseInt(r[1], 10) : null;
      return function() {
        return n;
      };
    }(), L = function() {
      var r = !1;
      return r = w() && _() && navigator.userAgent.indexOf("13_4") !== -1, function() {
        return r;
      };
    }(), P = function() {
      var r = !1;
      if (C() === 65) {
        var n = navigator.userAgent.match(/.*Chrome\/([0-9\.]*)/);
        if (n) {
          var a = n[1].split("."), o = l(a, 4);
          o[0], o[1];
          var c = o[2], A = o[3];
          r = parseInt(c, 10) === 3325 && parseInt(A, 10) < 148;
        }
      }
      return function() {
        return r;
      };
    }(), G = function() {
      var r = navigator.userAgent.indexOf("R7 Build") !== -1;
      return function() {
        return r;
      };
    }(), v = function() {
      var n = window.orientation == 90 || window.orientation == -90;
      return G() ? !n : n;
    }, N = function(n) {
      return !(isNaN(n) || n <= h || n > d);
    }, R = function() {
      return Math.max(window.screen.width, window.screen.height) * window.devicePixelRatio;
    }, D = function() {
      return Math.min(window.screen.width, window.screen.height) * window.devicePixelRatio;
    }, O = function(n) {
      if (b())
        return !1;
      if (n.requestFullscreen)
        n.requestFullscreen();
      else if (n.webkitRequestFullscreen)
        n.webkitRequestFullscreen();
      else if (n.mozRequestFullScreen)
        n.mozRequestFullScreen();
      else if (n.msRequestFullscreen)
        n.msRequestFullscreen();
      else
        return !1;
      return !0;
    }, I = function() {
      if (document.exitFullscreen)
        document.exitFullscreen();
      else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
      else if (document.msExitFullscreen)
        document.msExitFullscreen();
      else
        return !1;
      return !0;
    }, W = function() {
      return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    }, Q = function(n, a, o, c) {
      var A = n.createShader(n.VERTEX_SHADER);
      n.shaderSource(A, a), n.compileShader(A);
      var f = n.createShader(n.FRAGMENT_SHADER);
      n.shaderSource(f, o), n.compileShader(f);
      var S = n.createProgram();
      n.attachShader(S, A), n.attachShader(S, f);
      for (var E in c)
        n.bindAttribLocation(S, c[E], E);
      return n.linkProgram(S), n.deleteShader(A), n.deleteShader(f), S;
    }, U = function(n, a) {
      for (var o = {}, c = n.getProgramParameter(a, n.ACTIVE_UNIFORMS), A = "", f = 0; f < c; f++) {
        var S = n.getActiveUniform(a, f);
        A = S.name.replace("[0]", ""), o[A] = n.getUniformLocation(a, A);
      }
      return o;
    }, $ = function(n, a, o, c, A, f, S) {
      var E = 1 / (a - o), p = 1 / (c - A), y = 1 / (f - S);
      return n[0] = -2 * E, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * p, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 2 * y, n[11] = 0, n[12] = (a + o) * E, n[13] = (A + c) * p, n[14] = (S + f) * y, n[15] = 1, n;
    }, T = function() {
      var n = !1;
      return function(a) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) && (n = !0);
      }(navigator.userAgent || navigator.vendor || window.opera), n;
    }, k = function(n, a) {
      for (var o in a)
        a.hasOwnProperty(o) && (n[o] = a[o]);
      return n;
    }, M = function(n) {
      if (w()) {
        var a = n.style.width, o = n.style.height;
        n.style.width = parseInt(a) + 1 + "px", n.style.height = parseInt(o) + "px", setTimeout(function() {
          n.style.width = a, n.style.height = o;
        }, 100);
      }
      window.canvas = n;
    }, x = function() {
      var r = Math.PI / 180, n = Math.PI * 0.25;
      function a(p, y, F, V) {
        var z = Math.tan(y ? y.upDegrees * r : n), X = Math.tan(y ? y.downDegrees * r : n), q = Math.tan(y ? y.leftDegrees * r : n), Z = Math.tan(y ? y.rightDegrees * r : n), j = 2 / (q + Z), ie = 2 / (z + X);
        return p[0] = j, p[1] = 0, p[2] = 0, p[3] = 0, p[4] = 0, p[5] = ie, p[6] = 0, p[7] = 0, p[8] = -((q - Z) * j * 0.5), p[9] = (z - X) * ie * 0.5, p[10] = V / (F - V), p[11] = -1, p[12] = 0, p[13] = 0, p[14] = V * F / (F - V), p[15] = 0, p;
      }
      function o(p, y, F) {
        var V = y[0], z = y[1], X = y[2], q = y[3], Z = V + V, j = z + z, ie = X + X, oe = V * Z, de = V * j, se = V * ie, fe = z * j, Ee = z * ie, xe = X * ie, Se = q * Z, Me = q * j, Oe = q * ie;
        return p[0] = 1 - (fe + xe), p[1] = de + Oe, p[2] = se - Me, p[3] = 0, p[4] = de - Oe, p[5] = 1 - (oe + xe), p[6] = Ee + Se, p[7] = 0, p[8] = se + Me, p[9] = Ee - Se, p[10] = 1 - (oe + fe), p[11] = 0, p[12] = F[0], p[13] = F[1], p[14] = F[2], p[15] = 1, p;
      }
      function c(p, y, F) {
        var V = F[0], z = F[1], X = F[2], q, Z, j, ie, oe, de, se, fe, Ee, xe, Se, Me;
        return y === p ? (p[12] = y[0] * V + y[4] * z + y[8] * X + y[12], p[13] = y[1] * V + y[5] * z + y[9] * X + y[13], p[14] = y[2] * V + y[6] * z + y[10] * X + y[14], p[15] = y[3] * V + y[7] * z + y[11] * X + y[15]) : (q = y[0], Z = y[1], j = y[2], ie = y[3], oe = y[4], de = y[5], se = y[6], fe = y[7], Ee = y[8], xe = y[9], Se = y[10], Me = y[11], p[0] = q, p[1] = Z, p[2] = j, p[3] = ie, p[4] = oe, p[5] = de, p[6] = se, p[7] = fe, p[8] = Ee, p[9] = xe, p[10] = Se, p[11] = Me, p[12] = q * V + oe * z + Ee * X + y[12], p[13] = Z * V + de * z + xe * X + y[13], p[14] = j * V + se * z + Se * X + y[14], p[15] = ie * V + fe * z + Me * X + y[15]), p;
      }
      function A(p, y) {
        var F = y[0], V = y[1], z = y[2], X = y[3], q = y[4], Z = y[5], j = y[6], ie = y[7], oe = y[8], de = y[9], se = y[10], fe = y[11], Ee = y[12], xe = y[13], Se = y[14], Me = y[15], Oe = F * Z - V * q, it = F * j - z * q, rt = F * ie - X * q, nt = V * j - z * Z, st = V * ie - X * Z, at = z * ie - X * j, ot = oe * xe - de * Ee, lt = oe * Se - se * Ee, ct = oe * Me - fe * Ee, ht = de * Se - se * xe, At = de * Me - fe * xe, dt = se * Me - fe * Se, he = Oe * dt - it * At + rt * ht + nt * ct - st * lt + at * ot;
        return he ? (he = 1 / he, p[0] = (Z * dt - j * At + ie * ht) * he, p[1] = (z * At - V * dt - X * ht) * he, p[2] = (xe * at - Se * st + Me * nt) * he, p[3] = (se * st - de * at - fe * nt) * he, p[4] = (j * ct - q * dt - ie * lt) * he, p[5] = (F * dt - z * ct + X * lt) * he, p[6] = (Se * rt - Ee * at - Me * it) * he, p[7] = (oe * at - se * rt + fe * it) * he, p[8] = (q * At - Z * ct + ie * ot) * he, p[9] = (V * ct - F * At - X * ot) * he, p[10] = (Ee * st - xe * rt + Me * Oe) * he, p[11] = (de * rt - oe * st - fe * Oe) * he, p[12] = (Z * lt - q * ht - j * ot) * he, p[13] = (F * ht - V * lt + z * ot) * he, p[14] = (xe * it - Ee * nt - Se * Oe) * he, p[15] = (oe * nt - de * it + se * Oe) * he, p) : null;
      }
      var f = new Float32Array([0, 0, 0, 1]), S = new Float32Array([0, 0, 0]);
      function E(p, y, F, V, z, X) {
        a(p, V || null, X.depthNear, X.depthFar);
        var q = F.orientation || f, Z = F.position || S;
        o(y, q, Z), z && c(y, y, z), A(y, y);
      }
      return function(p, y, F) {
        return !p || !y ? !1 : (p.pose = y, p.timestamp = y.timestamp, E(p.leftProjectionMatrix, p.leftViewMatrix, y, F._getFieldOfView("left"), F._getEyeOffset("left"), F), E(p.rightProjectionMatrix, p.rightViewMatrix, y, F._getFieldOfView("right"), F._getEyeOffset("right"), F), !0);
      };
    }(), K = function() {
      var n = window.self !== window.top, a = Y(document.referrer), o = Y(window.location.href);
      return n && a !== o;
    }, Y = function(n) {
      var a, o = n.indexOf("://");
      o !== -1 ? a = o + 3 : a = 0;
      var c = n.indexOf("/", a);
      return c === -1 && (c = n.length), n.substring(0, c);
    }, H = function(n) {
      if (n.w > 1)
        return console.warn("getQuaternionAngle: w > 1"), 0;
      var a = 2 * Math.acos(n.w);
      return a;
    }, we = function() {
      var r = {};
      return function(n, a) {
        r[n] === void 0 && (console.warn("webvr-polyfill: " + a), r[n] = !0);
      };
    }(), te = function(n, a) {
      var o = a ? "Please use " + a + " instead." : "";
      we(n, n + " has been deprecated. This may not work on native WebVR displays. " + o);
    };
    function me(r, n, a) {
      if (!n) {
        a(r);
        return;
      }
      for (var o = [], c = null, A = 0; A < n.length; ++A) {
        var f = n[A];
        switch (f) {
          case r.TEXTURE_BINDING_2D:
          case r.TEXTURE_BINDING_CUBE_MAP:
            var S = n[++A];
            if (S < r.TEXTURE0 || S > r.TEXTURE31) {
              console.error("TEXTURE_BINDING_2D or TEXTURE_BINDING_CUBE_MAP must be followed by a valid texture unit"), o.push(null, null);
              break;
            }
            c || (c = r.getParameter(r.ACTIVE_TEXTURE)), r.activeTexture(S), o.push(r.getParameter(f), null);
            break;
          case r.ACTIVE_TEXTURE:
            c = r.getParameter(r.ACTIVE_TEXTURE), o.push(null);
            break;
          default:
            o.push(r.getParameter(f));
            break;
        }
      }
      a(r);
      for (var A = 0; A < n.length; ++A) {
        var f = n[A], E = o[A];
        switch (f) {
          case r.ACTIVE_TEXTURE:
            break;
          case r.ARRAY_BUFFER_BINDING:
            r.bindBuffer(r.ARRAY_BUFFER, E);
            break;
          case r.COLOR_CLEAR_VALUE:
            r.clearColor(E[0], E[1], E[2], E[3]);
            break;
          case r.COLOR_WRITEMASK:
            r.colorMask(E[0], E[1], E[2], E[3]);
            break;
          case r.CURRENT_PROGRAM:
            r.useProgram(E);
            break;
          case r.ELEMENT_ARRAY_BUFFER_BINDING:
            r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, E);
            break;
          case r.FRAMEBUFFER_BINDING:
            r.bindFramebuffer(r.FRAMEBUFFER, E);
            break;
          case r.RENDERBUFFER_BINDING:
            r.bindRenderbuffer(r.RENDERBUFFER, E);
            break;
          case r.TEXTURE_BINDING_2D:
            var S = n[++A];
            if (S < r.TEXTURE0 || S > r.TEXTURE31)
              break;
            r.activeTexture(S), r.bindTexture(r.TEXTURE_2D, E);
            break;
          case r.TEXTURE_BINDING_CUBE_MAP:
            var S = n[++A];
            if (S < r.TEXTURE0 || S > r.TEXTURE31)
              break;
            r.activeTexture(S), r.bindTexture(r.TEXTURE_CUBE_MAP, E);
            break;
          case r.VIEWPORT:
            r.viewport(E[0], E[1], E[2], E[3]);
            break;
          case r.BLEND:
          case r.CULL_FACE:
          case r.DEPTH_TEST:
          case r.SCISSOR_TEST:
          case r.STENCIL_TEST:
            E ? r.enable(f) : r.disable(f);
            break;
          default:
            console.log("No GL restore behavior for 0x" + f.toString(16));
            break;
        }
        c && r.activeTexture(c);
      }
    }
    var ye = me, Ue = ["attribute vec2 position;", "attribute vec3 texCoord;", "varying vec2 vTexCoord;", "uniform vec4 viewportOffsetScale[2];", "void main() {", "  vec4 viewport = viewportOffsetScale[int(texCoord.z)];", "  vTexCoord = (texCoord.xy * viewport.zw) + viewport.xy;", "  gl_Position = vec4( position, 1.0, 1.0 );", "}"].join(`
`), Ie = ["precision mediump float;", "uniform sampler2D diffuse;", "varying vec2 vTexCoord;", "void main() {", "  gl_FragColor = texture2D(diffuse, vTexCoord);", "}"].join(`
`);
    function ue(r, n, a, o) {
      this.gl = r, this.cardboardUI = n, this.bufferScale = a, this.dirtySubmitFrameBindings = o, this.ctxAttribs = r.getContextAttributes(), this.instanceExt = r.getExtension("ANGLE_instanced_arrays"), this.meshWidth = 20, this.meshHeight = 20, this.bufferWidth = r.drawingBufferWidth, this.bufferHeight = r.drawingBufferHeight, this.realBindFramebuffer = r.bindFramebuffer, this.realEnable = r.enable, this.realDisable = r.disable, this.realColorMask = r.colorMask, this.realClearColor = r.clearColor, this.realViewport = r.viewport, w() || (this.realCanvasWidth = Object.getOwnPropertyDescriptor(r.canvas.__proto__, "width"), this.realCanvasHeight = Object.getOwnPropertyDescriptor(r.canvas.__proto__, "height")), this.isPatched = !1, this.lastBoundFramebuffer = null, this.cullFace = !1, this.depthTest = !1, this.blend = !1, this.scissorTest = !1, this.stencilTest = !1, this.viewport = [0, 0, 0, 0], this.colorMask = [!0, !0, !0, !0], this.clearColor = [0, 0, 0, 0], this.attribs = {
        position: 0,
        texCoord: 1
      }, this.program = Q(r, Ue, Ie, this.attribs), this.uniforms = U(r, this.program), this.viewportOffsetScale = new Float32Array(8), this.setTextureBounds(), this.vertexBuffer = r.createBuffer(), this.indexBuffer = r.createBuffer(), this.indexCount = 0, this.renderTarget = r.createTexture(), this.framebuffer = r.createFramebuffer(), this.depthStencilBuffer = null, this.depthBuffer = null, this.stencilBuffer = null, this.ctxAttribs.depth && this.ctxAttribs.stencil ? this.depthStencilBuffer = r.createRenderbuffer() : this.ctxAttribs.depth ? this.depthBuffer = r.createRenderbuffer() : this.ctxAttribs.stencil && (this.stencilBuffer = r.createRenderbuffer()), this.patch(), this.onResize();
    }
    ue.prototype.destroy = function() {
      var r = this.gl;
      this.unpatch(), r.deleteProgram(this.program), r.deleteBuffer(this.vertexBuffer), r.deleteBuffer(this.indexBuffer), r.deleteTexture(this.renderTarget), r.deleteFramebuffer(this.framebuffer), this.depthStencilBuffer && r.deleteRenderbuffer(this.depthStencilBuffer), this.depthBuffer && r.deleteRenderbuffer(this.depthBuffer), this.stencilBuffer && r.deleteRenderbuffer(this.stencilBuffer), this.cardboardUI && this.cardboardUI.destroy();
    }, ue.prototype.onResize = function() {
      var r = this.gl, n = this, a = [r.RENDERBUFFER_BINDING, r.TEXTURE_BINDING_2D, r.TEXTURE0];
      ye(r, a, function(o) {
        n.realBindFramebuffer.call(o, o.FRAMEBUFFER, null), n.scissorTest && n.realDisable.call(o, o.SCISSOR_TEST), n.realColorMask.call(o, !0, !0, !0, !0), n.realViewport.call(o, 0, 0, o.drawingBufferWidth, o.drawingBufferHeight), n.realClearColor.call(o, 0, 0, 0, 1), o.clear(o.COLOR_BUFFER_BIT), n.realBindFramebuffer.call(o, o.FRAMEBUFFER, n.framebuffer), o.bindTexture(o.TEXTURE_2D, n.renderTarget), o.texImage2D(o.TEXTURE_2D, 0, n.ctxAttribs.alpha ? o.RGBA : o.RGB, n.bufferWidth, n.bufferHeight, 0, n.ctxAttribs.alpha ? o.RGBA : o.RGB, o.UNSIGNED_BYTE, null), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MAG_FILTER, o.LINEAR), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE), o.framebufferTexture2D(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, n.renderTarget, 0), n.ctxAttribs.depth && n.ctxAttribs.stencil ? (o.bindRenderbuffer(o.RENDERBUFFER, n.depthStencilBuffer), o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_STENCIL, n.bufferWidth, n.bufferHeight), o.framebufferRenderbuffer(o.FRAMEBUFFER, o.DEPTH_STENCIL_ATTACHMENT, o.RENDERBUFFER, n.depthStencilBuffer)) : n.ctxAttribs.depth ? (o.bindRenderbuffer(o.RENDERBUFFER, n.depthBuffer), o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_COMPONENT16, n.bufferWidth, n.bufferHeight), o.framebufferRenderbuffer(o.FRAMEBUFFER, o.DEPTH_ATTACHMENT, o.RENDERBUFFER, n.depthBuffer)) : n.ctxAttribs.stencil && (o.bindRenderbuffer(o.RENDERBUFFER, n.stencilBuffer), o.renderbufferStorage(o.RENDERBUFFER, o.STENCIL_INDEX8, n.bufferWidth, n.bufferHeight), o.framebufferRenderbuffer(o.FRAMEBUFFER, o.STENCIL_ATTACHMENT, o.RENDERBUFFER, n.stencilBuffer)), !o.checkFramebufferStatus(o.FRAMEBUFFER) === o.FRAMEBUFFER_COMPLETE && console.error("Framebuffer incomplete!"), n.realBindFramebuffer.call(o, o.FRAMEBUFFER, n.lastBoundFramebuffer), n.scissorTest && n.realEnable.call(o, o.SCISSOR_TEST), n.realColorMask.apply(o, n.colorMask), n.realViewport.apply(o, n.viewport), n.realClearColor.apply(o, n.clearColor);
      }), this.cardboardUI && this.cardboardUI.onResize();
    }, ue.prototype.patch = function() {
      if (!this.isPatched) {
        var r = this, n = this.gl.canvas, a = this.gl;
        w() || (n.width = R() * this.bufferScale, n.height = D() * this.bufferScale, Object.defineProperty(n, "width", {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return r.bufferWidth;
          },
          set: function(c) {
            r.bufferWidth = c, r.realCanvasWidth.set.call(n, c), r.onResize();
          }
        }), Object.defineProperty(n, "height", {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return r.bufferHeight;
          },
          set: function(c) {
            r.bufferHeight = c, r.realCanvasHeight.set.call(n, c), r.onResize();
          }
        })), this.lastBoundFramebuffer = a.getParameter(a.FRAMEBUFFER_BINDING), this.lastBoundFramebuffer == null && (this.lastBoundFramebuffer = this.framebuffer, this.gl.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer)), this.gl.bindFramebuffer = function(o, c) {
          r.lastBoundFramebuffer = c || r.framebuffer, r.realBindFramebuffer.call(a, o, r.lastBoundFramebuffer);
        }, this.cullFace = a.getParameter(a.CULL_FACE), this.depthTest = a.getParameter(a.DEPTH_TEST), this.blend = a.getParameter(a.BLEND), this.scissorTest = a.getParameter(a.SCISSOR_TEST), this.stencilTest = a.getParameter(a.STENCIL_TEST), a.enable = function(o) {
          switch (o) {
            case a.CULL_FACE:
              r.cullFace = !0;
              break;
            case a.DEPTH_TEST:
              r.depthTest = !0;
              break;
            case a.BLEND:
              r.blend = !0;
              break;
            case a.SCISSOR_TEST:
              r.scissorTest = !0;
              break;
            case a.STENCIL_TEST:
              r.stencilTest = !0;
              break;
          }
          r.realEnable.call(a, o);
        }, a.disable = function(o) {
          switch (o) {
            case a.CULL_FACE:
              r.cullFace = !1;
              break;
            case a.DEPTH_TEST:
              r.depthTest = !1;
              break;
            case a.BLEND:
              r.blend = !1;
              break;
            case a.SCISSOR_TEST:
              r.scissorTest = !1;
              break;
            case a.STENCIL_TEST:
              r.stencilTest = !1;
              break;
          }
          r.realDisable.call(a, o);
        }, this.colorMask = a.getParameter(a.COLOR_WRITEMASK), a.colorMask = function(o, c, A, f) {
          r.colorMask[0] = o, r.colorMask[1] = c, r.colorMask[2] = A, r.colorMask[3] = f, r.realColorMask.call(a, o, c, A, f);
        }, this.clearColor = a.getParameter(a.COLOR_CLEAR_VALUE), a.clearColor = function(o, c, A, f) {
          r.clearColor[0] = o, r.clearColor[1] = c, r.clearColor[2] = A, r.clearColor[3] = f, r.realClearColor.call(a, o, c, A, f);
        }, this.viewport = a.getParameter(a.VIEWPORT), a.viewport = function(o, c, A, f) {
          r.viewport[0] = o, r.viewport[1] = c, r.viewport[2] = A, r.viewport[3] = f, r.realViewport.call(a, o, c, A, f);
        }, this.isPatched = !0, M(n);
      }
    }, ue.prototype.unpatch = function() {
      if (!!this.isPatched) {
        var r = this.gl, n = this.gl.canvas;
        w() || (Object.defineProperty(n, "width", this.realCanvasWidth), Object.defineProperty(n, "height", this.realCanvasHeight)), n.width = this.bufferWidth, n.height = this.bufferHeight, r.bindFramebuffer = this.realBindFramebuffer, r.enable = this.realEnable, r.disable = this.realDisable, r.colorMask = this.realColorMask, r.clearColor = this.realClearColor, r.viewport = this.realViewport, this.lastBoundFramebuffer == this.framebuffer && r.bindFramebuffer(r.FRAMEBUFFER, null), this.isPatched = !1, setTimeout(function() {
          M(n);
        }, 1);
      }
    }, ue.prototype.setTextureBounds = function(r, n) {
      r || (r = [0, 0, 0.5, 1]), n || (n = [0.5, 0, 0.5, 1]), this.viewportOffsetScale[0] = r[0], this.viewportOffsetScale[1] = r[1], this.viewportOffsetScale[2] = r[2], this.viewportOffsetScale[3] = r[3], this.viewportOffsetScale[4] = n[0], this.viewportOffsetScale[5] = n[1], this.viewportOffsetScale[6] = n[2], this.viewportOffsetScale[7] = n[3];
    }, ue.prototype.submitFrame = function() {
      var r = this.gl, n = this, a = [];
      if (this.dirtySubmitFrameBindings || a.push(r.CURRENT_PROGRAM, r.ARRAY_BUFFER_BINDING, r.ELEMENT_ARRAY_BUFFER_BINDING, r.TEXTURE_BINDING_2D, r.TEXTURE0), ye(r, a, function(c) {
        n.realBindFramebuffer.call(c, c.FRAMEBUFFER, null);
        var A = 0, f = 0;
        n.instanceExt && (A = c.getVertexAttrib(n.attribs.position, n.instanceExt.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE), f = c.getVertexAttrib(n.attribs.texCoord, n.instanceExt.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE)), n.cullFace && n.realDisable.call(c, c.CULL_FACE), n.depthTest && n.realDisable.call(c, c.DEPTH_TEST), n.blend && n.realDisable.call(c, c.BLEND), n.scissorTest && n.realDisable.call(c, c.SCISSOR_TEST), n.stencilTest && n.realDisable.call(c, c.STENCIL_TEST), n.realColorMask.call(c, !0, !0, !0, !0), n.realViewport.call(c, 0, 0, c.drawingBufferWidth, c.drawingBufferHeight), (n.ctxAttribs.alpha || w()) && (n.realClearColor.call(c, 0, 0, 0, 1), c.clear(c.COLOR_BUFFER_BIT)), c.useProgram(n.program), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, n.indexBuffer), c.bindBuffer(c.ARRAY_BUFFER, n.vertexBuffer), c.enableVertexAttribArray(n.attribs.position), c.enableVertexAttribArray(n.attribs.texCoord), c.vertexAttribPointer(n.attribs.position, 2, c.FLOAT, !1, 20, 0), c.vertexAttribPointer(n.attribs.texCoord, 3, c.FLOAT, !1, 20, 8), n.instanceExt && (A != 0 && n.instanceExt.vertexAttribDivisorANGLE(n.attribs.position, 0), f != 0 && n.instanceExt.vertexAttribDivisorANGLE(n.attribs.texCoord, 0)), c.activeTexture(c.TEXTURE0), c.uniform1i(n.uniforms.diffuse, 0), c.bindTexture(c.TEXTURE_2D, n.renderTarget), c.uniform4fv(n.uniforms.viewportOffsetScale, n.viewportOffsetScale), c.drawElements(c.TRIANGLES, n.indexCount, c.UNSIGNED_SHORT, 0), n.cardboardUI && n.cardboardUI.renderNoState(), n.realBindFramebuffer.call(n.gl, c.FRAMEBUFFER, n.framebuffer), n.ctxAttribs.preserveDrawingBuffer || (n.realClearColor.call(c, 0, 0, 0, 0), c.clear(c.COLOR_BUFFER_BIT)), n.dirtySubmitFrameBindings || n.realBindFramebuffer.call(c, c.FRAMEBUFFER, n.lastBoundFramebuffer), n.cullFace && n.realEnable.call(c, c.CULL_FACE), n.depthTest && n.realEnable.call(c, c.DEPTH_TEST), n.blend && n.realEnable.call(c, c.BLEND), n.scissorTest && n.realEnable.call(c, c.SCISSOR_TEST), n.stencilTest && n.realEnable.call(c, c.STENCIL_TEST), n.realColorMask.apply(c, n.colorMask), n.realViewport.apply(c, n.viewport), (n.ctxAttribs.alpha || !n.ctxAttribs.preserveDrawingBuffer) && n.realClearColor.apply(c, n.clearColor), n.instanceExt && (A != 0 && n.instanceExt.vertexAttribDivisorANGLE(n.attribs.position, A), f != 0 && n.instanceExt.vertexAttribDivisorANGLE(n.attribs.texCoord, f));
      }), w()) {
        var o = r.canvas;
        (o.width != n.bufferWidth || o.height != n.bufferHeight) && (n.bufferWidth = o.width, n.bufferHeight = o.height, n.onResize());
      }
    }, ue.prototype.updateDeviceInfo = function(r) {
      var n = this.gl, a = this, o = [n.ARRAY_BUFFER_BINDING, n.ELEMENT_ARRAY_BUFFER_BINDING];
      ye(n, o, function(c) {
        var A = a.computeMeshVertices_(a.meshWidth, a.meshHeight, r);
        if (c.bindBuffer(c.ARRAY_BUFFER, a.vertexBuffer), c.bufferData(c.ARRAY_BUFFER, A, c.STATIC_DRAW), !a.indexCount) {
          var f = a.computeMeshIndices_(a.meshWidth, a.meshHeight);
          c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, a.indexBuffer), c.bufferData(c.ELEMENT_ARRAY_BUFFER, f, c.STATIC_DRAW), a.indexCount = f.length;
        }
      });
    }, ue.prototype.computeMeshVertices_ = function(r, n, a) {
      for (var o = new Float32Array(2 * r * n * 5), c = a.getLeftEyeVisibleTanAngles(), A = a.getLeftEyeNoLensTanAngles(), f = a.getLeftEyeVisibleScreenRect(A), S = 0, E = 0; E < 2; E++) {
        for (var p = 0; p < n; p++)
          for (var y = 0; y < r; y++, S++) {
            var F = y / (r - 1), V = p / (n - 1), z = F, X = V, q = m(c[0], c[2], F), Z = m(c[3], c[1], V), j = Math.sqrt(q * q + Z * Z), ie = a.distortion.distortInverse(j), oe = q * ie / j, de = Z * ie / j;
            F = (oe - A[0]) / (A[2] - A[0]), V = (de - A[3]) / (A[1] - A[3]), F = (f.x + F * f.width - 0.5) * 2, V = (f.y + V * f.height - 0.5) * 2, o[S * 5 + 0] = F, o[S * 5 + 1] = V, o[S * 5 + 2] = z, o[S * 5 + 3] = X, o[S * 5 + 4] = E;
          }
        var se = c[2] - c[0];
        c[0] = -(se + c[0]), c[2] = se - c[2], se = A[2] - A[0], A[0] = -(se + A[0]), A[2] = se - A[2], f.x = 1 - (f.x + f.width);
      }
      return o;
    }, ue.prototype.computeMeshIndices_ = function(r, n) {
      for (var a = new Uint16Array(2 * (r - 1) * (n - 1) * 6), o = r / 2, c = n / 2, A = 0, f = 0, S = 0; S < 2; S++)
        for (var E = 0; E < n; E++)
          for (var p = 0; p < r; p++, A++)
            p == 0 || E == 0 || (p <= o == E <= c ? (a[f++] = A, a[f++] = A - r - 1, a[f++] = A - r, a[f++] = A - r - 1, a[f++] = A, a[f++] = A - 1) : (a[f++] = A - 1, a[f++] = A - r, a[f++] = A, a[f++] = A - r, a[f++] = A - 1, a[f++] = A - r - 1));
      return a;
    }, ue.prototype.getOwnPropertyDescriptor_ = function(r, n) {
      var a = Object.getOwnPropertyDescriptor(r, n);
      return (a.get === void 0 || a.set === void 0) && (a.configurable = !0, a.enumerable = !0, a.get = function() {
        return this.getAttribute(n);
      }, a.set = function(o) {
        this.setAttribute(n, o);
      }), a;
    };
    var Ke = ["attribute vec2 position;", "uniform mat4 projectionMat;", "void main() {", "  gl_Position = projectionMat * vec4( position, -1.0, 1.0 );", "}"].join(`
`), Ot = ["precision mediump float;", "uniform vec4 color;", "void main() {", "  gl_FragColor = color;", "}"].join(`
`), xt = Math.PI / 180, Je = 60, St = 12, Mt = 20, Nt = 1, hi = 0.75, Ai = 0.3125, sr = 4, ze = 28, Gt = 1.5;
    function Qe(r) {
      this.gl = r, this.attribs = {
        position: 0
      }, this.program = Q(r, Ke, Ot, this.attribs), this.uniforms = U(r, this.program), this.vertexBuffer = r.createBuffer(), this.gearOffset = 0, this.gearVertexCount = 0, this.arrowOffset = 0, this.arrowVertexCount = 0, this.projMat = new Float32Array(16), this.listener = null, this.onResize();
    }
    Qe.prototype.destroy = function() {
      var r = this.gl;
      this.listener && r.canvas.removeEventListener("click", this.listener, !1), r.deleteProgram(this.program), r.deleteBuffer(this.vertexBuffer);
    }, Qe.prototype.listen = function(r, n) {
      var a = this.gl.canvas;
      this.listener = function(o) {
        var c = a.clientWidth / 2, A = ze * Gt;
        o.clientX > c - A && o.clientX < c + A && o.clientY > a.clientHeight - A ? r(o) : o.clientX < A && o.clientY < A && n(o);
      }, a.addEventListener("click", this.listener, !1);
    }, Qe.prototype.onResize = function() {
      var r = this.gl, n = this, a = [r.ARRAY_BUFFER_BINDING];
      ye(r, a, function(o) {
        var c = [], A = o.drawingBufferWidth / 2, f = Math.max(screen.width, screen.height) * window.devicePixelRatio, S = o.drawingBufferWidth / f, E = S * window.devicePixelRatio, p = sr * E / 2, y = ze * Gt * E, F = ze * E / 2, V = (ze * Gt - ze) * E;
        c.push(A - p, y), c.push(A - p, o.drawingBufferHeight), c.push(A + p, y), c.push(A + p, o.drawingBufferHeight), n.gearOffset = c.length / 2;
        function z(ie, oe) {
          var de = (90 - ie) * xt, se = Math.cos(de), fe = Math.sin(de);
          c.push(Ai * se * F + A, Ai * fe * F + F), c.push(oe * se * F + A, oe * fe * F + F);
        }
        for (var X = 0; X <= 6; X++) {
          var q = X * Je;
          z(q, Nt), z(q + St, Nt), z(q + Mt, hi), z(q + (Je - Mt), hi), z(q + (Je - St), Nt);
        }
        n.gearVertexCount = c.length / 2 - n.gearOffset, n.arrowOffset = c.length / 2;
        function Z(ie, oe) {
          c.push(V + ie, o.drawingBufferHeight - V - oe);
        }
        var j = p / Math.sin(45 * xt);
        Z(0, F), Z(F, 0), Z(F + j, j), Z(j, F + j), Z(j, F - j), Z(0, F), Z(F, F * 2), Z(F + j, F * 2 - j), Z(j, F - j), Z(0, F), Z(j, F - p), Z(ze * E, F - p), Z(j, F + p), Z(ze * E, F + p), n.arrowVertexCount = c.length / 2 - n.arrowOffset, o.bindBuffer(o.ARRAY_BUFFER, n.vertexBuffer), o.bufferData(o.ARRAY_BUFFER, new Float32Array(c), o.STATIC_DRAW);
      });
    }, Qe.prototype.render = function() {
      var r = this.gl, n = this, a = [r.CULL_FACE, r.DEPTH_TEST, r.BLEND, r.SCISSOR_TEST, r.STENCIL_TEST, r.COLOR_WRITEMASK, r.VIEWPORT, r.CURRENT_PROGRAM, r.ARRAY_BUFFER_BINDING];
      ye(r, a, function(o) {
        o.disable(o.CULL_FACE), o.disable(o.DEPTH_TEST), o.disable(o.BLEND), o.disable(o.SCISSOR_TEST), o.disable(o.STENCIL_TEST), o.colorMask(!0, !0, !0, !0), o.viewport(0, 0, o.drawingBufferWidth, o.drawingBufferHeight), n.renderNoState();
      });
    }, Qe.prototype.renderNoState = function() {
      var r = this.gl;
      r.useProgram(this.program), r.bindBuffer(r.ARRAY_BUFFER, this.vertexBuffer), r.enableVertexAttribArray(this.attribs.position), r.vertexAttribPointer(this.attribs.position, 2, r.FLOAT, !1, 8, 0), r.uniform4f(this.uniforms.color, 1, 1, 1, 1), $(this.projMat, 0, r.drawingBufferWidth, 0, r.drawingBufferHeight, 0.1, 1024), r.uniformMatrix4fv(this.uniforms.projectionMat, !1, this.projMat), r.drawArrays(r.TRIANGLE_STRIP, 0, 4), r.drawArrays(r.TRIANGLE_STRIP, this.gearOffset, this.gearVertexCount), r.drawArrays(r.TRIANGLE_STRIP, this.arrowOffset, this.arrowVertexCount);
    };
    function _t(r) {
      this.coefficients = r;
    }
    _t.prototype.distortInverse = function(r) {
      for (var n = 0, a = 1, o = r - this.distort(n); Math.abs(a - n) > 1e-4; ) {
        var c = r - this.distort(a), A = a - c * ((a - n) / (c - o));
        n = a, a = A, o = c;
      }
      return a;
    }, _t.prototype.distort = function(r) {
      for (var n = r * r, a = 0, o = 0; o < this.coefficients.length; o++)
        a = n * (a + this.coefficients[o]);
      return (a + 1) * r;
    };
    var Pe = Math.PI / 180, Ce = 180 / Math.PI, ne = function(n, a, o) {
      this.x = n || 0, this.y = a || 0, this.z = o || 0;
    };
    ne.prototype = {
      constructor: ne,
      set: function(n, a, o) {
        return this.x = n, this.y = a, this.z = o, this;
      },
      copy: function(n) {
        return this.x = n.x, this.y = n.y, this.z = n.z, this;
      },
      length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      },
      normalize: function() {
        var n = this.length();
        if (n !== 0) {
          var a = 1 / n;
          this.multiplyScalar(a);
        } else
          this.x = 0, this.y = 0, this.z = 0;
        return this;
      },
      multiplyScalar: function(n) {
        this.x *= n, this.y *= n, this.z *= n;
      },
      applyQuaternion: function(n) {
        var a = this.x, o = this.y, c = this.z, A = n.x, f = n.y, S = n.z, E = n.w, p = E * a + f * c - S * o, y = E * o + S * a - A * c, F = E * c + A * o - f * a, V = -A * a - f * o - S * c;
        return this.x = p * E + V * -A + y * -S - F * -f, this.y = y * E + V * -f + F * -A - p * -S, this.z = F * E + V * -S + p * -f - y * -A, this;
      },
      dot: function(n) {
        return this.x * n.x + this.y * n.y + this.z * n.z;
      },
      crossVectors: function(n, a) {
        var o = n.x, c = n.y, A = n.z, f = a.x, S = a.y, E = a.z;
        return this.x = c * E - A * S, this.y = A * f - o * E, this.z = o * S - c * f, this;
      }
    };
    var J = function(n, a, o, c) {
      this.x = n || 0, this.y = a || 0, this.z = o || 0, this.w = c !== void 0 ? c : 1;
    };
    J.prototype = {
      constructor: J,
      set: function(n, a, o, c) {
        return this.x = n, this.y = a, this.z = o, this.w = c, this;
      },
      copy: function(n) {
        return this.x = n.x, this.y = n.y, this.z = n.z, this.w = n.w, this;
      },
      setFromEulerXYZ: function(n, a, o) {
        var c = Math.cos(n / 2), A = Math.cos(a / 2), f = Math.cos(o / 2), S = Math.sin(n / 2), E = Math.sin(a / 2), p = Math.sin(o / 2);
        return this.x = S * A * f + c * E * p, this.y = c * E * f - S * A * p, this.z = c * A * p + S * E * f, this.w = c * A * f - S * E * p, this;
      },
      setFromEulerYXZ: function(n, a, o) {
        var c = Math.cos(n / 2), A = Math.cos(a / 2), f = Math.cos(o / 2), S = Math.sin(n / 2), E = Math.sin(a / 2), p = Math.sin(o / 2);
        return this.x = S * A * f + c * E * p, this.y = c * E * f - S * A * p, this.z = c * A * p - S * E * f, this.w = c * A * f + S * E * p, this;
      },
      setFromAxisAngle: function(n, a) {
        var o = a / 2, c = Math.sin(o);
        return this.x = n.x * c, this.y = n.y * c, this.z = n.z * c, this.w = Math.cos(o), this;
      },
      multiply: function(n) {
        return this.multiplyQuaternions(this, n);
      },
      multiplyQuaternions: function(n, a) {
        var o = n.x, c = n.y, A = n.z, f = n.w, S = a.x, E = a.y, p = a.z, y = a.w;
        return this.x = o * y + f * S + c * p - A * E, this.y = c * y + f * E + A * S - o * p, this.z = A * y + f * p + o * E - c * S, this.w = f * y - o * S - c * E - A * p, this;
      },
      inverse: function() {
        return this.x *= -1, this.y *= -1, this.z *= -1, this.normalize(), this;
      },
      normalize: function() {
        var n = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        return n === 0 ? (this.x = 0, this.y = 0, this.z = 0, this.w = 1) : (n = 1 / n, this.x = this.x * n, this.y = this.y * n, this.z = this.z * n, this.w = this.w * n), this;
      },
      slerp: function(n, a) {
        if (a === 0)
          return this;
        if (a === 1)
          return this.copy(n);
        var o = this.x, c = this.y, A = this.z, f = this.w, S = f * n.w + o * n.x + c * n.y + A * n.z;
        if (S < 0 ? (this.w = -n.w, this.x = -n.x, this.y = -n.y, this.z = -n.z, S = -S) : this.copy(n), S >= 1)
          return this.w = f, this.x = o, this.y = c, this.z = A, this;
        var E = Math.acos(S), p = Math.sqrt(1 - S * S);
        if (Math.abs(p) < 1e-3)
          return this.w = 0.5 * (f + this.w), this.x = 0.5 * (o + this.x), this.y = 0.5 * (c + this.y), this.z = 0.5 * (A + this.z), this;
        var y = Math.sin((1 - a) * E) / p, F = Math.sin(a * E) / p;
        return this.w = f * y + this.w * F, this.x = o * y + this.x * F, this.y = c * y + this.y * F, this.z = A * y + this.z * F, this;
      },
      setFromUnitVectors: function() {
        var r, n, a = 1e-6;
        return function(o, c) {
          return r === void 0 && (r = new ne()), n = o.dot(c) + 1, n < a ? (n = 0, Math.abs(o.x) > Math.abs(o.z) ? r.set(-o.y, o.x, 0) : r.set(0, -o.z, o.y)) : r.crossVectors(o, c), this.x = r.x, this.y = r.y, this.z = r.z, this.w = n, this.normalize(), this;
        };
      }()
    };
    function kt(r) {
      this.width = r.width || R(), this.height = r.height || D(), this.widthMeters = r.widthMeters, this.heightMeters = r.heightMeters, this.bevelMeters = r.bevelMeters;
    }
    var ar = new kt({
      widthMeters: 0.11,
      heightMeters: 0.062,
      bevelMeters: 4e-3
    }), or = new kt({
      widthMeters: 0.1038,
      heightMeters: 0.0584,
      bevelMeters: 4e-3
    }), Vt = {
      CardboardV1: new Ut({
        id: "CardboardV1",
        label: "Cardboard I/O 2014",
        fov: 40,
        interLensDistance: 0.06,
        baselineLensDistance: 0.035,
        screenLensDistance: 0.042,
        distortionCoefficients: [0.441, 0.156],
        inverseCoefficients: [-0.4410035, 0.42756155, -0.4804439, 0.5460139, -0.58821183, 0.5733938, -0.48303202, 0.33299083, -0.17573841, 0.0651772, -0.01488963, 1559834e-9]
      }),
      CardboardV2: new Ut({
        id: "CardboardV2",
        label: "Cardboard I/O 2015",
        fov: 60,
        interLensDistance: 0.064,
        baselineLensDistance: 0.035,
        screenLensDistance: 0.039,
        distortionCoefficients: [0.34, 0.55],
        inverseCoefficients: [-0.33836704, -0.18162185, 0.862655, -1.2462051, 1.0560602, -0.58208317, 0.21609078, -0.05444823, 9177956e-9, -9904169e-10, 6183535e-11, -16981803e-13]
      })
    };
    function le(r, n) {
      this.viewer = Vt.CardboardV2, this.updateDeviceParams(r), this.distortion = new _t(this.viewer.distortionCoefficients);
      for (var a = 0; a < n.length; a++) {
        var o = n[a];
        Vt[o.id] = new Ut(o);
      }
    }
    le.prototype.updateDeviceParams = function(r) {
      this.device = this.determineDevice_(r) || this.device;
    }, le.prototype.getDevice = function() {
      return this.device;
    }, le.prototype.setViewer = function(r) {
      this.viewer = r, this.distortion = new _t(this.viewer.distortionCoefficients);
    }, le.prototype.determineDevice_ = function(r) {
      if (!r)
        return w() ? (console.warn("Using fallback iOS device measurements."), or) : (console.warn("Using fallback Android device measurements."), ar);
      var n = 0.0254, a = n / r.xdpi, o = n / r.ydpi, c = R(), A = D();
      return new kt({
        widthMeters: a * c,
        heightMeters: o * A,
        bevelMeters: r.bevelMm * 1e-3
      });
    }, le.prototype.getDistortedFieldOfViewLeftEye = function() {
      var r = this.viewer, n = this.device, a = this.distortion, o = r.screenLensDistance, c = (n.widthMeters - r.interLensDistance) / 2, A = r.interLensDistance / 2, f = r.baselineLensDistance - n.bevelMeters, S = n.heightMeters - f, E = Ce * Math.atan(a.distort(c / o)), p = Ce * Math.atan(a.distort(A / o)), y = Ce * Math.atan(a.distort(f / o)), F = Ce * Math.atan(a.distort(S / o));
      return {
        leftDegrees: Math.min(E, r.fov),
        rightDegrees: Math.min(p, r.fov),
        downDegrees: Math.min(y, r.fov),
        upDegrees: Math.min(F, r.fov)
      };
    }, le.prototype.getLeftEyeVisibleTanAngles = function() {
      var r = this.viewer, n = this.device, a = this.distortion, o = Math.tan(-Pe * r.fov), c = Math.tan(Pe * r.fov), A = Math.tan(Pe * r.fov), f = Math.tan(-Pe * r.fov), S = n.widthMeters / 4, E = n.heightMeters / 2, p = r.baselineLensDistance - n.bevelMeters - E, y = r.interLensDistance / 2 - S, F = -p, V = r.screenLensDistance, z = a.distort((y - S) / V), X = a.distort((F + E) / V), q = a.distort((y + S) / V), Z = a.distort((F - E) / V), j = new Float32Array(4);
      return j[0] = Math.max(o, z), j[1] = Math.min(c, X), j[2] = Math.min(A, q), j[3] = Math.max(f, Z), j;
    }, le.prototype.getLeftEyeNoLensTanAngles = function() {
      var r = this.viewer, n = this.device, a = this.distortion, o = new Float32Array(4), c = a.distortInverse(Math.tan(-Pe * r.fov)), A = a.distortInverse(Math.tan(Pe * r.fov)), f = a.distortInverse(Math.tan(Pe * r.fov)), S = a.distortInverse(Math.tan(-Pe * r.fov)), E = n.widthMeters / 4, p = n.heightMeters / 2, y = r.baselineLensDistance - n.bevelMeters - p, F = r.interLensDistance / 2 - E, V = -y, z = r.screenLensDistance, X = (F - E) / z, q = (V + p) / z, Z = (F + E) / z, j = (V - p) / z;
      return o[0] = Math.max(c, X), o[1] = Math.min(A, q), o[2] = Math.min(f, Z), o[3] = Math.max(S, j), o;
    }, le.prototype.getLeftEyeVisibleScreenRect = function(r) {
      var n = this.viewer, a = this.device, o = n.screenLensDistance, c = (a.widthMeters - n.interLensDistance) / 2, A = n.baselineLensDistance - a.bevelMeters, f = (r[0] * o + c) / a.widthMeters, S = (r[1] * o + A) / a.heightMeters, E = (r[2] * o + c) / a.widthMeters, p = (r[3] * o + A) / a.heightMeters;
      return {
        x: f,
        y: p,
        width: E - f,
        height: S - p
      };
    }, le.prototype.getFieldOfViewLeftEye = function(r) {
      return r ? this.getUndistortedFieldOfViewLeftEye() : this.getDistortedFieldOfViewLeftEye();
    }, le.prototype.getFieldOfViewRightEye = function(r) {
      var n = this.getFieldOfViewLeftEye(r);
      return {
        leftDegrees: n.rightDegrees,
        rightDegrees: n.leftDegrees,
        upDegrees: n.upDegrees,
        downDegrees: n.downDegrees
      };
    }, le.prototype.getUndistortedFieldOfViewLeftEye = function() {
      var r = this.getUndistortedParams_();
      return {
        leftDegrees: Ce * Math.atan(r.outerDist),
        rightDegrees: Ce * Math.atan(r.innerDist),
        downDegrees: Ce * Math.atan(r.bottomDist),
        upDegrees: Ce * Math.atan(r.topDist)
      };
    }, le.prototype.getUndistortedViewportLeftEye = function() {
      var r = this.getUndistortedParams_(), n = this.viewer, a = this.device, o = n.screenLensDistance, c = a.widthMeters / o, A = a.heightMeters / o, f = a.width / c, S = a.height / A, E = Math.round((r.eyePosX - r.outerDist) * f), p = Math.round((r.eyePosY - r.bottomDist) * S);
      return {
        x: E,
        y: p,
        width: Math.round((r.eyePosX + r.innerDist) * f) - E,
        height: Math.round((r.eyePosY + r.topDist) * S) - p
      };
    }, le.prototype.getUndistortedParams_ = function() {
      var r = this.viewer, n = this.device, a = this.distortion, o = r.screenLensDistance, c = r.interLensDistance / 2 / o, A = n.widthMeters / o, f = n.heightMeters / o, S = A / 2 - c, E = (r.baselineLensDistance - n.bevelMeters) / o, p = r.fov, y = a.distortInverse(Math.tan(Pe * p)), F = Math.min(S, y), V = Math.min(c, y), z = Math.min(E, y), X = Math.min(f - E, y);
      return {
        outerDist: F,
        innerDist: V,
        topDist: X,
        bottomDist: z,
        eyePosX: S,
        eyePosY: E
      };
    };
    function Ut(r) {
      this.id = r.id, this.label = r.label, this.fov = r.fov, this.interLensDistance = r.interLensDistance, this.baselineLensDistance = r.baselineLensDistance, this.screenLensDistance = r.screenLensDistance, this.distortionCoefficients = r.distortionCoefficients, this.inverseCoefficients = r.inverseCoefficients;
    }
    le.Viewers = Vt;
    var lr = 1, cr = "2019-11-09T17:36:14Z", hr = [{ type: "android", rules: [{ mdmh: "asus/*/Nexus 7/*" }, { ua: "Nexus 7" }], dpi: [320.8, 323], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "asus/*/ASUS_X00PD/*" }, { ua: "ASUS_X00PD" }], dpi: 245, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "asus/*/ASUS_X008D/*" }, { ua: "ASUS_X008D" }], dpi: 282, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "asus/*/ASUS_Z00AD/*" }, { ua: "ASUS_Z00AD" }], dpi: [403, 404.6], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Google/*/Pixel 2 XL/*" }, { ua: "Pixel 2 XL" }], dpi: 537.9, bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Google/*/Pixel 3 XL/*" }, { ua: "Pixel 3 XL" }], dpi: [558.5, 553.8], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Google/*/Pixel XL/*" }, { ua: "Pixel XL" }], dpi: [537.9, 533], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Google/*/Pixel 3/*" }, { ua: "Pixel 3" }], dpi: 442.4, bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Google/*/Pixel 2/*" }, { ua: "Pixel 2" }], dpi: 441, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "Google/*/Pixel/*" }, { ua: "Pixel" }], dpi: [432.6, 436.7], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "HTC/*/HTC6435LVW/*" }, { ua: "HTC6435LVW" }], dpi: [449.7, 443.3], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "HTC/*/HTC One XL/*" }, { ua: "HTC One XL" }], dpi: [315.3, 314.6], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "htc/*/Nexus 9/*" }, { ua: "Nexus 9" }], dpi: 289, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "HTC/*/HTC One M9/*" }, { ua: "HTC One M9" }], dpi: [442.5, 443.3], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "HTC/*/HTC One_M8/*" }, { ua: "HTC One_M8" }], dpi: [449.7, 447.4], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "HTC/*/HTC One/*" }, { ua: "HTC One" }], dpi: 472.8, bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Huawei/*/Nexus 6P/*" }, { ua: "Nexus 6P" }], dpi: [515.1, 518], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Huawei/*/BLN-L24/*" }, { ua: "HONORBLN-L24" }], dpi: 480, bw: 4, ac: 500 }, { type: "android", rules: [{ mdmh: "Huawei/*/BKL-L09/*" }, { ua: "BKL-L09" }], dpi: 403, bw: 3.47, ac: 500 }, { type: "android", rules: [{ mdmh: "LENOVO/*/Lenovo PB2-690Y/*" }, { ua: "Lenovo PB2-690Y" }], dpi: [457.2, 454.713], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "LGE/*/Nexus 5X/*" }, { ua: "Nexus 5X" }], dpi: [422, 419.9], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "LGE/*/LGMS345/*" }, { ua: "LGMS345" }], dpi: [221.7, 219.1], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "LGE/*/LG-D800/*" }, { ua: "LG-D800" }], dpi: [422, 424.1], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "LGE/*/LG-D850/*" }, { ua: "LG-D850" }], dpi: [537.9, 541.9], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "LGE/*/VS985 4G/*" }, { ua: "VS985 4G" }], dpi: [537.9, 535.6], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "LGE/*/Nexus 5/*" }, { ua: "Nexus 5 B" }], dpi: [442.4, 444.8], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "LGE/*/Nexus 4/*" }, { ua: "Nexus 4" }], dpi: [319.8, 318.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "LGE/*/LG-P769/*" }, { ua: "LG-P769" }], dpi: [240.6, 247.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "LGE/*/LGMS323/*" }, { ua: "LGMS323" }], dpi: [206.6, 204.6], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "LGE/*/LGLS996/*" }, { ua: "LGLS996" }], dpi: [403.4, 401.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Micromax/*/4560MMX/*" }, { ua: "4560MMX" }], dpi: [240, 219.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Micromax/*/A250/*" }, { ua: "Micromax A250" }], dpi: [480, 446.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Micromax/*/Micromax AQ4501/*" }, { ua: "Micromax AQ4501" }], dpi: 240, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "motorola/*/G5/*" }, { ua: "Moto G (5) Plus" }], dpi: [403.4, 403], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "motorola/*/DROID RAZR/*" }, { ua: "DROID RAZR" }], dpi: [368.1, 256.7], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "motorola/*/XT830C/*" }, { ua: "XT830C" }], dpi: [254, 255.9], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1021/*" }, { ua: "XT1021" }], dpi: [254, 256.7], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1023/*" }, { ua: "XT1023" }], dpi: [254, 256.7], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1028/*" }, { ua: "XT1028" }], dpi: [326.6, 327.6], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1034/*" }, { ua: "XT1034" }], dpi: [326.6, 328.4], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1053/*" }, { ua: "XT1053" }], dpi: [315.3, 316.1], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1562/*" }, { ua: "XT1562" }], dpi: [403.4, 402.7], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "motorola/*/Nexus 6/*" }, { ua: "Nexus 6 B" }], dpi: [494.3, 489.7], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1063/*" }, { ua: "XT1063" }], dpi: [295, 296.6], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1064/*" }, { ua: "XT1064" }], dpi: [295, 295.6], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1092/*" }, { ua: "XT1092" }], dpi: [422, 424.1], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "motorola/*/XT1095/*" }, { ua: "XT1095" }], dpi: [422, 423.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "motorola/*/G4/*" }, { ua: "Moto G (4)" }], dpi: 401, bw: 4, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/A0001/*" }, { ua: "A0001" }], dpi: [403.4, 401], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONE E1001/*" }, { ua: "ONE E1001" }], dpi: [442.4, 441.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONE E1003/*" }, { ua: "ONE E1003" }], dpi: [442.4, 441.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONE E1005/*" }, { ua: "ONE E1005" }], dpi: [442.4, 441.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONE A2001/*" }, { ua: "ONE A2001" }], dpi: [391.9, 405.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONE A2003/*" }, { ua: "ONE A2003" }], dpi: [391.9, 405.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONE A2005/*" }, { ua: "ONE A2005" }], dpi: [391.9, 405.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONEPLUS A3000/*" }, { ua: "ONEPLUS A3000" }], dpi: 401, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONEPLUS A3003/*" }, { ua: "ONEPLUS A3003" }], dpi: 401, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONEPLUS A3010/*" }, { ua: "ONEPLUS A3010" }], dpi: 401, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONEPLUS A5000/*" }, { ua: "ONEPLUS A5000 " }], dpi: [403.411, 399.737], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONE A5010/*" }, { ua: "ONEPLUS A5010" }], dpi: [403, 400], bw: 2, ac: 1e3 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONEPLUS A6000/*" }, { ua: "ONEPLUS A6000" }], dpi: 401, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONEPLUS A6003/*" }, { ua: "ONEPLUS A6003" }], dpi: 401, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONEPLUS A6010/*" }, { ua: "ONEPLUS A6010" }], dpi: 401, bw: 2, ac: 500 }, { type: "android", rules: [{ mdmh: "OnePlus/*/ONEPLUS A6013/*" }, { ua: "ONEPLUS A6013" }], dpi: 401, bw: 2, ac: 500 }, { type: "android", rules: [{ mdmh: "OPPO/*/X909/*" }, { ua: "X909" }], dpi: [442.4, 444.1], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/GT-I9082/*" }, { ua: "GT-I9082" }], dpi: [184.7, 185.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G360P/*" }, { ua: "SM-G360P" }], dpi: [196.7, 205.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/Nexus S/*" }, { ua: "Nexus S" }], dpi: [234.5, 229.8], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/GT-I9300/*" }, { ua: "GT-I9300" }], dpi: [304.8, 303.9], bw: 5, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-T230NU/*" }, { ua: "SM-T230NU" }], dpi: 216, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SGH-T399/*" }, { ua: "SGH-T399" }], dpi: [217.7, 231.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SGH-M919/*" }, { ua: "SGH-M919" }], dpi: [440.8, 437.7], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-N9005/*" }, { ua: "SM-N9005" }], dpi: [386.4, 387], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SAMSUNG-SM-N900A/*" }, { ua: "SAMSUNG-SM-N900A" }], dpi: [386.4, 387.7], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/GT-I9500/*" }, { ua: "GT-I9500" }], dpi: [442.5, 443.3], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/GT-I9505/*" }, { ua: "GT-I9505" }], dpi: 439.4, bw: 4, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G900F/*" }, { ua: "SM-G900F" }], dpi: [415.6, 431.6], bw: 5, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G900M/*" }, { ua: "SM-G900M" }], dpi: [415.6, 431.6], bw: 5, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G800F/*" }, { ua: "SM-G800F" }], dpi: 326.8, bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G906S/*" }, { ua: "SM-G906S" }], dpi: [562.7, 572.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/GT-I9300/*" }, { ua: "GT-I9300" }], dpi: [306.7, 304.8], bw: 5, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-T535/*" }, { ua: "SM-T535" }], dpi: [142.6, 136.4], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-N920C/*" }, { ua: "SM-N920C" }], dpi: [515.1, 518.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-N920P/*" }, { ua: "SM-N920P" }], dpi: [386.3655, 390.144], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-N920W8/*" }, { ua: "SM-N920W8" }], dpi: [515.1, 518.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/GT-I9300I/*" }, { ua: "GT-I9300I" }], dpi: [304.8, 305.8], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/GT-I9195/*" }, { ua: "GT-I9195" }], dpi: [249.4, 256.7], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SPH-L520/*" }, { ua: "SPH-L520" }], dpi: [249.4, 255.9], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SAMSUNG-SGH-I717/*" }, { ua: "SAMSUNG-SGH-I717" }], dpi: 285.8, bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SPH-D710/*" }, { ua: "SPH-D710" }], dpi: [217.7, 204.2], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/GT-N7100/*" }, { ua: "GT-N7100" }], dpi: 265.1, bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SCH-I605/*" }, { ua: "SCH-I605" }], dpi: 265.1, bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/Galaxy Nexus/*" }, { ua: "Galaxy Nexus" }], dpi: [315.3, 314.2], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-N910H/*" }, { ua: "SM-N910H" }], dpi: [515.1, 518], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-N910C/*" }, { ua: "SM-N910C" }], dpi: [515.2, 520.2], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G130M/*" }, { ua: "SM-G130M" }], dpi: [165.9, 164.8], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G928I/*" }, { ua: "SM-G928I" }], dpi: [515.1, 518.4], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G920F/*" }, { ua: "SM-G920F" }], dpi: 580.6, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G920P/*" }, { ua: "SM-G920P" }], dpi: [522.5, 577], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G925F/*" }, { ua: "SM-G925F" }], dpi: 580.6, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G925V/*" }, { ua: "SM-G925V" }], dpi: [522.5, 576.6], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G930F/*" }, { ua: "SM-G930F" }], dpi: 576.6, bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G935F/*" }, { ua: "SM-G935F" }], dpi: 533, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G950F/*" }, { ua: "SM-G950F" }], dpi: [562.707, 565.293], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G955U/*" }, { ua: "SM-G955U" }], dpi: [522.514, 525.762], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G955F/*" }, { ua: "SM-G955F" }], dpi: [522.514, 525.762], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G960F/*" }, { ua: "SM-G960F" }], dpi: [569.575, 571.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G9600/*" }, { ua: "SM-G9600" }], dpi: [569.575, 571.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G960T/*" }, { ua: "SM-G960T" }], dpi: [569.575, 571.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G960N/*" }, { ua: "SM-G960N" }], dpi: [569.575, 571.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G960U/*" }, { ua: "SM-G960U" }], dpi: [569.575, 571.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G9608/*" }, { ua: "SM-G9608" }], dpi: [569.575, 571.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G960FD/*" }, { ua: "SM-G960FD" }], dpi: [569.575, 571.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G960W/*" }, { ua: "SM-G960W" }], dpi: [569.575, 571.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G965F/*" }, { ua: "SM-G965F" }], dpi: 529, bw: 2, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Sony/*/C6903/*" }, { ua: "C6903" }], dpi: [442.5, 443.3], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "Sony/*/D6653/*" }, { ua: "D6653" }], dpi: [428.6, 427.6], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Sony/*/E6653/*" }, { ua: "E6653" }], dpi: [428.6, 425.7], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Sony/*/E6853/*" }, { ua: "E6853" }], dpi: [403.4, 401.9], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Sony/*/SGP321/*" }, { ua: "SGP321" }], dpi: [224.7, 224.1], bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "TCT/*/ALCATEL ONE TOUCH Fierce/*" }, { ua: "ALCATEL ONE TOUCH Fierce" }], dpi: [240, 247.5], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "THL/*/thl 5000/*" }, { ua: "thl 5000" }], dpi: [480, 443.3], bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Fly/*/IQ4412/*" }, { ua: "IQ4412" }], dpi: 307.9, bw: 3, ac: 1e3 }, { type: "android", rules: [{ mdmh: "ZTE/*/ZTE Blade L2/*" }, { ua: "ZTE Blade L2" }], dpi: 240, bw: 3, ac: 500 }, { type: "android", rules: [{ mdmh: "BENEVE/*/VR518/*" }, { ua: "VR518" }], dpi: 480, bw: 3, ac: 500 }, { type: "ios", rules: [{ res: [640, 960] }], dpi: [325.1, 328.4], bw: 4, ac: 1e3 }, { type: "ios", rules: [{ res: [640, 1136] }], dpi: [317.1, 320.2], bw: 3, ac: 1e3 }, { type: "ios", rules: [{ res: [750, 1334] }], dpi: 326.4, bw: 4, ac: 1e3 }, { type: "ios", rules: [{ res: [1242, 2208] }], dpi: [453.6, 458.4], bw: 4, ac: 1e3 }, { type: "ios", rules: [{ res: [1125, 2001] }], dpi: [410.9, 415.4], bw: 4, ac: 1e3 }, { type: "ios", rules: [{ res: [1125, 2436] }], dpi: 458, bw: 4, ac: 1e3 }, { type: "android", rules: [{ mdmh: "Huawei/*/EML-L29/*" }, { ua: "EML-L29" }], dpi: 428, bw: 3.45, ac: 500 }, { type: "android", rules: [{ mdmh: "Nokia/*/Nokia 7.1/*" }, { ua: "Nokia 7.1" }], dpi: [432, 431.9], bw: 3, ac: 500 }, { type: "ios", rules: [{ res: [1242, 2688] }], dpi: 458, bw: 4, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G570M/*" }, { ua: "SM-G570M" }], dpi: 320, bw: 3.684, ac: 1e3 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G970F/*" }, { ua: "SM-G970F" }], dpi: 438, bw: 2.281, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G973F/*" }, { ua: "SM-G973F" }], dpi: 550, bw: 2.002, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G975F/*" }, { ua: "SM-G975F" }], dpi: 522, bw: 2.054, ac: 500 }, { type: "android", rules: [{ mdmh: "samsung/*/SM-G977F/*" }, { ua: "SM-G977F" }], dpi: 505, bw: 2.334, ac: 500 }, { type: "ios", rules: [{ res: [828, 1792] }], dpi: 326, bw: 5, ac: 500 }], Ar = {
      format: lr,
      last_updated: cr,
      devices: hr
    };
    function et(r, n) {
      if (this.dpdb = Ar, this.recalculateDeviceParams_(), r) {
        this.onDeviceParamsUpdated = n;
        var a = new XMLHttpRequest(), o = this;
        a.open("GET", r, !0), a.addEventListener("load", function() {
          o.loading = !1, a.status >= 200 && a.status <= 299 ? (o.dpdb = JSON.parse(a.response), o.recalculateDeviceParams_()) : console.error("Error loading online DPDB!");
        }), a.send();
      }
    }
    et.prototype.getDeviceParams = function() {
      return this.deviceParams;
    }, et.prototype.recalculateDeviceParams_ = function() {
      var r = this.calcDeviceParams_();
      r ? (this.deviceParams = r, this.onDeviceParamsUpdated && this.onDeviceParamsUpdated(this.deviceParams)) : console.error("Failed to recalculate device parameters.");
    }, et.prototype.calcDeviceParams_ = function() {
      var r = this.dpdb;
      if (!r)
        return console.error("DPDB not available."), null;
      if (r.format != 1)
        return console.error("DPDB has unexpected format version."), null;
      if (!r.devices || !r.devices.length)
        return console.error("DPDB does not have a devices section."), null;
      var n = navigator.userAgent || navigator.vendor || window.opera, a = R(), o = D();
      if (!r.devices)
        return console.error("DPDB has no devices section."), null;
      for (var c = 0; c < r.devices.length; c++) {
        var A = r.devices[c];
        if (!A.rules) {
          console.warn("Device[" + c + "] has no rules section.");
          continue;
        }
        if (A.type != "ios" && A.type != "android") {
          console.warn("Device[" + c + "] has invalid type.");
          continue;
        }
        if (w() == (A.type == "ios")) {
          for (var f = !1, S = 0; S < A.rules.length; S++) {
            var E = A.rules[S];
            if (this.ruleMatches_(E, n, a, o)) {
              f = !0;
              break;
            }
          }
          if (!!f) {
            var p = A.dpi[0] || A.dpi, y = A.dpi[1] || A.dpi;
            return new dr({ xdpi: p, ydpi: y, bevelMm: A.bw });
          }
        }
      }
      return console.warn("No DPDB device match."), null;
    }, et.prototype.ruleMatches_ = function(r, n, a, o) {
      if (!r.ua && !r.res || (r.ua && r.ua.substring(0, 2) === "SM" && (r.ua = r.ua.substring(0, 7)), r.ua && n.indexOf(r.ua) < 0))
        return !1;
      if (r.res) {
        if (!r.res[0] || !r.res[1])
          return !1;
        var c = r.res[0], A = r.res[1];
        if (Math.min(a, o) != Math.min(c, A) || Math.max(a, o) != Math.max(c, A))
          return !1;
      }
      return !0;
    };
    function dr(r) {
      this.xdpi = r.xdpi, this.ydpi = r.ydpi, this.bevelMm = r.bevelMm;
    }
    function tt(r, n) {
      this.set(r, n);
    }
    tt.prototype.set = function(r, n) {
      this.sample = r, this.timestampS = n;
    }, tt.prototype.copy = function(r) {
      this.set(r.sample, r.timestampS);
    };
    function Xe(r, n) {
      this.kFilter = r, this.isDebug = n, this.currentAccelMeasurement = new tt(), this.currentGyroMeasurement = new tt(), this.previousGyroMeasurement = new tt(), w() ? this.filterQ = new J(-1, 0, 0, 1) : this.filterQ = new J(1, 0, 0, 1), this.previousFilterQ = new J(), this.previousFilterQ.copy(this.filterQ), this.accelQ = new J(), this.isOrientationInitialized = !1, this.estimatedGravity = new ne(), this.measuredGravity = new ne(), this.gyroIntegralQ = new J();
    }
    Xe.prototype.addAccelMeasurement = function(r, n) {
      this.currentAccelMeasurement.set(r, n);
    }, Xe.prototype.addGyroMeasurement = function(r, n) {
      this.currentGyroMeasurement.set(r, n);
      var a = n - this.previousGyroMeasurement.timestampS;
      N(a) && this.run_(), this.previousGyroMeasurement.copy(this.currentGyroMeasurement);
    }, Xe.prototype.run_ = function() {
      if (!this.isOrientationInitialized) {
        this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample), this.previousFilterQ.copy(this.accelQ), this.isOrientationInitialized = !0;
        return;
      }
      var r = this.currentGyroMeasurement.timestampS - this.previousGyroMeasurement.timestampS, n = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, r);
      this.gyroIntegralQ.multiply(n), this.filterQ.copy(this.previousFilterQ), this.filterQ.multiply(n);
      var a = new J();
      a.copy(this.filterQ), a.inverse(), this.estimatedGravity.set(0, 0, -1), this.estimatedGravity.applyQuaternion(a), this.estimatedGravity.normalize(), this.measuredGravity.copy(this.currentAccelMeasurement.sample), this.measuredGravity.normalize();
      var o = new J();
      o.setFromUnitVectors(this.estimatedGravity, this.measuredGravity), o.inverse(), this.isDebug && console.log("Delta: %d deg, G_est: (%s, %s, %s), G_meas: (%s, %s, %s)", Ce * H(o), this.estimatedGravity.x.toFixed(1), this.estimatedGravity.y.toFixed(1), this.estimatedGravity.z.toFixed(1), this.measuredGravity.x.toFixed(1), this.measuredGravity.y.toFixed(1), this.measuredGravity.z.toFixed(1));
      var c = new J();
      c.copy(this.filterQ), c.multiply(o), this.filterQ.slerp(c, 1 - this.kFilter), this.previousFilterQ.copy(this.filterQ);
    }, Xe.prototype.getOrientation = function() {
      return this.filterQ;
    }, Xe.prototype.accelToQuaternion_ = function(r) {
      var n = new ne();
      n.copy(r), n.normalize();
      var a = new J();
      return a.setFromUnitVectors(new ne(0, 0, -1), n), a.inverse(), a;
    }, Xe.prototype.gyroToQuaternionDelta_ = function(r, n) {
      var a = new J(), o = new ne();
      return o.copy(r), o.normalize(), a.setFromAxisAngle(o, r.length() * n), a;
    };
    function di(r, n) {
      this.predictionTimeS = r, this.isDebug = n, this.previousQ = new J(), this.previousTimestampS = null, this.deltaQ = new J(), this.outQ = new J();
    }
    di.prototype.getPrediction = function(r, n, a) {
      if (!this.previousTimestampS)
        return this.previousQ.copy(r), this.previousTimestampS = a, r;
      var o = new ne();
      o.copy(n), o.normalize();
      var c = n.length();
      if (c < Pe * 20)
        return this.isDebug && console.log("Moving slowly, at %s deg/s: no prediction", (Ce * c).toFixed(1)), this.outQ.copy(r), this.previousQ.copy(r), this.outQ;
      var A = c * this.predictionTimeS;
      return this.deltaQ.setFromAxisAngle(o, A), this.outQ.copy(this.previousQ), this.outQ.multiply(this.deltaQ), this.previousQ.copy(r), this.previousTimestampS = a, this.outQ;
    };
    function _e(r, n, a, o) {
      this.yawOnly = a, this.accelerometer = new ne(), this.gyroscope = new ne(), this.filter = new Xe(r, o), this.posePredictor = new di(n, o), this.isFirefoxAndroid = B(), this.isIOS = w();
      var c = C();
      this.isDeviceMotionInRadians = !this.isIOS && c && c < 66, this.isWithoutDeviceMotion = P() || L(), this.filterToWorldQ = new J(), w() ? this.filterToWorldQ.setFromAxisAngle(new ne(1, 0, 0), Math.PI / 2) : this.filterToWorldQ.setFromAxisAngle(new ne(1, 0, 0), -Math.PI / 2), this.inverseWorldToScreenQ = new J(), this.worldToScreenQ = new J(), this.originalPoseAdjustQ = new J(), this.originalPoseAdjustQ.setFromAxisAngle(new ne(0, 0, 1), -window.orientation * Math.PI / 180), this.setScreenTransform_(), v() && this.filterToWorldQ.multiply(this.inverseWorldToScreenQ), this.resetQ = new J(), this.orientationOut_ = new Float32Array(4), this.start();
    }
    _e.prototype.getPosition = function() {
      return null;
    }, _e.prototype.getOrientation = function() {
      var r = void 0;
      if (this.isWithoutDeviceMotion && this._deviceOrientationQ) {
        this.deviceOrientationFixQ = this.deviceOrientationFixQ || function() {
          var c = new J().setFromAxisAngle(new ne(0, 0, -1), 0), A = new J();
          return window.orientation === -90 ? A.setFromAxisAngle(new ne(0, 1, 0), Math.PI / -2) : A.setFromAxisAngle(new ne(0, 1, 0), Math.PI / 2), c.multiply(A);
        }(), this.deviceOrientationFilterToWorldQ = this.deviceOrientationFilterToWorldQ || function() {
          var c = new J();
          return c.setFromAxisAngle(new ne(1, 0, 0), -Math.PI / 2), c;
        }(), r = this._deviceOrientationQ;
        var a = new J();
        return a.copy(r), a.multiply(this.deviceOrientationFilterToWorldQ), a.multiply(this.resetQ), a.multiply(this.worldToScreenQ), a.multiplyQuaternions(this.deviceOrientationFixQ, a), this.yawOnly && (a.x = 0, a.z = 0, a.normalize()), this.orientationOut_[0] = a.x, this.orientationOut_[1] = a.y, this.orientationOut_[2] = a.z, this.orientationOut_[3] = a.w, this.orientationOut_;
      } else {
        var n = this.filter.getOrientation();
        r = this.posePredictor.getPrediction(n, this.gyroscope, this.previousTimestampS);
      }
      var a = new J();
      return a.copy(this.filterToWorldQ), a.multiply(this.resetQ), a.multiply(r), a.multiply(this.worldToScreenQ), this.yawOnly && (a.x = 0, a.z = 0, a.normalize()), this.orientationOut_[0] = a.x, this.orientationOut_[1] = a.y, this.orientationOut_[2] = a.z, this.orientationOut_[3] = a.w, this.orientationOut_;
    }, _e.prototype.resetPose = function() {
      this.resetQ.copy(this.filter.getOrientation()), this.resetQ.x = 0, this.resetQ.y = 0, this.resetQ.z *= -1, this.resetQ.normalize(), v() && this.resetQ.multiply(this.inverseWorldToScreenQ), this.resetQ.multiply(this.originalPoseAdjustQ);
    }, _e.prototype.onDeviceOrientation_ = function(r) {
      this._deviceOrientationQ = this._deviceOrientationQ || new J();
      var n = r.alpha, a = r.beta, o = r.gamma;
      n = (n || 0) * Math.PI / 180, a = (a || 0) * Math.PI / 180, o = (o || 0) * Math.PI / 180, this._deviceOrientationQ.setFromEulerYXZ(a, n, -o);
    }, _e.prototype.onDeviceMotion_ = function(r) {
      this.updateDeviceMotion_(r);
    }, _e.prototype.updateDeviceMotion_ = function(r) {
      var n = r.accelerationIncludingGravity, a = r.rotationRate, o = r.timeStamp / 1e3, c = o - this.previousTimestampS;
      if (c < 0) {
        we("fusion-pose-sensor:invalid:non-monotonic", "Invalid timestamps detected: non-monotonic timestamp from devicemotion"), this.previousTimestampS = o;
        return;
      } else if (c <= h || c > d) {
        we("fusion-pose-sensor:invalid:outside-threshold", "Invalid timestamps detected: Timestamp from devicemotion outside expected range."), this.previousTimestampS = o;
        return;
      }
      this.accelerometer.set(-n.x, -n.y, -n.z), a && (G() ? this.gyroscope.set(-a.beta, a.alpha, a.gamma) : this.gyroscope.set(a.alpha, a.beta, a.gamma), this.isDeviceMotionInRadians || this.gyroscope.multiplyScalar(Math.PI / 180), this.filter.addGyroMeasurement(this.gyroscope, o)), this.filter.addAccelMeasurement(this.accelerometer, o), this.previousTimestampS = o;
    }, _e.prototype.onOrientationChange_ = function(r) {
      this.setScreenTransform_();
    }, _e.prototype.onMessage_ = function(r) {
      var n = r.data;
      if (!(!n || !n.type)) {
        var a = n.type.toLowerCase();
        a === "devicemotion" && this.updateDeviceMotion_(n.deviceMotionEvent);
      }
    }, _e.prototype.setScreenTransform_ = function() {
      switch (this.worldToScreenQ.set(0, 0, 0, 1), window.orientation) {
        case 0:
          break;
        case 90:
          this.worldToScreenQ.setFromAxisAngle(new ne(0, 0, 1), -Math.PI / 2);
          break;
        case -90:
          this.worldToScreenQ.setFromAxisAngle(new ne(0, 0, 1), Math.PI / 2);
          break;
      }
      this.inverseWorldToScreenQ.copy(this.worldToScreenQ), this.inverseWorldToScreenQ.inverse();
    }, _e.prototype.start = function() {
      this.onDeviceMotionCallback_ = this.onDeviceMotion_.bind(this), this.onOrientationChangeCallback_ = this.onOrientationChange_.bind(this), this.onMessageCallback_ = this.onMessage_.bind(this), this.onDeviceOrientationCallback_ = this.onDeviceOrientation_.bind(this), w() && K() && window.addEventListener("message", this.onMessageCallback_), window.addEventListener("orientationchange", this.onOrientationChangeCallback_), this.isWithoutDeviceMotion ? window.addEventListener("deviceorientation", this.onDeviceOrientationCallback_) : window.addEventListener("devicemotion", this.onDeviceMotionCallback_);
    }, _e.prototype.stop = function() {
      window.removeEventListener("devicemotion", this.onDeviceMotionCallback_), window.removeEventListener("deviceorientation", this.onDeviceOrientationCallback_), window.removeEventListener("orientationchange", this.onOrientationChangeCallback_), window.removeEventListener("message", this.onMessageCallback_);
    };
    var ur = 60, fr = new ne(1, 0, 0), pr = new ne(0, 0, 1), zt = new J();
    zt.setFromAxisAngle(fr, -Math.PI / 2), zt.multiply(new J().setFromAxisAngle(pr, Math.PI / 2));
    var mr = function() {
      function r(n) {
        t(this, r), this.config = n, this.sensor = null, this.fusionSensor = null, this._out = new Float32Array(4), this.api = null, this.errors = [], this._sensorQ = new J(), this._outQ = new J(), this._onSensorRead = this._onSensorRead.bind(this), this._onSensorError = this._onSensorError.bind(this), this.init();
      }
      return s(r, [{
        key: "init",
        value: function() {
          var a = null;
          try {
            a = new RelativeOrientationSensor({
              frequency: ur,
              referenceFrame: "screen"
            }), a.addEventListener("error", this._onSensorError);
          } catch (o) {
            this.errors.push(o), o.name === "SecurityError" ? (console.error("Cannot construct sensors due to the Feature Policy"), console.warn('Attempting to fall back using "devicemotion"; however this will fail in the future without correct permissions.'), this.useDeviceMotion()) : o.name === "ReferenceError" ? this.useDeviceMotion() : console.error(o);
          }
          a && (this.api = "sensor", this.sensor = a, this.sensor.addEventListener("reading", this._onSensorRead), this.sensor.start());
        }
      }, {
        key: "useDeviceMotion",
        value: function() {
          this.api = "devicemotion", this.fusionSensor = new _e(this.config.K_FILTER, this.config.PREDICTION_TIME_S, this.config.YAW_ONLY, this.config.DEBUG), this.sensor && (this.sensor.removeEventListener("reading", this._onSensorRead), this.sensor.removeEventListener("error", this._onSensorError), this.sensor = null);
        }
      }, {
        key: "getOrientation",
        value: function() {
          if (this.fusionSensor)
            return this.fusionSensor.getOrientation();
          if (!this.sensor || !this.sensor.quaternion)
            return this._out[0] = this._out[1] = this._out[2] = 0, this._out[3] = 1, this._out;
          var a = this.sensor.quaternion;
          this._sensorQ.set(a[0], a[1], a[2], a[3]);
          var o = this._outQ;
          return o.copy(zt), o.multiply(this._sensorQ), this.config.YAW_ONLY && (o.x = o.z = 0, o.normalize()), this._out[0] = o.x, this._out[1] = o.y, this._out[2] = o.z, this._out[3] = o.w, this._out;
        }
      }, {
        key: "_onSensorError",
        value: function(a) {
          this.errors.push(a.error), a.error.name === "NotAllowedError" ? console.error("Permission to access sensor was denied") : a.error.name === "NotReadableError" ? console.error("Sensor could not be read") : console.error(a.error), this.useDeviceMotion();
        }
      }, {
        key: "_onSensorRead",
        value: function() {
        }
      }]), r;
    }(), vr = "<svg width='198' height='240' viewBox='0 0 198 240' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><path d='M149.625 109.527l6.737 3.891v.886c0 .177.013.36.038.549.01.081.02.162.027.242.14 1.415.974 2.998 2.105 3.999l5.72 5.062.081-.09s4.382-2.53 5.235-3.024l25.97 14.993v54.001c0 .771-.386 1.217-.948 1.217-.233 0-.495-.076-.772-.236l-23.967-13.838-.014.024-27.322 15.775-.85-1.323c-4.731-1.529-9.748-2.74-14.951-3.61a.27.27 0 0 0-.007.024l-5.067 16.961-7.891 4.556-.037-.063v27.59c0 .772-.386 1.217-.948 1.217-.232 0-.495-.076-.772-.236l-42.473-24.522c-.95-.549-1.72-1.877-1.72-2.967v-1.035l-.021.047a5.111 5.111 0 0 0-1.816-.399 5.682 5.682 0 0 0-.546.001 13.724 13.724 0 0 1-1.918-.041c-1.655-.153-3.2-.6-4.404-1.296l-46.576-26.89.005.012-10.278-18.75c-1.001-1.827-.241-4.216 1.698-5.336l56.011-32.345a4.194 4.194 0 0 1 2.099-.572c1.326 0 2.572.659 3.227 1.853l.005-.003.227.413-.006.004a9.63 9.63 0 0 0 1.477 2.018l.277.27c1.914 1.85 4.468 2.801 7.113 2.801 1.949 0 3.948-.517 5.775-1.572.013 0 7.319-4.219 7.319-4.219a4.194 4.194 0 0 1 2.099-.572c1.326 0 2.572.658 3.226 1.853l3.25 5.928.022-.018 6.785 3.917-.105-.182 46.881-26.965m0-1.635c-.282 0-.563.073-.815.218l-46.169 26.556-5.41-3.124-3.005-5.481c-.913-1.667-2.699-2.702-4.66-2.703-1.011 0-2.02.274-2.917.792a3825 3825 0 0 1-7.275 4.195l-.044.024a9.937 9.937 0 0 1-4.957 1.353c-2.292 0-4.414-.832-5.976-2.342l-.252-.245a7.992 7.992 0 0 1-1.139-1.534 1.379 1.379 0 0 0-.06-.122l-.227-.414a1.718 1.718 0 0 0-.095-.154c-.938-1.574-2.673-2.545-4.571-2.545-1.011 0-2.02.274-2.917.792L3.125 155.502c-2.699 1.559-3.738 4.94-2.314 7.538l10.278 18.75c.177.323.448.563.761.704l46.426 26.804c1.403.81 3.157 1.332 5.072 1.508a15.661 15.661 0 0 0 2.146.046 4.766 4.766 0 0 1 .396 0c.096.004.19.011.283.022.109 1.593 1.159 3.323 2.529 4.114l42.472 24.522c.524.302 1.058.455 1.59.455 1.497 0 2.583-1.2 2.583-2.852v-26.562l7.111-4.105a1.64 1.64 0 0 0 .749-.948l4.658-15.593c4.414.797 8.692 1.848 12.742 3.128l.533.829a1.634 1.634 0 0 0 2.193.531l26.532-15.317L193 192.433c.523.302 1.058.455 1.59.455 1.497 0 2.583-1.199 2.583-2.852v-54.001c0-.584-.312-1.124-.818-1.416l-25.97-14.993a1.633 1.633 0 0 0-1.636.001c-.606.351-2.993 1.73-4.325 2.498l-4.809-4.255c-.819-.725-1.461-1.933-1.561-2.936a7.776 7.776 0 0 0-.033-.294 2.487 2.487 0 0 1-.023-.336v-.886c0-.584-.312-1.123-.817-1.416l-6.739-3.891a1.633 1.633 0 0 0-.817-.219' fill='#455A64'/><path d='M96.027 132.636l46.576 26.891c1.204.695 1.979 1.587 2.242 2.541l-.01.007-81.374 46.982h-.001c-1.654-.152-3.199-.6-4.403-1.295l-46.576-26.891 83.546-48.235' fill='#FAFAFA'/><path d='M63.461 209.174c-.008 0-.015 0-.022-.002-1.693-.156-3.228-.609-4.441-1.309l-46.576-26.89a.118.118 0 0 1 0-.203l83.546-48.235a.117.117 0 0 1 .117 0l46.576 26.891c1.227.708 2.021 1.612 2.296 2.611a.116.116 0 0 1-.042.124l-.021.016-81.375 46.981a.11.11 0 0 1-.058.016zm-50.747-28.303l46.401 26.79c1.178.68 2.671 1.121 4.32 1.276l81.272-46.922c-.279-.907-1.025-1.73-2.163-2.387l-46.517-26.857-83.313 48.1z' fill='#607D8B'/><path d='M148.327 165.471a5.85 5.85 0 0 1-.546.001c-1.894-.083-3.302-1.038-3.145-2.132a2.693 2.693 0 0 0-.072-1.105l-81.103 46.822c.628.058 1.272.073 1.918.042.182-.009.364-.009.546-.001 1.894.083 3.302 1.038 3.145 2.132l79.257-45.759' fill='#FFF'/><path d='M69.07 211.347a.118.118 0 0 1-.115-.134c.045-.317-.057-.637-.297-.925-.505-.61-1.555-1.022-2.738-1.074a5.966 5.966 0 0 0-.535.001 14.03 14.03 0 0 1-1.935-.041.117.117 0 0 1-.103-.092.116.116 0 0 1 .055-.126l81.104-46.822a.117.117 0 0 1 .171.07c.104.381.129.768.074 1.153-.045.316.057.637.296.925.506.61 1.555 1.021 2.739 1.073.178.008.357.008.535-.001a.117.117 0 0 1 .064.218l-79.256 45.759a.114.114 0 0 1-.059.016zm-3.405-2.372c.089 0 .177.002.265.006 1.266.056 2.353.488 2.908 1.158.227.274.35.575.36.882l78.685-45.429c-.036 0-.072-.001-.107-.003-1.267-.056-2.354-.489-2.909-1.158-.282-.34-.402-.724-.347-1.107a2.604 2.604 0 0 0-.032-.91L63.846 208.97a13.91 13.91 0 0 0 1.528.012c.097-.005.194-.007.291-.007z' fill='#607D8B'/><path d='M2.208 162.134c-1.001-1.827-.241-4.217 1.698-5.337l56.011-32.344c1.939-1.12 4.324-.546 5.326 1.281l.232.41a9.344 9.344 0 0 0 1.47 2.021l.278.27c3.325 3.214 8.583 3.716 12.888 1.23l7.319-4.22c1.94-1.119 4.324-.546 5.325 1.282l3.25 5.928-83.519 48.229-10.278-18.75z' fill='#FAFAFA'/><path d='M12.486 181.001a.112.112 0 0 1-.031-.005.114.114 0 0 1-.071-.056L2.106 162.19c-1.031-1.88-.249-4.345 1.742-5.494l56.01-32.344a4.328 4.328 0 0 1 2.158-.588c1.415 0 2.65.702 3.311 1.882.01.008.018.017.024.028l.227.414a.122.122 0 0 1 .013.038 9.508 9.508 0 0 0 1.439 1.959l.275.266c1.846 1.786 4.344 2.769 7.031 2.769 1.977 0 3.954-.538 5.717-1.557a.148.148 0 0 1 .035-.013l7.284-4.206a4.321 4.321 0 0 1 2.157-.588c1.427 0 2.672.716 3.329 1.914l3.249 5.929a.116.116 0 0 1-.044.157l-83.518 48.229a.116.116 0 0 1-.059.016zm49.53-57.004c-.704 0-1.41.193-2.041.557l-56.01 32.345c-1.882 1.086-2.624 3.409-1.655 5.179l10.221 18.645 83.317-48.112-3.195-5.829c-.615-1.122-1.783-1.792-3.124-1.792a4.08 4.08 0 0 0-2.04.557l-7.317 4.225a.148.148 0 0 1-.035.013 11.7 11.7 0 0 1-5.801 1.569c-2.748 0-5.303-1.007-7.194-2.835l-.278-.27a9.716 9.716 0 0 1-1.497-2.046.096.096 0 0 1-.013-.037l-.191-.347a.11.11 0 0 1-.023-.029c-.615-1.123-1.783-1.793-3.124-1.793z' fill='#607D8B'/><path d='M42.434 155.808c-2.51-.001-4.697-1.258-5.852-3.365-1.811-3.304-.438-7.634 3.059-9.654l12.291-7.098a7.599 7.599 0 0 1 3.789-1.033c2.51 0 4.697 1.258 5.852 3.365 1.811 3.304.439 7.634-3.059 9.654l-12.291 7.098a7.606 7.606 0 0 1-3.789 1.033zm13.287-20.683a7.128 7.128 0 0 0-3.555.971l-12.291 7.098c-3.279 1.893-4.573 5.942-2.883 9.024 1.071 1.955 3.106 3.122 5.442 3.122a7.13 7.13 0 0 0 3.556-.97l12.291-7.098c3.279-1.893 4.572-5.942 2.883-9.024-1.072-1.955-3.106-3.123-5.443-3.123z' fill='#607D8B'/><path d='M149.588 109.407l6.737 3.89v.887c0 .176.013.36.037.549.011.081.02.161.028.242.14 1.415.973 2.998 2.105 3.999l7.396 6.545c.177.156.358.295.541.415 1.579 1.04 2.95.466 3.062-1.282.049-.784.057-1.595.023-2.429l-.003-.16v-1.151l25.987 15.003v54c0 1.09-.77 1.53-1.72.982l-42.473-24.523c-.95-.548-1.72-1.877-1.72-2.966v-34.033' fill='#FAFAFA'/><path d='M194.553 191.25c-.257 0-.54-.085-.831-.253l-42.472-24.521c-.981-.567-1.779-1.943-1.779-3.068v-34.033h.234v34.033c0 1.051.745 2.336 1.661 2.866l42.473 24.521c.424.245.816.288 1.103.122.285-.164.442-.52.442-1.002v-53.933l-25.753-14.868.003 1.106c.034.832.026 1.654-.024 2.439-.054.844-.396 1.464-.963 1.746-.619.309-1.45.173-2.28-.373a5.023 5.023 0 0 1-.553-.426l-7.397-6.544c-1.158-1.026-1.999-2.625-2.143-4.076a9.624 9.624 0 0 0-.027-.238 4.241 4.241 0 0 1-.038-.564v-.82l-6.68-3.856.117-.202 6.738 3.89.058.034v.954c0 .171.012.351.036.533.011.083.021.165.029.246.138 1.395.948 2.935 2.065 3.923l7.397 6.545c.173.153.35.289.527.406.758.499 1.504.63 2.047.359.49-.243.786-.795.834-1.551.05-.778.057-1.591.024-2.417l-.004-.163v-1.355l.175.1 25.987 15.004.059.033v54.068c0 .569-.198.996-.559 1.204a1.002 1.002 0 0 1-.506.131' fill='#607D8B'/><path d='M145.685 163.161l24.115 13.922-25.978 14.998-1.462-.307c-6.534-2.17-13.628-3.728-21.019-4.616-4.365-.524-8.663 1.096-9.598 3.62a2.746 2.746 0 0 0-.011 1.928c1.538 4.267 4.236 8.363 7.995 12.135l.532.845-25.977 14.997-24.115-13.922 75.518-43.6' fill='#FFF'/><path d='M94.282 220.818l-.059-.033-24.29-14.024.175-.101 75.577-43.634.058.033 24.29 14.024-26.191 15.122-.045-.01-1.461-.307c-6.549-2.174-13.613-3.725-21.009-4.614a13.744 13.744 0 0 0-1.638-.097c-3.758 0-7.054 1.531-7.837 3.642a2.62 2.62 0 0 0-.01 1.848c1.535 4.258 4.216 8.326 7.968 12.091l.016.021.526.835.006.01.064.102-.105.061-25.977 14.998-.058.033zm-23.881-14.057l23.881 13.788 24.802-14.32c.546-.315.846-.489 1.017-.575l-.466-.74c-3.771-3.787-6.467-7.881-8.013-12.168a2.851 2.851 0 0 1 .011-2.008c.815-2.199 4.203-3.795 8.056-3.795.557 0 1.117.033 1.666.099 7.412.891 14.491 2.445 21.041 4.621.836.175 1.215.254 1.39.304l25.78-14.884-23.881-13.788-75.284 43.466z' fill='#607D8B'/><path d='M167.23 125.979v50.871l-27.321 15.773-6.461-14.167c-.91-1.996-3.428-1.738-5.624.574a10.238 10.238 0 0 0-2.33 4.018l-6.46 21.628-27.322 15.774v-50.871l75.518-43.6' fill='#FFF'/><path d='M91.712 220.567a.127.127 0 0 1-.059-.016.118.118 0 0 1-.058-.101v-50.871c0-.042.023-.08.058-.101l75.519-43.6a.117.117 0 0 1 .175.101v50.871c0 .041-.023.08-.059.1l-27.321 15.775a.118.118 0 0 1-.094.01.12.12 0 0 1-.071-.063l-6.46-14.168c-.375-.822-1.062-1.275-1.934-1.275-1.089 0-2.364.686-3.5 1.881a10.206 10.206 0 0 0-2.302 3.972l-6.46 21.627a.118.118 0 0 1-.054.068L91.77 220.551a.12.12 0 0 1-.058.016zm.117-50.92v50.601l27.106-15.65 6.447-21.583a10.286 10.286 0 0 1 2.357-4.065c1.18-1.242 2.517-1.954 3.669-1.954.969 0 1.731.501 2.146 1.411l6.407 14.051 27.152-15.676v-50.601l-75.284 43.466z' fill='#607D8B'/><path d='M168.543 126.213v50.87l-27.322 15.774-6.46-14.168c-.91-1.995-3.428-1.738-5.624.574a10.248 10.248 0 0 0-2.33 4.019l-6.461 21.627-27.321 15.774v-50.87l75.518-43.6' fill='#FFF'/><path d='M93.025 220.8a.123.123 0 0 1-.059-.015.12.12 0 0 1-.058-.101v-50.871c0-.042.023-.08.058-.101l75.518-43.6a.112.112 0 0 1 .117 0c.036.02.059.059.059.1v50.871a.116.116 0 0 1-.059.101l-27.321 15.774a.111.111 0 0 1-.094.01.115.115 0 0 1-.071-.062l-6.46-14.168c-.375-.823-1.062-1.275-1.935-1.275-1.088 0-2.363.685-3.499 1.881a10.19 10.19 0 0 0-2.302 3.971l-6.461 21.628a.108.108 0 0 1-.053.067l-27.322 15.775a.12.12 0 0 1-.058.015zm.117-50.919v50.6l27.106-15.649 6.447-21.584a10.293 10.293 0 0 1 2.357-4.065c1.179-1.241 2.516-1.954 3.668-1.954.969 0 1.732.502 2.147 1.412l6.407 14.051 27.152-15.676v-50.601l-75.284 43.466z' fill='#607D8B'/><path d='M169.8 177.083l-27.322 15.774-6.46-14.168c-.91-1.995-3.428-1.738-5.625.574a10.246 10.246 0 0 0-2.329 4.019l-6.461 21.627-27.321 15.774v-50.87l75.518-43.6v50.87z' fill='#FAFAFA'/><path d='M94.282 220.917a.234.234 0 0 1-.234-.233v-50.871c0-.083.045-.161.117-.202l75.518-43.601a.234.234 0 1 1 .35.202v50.871a.233.233 0 0 1-.116.202l-27.322 15.775a.232.232 0 0 1-.329-.106l-6.461-14.168c-.36-.789-.992-1.206-1.828-1.206-1.056 0-2.301.672-3.415 1.844a10.099 10.099 0 0 0-2.275 3.924l-6.46 21.628a.235.235 0 0 1-.107.136l-27.322 15.774a.23.23 0 0 1-.116.031zm.233-50.969v50.331l26.891-15.525 6.434-21.539a10.41 10.41 0 0 1 2.384-4.112c1.201-1.265 2.569-1.991 3.753-1.991 1.018 0 1.818.526 2.253 1.48l6.354 13.934 26.982-15.578v-50.331l-75.051 43.331z' fill='#607D8B'/><path d='M109.894 199.943c-1.774 0-3.241-.725-4.244-2.12a.224.224 0 0 1 .023-.294.233.233 0 0 1 .301-.023c.78.547 1.705.827 2.75.827 1.323 0 2.754-.439 4.256-1.306 5.311-3.067 9.631-10.518 9.631-16.611 0-1.927-.442-3.56-1.278-4.724a.232.232 0 0 1 .323-.327c1.671 1.172 2.591 3.381 2.591 6.219 0 6.242-4.426 13.863-9.865 17.003-1.574.908-3.084 1.356-4.488 1.356zm-2.969-1.542c.813.651 1.82.877 2.968.877h.001c1.321 0 2.753-.327 4.254-1.194 5.311-3.067 9.632-10.463 9.632-16.556 0-1.979-.463-3.599-1.326-4.761.411 1.035.625 2.275.625 3.635 0 6.243-4.426 13.883-9.865 17.023-1.574.909-3.084 1.317-4.49 1.317-.641 0-1.243-.149-1.799-.341z' fill='#607D8B'/><path d='M113.097 197.23c5.384-3.108 9.748-10.636 9.748-16.814 0-2.051-.483-3.692-1.323-4.86-1.784-1.252-4.374-1.194-7.257.47-5.384 3.108-9.748 10.636-9.748 16.814 0 2.051.483 3.692 1.323 4.86 1.784 1.252 4.374 1.194 7.257-.47' fill='#FAFAFA'/><path d='M108.724 198.614c-1.142 0-2.158-.213-3.019-.817-.021-.014-.04.014-.055-.007-.894-1.244-1.367-2.948-1.367-4.973 0-6.242 4.426-13.864 9.865-17.005 1.574-.908 3.084-1.363 4.49-1.363 1.142 0 2.158.309 3.018.913a.23.23 0 0 1 .056.056c.894 1.244 1.367 2.972 1.367 4.997 0 6.243-4.426 13.783-9.865 16.923-1.574.909-3.084 1.276-4.49 1.276zm-2.718-1.109c.774.532 1.688.776 2.718.776 1.323 0 2.754-.413 4.256-1.28 5.311-3.066 9.631-10.505 9.631-16.598 0-1.909-.434-3.523-1.255-4.685-.774-.533-1.688-.799-2.718-.799-1.323 0-2.755.441-4.256 1.308-5.311 3.066-9.631 10.506-9.631 16.599 0 1.909.434 3.517 1.255 4.679z' fill='#607D8B'/><path d='M149.318 114.262l-9.984 8.878 15.893 11.031 5.589-6.112-11.498-13.797' fill='#FAFAFA'/><path d='M169.676 120.84l-9.748 5.627c-3.642 2.103-9.528 2.113-13.147.024-3.62-2.089-3.601-5.488.041-7.591l9.495-5.608-6.729-3.885-81.836 47.071 45.923 26.514 3.081-1.779c.631-.365.869-.898.618-1.39-2.357-4.632-2.593-9.546-.683-14.262 5.638-13.92 24.509-24.815 48.618-28.07 8.169-1.103 16.68-.967 24.704.394.852.145 1.776.008 2.407-.357l3.081-1.778-25.825-14.91' fill='#FAFAFA'/><path d='M113.675 183.459a.47.47 0 0 1-.233-.062l-45.924-26.515a.468.468 0 0 1 .001-.809l81.836-47.071a.467.467 0 0 1 .466 0l6.729 3.885a.467.467 0 0 1-.467.809l-6.496-3.75-80.9 46.533 44.988 25.973 2.848-1.644c.192-.111.62-.409.435-.773-2.416-4.748-2.658-9.814-.7-14.65 2.806-6.927 8.885-13.242 17.582-18.263 8.657-4.998 19.518-8.489 31.407-10.094 8.198-1.107 16.79-.97 24.844.397.739.125 1.561.007 2.095-.301l2.381-1.374-25.125-14.506a.467.467 0 0 1 .467-.809l25.825 14.91a.467.467 0 0 1 0 .809l-3.081 1.779c-.721.417-1.763.575-2.718.413-7.963-1.351-16.457-1.486-24.563-.392-11.77 1.589-22.512 5.039-31.065 9.977-8.514 4.916-14.456 11.073-17.183 17.805-1.854 4.578-1.623 9.376.666 13.875.37.725.055 1.513-.8 2.006l-3.081 1.78a.476.476 0 0 1-.234.062' fill='#455A64'/><path d='M153.316 128.279c-2.413 0-4.821-.528-6.652-1.586-1.818-1.049-2.82-2.461-2.82-3.975 0-1.527 1.016-2.955 2.861-4.02l9.493-5.607a.233.233 0 1 1 .238.402l-9.496 5.609c-1.696.979-2.628 2.263-2.628 3.616 0 1.34.918 2.608 2.585 3.571 3.549 2.049 9.343 2.038 12.914-.024l9.748-5.628a.234.234 0 0 1 .234.405l-9.748 5.628c-1.858 1.072-4.296 1.609-6.729 1.609' fill='#607D8B'/><path d='M113.675 182.992l-45.913-26.508M113.675 183.342a.346.346 0 0 1-.175-.047l-45.913-26.508a.35.35 0 1 1 .35-.607l45.913 26.508a.35.35 0 0 1-.175.654' fill='#455A64'/><path d='M67.762 156.484v54.001c0 1.09.77 2.418 1.72 2.967l42.473 24.521c.95.549 1.72.11 1.72-.98v-54.001' fill='#FAFAFA'/><path d='M112.727 238.561c-.297 0-.62-.095-.947-.285l-42.473-24.521c-1.063-.613-1.895-2.05-1.895-3.27v-54.001a.35.35 0 1 1 .701 0v54.001c0 .96.707 2.18 1.544 2.663l42.473 24.522c.344.198.661.243.87.122.206-.119.325-.411.325-.799v-54.001a.35.35 0 1 1 .7 0v54.001c0 .655-.239 1.154-.675 1.406a1.235 1.235 0 0 1-.623.162' fill='#455A64'/><path d='M112.86 147.512h-.001c-2.318 0-4.499-.522-6.142-1.471-1.705-.984-2.643-2.315-2.643-3.749 0-1.445.952-2.791 2.68-3.788l12.041-6.953c1.668-.962 3.874-1.493 6.212-1.493 2.318 0 4.499.523 6.143 1.472 1.704.984 2.643 2.315 2.643 3.748 0 1.446-.952 2.791-2.68 3.789l-12.042 6.952c-1.668.963-3.874 1.493-6.211 1.493zm12.147-16.753c-2.217 0-4.298.497-5.861 1.399l-12.042 6.952c-1.502.868-2.33 1.998-2.33 3.182 0 1.173.815 2.289 2.293 3.142 1.538.889 3.596 1.378 5.792 1.378h.001c2.216 0 4.298-.497 5.861-1.399l12.041-6.953c1.502-.867 2.33-1.997 2.33-3.182 0-1.172-.814-2.288-2.292-3.142-1.539-.888-3.596-1.377-5.793-1.377z' fill='#607D8B'/><path d='M165.63 123.219l-5.734 3.311c-3.167 1.828-8.286 1.837-11.433.02-3.147-1.817-3.131-4.772.036-6.601l5.734-3.31 11.397 6.58' fill='#FAFAFA'/><path d='M154.233 117.448l9.995 5.771-4.682 2.704c-1.434.827-3.352 1.283-5.399 1.283-2.029 0-3.923-.449-5.333-1.263-1.29-.744-2-1.694-2-2.674 0-.991.723-1.955 2.036-2.713l5.383-3.108m0-.809l-5.734 3.31c-3.167 1.829-3.183 4.784-.036 6.601 1.568.905 3.623 1.357 5.684 1.357 2.077 0 4.159-.46 5.749-1.377l5.734-3.311-11.397-6.58M145.445 179.667c-1.773 0-3.241-.85-4.243-2.245-.067-.092-.057-.275.023-.356.08-.081.207-.12.3-.055.781.548 1.706.812 2.751.811 1.322 0 2.754-.446 4.256-1.313 5.31-3.066 9.631-10.522 9.631-16.615 0-1.927-.442-3.562-1.279-4.726a.235.235 0 0 1 .024-.301.232.232 0 0 1 .3-.027c1.67 1.172 2.59 3.38 2.59 6.219 0 6.242-4.425 13.987-9.865 17.127-1.573.908-3.083 1.481-4.488 1.481zM142.476 178c.814.651 1.82 1.002 2.969 1.002 1.322 0 2.753-.452 4.255-1.32 5.31-3.065 9.631-10.523 9.631-16.617 0-1.98-.463-3.63-1.325-4.793.411 1.035.624 2.26.624 3.62 0 6.242-4.425 13.875-9.865 17.015-1.573.909-3.084 1.376-4.489 1.376a5.49 5.49 0 0 1-1.8-.283z' fill='#607D8B'/><path d='M148.648 176.704c5.384-3.108 9.748-10.636 9.748-16.813 0-2.052-.483-3.693-1.322-4.861-1.785-1.252-4.375-1.194-7.258.471-5.383 3.108-9.748 10.636-9.748 16.813 0 2.051.484 3.692 1.323 4.86 1.785 1.253 4.374 1.195 7.257-.47' fill='#FAFAFA'/><path d='M144.276 178.276c-1.143 0-2.158-.307-3.019-.911a.217.217 0 0 1-.055-.054c-.895-1.244-1.367-2.972-1.367-4.997 0-6.241 4.425-13.875 9.865-17.016 1.573-.908 3.084-1.369 4.489-1.369 1.143 0 2.158.307 3.019.91a.24.24 0 0 1 .055.055c.894 1.244 1.367 2.971 1.367 4.997 0 6.241-4.425 13.875-9.865 17.016-1.573.908-3.084 1.369-4.489 1.369zm-2.718-1.172c.773.533 1.687.901 2.718.901 1.322 0 2.754-.538 4.256-1.405 5.31-3.066 9.631-10.567 9.631-16.661 0-1.908-.434-3.554-1.256-4.716-.774-.532-1.688-.814-2.718-.814-1.322 0-2.754.433-4.256 1.3-5.31 3.066-9.631 10.564-9.631 16.657 0 1.91.434 3.576 1.256 4.738z' fill='#607D8B'/><path d='M150.72 172.361l-.363-.295a24.105 24.105 0 0 0 2.148-3.128 24.05 24.05 0 0 0 1.977-4.375l.443.149a24.54 24.54 0 0 1-2.015 4.46 24.61 24.61 0 0 1-2.19 3.189M115.917 191.514l-.363-.294a24.174 24.174 0 0 0 2.148-3.128 24.038 24.038 0 0 0 1.976-4.375l.443.148a24.48 24.48 0 0 1-2.015 4.461 24.662 24.662 0 0 1-2.189 3.188M114 237.476V182.584 237.476' fill='#607D8B'/><g><path d='M81.822 37.474c.017-.135-.075-.28-.267-.392-.327-.188-.826-.21-1.109-.045l-6.012 3.471c-.131.076-.194.178-.191.285.002.132.002.461.002.578v.043l-.007.128-6.591 3.779c-.001 0-2.077 1.046-2.787 5.192 0 0-.912 6.961-.898 19.745.015 12.57.606 17.07 1.167 21.351.22 1.684 3.001 2.125 3.001 2.125.331.04.698-.027 1.08-.248l75.273-43.551c1.808-1.069 2.667-3.719 3.056-6.284 1.213-7.99 1.675-32.978-.275-39.878-.196-.693-.51-1.083-.868-1.282l-2.086-.79c-.727.028-1.416.467-1.534.535L82.032 37.072l-.21.402' fill='#FFF'/><path d='M144.311 1.701l2.085.79c.358.199.672.589.868 1.282 1.949 6.9 1.487 31.887.275 39.878-.39 2.565-1.249 5.215-3.056 6.284L69.21 93.486a1.78 1.78 0 0 1-.896.258l-.183-.011c0 .001-2.782-.44-3.003-2.124-.56-4.282-1.151-8.781-1.165-21.351-.015-12.784.897-19.745.897-19.745.71-4.146 2.787-5.192 2.787-5.192l6.591-3.779.007-.128v-.043c0-.117 0-.446-.002-.578-.003-.107.059-.21.191-.285l6.012-3.472a.98.98 0 0 1 .481-.11c.218 0 .449.053.627.156.193.112.285.258.268.392l.211-.402 60.744-34.836c.117-.068.806-.507 1.534-.535m0-.997l-.039.001c-.618.023-1.283.244-1.974.656l-.021.012-60.519 34.706a2.358 2.358 0 0 0-.831-.15c-.365 0-.704.084-.98.244l-6.012 3.471c-.442.255-.699.69-.689 1.166l.001.15-6.08 3.487c-.373.199-2.542 1.531-3.29 5.898l-.006.039c-.009.07-.92 7.173-.906 19.875.014 12.62.603 17.116 1.172 21.465l.002.015c.308 2.355 3.475 2.923 3.836 2.98l.034.004c.101.013.204.019.305.019a2.77 2.77 0 0 0 1.396-.392l75.273-43.552c1.811-1.071 2.999-3.423 3.542-6.997 1.186-7.814 1.734-33.096-.301-40.299-.253-.893-.704-1.527-1.343-1.882l-.132-.062-2.085-.789a.973.973 0 0 0-.353-.065' fill='#455A64'/><path d='M128.267 11.565l1.495.434-56.339 32.326' fill='#FFF'/><path d='M74.202 90.545a.5.5 0 0 1-.25-.931l18.437-10.645a.499.499 0 1 1 .499.864L74.451 90.478l-.249.067M75.764 42.654l-.108-.062.046-.171 5.135-2.964.17.045-.045.171-5.135 2.964-.063.017M70.52 90.375V46.421l.063-.036L137.84 7.554v43.954l-.062.036L70.52 90.375zm.25-43.811v43.38l66.821-38.579V7.985L70.77 46.564z' fill='#607D8B'/><path d='M86.986 83.182c-.23.149-.612.384-.849.523l-11.505 6.701c-.237.139-.206.252.068.252h.565c.275 0 .693-.113.93-.252L87.7 83.705c.237-.139.428-.253.425-.256a11.29 11.29 0 0 1-.006-.503c0-.274-.188-.377-.418-.227l-.715.463' fill='#607D8B'/><path d='M75.266 90.782H74.7c-.2 0-.316-.056-.346-.166-.03-.11.043-.217.215-.317l11.505-6.702c.236-.138.615-.371.844-.519l.715-.464a.488.488 0 0 1 .266-.089c.172 0 .345.13.345.421 0 .214.001.363.003.437l.006.004-.004.069c-.003.075-.003.075-.486.356l-11.505 6.702a2.282 2.282 0 0 1-.992.268zm-.6-.25l.034.001h.566c.252 0 .649-.108.866-.234l11.505-6.702c.168-.098.294-.173.361-.214-.004-.084-.004-.218-.004-.437l-.095-.171-.131.049-.714.463c-.232.15-.616.386-.854.525l-11.505 6.702-.029.018z' fill='#607D8B'/><path d='M75.266 89.871H74.7c-.2 0-.316-.056-.346-.166-.03-.11.043-.217.215-.317l11.505-6.702c.258-.151.694-.268.993-.268h.565c.2 0 .316.056.346.166.03.11-.043.217-.215.317l-11.505 6.702a2.282 2.282 0 0 1-.992.268zm-.6-.25l.034.001h.566c.252 0 .649-.107.866-.234l11.505-6.702.03-.018-.035-.001h-.565c-.252 0-.649.108-.867.234l-11.505 6.702-.029.018zM74.37 90.801v-1.247 1.247' fill='#607D8B'/><path d='M68.13 93.901c-.751-.093-1.314-.737-1.439-1.376-.831-4.238-1.151-8.782-1.165-21.352-.015-12.784.897-19.745.897-19.745.711-4.146 2.787-5.192 2.787-5.192l74.859-43.219c.223-.129 2.487-1.584 3.195.923 1.95 6.9 1.488 31.887.275 39.878-.389 2.565-1.248 5.215-3.056 6.283L69.21 93.653c-.382.221-.749.288-1.08.248 0 0-2.781-.441-3.001-2.125-.561-4.281-1.152-8.781-1.167-21.351-.014-12.784.898-19.745.898-19.745.71-4.146 2.787-5.191 2.787-5.191l6.598-3.81.871-.119 6.599-3.83.046-.461L68.13 93.901' fill='#FAFAFA'/><path d='M68.317 94.161l-.215-.013h-.001l-.244-.047c-.719-.156-2.772-.736-2.976-2.292-.568-4.34-1.154-8.813-1.168-21.384-.014-12.654.891-19.707.9-19.777.725-4.231 2.832-5.338 2.922-5.382l6.628-3.827.87-.119 6.446-3.742.034-.334a.248.248 0 0 1 .273-.223.248.248 0 0 1 .223.272l-.059.589-6.752 3.919-.87.118-6.556 3.785c-.031.016-1.99 1.068-2.666 5.018-.007.06-.908 7.086-.894 19.702.014 12.539.597 16.996 1.161 21.305.091.691.689 1.154 1.309 1.452a1.95 1.95 0 0 1-.236-.609c-.781-3.984-1.155-8.202-1.17-21.399-.014-12.653.891-19.707.9-19.777.725-4.231 2.832-5.337 2.922-5.382-.004.001 74.444-42.98 74.846-43.212l.028-.017c.904-.538 1.72-.688 2.36-.433.555.221.949.733 1.172 1.52 2.014 7.128 1.46 32.219.281 39.983-.507 3.341-1.575 5.515-3.175 6.462L69.335 93.869a2.023 2.023 0 0 1-1.018.292zm-.147-.507c.293.036.604-.037.915-.217l75.273-43.551c1.823-1.078 2.602-3.915 2.934-6.106 1.174-7.731 1.731-32.695-.268-39.772-.178-.631-.473-1.032-.876-1.192-.484-.193-1.166-.052-1.921.397l-.034.021-74.858 43.218c-.031.017-1.989 1.069-2.666 5.019-.007.059-.908 7.085-.894 19.702.015 13.155.386 17.351 1.161 21.303.09.461.476.983 1.037 1.139.114.025.185.037.196.039h.001z' fill='#455A64'/><path d='M69.317 68.982c.489-.281.885-.056.885.505 0 .56-.396 1.243-.885 1.525-.488.282-.884.057-.884-.504 0-.56.396-1.243.884-1.526' fill='#FFF'/><path d='M68.92 71.133c-.289 0-.487-.228-.487-.625 0-.56.396-1.243.884-1.526a.812.812 0 0 1 .397-.121c.289 0 .488.229.488.626 0 .56-.396 1.243-.885 1.525a.812.812 0 0 1-.397.121m.794-2.459a.976.976 0 0 0-.49.147c-.548.317-.978 1.058-.978 1.687 0 .486.271.812.674.812a.985.985 0 0 0 .491-.146c.548-.317.978-1.057.978-1.687 0-.486-.272-.813-.675-.813' fill='#8097A2'/><path d='M68.92 70.947c-.271 0-.299-.307-.299-.439 0-.491.361-1.116.79-1.363a.632.632 0 0 1 .303-.096c.272 0 .301.306.301.438 0 .491-.363 1.116-.791 1.364a.629.629 0 0 1-.304.096m.794-2.086a.812.812 0 0 0-.397.121c-.488.283-.884.966-.884 1.526 0 .397.198.625.487.625a.812.812 0 0 0 .397-.121c.489-.282.885-.965.885-1.525 0-.397-.199-.626-.488-.626' fill='#8097A2'/><path d='M69.444 85.35c.264-.152.477-.031.477.272 0 .303-.213.67-.477.822-.263.153-.477.031-.477-.271 0-.302.214-.671.477-.823' fill='#FFF'/><path d='M69.23 86.51c-.156 0-.263-.123-.263-.337 0-.302.214-.671.477-.823a.431.431 0 0 1 .214-.066c.156 0 .263.124.263.338 0 .303-.213.67-.477.822a.431.431 0 0 1-.214.066m.428-1.412c-.1 0-.203.029-.307.09-.32.185-.57.618-.57.985 0 .309.185.524.449.524a.63.63 0 0 0 .308-.09c.32-.185.57-.618.57-.985 0-.309-.185-.524-.45-.524' fill='#8097A2'/><path d='M69.23 86.322l-.076-.149c0-.235.179-.544.384-.661l.12-.041.076.151c0 .234-.179.542-.383.66l-.121.04m.428-1.038a.431.431 0 0 0-.214.066c-.263.152-.477.521-.477.823 0 .214.107.337.263.337a.431.431 0 0 0 .214-.066c.264-.152.477-.519.477-.822 0-.214-.107-.338-.263-.338' fill='#8097A2'/><path d='M139.278 7.769v43.667L72.208 90.16V46.493l67.07-38.724' fill='#455A64'/><path d='M72.083 90.375V46.421l.063-.036 67.257-38.831v43.954l-.062.036-67.258 38.831zm.25-43.811v43.38l66.821-38.579V7.985L72.333 46.564z' fill='#607D8B'/></g><path d='M125.737 88.647l-7.639 3.334V84l-11.459 4.713v8.269L99 100.315l13.369 3.646 13.368-15.314' fill='#455A64'/></g></svg>";
    function We() {
      this.loadIcon_();
      var r = document.createElement("div"), f = r.style;
      f.position = "fixed", f.top = 0, f.right = 0, f.bottom = 0, f.left = 0, f.backgroundColor = "gray", f.fontFamily = "sans-serif", f.zIndex = 1e6;
      var n = document.createElement("img");
      n.src = this.icon;
      var f = n.style;
      f.marginLeft = "25%", f.marginTop = "25%", f.width = "50%", r.appendChild(n);
      var a = document.createElement("div"), f = a.style;
      f.textAlign = "center", f.fontSize = "16px", f.lineHeight = "24px", f.margin = "24px 25%", f.width = "50%", a.innerHTML = "Place your phone into your Cardboard viewer.", r.appendChild(a);
      var o = document.createElement("div"), f = o.style;
      f.backgroundColor = "#CFD8DC", f.position = "fixed", f.bottom = 0, f.width = "100%", f.height = "48px", f.padding = "14px 24px", f.boxSizing = "border-box", f.color = "#656A6B", r.appendChild(o);
      var c = document.createElement("div");
      c.style.float = "left", c.innerHTML = "No Cardboard viewer?";
      var A = document.createElement("a");
      A.href = "https://www.google.com/get/cardboard/get-cardboard/", A.innerHTML = "get one", A.target = "_blank";
      var f = A.style;
      f.float = "right", f.fontWeight = 600, f.textTransform = "uppercase", f.borderLeft = "1px solid gray", f.paddingLeft = "24px", f.textDecoration = "none", f.color = "#656A6B", o.appendChild(c), o.appendChild(A), this.overlay = r, this.text = a, this.hide();
    }
    We.prototype.show = function(r) {
      !r && !this.overlay.parentElement ? document.body.appendChild(this.overlay) : r && (this.overlay.parentElement && this.overlay.parentElement != r && this.overlay.parentElement.removeChild(this.overlay), r.appendChild(this.overlay)), this.overlay.style.display = "block";
      var n = this.overlay.querySelector("img"), a = n.style;
      v() ? (a.width = "20%", a.marginLeft = "40%", a.marginTop = "3%") : (a.width = "50%", a.marginLeft = "25%", a.marginTop = "25%");
    }, We.prototype.hide = function() {
      this.overlay.style.display = "none";
    }, We.prototype.showTemporarily = function(r, n) {
      this.show(n), this.timer = setTimeout(this.hide.bind(this), r);
    }, We.prototype.disableShowTemporarily = function() {
      clearTimeout(this.timer);
    }, We.prototype.update = function() {
      this.disableShowTemporarily(), !v() && T() ? this.show() : this.hide();
    }, We.prototype.loadIcon_ = function() {
      this.icon = u("image/svg+xml", vr);
    };
    var wr = "CardboardV1", ui = "WEBVR_CARDBOARD_VIEWER", yr = "webvr-polyfill-viewer-selector";
    function Re(r) {
      try {
        this.selectedKey = localStorage.getItem(ui);
      } catch (n) {
        console.error("Failed to load viewer profile: %s", n);
      }
      this.selectedKey || (this.selectedKey = r || wr), this.dialog = this.createDialog_(le.Viewers), this.root = null, this.onChangeCallbacks_ = [];
    }
    Re.prototype.show = function(r) {
      this.root = r, r.appendChild(this.dialog);
      var n = this.dialog.querySelector("#" + this.selectedKey);
      n.checked = !0, this.dialog.style.display = "block";
    }, Re.prototype.hide = function() {
      this.root && this.root.contains(this.dialog) && this.root.removeChild(this.dialog), this.dialog.style.display = "none";
    }, Re.prototype.getCurrentViewer = function() {
      return le.Viewers[this.selectedKey];
    }, Re.prototype.getSelectedKey_ = function() {
      var r = this.dialog.querySelector("input[name=field]:checked");
      return r ? r.id : null;
    }, Re.prototype.onChange = function(r) {
      this.onChangeCallbacks_.push(r);
    }, Re.prototype.fireOnChange_ = function(r) {
      for (var n = 0; n < this.onChangeCallbacks_.length; n++)
        this.onChangeCallbacks_[n](r);
    }, Re.prototype.onSave_ = function() {
      if (this.selectedKey = this.getSelectedKey_(), !this.selectedKey || !le.Viewers[this.selectedKey]) {
        console.error("ViewerSelector.onSave_: this should never happen!");
        return;
      }
      this.fireOnChange_(le.Viewers[this.selectedKey]);
      try {
        localStorage.setItem(ui, this.selectedKey);
      } catch (r) {
        console.error("Failed to save viewer profile: %s", r);
      }
      this.hide();
    }, Re.prototype.createDialog_ = function(r) {
      var n = document.createElement("div");
      n.classList.add(yr), n.style.display = "none";
      var a = document.createElement("div"), A = a.style;
      A.position = "fixed", A.left = 0, A.top = 0, A.width = "100%", A.height = "100%", A.background = "rgba(0, 0, 0, 0.3)", a.addEventListener("click", this.hide.bind(this));
      var o = 280, c = document.createElement("div"), A = c.style;
      A.boxSizing = "border-box", A.position = "fixed", A.top = "24px", A.left = "50%", A.marginLeft = -o / 2 + "px", A.width = o + "px", A.padding = "24px", A.overflow = "hidden", A.background = "#fafafa", A.fontFamily = "'Roboto', sans-serif", A.boxShadow = "0px 5px 20px #666", c.appendChild(this.createH1_("Select your viewer"));
      for (var f in r)
        c.appendChild(this.createChoice_(f, r[f].label));
      return c.appendChild(this.createButton_("Save", this.onSave_.bind(this))), n.appendChild(a), n.appendChild(c), n;
    }, Re.prototype.createH1_ = function(r) {
      var n = document.createElement("h1"), a = n.style;
      return a.color = "black", a.fontSize = "20px", a.fontWeight = "bold", a.marginTop = 0, a.marginBottom = "24px", n.innerHTML = r, n;
    }, Re.prototype.createChoice_ = function(r, n) {
      var a = document.createElement("div");
      a.style.marginTop = "8px", a.style.color = "black";
      var o = document.createElement("input");
      o.style.fontSize = "30px", o.setAttribute("id", r), o.setAttribute("type", "radio"), o.setAttribute("value", r), o.setAttribute("name", "field");
      var c = document.createElement("label");
      return c.style.marginLeft = "4px", c.setAttribute("for", r), c.innerHTML = n, a.appendChild(o), a.appendChild(c), a;
    }, Re.prototype.createButton_ = function(r, n) {
      var a = document.createElement("button");
      a.innerHTML = r;
      var o = a.style;
      return o.float = "right", o.textTransform = "uppercase", o.color = "#1094f7", o.fontSize = "14px", o.letterSpacing = 0, o.border = 0, o.background = "none", o.marginTop = "16px", a.addEventListener("click", n), a;
    };
    var br = typeof window < "u" ? window : typeof Zt < "u" ? Zt : typeof self < "u" ? self : {};
    function gr(r) {
      return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
    }
    function Er(r, n) {
      return n = { exports: {} }, r(n, n.exports), n.exports;
    }
    var xr = Er(function(r, n) {
      (function(o, c) {
        r.exports = c();
      })(br, function() {
        return function(a) {
          var o = {};
          function c(A) {
            if (o[A])
              return o[A].exports;
            var f = o[A] = {
              i: A,
              l: !1,
              exports: {}
            };
            return a[A].call(f.exports, f, f.exports, c), f.l = !0, f.exports;
          }
          return c.m = a, c.c = o, c.d = function(A, f, S) {
            c.o(A, f) || Object.defineProperty(A, f, {
              configurable: !1,
              enumerable: !0,
              get: S
            });
          }, c.n = function(A) {
            var f = A && A.__esModule ? function() {
              return A.default;
            } : function() {
              return A;
            };
            return c.d(f, "a", f), f;
          }, c.o = function(A, f) {
            return Object.prototype.hasOwnProperty.call(A, f);
          }, c.p = "", c(c.s = 0);
        }([
          function(a, o, c) {
            var A = function() {
              function y(F, V) {
                for (var z = 0; z < V.length; z++) {
                  var X = V[z];
                  X.enumerable = X.enumerable || !1, X.configurable = !0, "value" in X && (X.writable = !0), Object.defineProperty(F, X.key, X);
                }
              }
              return function(F, V, z) {
                return V && y(F.prototype, V), z && y(F, z), F;
              };
            }();
            function f(y, F) {
              if (!(y instanceof F))
                throw new TypeError("Cannot call a class as a function");
            }
            var S = c(1), E = typeof navigator < "u" && parseFloat(("" + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) < 10 && !window.MSStream, p = function() {
              function y() {
                f(this, y), E ? this.noSleepTimer = null : (this.noSleepVideo = document.createElement("video"), this.noSleepVideo.setAttribute("playsinline", ""), this.noSleepVideo.setAttribute("src", S), this.noSleepVideo.addEventListener("timeupdate", function(F) {
                  this.noSleepVideo.currentTime > 0.5 && (this.noSleepVideo.currentTime = Math.random());
                }.bind(this)));
              }
              return A(y, [{
                key: "enable",
                value: function() {
                  E ? (this.disable(), this.noSleepTimer = window.setInterval(function() {
                    window.location.href = "/", window.setTimeout(window.stop, 0);
                  }, 15e3)) : this.noSleepVideo.play();
                }
              }, {
                key: "disable",
                value: function() {
                  E ? this.noSleepTimer && (window.clearInterval(this.noSleepTimer), this.noSleepTimer = null) : this.noSleepVideo.pause();
                }
              }]), y;
            }();
            a.exports = p;
          },
          function(a, o, c) {
            a.exports = "data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC8wYF///v3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9MzAwIGtleWludF9taW49MzAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD0xMCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIwLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAOWWIhAA3//p+C7v8tDDSTjf97w55i3SbRPO4ZY+hkjD5hbkAkL3zpJ6h/LR1CAABzgB1kqqzUorlhQAAAAxBmiQYhn/+qZYADLgAAAAJQZ5CQhX/AAj5IQADQGgcIQADQGgcAAAACQGeYUQn/wALKCEAA0BoHAAAAAkBnmNEJ/8ACykhAANAaBwhAANAaBwAAAANQZpoNExDP/6plgAMuSEAA0BoHAAAAAtBnoZFESwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBnqVEJ/8ACykhAANAaBwAAAAJAZ6nRCf/AAsoIQADQGgcIQADQGgcAAAADUGarDRMQz/+qZYADLghAANAaBwAAAALQZ7KRRUsK/8ACPkhAANAaBwAAAAJAZ7pRCf/AAsoIQADQGgcIQADQGgcAAAACQGe60Qn/wALKCEAA0BoHAAAAA1BmvA0TEM//qmWAAy5IQADQGgcIQADQGgcAAAAC0GfDkUVLCv/AAj5IQADQGgcAAAACQGfLUQn/wALKSEAA0BoHCEAA0BoHAAAAAkBny9EJ/8ACyghAANAaBwAAAANQZs0NExDP/6plgAMuCEAA0BoHAAAAAtBn1JFFSwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBn3FEJ/8ACyghAANAaBwAAAAJAZ9zRCf/AAsoIQADQGgcIQADQGgcAAAADUGbeDRMQz/+qZYADLkhAANAaBwAAAALQZ+WRRUsK/8ACPghAANAaBwhAANAaBwAAAAJAZ+1RCf/AAspIQADQGgcAAAACQGft0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bm7w0TEM//qmWAAy4IQADQGgcAAAAC0Gf2kUVLCv/AAj5IQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHAAAAAkBn/tEJ/8ACykhAANAaBwAAAANQZvgNExDP/6plgAMuSEAA0BoHCEAA0BoHAAAAAtBnh5FFSwr/wAI+CEAA0BoHAAAAAkBnj1EJ/8ACyghAANAaBwhAANAaBwAAAAJAZ4/RCf/AAspIQADQGgcAAAADUGaJDRMQz/+qZYADLghAANAaBwAAAALQZ5CRRUsK/8ACPkhAANAaBwhAANAaBwAAAAJAZ5hRCf/AAsoIQADQGgcAAAACQGeY0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bmmg0TEM//qmWAAy5IQADQGgcAAAAC0GehkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGepUQn/wALKSEAA0BoHAAAAAkBnqdEJ/8ACyghAANAaBwAAAANQZqsNExDP/6plgAMuCEAA0BoHCEAA0BoHAAAAAtBnspFFSwr/wAI+SEAA0BoHAAAAAkBnulEJ/8ACyghAANAaBwhAANAaBwAAAAJAZ7rRCf/AAsoIQADQGgcAAAADUGa8DRMQz/+qZYADLkhAANAaBwhAANAaBwAAAALQZ8ORRUsK/8ACPkhAANAaBwAAAAJAZ8tRCf/AAspIQADQGgcIQADQGgcAAAACQGfL0Qn/wALKCEAA0BoHAAAAA1BmzQ0TEM//qmWAAy4IQADQGgcAAAAC0GfUkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGfcUQn/wALKCEAA0BoHAAAAAkBn3NEJ/8ACyghAANAaBwhAANAaBwAAAANQZt4NExC//6plgAMuSEAA0BoHAAAAAtBn5ZFFSwr/wAI+CEAA0BoHCEAA0BoHAAAAAkBn7VEJ/8ACykhAANAaBwAAAAJAZ+3RCf/AAspIQADQGgcAAAADUGbuzRMQn/+nhAAYsAhAANAaBwhAANAaBwAAAAJQZ/aQhP/AAspIQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHAAACiFtb292AAAAbG12aGQAAAAA1YCCX9WAgl8AAAPoAAAH/AABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAGGlvZHMAAAAAEICAgAcAT////v7/AAAF+XRyYWsAAABcdGtoZAAAAAPVgIJf1YCCXwAAAAEAAAAAAAAH0AAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAygAAAMoAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAB9AAABdwAAEAAAAABXFtZGlhAAAAIG1kaGQAAAAA1YCCX9WAgl8AAV+QAAK/IFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAUcbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAE3HN0YmwAAACYc3RzZAAAAAAAAAABAAAAiGF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAygDKAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAyYXZjQwFNQCj/4QAbZ01AKOyho3ySTUBAQFAAAAMAEAAr8gDxgxlgAQAEaO+G8gAAABhzdHRzAAAAAAAAAAEAAAA8AAALuAAAABRzdHNzAAAAAAAAAAEAAAABAAAB8GN0dHMAAAAAAAAAPAAAAAEAABdwAAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAAC7gAAAAAQAAF3AAAAABAAAAAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAEEc3RzegAAAAAAAAAAAAAAPAAAAzQAAAAQAAAADQAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAANAAAADQAAAQBzdGNvAAAAAAAAADwAAAAwAAADZAAAA3QAAAONAAADoAAAA7kAAAPQAAAD6wAAA/4AAAQXAAAELgAABEMAAARcAAAEbwAABIwAAAShAAAEugAABM0AAATkAAAE/wAABRIAAAUrAAAFQgAABV0AAAVwAAAFiQAABaAAAAW1AAAFzgAABeEAAAX+AAAGEwAABiwAAAY/AAAGVgAABnEAAAaEAAAGnQAABrQAAAbPAAAG4gAABvUAAAcSAAAHJwAAB0AAAAdTAAAHcAAAB4UAAAeeAAAHsQAAB8gAAAfjAAAH9gAACA8AAAgmAAAIQQAACFQAAAhnAAAIhAAACJcAAAMsdHJhawAAAFx0a2hkAAAAA9WAgl/VgIJfAAAAAgAAAAAAAAf8AAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAACsm1kaWEAAAAgbWRoZAAAAADVgIJf1YCCXwAArEQAAWAAVcQAAAAAACdoZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU3RlcmVvAAAAAmNtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAidzdGJsAAAAZ3N0c2QAAAAAAAAAAQAAAFdtcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADNlc2RzAAAAAAOAgIAiAAIABICAgBRAFQAAAAADDUAAAAAABYCAgAISEAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAABYAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAGAAAAWAAAAXBzdGNvAAAAAAAAAFgAAAOBAAADhwAAA5oAAAOtAAADswAAA8oAAAPfAAAD5QAAA/gAAAQLAAAEEQAABCgAAAQ9AAAEUAAABFYAAARpAAAEgAAABIYAAASbAAAErgAABLQAAATHAAAE3gAABPMAAAT5AAAFDAAABR8AAAUlAAAFPAAABVEAAAVXAAAFagAABX0AAAWDAAAFmgAABa8AAAXCAAAFyAAABdsAAAXyAAAF+AAABg0AAAYgAAAGJgAABjkAAAZQAAAGZQAABmsAAAZ+AAAGkQAABpcAAAauAAAGwwAABskAAAbcAAAG7wAABwYAAAcMAAAHIQAABzQAAAc6AAAHTQAAB2QAAAdqAAAHfwAAB5IAAAeYAAAHqwAAB8IAAAfXAAAH3QAAB/AAAAgDAAAICQAACCAAAAg1AAAIOwAACE4AAAhhAAAIeAAACH4AAAiRAAAIpAAACKoAAAiwAAAItgAACLwAAAjCAAAAFnVkdGEAAAAObmFtZVN0ZXJlbwAAAHB1ZHRhAAAAaG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAO2lsc3QAAAAzqXRvbwAAACtkYXRhAAAAAQAAAABIYW5kQnJha2UgMC4xMC4yIDIwMTUwNjExMDA=";
          }
        ]);
      });
    }), Sr = gr(xr), Mr = 1e3, _r = [0, 0, 0.5, 1], Rr = [0.5, 0, 0.5, 1], Fr = window.requestAnimationFrame, Tr = window.cancelAnimationFrame;
    function Pr() {
      this.leftProjectionMatrix = new Float32Array(16), this.leftViewMatrix = new Float32Array(16), this.rightProjectionMatrix = new Float32Array(16), this.rightViewMatrix = new Float32Array(16), this.pose = null;
    }
    function fi(r) {
      Object.defineProperties(this, {
        hasPosition: {
          writable: !1,
          enumerable: !0,
          value: r.hasPosition
        },
        hasExternalDisplay: {
          writable: !1,
          enumerable: !0,
          value: r.hasExternalDisplay
        },
        canPresent: {
          writable: !1,
          enumerable: !0,
          value: r.canPresent
        },
        maxLayers: {
          writable: !1,
          enumerable: !0,
          value: r.maxLayers
        },
        hasOrientation: {
          enumerable: !0,
          get: function() {
            return te("VRDisplayCapabilities.prototype.hasOrientation", "VRDisplay.prototype.getFrameData"), r.hasOrientation;
          }
        }
      });
    }
    function re(r) {
      r = r || {};
      var n = "wakelock" in r ? r.wakelock : !0;
      this.isPolyfilled = !0, this.displayId = Mr++, this.displayName = "", this.depthNear = 0.01, this.depthFar = 1e4, this.isPresenting = !1, Object.defineProperty(this, "isConnected", {
        get: function() {
          return te("VRDisplay.prototype.isConnected", "VRDisplayCapabilities.prototype.hasExternalDisplay"), !1;
        }
      }), this.capabilities = new fi({
        hasPosition: !1,
        hasOrientation: !1,
        hasExternalDisplay: !1,
        canPresent: !1,
        maxLayers: 1
      }), this.stageParameters = null, this.waitingForPresent_ = !1, this.layer_ = null, this.originalParent_ = null, this.fullscreenElement_ = null, this.fullscreenWrapper_ = null, this.fullscreenElementCachedStyle_ = null, this.fullscreenEventTarget_ = null, this.fullscreenChangeHandler_ = null, this.fullscreenErrorHandler_ = null, n && T() && (this.wakelock_ = new Sr());
    }
    re.prototype.getFrameData = function(r) {
      return x(r, this._getPose(), this);
    }, re.prototype.getPose = function() {
      return te("VRDisplay.prototype.getPose", "VRDisplay.prototype.getFrameData"), this._getPose();
    }, re.prototype.resetPose = function() {
      return te("VRDisplay.prototype.resetPose"), this._resetPose();
    }, re.prototype.getImmediatePose = function() {
      return te("VRDisplay.prototype.getImmediatePose", "VRDisplay.prototype.getFrameData"), this._getPose();
    }, re.prototype.requestAnimationFrame = function(r) {
      return Fr(r);
    }, re.prototype.cancelAnimationFrame = function(r) {
      return Tr(r);
    }, re.prototype.wrapForFullscreen = function(r) {
      if (w())
        return r;
      if (!this.fullscreenWrapper_) {
        this.fullscreenWrapper_ = document.createElement("div");
        var n = ["height: " + Math.min(screen.height, screen.width) + "px !important", "top: 0 !important", "left: 0 !important", "right: 0 !important", "border: 0", "margin: 0", "padding: 0", "z-index: 999999 !important", "position: fixed"];
        this.fullscreenWrapper_.setAttribute("style", n.join("; ") + ";"), this.fullscreenWrapper_.classList.add("webvr-polyfill-fullscreen-wrapper");
      }
      if (this.fullscreenElement_ == r)
        return this.fullscreenWrapper_;
      if (this.fullscreenElement_ && (this.originalParent_ ? this.originalParent_.appendChild(this.fullscreenElement_) : this.fullscreenElement_.parentElement.removeChild(this.fullscreenElement_)), this.fullscreenElement_ = r, this.originalParent_ = r.parentElement, this.originalParent_ || document.body.appendChild(r), !this.fullscreenWrapper_.parentElement) {
        var a = this.fullscreenElement_.parentElement;
        a.insertBefore(this.fullscreenWrapper_, this.fullscreenElement_), a.removeChild(this.fullscreenElement_);
      }
      this.fullscreenWrapper_.insertBefore(this.fullscreenElement_, this.fullscreenWrapper_.firstChild), this.fullscreenElementCachedStyle_ = this.fullscreenElement_.getAttribute("style");
      var o = this;
      function c() {
        if (!!o.fullscreenElement_) {
          var A = ["position: absolute", "top: 0", "left: 0", "width: " + Math.max(screen.width, screen.height) + "px", "height: " + Math.min(screen.height, screen.width) + "px", "border: 0", "margin: 0", "padding: 0"];
          o.fullscreenElement_.setAttribute("style", A.join("; ") + ";");
        }
      }
      return c(), this.fullscreenWrapper_;
    }, re.prototype.removeFullscreenWrapper = function() {
      if (!!this.fullscreenElement_) {
        var r = this.fullscreenElement_;
        this.fullscreenElementCachedStyle_ ? r.setAttribute("style", this.fullscreenElementCachedStyle_) : r.removeAttribute("style"), this.fullscreenElement_ = null, this.fullscreenElementCachedStyle_ = null;
        var n = this.fullscreenWrapper_.parentElement;
        return this.fullscreenWrapper_.removeChild(r), this.originalParent_ === n ? n.insertBefore(r, this.fullscreenWrapper_) : this.originalParent_ && this.originalParent_.appendChild(r), n.removeChild(this.fullscreenWrapper_), r;
      }
    }, re.prototype.requestPresent = function(r) {
      var n = this.isPresenting, a = this;
      return r instanceof Array || (te("VRDisplay.prototype.requestPresent with non-array argument", "an array of VRLayers as the first argument"), r = [r]), new Promise(function(o, c) {
        if (!a.capabilities.canPresent) {
          c(new Error("VRDisplay is not capable of presenting."));
          return;
        }
        if (r.length == 0 || r.length > a.capabilities.maxLayers) {
          c(new Error("Invalid number of layers."));
          return;
        }
        var A = r[0];
        if (!A.source) {
          o();
          return;
        }
        var f = A.leftBounds || _r, S = A.rightBounds || Rr;
        if (n) {
          var E = a.layer_;
          E.source !== A.source && (E.source = A.source);
          for (var p = 0; p < 4; p++)
            E.leftBounds[p] = f[p], E.rightBounds[p] = S[p];
          a.wrapForFullscreen(a.layer_.source), a.updatePresent_(), o();
          return;
        }
        if (a.layer_ = {
          predistorted: A.predistorted,
          source: A.source,
          leftBounds: f.slice(0),
          rightBounds: S.slice(0)
        }, a.waitingForPresent_ = !1, a.layer_ && a.layer_.source) {
          var y = a.wrapForFullscreen(a.layer_.source), F = function() {
            var X = W();
            a.isPresenting = y === X, a.isPresenting ? (screen.orientation && screen.orientation.lock && screen.orientation.lock("landscape-primary").catch(function(q) {
              console.error("screen.orientation.lock() failed due to", q.message);
            }), a.waitingForPresent_ = !1, a.beginPresent_(), o()) : (screen.orientation && screen.orientation.unlock && screen.orientation.unlock(), a.removeFullscreenWrapper(), a.disableWakeLock(), a.endPresent_(), a.removeFullscreenListeners_()), a.fireVRDisplayPresentChange_();
          }, V = function() {
            !a.waitingForPresent_ || (a.removeFullscreenWrapper(), a.removeFullscreenListeners_(), a.disableWakeLock(), a.waitingForPresent_ = !1, a.isPresenting = !1, c(new Error("Unable to present.")));
          };
          a.addFullscreenListeners_(y, F, V), O(y) ? (a.enableWakeLock(), a.waitingForPresent_ = !0) : (w() || b()) && (a.enableWakeLock(), a.isPresenting = !0, a.beginPresent_(), a.fireVRDisplayPresentChange_(), o());
        }
        !a.waitingForPresent_ && !w() && (I(), c(new Error("Unable to present.")));
      });
    }, re.prototype.exitPresent = function() {
      var r = this.isPresenting, n = this;
      return this.isPresenting = !1, this.layer_ = null, this.disableWakeLock(), new Promise(function(a, o) {
        r ? (!I() && w() && (n.endPresent_(), n.fireVRDisplayPresentChange_()), b() && (n.removeFullscreenWrapper(), n.removeFullscreenListeners_(), n.endPresent_(), n.fireVRDisplayPresentChange_()), a()) : o(new Error("Was not presenting to VRDisplay."));
      });
    }, re.prototype.getLayers = function() {
      return this.layer_ ? [this.layer_] : [];
    }, re.prototype.fireVRDisplayPresentChange_ = function() {
      var r = new CustomEvent("vrdisplaypresentchange", { detail: { display: this } });
      window.dispatchEvent(r);
    }, re.prototype.fireVRDisplayConnect_ = function() {
      var r = new CustomEvent("vrdisplayconnect", { detail: { display: this } });
      window.dispatchEvent(r);
    }, re.prototype.addFullscreenListeners_ = function(r, n, a) {
      this.removeFullscreenListeners_(), this.fullscreenEventTarget_ = r, this.fullscreenChangeHandler_ = n, this.fullscreenErrorHandler_ = a, n && (document.fullscreenEnabled ? r.addEventListener("fullscreenchange", n, !1) : document.webkitFullscreenEnabled ? r.addEventListener("webkitfullscreenchange", n, !1) : document.mozFullScreenEnabled ? document.addEventListener("mozfullscreenchange", n, !1) : document.msFullscreenEnabled && r.addEventListener("msfullscreenchange", n, !1)), a && (document.fullscreenEnabled ? r.addEventListener("fullscreenerror", a, !1) : document.webkitFullscreenEnabled ? r.addEventListener("webkitfullscreenerror", a, !1) : document.mozFullScreenEnabled ? document.addEventListener("mozfullscreenerror", a, !1) : document.msFullscreenEnabled && r.addEventListener("msfullscreenerror", a, !1));
    }, re.prototype.removeFullscreenListeners_ = function() {
      if (!!this.fullscreenEventTarget_) {
        var r = this.fullscreenEventTarget_;
        if (this.fullscreenChangeHandler_) {
          var n = this.fullscreenChangeHandler_;
          r.removeEventListener("fullscreenchange", n, !1), r.removeEventListener("webkitfullscreenchange", n, !1), document.removeEventListener("mozfullscreenchange", n, !1), r.removeEventListener("msfullscreenchange", n, !1);
        }
        if (this.fullscreenErrorHandler_) {
          var a = this.fullscreenErrorHandler_;
          r.removeEventListener("fullscreenerror", a, !1), r.removeEventListener("webkitfullscreenerror", a, !1), document.removeEventListener("mozfullscreenerror", a, !1), r.removeEventListener("msfullscreenerror", a, !1);
        }
        this.fullscreenEventTarget_ = null, this.fullscreenChangeHandler_ = null, this.fullscreenErrorHandler_ = null;
      }
    }, re.prototype.enableWakeLock = function() {
      this.wakelock_ && this.wakelock_.enable();
    }, re.prototype.disableWakeLock = function() {
      this.wakelock_ && this.wakelock_.disable();
    }, re.prototype.beginPresent_ = function() {
    }, re.prototype.endPresent_ = function() {
    }, re.prototype.submitFrame = function(r) {
    }, re.prototype.getEyeParameters = function(r) {
      return null;
    };
    var Cr = {
      ADDITIONAL_VIEWERS: [],
      DEFAULT_VIEWER: "",
      MOBILE_WAKE_LOCK: !0,
      DEBUG: !1,
      DPDB_URL: "https://dpdb.webvr.rocks/dpdb.json",
      K_FILTER: 0.98,
      PREDICTION_TIME_S: 0.04,
      CARDBOARD_UI_DISABLED: !1,
      ROTATE_INSTRUCTIONS_DISABLED: !1,
      YAW_ONLY: !1,
      BUFFER_SCALE: 0.5,
      DIRTY_SUBMIT_FRAME_BINDINGS: !1
    }, Rt = {
      LEFT: "left",
      RIGHT: "right"
    };
    function ce(r) {
      var n = k({}, Cr);
      r = k(n, r || {}), re.call(this, {
        wakelock: r.MOBILE_WAKE_LOCK
      }), this.config = r, this.displayName = "Cardboard VRDisplay", this.capabilities = new fi({
        hasPosition: !1,
        hasOrientation: !0,
        hasExternalDisplay: !1,
        canPresent: !0,
        maxLayers: 1
      }), this.stageParameters = null, this.bufferScale_ = this.config.BUFFER_SCALE, this.poseSensor_ = new mr(this.config), this.distorter_ = null, this.cardboardUI_ = null, this.dpdb_ = new et(this.config.DPDB_URL, this.onDeviceParamsUpdated_.bind(this)), this.deviceInfo_ = new le(this.dpdb_.getDeviceParams(), r.ADDITIONAL_VIEWERS), this.viewerSelector_ = new Re(r.DEFAULT_VIEWER), this.viewerSelector_.onChange(this.onViewerChanged_.bind(this)), this.deviceInfo_.setViewer(this.viewerSelector_.getCurrentViewer()), this.config.ROTATE_INSTRUCTIONS_DISABLED || (this.rotateInstructions_ = new We()), w() && window.addEventListener("resize", this.onResize_.bind(this));
    }
    return ce.prototype = Object.create(re.prototype), ce.prototype._getPose = function() {
      return {
        position: null,
        orientation: this.poseSensor_.getOrientation(),
        linearVelocity: null,
        linearAcceleration: null,
        angularVelocity: null,
        angularAcceleration: null
      };
    }, ce.prototype._resetPose = function() {
      this.poseSensor_.resetPose && this.poseSensor_.resetPose();
    }, ce.prototype._getFieldOfView = function(r) {
      var n;
      if (r == Rt.LEFT)
        n = this.deviceInfo_.getFieldOfViewLeftEye();
      else if (r == Rt.RIGHT)
        n = this.deviceInfo_.getFieldOfViewRightEye();
      else
        return console.error("Invalid eye provided: %s", r), null;
      return n;
    }, ce.prototype._getEyeOffset = function(r) {
      var n;
      if (r == Rt.LEFT)
        n = [-this.deviceInfo_.viewer.interLensDistance * 0.5, 0, 0];
      else if (r == Rt.RIGHT)
        n = [this.deviceInfo_.viewer.interLensDistance * 0.5, 0, 0];
      else
        return console.error("Invalid eye provided: %s", r), null;
      return n;
    }, ce.prototype.getEyeParameters = function(r) {
      var n = this._getEyeOffset(r), a = this._getFieldOfView(r), o = {
        offset: n,
        renderWidth: this.deviceInfo_.device.width * 0.5 * this.bufferScale_,
        renderHeight: this.deviceInfo_.device.height * this.bufferScale_
      };
      return Object.defineProperty(o, "fieldOfView", {
        enumerable: !0,
        get: function() {
          return te("VRFieldOfView", "VRFrameData's projection matrices"), a;
        }
      }), o;
    }, ce.prototype.onDeviceParamsUpdated_ = function(r) {
      this.config.DEBUG && console.log("DPDB reported that device params were updated."), this.deviceInfo_.updateDeviceParams(r), this.distorter_ && this.distorter_.updateDeviceInfo(this.deviceInfo_);
    }, ce.prototype.updateBounds_ = function() {
      this.layer_ && this.distorter_ && (this.layer_.leftBounds || this.layer_.rightBounds) && this.distorter_.setTextureBounds(this.layer_.leftBounds, this.layer_.rightBounds);
    }, ce.prototype.beginPresent_ = function() {
      var r = this.layer_.source.getContext("webgl");
      r || (r = this.layer_.source.getContext("experimental-webgl")), r || (r = this.layer_.source.getContext("webgl2")), r && (this.layer_.predistorted ? this.config.CARDBOARD_UI_DISABLED || (r.canvas.width = R() * this.bufferScale_, r.canvas.height = D() * this.bufferScale_, this.cardboardUI_ = new Qe(r)) : (this.config.CARDBOARD_UI_DISABLED || (this.cardboardUI_ = new Qe(r)), this.distorter_ = new ue(r, this.cardboardUI_, this.config.BUFFER_SCALE, this.config.DIRTY_SUBMIT_FRAME_BINDINGS), this.distorter_.updateDeviceInfo(this.deviceInfo_)), this.cardboardUI_ && this.cardboardUI_.listen(function(n) {
        this.viewerSelector_.show(this.layer_.source.parentElement), n.stopPropagation(), n.preventDefault();
      }.bind(this), function(n) {
        this.exitPresent(), n.stopPropagation(), n.preventDefault();
      }.bind(this)), this.rotateInstructions_ && (v() && T() ? this.rotateInstructions_.showTemporarily(3e3, this.layer_.source.parentElement) : this.rotateInstructions_.update()), this.orientationHandler = this.onOrientationChange_.bind(this), window.addEventListener("orientationchange", this.orientationHandler), this.vrdisplaypresentchangeHandler = this.updateBounds_.bind(this), window.addEventListener("vrdisplaypresentchange", this.vrdisplaypresentchangeHandler), this.fireVRDisplayDeviceParamsChange_());
    }, ce.prototype.endPresent_ = function() {
      this.distorter_ && (this.distorter_.destroy(), this.distorter_ = null), this.cardboardUI_ && (this.cardboardUI_.destroy(), this.cardboardUI_ = null), this.rotateInstructions_ && this.rotateInstructions_.hide(), this.viewerSelector_.hide(), window.removeEventListener("orientationchange", this.orientationHandler), window.removeEventListener("vrdisplaypresentchange", this.vrdisplaypresentchangeHandler);
    }, ce.prototype.updatePresent_ = function() {
      this.endPresent_(), this.beginPresent_();
    }, ce.prototype.submitFrame = function(r) {
      if (this.distorter_)
        this.updateBounds_(), this.distorter_.submitFrame();
      else if (this.cardboardUI_ && this.layer_) {
        var n = this.layer_.source.getContext("webgl");
        n || (n = this.layer_.source.getContext("experimental-webgl")), n || (n = this.layer_.source.getContext("webgl2"));
        var a = n.canvas;
        (a.width != this.lastWidth || a.height != this.lastHeight) && this.cardboardUI_.onResize(), this.lastWidth = a.width, this.lastHeight = a.height, this.cardboardUI_.render();
      }
    }, ce.prototype.onOrientationChange_ = function(r) {
      this.viewerSelector_.hide(), this.rotateInstructions_ && this.rotateInstructions_.update(), this.onResize_();
    }, ce.prototype.onResize_ = function(r) {
      if (this.layer_) {
        var n = this.layer_.source.getContext("webgl");
        n || (n = this.layer_.source.getContext("experimental-webgl")), n || (n = this.layer_.source.getContext("webgl2"));
        var a = [
          "position: absolute",
          "top: 0",
          "left: 0",
          "width: 100vw",
          "height: 100vh",
          "border: 0",
          "margin: 0",
          "padding: 0px",
          "box-sizing: content-box"
        ];
        n.canvas.setAttribute("style", a.join("; ") + ";"), M(n.canvas);
      }
    }, ce.prototype.onViewerChanged_ = function(r) {
      this.deviceInfo_.setViewer(r), this.distorter_ && this.distorter_.updateDeviceInfo(this.deviceInfo_), this.fireVRDisplayDeviceParamsChange_();
    }, ce.prototype.fireVRDisplayDeviceParamsChange_ = function() {
      var r = new CustomEvent("vrdisplaydeviceparamschange", {
        detail: {
          vrdisplay: this,
          deviceInfo: this.deviceInfo_
        }
      });
      window.dispatchEvent(r);
    }, ce.VRFrameData = Pr, ce.VRDisplay = re, ce;
  });
})(Ji);
const on = /* @__PURE__ */ an(Ji.exports);
class ci extends si {
  constructor(e) {
    super(), this.global = e, this.onWindowResize = this.onWindowResize.bind(this), this.global.window.addEventListener("resize", this.onWindowResize), this.environmentBlendMode = "opaque";
  }
  onBaseLayerSet(e, t) {
    throw new Error("Not implemented");
  }
  isSessionSupported(e) {
    throw new Error("Not implemented");
  }
  isFeatureSupported(e) {
    throw new Error("Not implemented");
  }
  async requestSession(e, t) {
    throw new Error("Not implemented");
  }
  requestAnimationFrame(e) {
    throw new Error("Not implemented");
  }
  onFrameStart(e) {
    throw new Error("Not implemented");
  }
  onFrameEnd(e) {
    throw new Error("Not implemented");
  }
  doesSessionSupportReferenceSpace(e, t) {
    throw new Error("Not implemented");
  }
  requestStageBounds() {
    throw new Error("Not implemented");
  }
  async requestFrameOfReferenceTransform(e, t) {
  }
  cancelAnimationFrame(e) {
    throw new Error("Not implemented");
  }
  endSession(e) {
    throw new Error("Not implemented");
  }
  getViewSpaces(e) {
  }
  getViewport(e, t, s, l, h) {
    throw new Error("Not implemented");
  }
  getProjectionMatrix(e, t) {
    throw new Error("Not implemented");
  }
  getBasePoseMatrix() {
    throw new Error("Not implemented");
  }
  getBaseViewMatrix(e) {
    throw new Error("Not implemented");
  }
  getInputSources() {
    throw new Error("Not implemented");
  }
  getInputPose(e, t, s) {
    throw new Error("Not implemented");
  }
  onWindowResize() {
    this.onWindowResize();
  }
}
let ln = {
  mapping: "",
  profiles: ["google-daydream", "generic-trigger-touchpad"],
  buttons: {
    length: 3,
    0: null,
    1: null,
    2: 0
  }
}, cn = {
  mapping: "xr-standard",
  profiles: ["htc-vive-focus", "generic-trigger-touchpad"],
  buttons: {
    length: 3,
    0: 1,
    1: null,
    2: 0
  }
}, hn = {
  mapping: "xr-standard",
  profiles: ["oculus-go", "generic-trigger-touchpad"],
  buttons: {
    length: 3,
    0: 1,
    1: null,
    2: 0
  },
  gripTransform: {
    orientation: [Math.PI * 0.11, 0, 0, 1]
  }
}, Ri = {
  mapping: "xr-standard",
  displayProfiles: {
    "Oculus Quest": ["oculus-touch-v2", "oculus-touch", "generic-trigger-squeeze-thumbstick"]
  },
  profiles: ["oculus-touch", "generic-trigger-squeeze-thumbstick"],
  axes: {
    length: 4,
    0: null,
    1: null,
    2: 0,
    3: 1
  },
  buttons: {
    length: 7,
    0: 1,
    1: 2,
    2: null,
    3: 0,
    4: 3,
    5: 4,
    6: null
  },
  gripTransform: {
    position: [0, -0.02, 0.04, 1],
    orientation: [Math.PI * 0.11, 0, 0, 1]
  }
}, An = {
  mapping: "xr-standard",
  profiles: ["htc-vive", "generic-trigger-squeeze-touchpad"],
  displayProfiles: {
    "HTC Vive": ["htc-vive", "generic-trigger-squeeze-touchpad"],
    "HTC Vive DVT": ["htc-vive", "generic-trigger-squeeze-touchpad"],
    "Valve Index": ["valve-index", "generic-trigger-squeeze-touchpad-thumbstick"]
  },
  buttons: {
    length: 3,
    0: 1,
    1: 2,
    2: 0
  },
  gripTransform: {
    position: [0, 0, 0.05, 1]
  },
  targetRayTransform: {
    orientation: [Math.PI * -0.08, 0, 0, 1]
  },
  userAgentOverrides: {
    Firefox: {
      axes: {
        invert: [1, 3]
      }
    }
  }
}, dn = {
  mapping: "xr-standard",
  profiles: ["samsung-gearvr", "generic-trigger-touchpad"],
  buttons: {
    length: 3,
    0: 1,
    1: null,
    2: 0
  },
  gripTransform: {
    orientation: [Math.PI * 0.11, 0, 0, 1]
  }
}, un = {
  mapping: "xr-standard",
  profiles: ["samsung-odyssey", "microsoft-mixed-reality", "generic-trigger-squeeze-touchpad-thumbstick"],
  buttons: {
    length: 4,
    0: 1,
    1: 0,
    2: 2,
    3: 4
  },
  gripTransform: {
    position: [0, -0.02, 0.04, 1],
    orientation: [Math.PI * 0.11, 0, 0, 1]
  }
}, qt = {
  mapping: "xr-standard",
  profiles: ["microsoft-mixed-reality", "generic-trigger-squeeze-touchpad-thumbstick"],
  buttons: {
    length: 4,
    0: 1,
    1: 0,
    2: 2,
    3: 4
  },
  gripTransform: {
    position: [0, -0.02, 0.04, 1],
    orientation: [Math.PI * 0.11, 0, 0, 1]
  }
}, fn = {
  "Daydream Controller": ln,
  "Gear VR Controller": dn,
  "HTC Vive Focus Controller": cn,
  "Oculus Go Controller": hn,
  "Oculus Touch (Right)": Ri,
  "Oculus Touch (Left)": Ri,
  "OpenVR Gamepad": An,
  "Spatial Controller (Spatial Interaction Source) 045E-065A": qt,
  "Spatial Controller (Spatial Interaction Source) 045E-065D": un,
  "Windows Mixed Reality (Right)": qt,
  "Windows Mixed Reality (Left)": qt
};
const Fi = Te(0.155, -0.465, -0.15), pn = Te(-0.155, -0.465, -0.15), mn = Te(0, 0, -0.25), vn = Te(0, 0, 0.05), Ti = Te(-0.08, 0.14, 0.08), Pi = 0.4, wn = 0.4, yn = 0.61, bn = 0.175, gn = 0.12, En = 0.87, Ci = 180 / Math.PI;
function xn(i, e, t) {
  function s(m, w, b) {
    return m < w ? w : m > b ? b : m;
  }
  var l = e[0] * e[0], h = e[1] * e[1], d = e[2] * e[2], u = e[3] * e[3];
  if (t === "XYZ")
    i[0] = Math.atan2(2 * (e[0] * e[3] - e[1] * e[2]), u - l - h + d), i[1] = Math.asin(s(2 * (e[0] * e[2] + e[1] * e[3]), -1, 1)), i[2] = Math.atan2(2 * (e[2] * e[3] - e[0] * e[1]), u + l - h - d);
  else if (t === "YXZ")
    i[0] = Math.asin(s(2 * (e[0] * e[3] - e[1] * e[2]), -1, 1)), i[1] = Math.atan2(2 * (e[0] * e[2] + e[1] * e[3]), u - l - h + d), i[2] = Math.atan2(2 * (e[0] * e[1] + e[2] * e[3]), u - l + h - d);
  else if (t === "ZXY")
    i[0] = Math.asin(s(2 * (e[0] * e[3] + e[1] * e[2]), -1, 1)), i[1] = Math.atan2(2 * (e[1] * e[3] - e[2] * e[0]), u - l - h + d), i[2] = Math.atan2(2 * (e[2] * e[3] - e[0] * e[1]), u - l + h - d);
  else if (t === "ZYX")
    i[0] = Math.atan2(2 * (e[0] * e[3] + e[2] * e[1]), u - l - h + d), i[1] = Math.asin(s(2 * (e[1] * e[3] - e[0] * e[2]), -1, 1)), i[2] = Math.atan2(2 * (e[0] * e[1] + e[2] * e[3]), u + l - h - d);
  else if (t === "YZX")
    i[0] = Math.atan2(2 * (e[0] * e[3] - e[2] * e[1]), u - l + h - d), i[1] = Math.atan2(2 * (e[1] * e[3] - e[0] * e[2]), u + l - h - d), i[2] = Math.asin(s(2 * (e[0] * e[1] + e[2] * e[3]), -1, 1));
  else if (t === "XZY")
    i[0] = Math.atan2(2 * (e[0] * e[3] + e[1] * e[2]), u - l + h - d), i[1] = Math.atan2(2 * (e[0] * e[2] + e[1] * e[3]), u + l - h - d), i[2] = Math.asin(s(2 * (e[2] * e[3] - e[0] * e[1]), -1, 1));
  else {
    console.log("No order given for quaternion to euler conversion.");
    return;
  }
}
class Sn {
  constructor() {
    this.hand = "right", this.headElbowOffset = Fi, this.controllerQ = Fe(), this.lastControllerQ = Fe(), this.headQ = Fe(), this.headPos = Be(), this.elbowPos = Be(), this.wristPos = Be(), this.time = null, this.lastTime = null, this.rootQ = Fe(), this.position = Be();
  }
  setHandedness(e) {
    this.hand != e && (this.hand = e, this.hand == "left" ? this.headElbowOffset = pn : this.headElbowOffset = Fi);
  }
  update(e, t) {
    this.time = Xi(), e && (Xt(this.lastControllerQ, this.controllerQ), Xt(this.controllerQ, e)), t && (Vi(this.headPos, t), Ui(this.headQ, t));
    let s = this.getHeadYawOrientation_(), l = this.quatAngle_(this.lastControllerQ, this.controllerQ), h = (this.time - this.lastTime) / 1e3;
    l / h > yn ? wt(
      this.rootQ,
      this.rootQ,
      s,
      Math.min(l / bn, 1)
    ) : Xt(this.rootQ, s);
    let u = Te(0, 0, -1);
    je(u, u, this.controllerQ);
    let m = ai(u, [0, 1, 0]), w = this.clamp_(
      (m - gn) / En,
      0,
      1
    ), b = bi(this.rootQ);
    yi(b, b), wi(b, b, this.controllerQ);
    let _ = this.elbowPos;
    mi(_, this.headPos), ft(_, _, this.headElbowOffset);
    let B = pi(Ti);
    vi(B, B, w), ft(_, _, B);
    let L = this.quatAngle_(b, Fe()) * Ci, P = 1 - Math.pow(L / 180, 4);
    sssss;
    let G = Pi, v = 1 - Pi, N = P * (G + v * w * wn), R = Fe();
    wt(R, R, b, N);
    let D = yi(Fe(), R), O = bi(b);
    wi(O, O, D);
    let I = this.wristPos;
    mi(I, vn), je(I, I, R), ft(I, I, mn), je(I, I, O), ft(I, I, _);
    let W = pi(Ti);
    vi(W, W, w), ft(this.position, this.wristPos, W), je(this.position, this.position, this.rootQ), this.lastTime = this.time;
  }
  getPosition() {
    return this.position;
  }
  getHeadYawOrientation_() {
    let e = Be();
    return xn(e, this.headQ, "YXZ"), Wr(Fe(), 0, e[1] * Ci, 0);
  }
  clamp_(e, t, s) {
    return Math.min(Math.max(e, t), s);
  }
  quatAngle_(e, t) {
    let s = [0, 0, -1], l = [0, 0, -1];
    return je(s, s, e), je(l, l, t), Lr(s, l);
  }
}
const pe = Symbol("@@webxr-polyfill/XRRemappedGamepad"), er = { pressed: !1, touched: !1, value: 0 };
Object.freeze(er);
class Mn {
  constructor(e, t, s) {
    if (s || (s = {}), s.userAgentOverrides) {
      for (let w in s.userAgentOverrides)
        if (navigator.userAgent.includes(w)) {
          let b = s.userAgentOverrides[w];
          for (let _ in b)
            _ in s ? Object.assign(s[_], b[_]) : s[_] = b[_];
          break;
        }
    }
    let l = new Array(s.axes && s.axes.length ? s.axes.length : e.axes.length), h = new Array(s.buttons && s.buttons.length ? s.buttons.length : e.buttons.length), d = null;
    if (s.gripTransform) {
      let w = s.gripTransform.orientation || [0, 0, 0, 1];
      d = Ye(), bt(
        d,
        Ct(w, w),
        s.gripTransform.position || [0, 0, 0]
      );
    }
    let u = null;
    if (s.targetRayTransform) {
      let w = s.targetRayTransform.orientation || [0, 0, 0, 1];
      u = Ye(), bt(
        u,
        Ct(w, w),
        s.targetRayTransform.position || [0, 0, 0]
      );
    }
    let m = s.profiles;
    s.displayProfiles && t.displayName in s.displayProfiles && (m = s.displayProfiles[t.displayName]), this[pe] = {
      gamepad: e,
      map: s,
      profiles: m || [e.id],
      mapping: s.mapping || e.mapping,
      axes: l,
      buttons: h,
      gripTransform: d,
      targetRayTransform: u
    }, this._update();
  }
  _update() {
    let e = this[pe].gamepad, t = this[pe].map, s = this[pe].axes;
    for (let h = 0; h < s.length; ++h)
      t.axes && h in t.axes ? t.axes[h] === null ? s[h] = 0 : s[h] = e.axes[t.axes[h]] : s[h] = e.axes[h];
    if (t.axes && t.axes.invert)
      for (let h of t.axes.invert)
        h < s.length && (s[h] *= -1);
    let l = this[pe].buttons;
    for (let h = 0; h < l.length; ++h)
      t.buttons && h in t.buttons ? t.buttons[h] === null ? l[h] = er : l[h] = e.buttons[t.buttons[h]] : l[h] = e.buttons[h];
  }
  get id() {
    return "";
  }
  get _profiles() {
    return this[pe].profiles;
  }
  get index() {
    return -1;
  }
  get connected() {
    return this[pe].gamepad.connected;
  }
  get timestamp() {
    return this[pe].gamepad.timestamp;
  }
  get mapping() {
    return this[pe].mapping;
  }
  get axes() {
    return this[pe].axes;
  }
  get buttons() {
    return this[pe].buttons;
  }
  get hapticActuators() {
    return this[pe].gamepad.hapticActuators;
  }
}
class _n {
  constructor(e, t, s = 0, l = -1) {
    this.polyfill = e, this.display = t, this.nativeGamepad = null, this.gamepad = null, this.inputSource = new qi(this), this.lastPosition = Be(), this.emulatedPosition = !1, this.basePoseMatrix = Ye(), this.outputMatrix = Ye(), this.primaryButtonIndex = s, this.primaryActionPressed = !1, this.primarySqueezeButtonIndex = l, this.primarySqueezeActionPressed = !1, this.handedness = "", this.targetRayMode = "gaze", this.armModel = null;
  }
  get profiles() {
    return this.gamepad ? this.gamepad._profiles : [];
  }
  updateFromGamepad(e) {
    this.nativeGamepad !== e && (this.nativeGamepad = e, e ? this.gamepad = new Mn(e, this.display, fn[e.id]) : this.gamepad = null), this.handedness = e.hand === "" ? "none" : e.hand, this.gamepad && this.gamepad._update(), e.pose ? (this.targetRayMode = "tracked-pointer", this.emulatedPosition = !e.pose.hasPosition) : e.hand === "" && (this.targetRayMode = "gaze", this.emulatedPosition = !1);
  }
  updateBasePoseMatrix() {
    if (this.nativeGamepad && this.nativeGamepad.pose) {
      let e = this.nativeGamepad.pose, t = e.position, s = e.orientation;
      if (!t && !s)
        return;
      t ? (this.lastPosition[0] = t[0], this.lastPosition[1] = t[1], this.lastPosition[2] = t[2]) : e.hasPosition ? t = this.lastPosition : (this.armModel || (this.armModel = new Sn()), this.armModel.setHandedness(this.nativeGamepad.hand), this.armModel.update(s, this.polyfill.getBasePoseMatrix()), t = this.armModel.getPosition()), bt(this.basePoseMatrix, s, t);
    } else
      Ir(this.basePoseMatrix, this.polyfill.getBasePoseMatrix());
    return this.basePoseMatrix;
  }
  getXRPose(e, t) {
    switch (this.updateBasePoseMatrix(), t) {
      case "target-ray":
        e._transformBasePoseMatrix(this.outputMatrix, this.basePoseMatrix), this.gamepad && this.gamepad[pe].targetRayTransform && qe(this.outputMatrix, this.outputMatrix, this.gamepad[pe].targetRayTransform);
        break;
      case "grip":
        if (!this.nativeGamepad || !this.nativeGamepad.pose)
          return null;
        e._transformBasePoseMatrix(this.outputMatrix, this.basePoseMatrix), this.gamepad && this.gamepad[pe].gripTransform && qe(this.outputMatrix, this.outputMatrix, this.gamepad[pe].gripTransform);
        break;
      default:
        return null;
    }
    return e._adjustForOriginOffset(this.outputMatrix), new XRPose(new XRRigidTransform(this.outputMatrix), this.emulatedPosition);
  }
}
const vt = process.env.NODE_ENV === "test", Di = {
  highRefreshRate: !0
}, Ii = {
  oculus: 1,
  openvr: 1,
  "spatial controller (spatial interaction source)": 1
};
let Rn = 0;
class Fn {
  constructor(e, t, s = {}) {
    if (this.mode = e, this.enabledFeatures = t, this.outputContext = null, this.immersive = e == "immersive-vr" || e == "immersive-ar", this.ended = null, this.baseLayer = null, this.id = ++Rn, this.modifiedCanvasLayer = !1, this.outputContext && !vt) {
      const l = s.renderContextType || "2d";
      this.renderContext = this.outputContext.canvas.getContext(l);
    }
  }
}
class tr extends ci {
  constructor(e, t) {
    const { canPresent: s } = t.capabilities;
    super(e), this.display = t, this.frame = new e.VRFrameData(), this.sessions = /* @__PURE__ */ new Map(), this.immersiveSession = null, this.canPresent = s, this.baseModelMatrix = Ye(), this.gamepadInputSources = {}, this.tempVec3 = new Float32Array(3), this.onVRDisplayPresentChange = this.onVRDisplayPresentChange.bind(this), e.window.addEventListener("vrdisplaypresentchange", this.onVRDisplayPresentChange), this.CAN_USE_GAMEPAD = e.navigator && "getGamepads" in e.navigator, this.HAS_BITMAP_SUPPORT = rn(e);
  }
  get depthNear() {
    return this.display.depthNear;
  }
  set depthNear(e) {
    this.display.depthNear = e;
  }
  get depthFar() {
    return this.display.depthFar;
  }
  set depthFar(e) {
    this.display.depthFar = e;
  }
  onBaseLayerSet(e, t) {
    const s = this.sessions.get(e), l = t.context.canvas;
    if (s.immersive) {
      const h = this.display.getEyeParameters("left"), d = this.display.getEyeParameters("right");
      l.width = Math.max(h.renderWidth, d.renderWidth) * 2, l.height = Math.max(h.renderHeight, d.renderHeight), this.display.requestPresent([{
        source: l,
        attributes: Di
      }]).then(() => {
        !vt && !this.global.document.body.contains(l) && (s.modifiedCanvasLayer = !0, this.global.document.body.appendChild(l), sn(l)), s.baseLayer = t;
      });
    } else
      s.baseLayer = t;
  }
  isSessionSupported(e) {
    return !(e == "immersive-ar" || e == "immersive-vr" && this.canPresent === !1);
  }
  isFeatureSupported(e) {
    switch (e) {
      case "viewer":
        return !0;
      case "local":
        return !0;
      case "local-floor":
        return !0;
      case "bounded":
        return !1;
      case "unbounded":
        return !1;
      default:
        return !1;
    }
  }
  async requestSession(e, t) {
    if (!this.isSessionSupported(e))
      return Promise.reject();
    let s = e == "immersive-vr";
    if (s) {
      const h = this.global.document.createElement("canvas");
      vt || h.getContext("webgl"), await this.display.requestPresent([{
        source: h,
        attributes: Di
      }]);
    }
    const l = new Fn(e, t, {
      renderContextType: this.HAS_BITMAP_SUPPORT ? "bitmaprenderer" : "2d"
    });
    return this.sessions.set(l.id, l), s && (this.immersiveSession = l, this.dispatchEvent("@@webxr-polyfill/vr-present-start", l.id)), Promise.resolve(l.id);
  }
  requestAnimationFrame(e) {
    return this.display.requestAnimationFrame(e);
  }
  getPrimaryButtonIndex(e) {
    let t = 0, s = e.id.toLowerCase();
    for (let l in Ii)
      if (s.includes(l)) {
        t = Ii[l];
        break;
      }
    return Math.min(t, e.buttons.length - 1);
  }
  onFrameStart(e, t) {
    this.display.depthNear = t.depthNear, this.display.depthFar = t.depthFar, this.display.getFrameData(this.frame);
    const s = this.sessions.get(e);
    if (s.immersive && this.CAN_USE_GAMEPAD) {
      let l = this.gamepadInputSources;
      this.gamepadInputSources = {};
      let h = this.global.navigator.getGamepads();
      for (let d = 0; d < h.length; ++d) {
        let u = h[d];
        if (u && u.displayId > 0) {
          let m = l[d];
          if (m || (m = new _n(this, this.display, this.getPrimaryButtonIndex(u))), m.updateFromGamepad(u), this.gamepadInputSources[d] = m, m.primaryButtonIndex != -1) {
            let w = u.buttons[m.primaryButtonIndex].pressed;
            w && !m.primaryActionPressed ? this.dispatchEvent("@@webxr-polyfill/input-select-start", { sessionId: s.id, inputSource: m.inputSource }) : !w && m.primaryActionPressed && this.dispatchEvent("@@webxr-polyfill/input-select-end", { sessionId: s.id, inputSource: m.inputSource }), m.primaryActionPressed = w;
          }
          if (m.primarySqueezeButtonIndex != -1) {
            let w = u.buttons[m.primarySqueezeButtonIndex].pressed;
            w && !m.primarySqueezeActionPressed ? this.dispatchEvent("@@webxr-polyfill/input-squeeze-start", { sessionId: s.id, inputSource: m.inputSource }) : !w && m.primarySqueezeActionPressed && this.dispatchEvent("@@webxr-polyfill/input-squeeze-end", { sessionId: s.id, inputSource: m.inputSource }), m.primarySqueezeActionPressed = w;
          }
        }
      }
    }
    if (!vt && !s.immersive && s.baseLayer) {
      const l = s.baseLayer.context.canvas;
      zi(
        this.frame.leftProjectionMatrix,
        t.inlineVerticalFieldOfView,
        l.width / l.height,
        t.depthNear,
        t.depthFar
      );
    }
  }
  onFrameEnd(e) {
    const t = this.sessions.get(e);
    if (!(t.ended || !t.baseLayer)) {
      if (t.outputContext && !(t.immersive && !this.display.capabilities.hasExternalDisplay)) {
        const s = t.immersive && this.display.capabilities.hasExternalDisplay, l = t.baseLayer.context.canvas, h = s ? l.width / 2 : l.width, d = l.height;
        if (!vt) {
          const u = t.outputContext.canvas, m = u.width, w = u.height, b = t.renderContext;
          this.HAS_BITMAP_SUPPORT ? l.transferToImageBitmap ? b.transferFromImageBitmap(l.transferToImageBitmap()) : this.global.createImageBitmap(l, 0, 0, h, d, {
            resizeWidth: m,
            resizeHeight: w
          }).then((_) => b.transferFromImageBitmap(_)) : b.drawImage(
            l,
            0,
            0,
            h,
            d,
            0,
            0,
            m,
            w
          );
        }
      }
      t.immersive && t.baseLayer && this.display.submitFrame();
    }
  }
  cancelAnimationFrame(e) {
    this.display.cancelAnimationFrame(e);
  }
  async endSession(e) {
    const t = this.sessions.get(e);
    if (!t.ended) {
      if (t.immersive)
        return this.display.exitPresent();
      t.ended = !0;
    }
  }
  doesSessionSupportReferenceSpace(e, t) {
    const s = this.sessions.get(e);
    return s.ended ? !1 : s.enabledFeatures.has(t);
  }
  requestStageBounds() {
    if (this.display.stageParameters) {
      const e = this.display.stageParameters.sizeX, t = this.display.stageParameters.sizeZ, s = [];
      return s.push(-e / 2), s.push(-t / 2), s.push(e / 2), s.push(-t / 2), s.push(e / 2), s.push(t / 2), s.push(-e / 2), s.push(t / 2), s;
    }
    return null;
  }
  async requestFrameOfReferenceTransform(e, t) {
    return (e === "local-floor" || e === "bounded-floor") && this.display.stageParameters && this.display.stageParameters.sittingToStandingTransform ? this.display.stageParameters.sittingToStandingTransform : null;
  }
  getProjectionMatrix(e) {
    if (e === "left")
      return this.frame.leftProjectionMatrix;
    if (e === "right")
      return this.frame.rightProjectionMatrix;
    if (e === "none")
      return this.frame.leftProjectionMatrix;
    throw new Error("eye must be of type 'left' or 'right'");
  }
  getViewport(e, t, s, l) {
    const h = this.sessions.get(e), { width: d, height: u } = s.context.canvas;
    if (!h.immersive)
      return l.x = l.y = 0, l.width = d, l.height = u, !0;
    if (t === "left" || t === "none")
      l.x = 0;
    else if (t === "right")
      l.x = d / 2;
    else
      return !1;
    return l.y = 0, l.width = d / 2, l.height = u, !0;
  }
  getBasePoseMatrix() {
    let { position: e, orientation: t } = this.frame.pose;
    return !e && !t ? this.baseModelMatrix : (e || (e = this.tempVec3, e[0] = e[1] = e[2] = 0), bt(this.baseModelMatrix, t, e), this.baseModelMatrix);
  }
  getBaseViewMatrix(e) {
    if (e === "left" || e === "none")
      return this.frame.leftViewMatrix;
    if (e === "right")
      return this.frame.rightViewMatrix;
    throw new Error("eye must be of type 'left' or 'right'");
  }
  getInputSources() {
    let e = [];
    for (let t in this.gamepadInputSources)
      e.push(this.gamepadInputSources[t].inputSource);
    return e;
  }
  getInputPose(e, t, s) {
    if (!t)
      return null;
    for (let l in this.gamepadInputSources) {
      let h = this.gamepadInputSources[l];
      if (h.inputSource === e)
        return h.getXRPose(t, s);
    }
    return null;
  }
  onWindowResize() {
  }
  onVRDisplayPresentChange(e) {
    this.display.isPresenting || this.sessions.forEach((t) => {
      if (t.immersive && !t.ended) {
        if (t.modifiedCanvasLayer) {
          const s = t.baseLayer.context.canvas;
          document.body.removeChild(s), s.setAttribute("style", "");
        }
        this.immersiveSession === t && (this.immersiveSession = null), this.dispatchEvent("@@webxr-polyfill/vr-present-end", t.id);
      }
    });
  }
}
class Tn extends tr {
  constructor(e, t) {
    const s = new on(t || {});
    super(e, s), this.display = s, this.frame = {
      rightViewMatrix: new Float32Array(16),
      leftViewMatrix: new Float32Array(16),
      rightProjectionMatrix: new Float32Array(16),
      leftProjectionMatrix: new Float32Array(16),
      pose: null,
      timestamp: null
    };
  }
}
const Pn = process.env.NODE_ENV === "test";
let Cn = 0;
class Dn {
  constructor(e, t) {
    this.mode = e, this.enabledFeatures = t, this.ended = null, this.baseLayer = null, this.id = ++Cn;
  }
}
class In extends ci {
  constructor(e) {
    super(e), this.sessions = /* @__PURE__ */ new Map(), this.projectionMatrix = Ye(), this.identityMatrix = Ye();
  }
  onBaseLayerSet(e, t) {
    const s = this.sessions.get(e);
    s.baseLayer = t;
  }
  isSessionSupported(e) {
    return e == "inline";
  }
  isFeatureSupported(e) {
    switch (e) {
      case "viewer":
        return !0;
      default:
        return !1;
    }
  }
  async requestSession(e, t) {
    if (!this.isSessionSupported(e))
      return Promise.reject();
    const s = new Dn(e, t);
    return this.sessions.set(s.id, s), Promise.resolve(s.id);
  }
  requestAnimationFrame(e) {
    return window.requestAnimationFrame(e);
  }
  cancelAnimationFrame(e) {
    window.cancelAnimationFrame(e);
  }
  onFrameStart(e, t) {
    if (Pn)
      return;
    const s = this.sessions.get(e);
    if (s.baseLayer) {
      const l = s.baseLayer.context.canvas;
      zi(
        this.projectionMatrix,
        t.inlineVerticalFieldOfView,
        l.width / l.height,
        t.depthNear,
        t.depthFar
      );
    }
  }
  onFrameEnd(e) {
  }
  async endSession(e) {
    const t = this.sessions.get(e);
    t.ended = !0;
  }
  doesSessionSupportReferenceSpace(e, t) {
    const s = this.sessions.get(e);
    return s.ended ? !1 : s.enabledFeatures.has(t);
  }
  requestStageBounds() {
    return null;
  }
  async requestFrameOfReferenceTransform(e, t) {
    return null;
  }
  getProjectionMatrix(e) {
    return this.projectionMatrix;
  }
  getViewport(e, t, s, l) {
    this.sessions.get(e);
    const { width: h, height: d } = s.context.canvas;
    return l.x = l.y = 0, l.width = h, l.height = d, !0;
  }
  getBasePoseMatrix() {
    return this.identityMatrix;
  }
  getBaseViewMatrix(e) {
    return this.identityMatrix;
  }
  getInputSources() {
    return [];
  }
  getInputPose(e, t, s) {
    return null;
  }
  onWindowResize() {
  }
}
const Bn = async function(i) {
  let e = null;
  if ("getVRDisplays" in i.navigator)
    try {
      const t = await i.navigator.getVRDisplays();
      t && t.length && (e = new tr(i, t[0]));
    } catch {
    }
  return e;
}, Ln = async function(i, e) {
  if (e.webvr) {
    let s = await Bn(i);
    if (s)
      return s;
  }
  let t = nn(i);
  return t && e.cardboard || !t && e.allowCardboardOnDesktop ? (i.VRFrameData || (i.VRFrameData = function() {
    this.rightViewMatrix = new Float32Array(16), this.leftViewMatrix = new Float32Array(16), this.rightProjectionMatrix = new Float32Array(16), this.leftProjectionMatrix = new Float32Array(16), this.pose = null;
  }), new Tn(i, e.cardboardConfig)) : new In(i);
}, On = {
  global: ki,
  webvr: !0,
  cardboard: !0,
  cardboardConfig: null,
  allowCardboardOnDesktop: !1
}, Tt = ["navigator", "HTMLCanvasElement", "WebGLRenderingContext"];
class Nn {
  constructor(e = {}) {
    this.config = Object.freeze(Object.assign({}, On, e)), this.global = this.config.global, this.nativeWebXR = "xr" in this.global.navigator, this.injected = !1, this._injectPolyfill(this.global);
  }
  _injectPolyfill(e) {
    if (!Tt.every((t) => !!e[t]))
      throw new Error(`Global must have the following attributes : ${Tt}`);
    for (const t of Object.keys(yt))
      e[t] !== void 0 ? console.warn(`${t} already defined on global.`) : e[t] = yt[t];
    process.env.NODE_ENV !== "test" && (Mi(e.WebGLRenderingContext), _i(e.HTMLCanvasElement), e.OffscreenCanvas && _i(e.OffscreenCanvas), e.WebGL2RenderingContext && Mi(e.WebGL2RenderingContext), window.isSecureContext || console.warn(`WebXR Polyfill Warning:
This page is not running in a secure context (https:// or localhost)!
This means that although the page may be able to use the WebXR Polyfill it will
not be able to use native WebXR implementations, and as such will not be able to
access dedicated VR or AR hardware, and will not be able to take advantage of
any performance improvements a native WebXR implementation may offer. Please
host this content on a secure origin for the best user experience.
`)), this.injected = !0, this._patchNavigatorXR();
  }
  _patchNavigatorXR() {
    let e = Ln(this.global, this.config);
    this.xr = new yt.XRSystem(e), Object.defineProperty(this.global.navigator, "xr", {
      value: this.xr,
      configurable: !0
    });
  }
  _injectCompatibilityShims(e) {
    if (!Tt.every((t) => !!e[t]))
      throw new Error(`Global must have the following attributes : ${Tt}`);
    if (e.navigator.xr && "supportsSession" in e.navigator.xr && !("isSessionSupported" in e.navigator.xr)) {
      let t = e.navigator.xr.supportsSession;
      e.navigator.xr.isSessionSupported = function(s) {
        return t.call(this, s).then(() => !0).catch(() => !1);
      }, e.navigator.xr.supportsSession = function(s) {
        return console.warn("navigator.xr.supportsSession() is deprecated. Please call navigator.xr.isSessionSupported() instead and check the boolean value returned when the promise resolves."), t.call(this, s);
      };
    }
  }
}
var Gn = 1e-6, Bi = typeof Float32Array < "u" ? Float32Array : Array;
function ke() {
  var i = new Bi(16);
  return Bi != Float32Array && (i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0), i[0] = 1, i[5] = 1, i[10] = 1, i[15] = 1, i;
}
function kn(i, e, t, s, l, h, d, u, m, w, b, _, B, C, L, P, G) {
  return i[0] = e, i[1] = t, i[2] = s, i[3] = l, i[4] = h, i[5] = d, i[6] = u, i[7] = m, i[8] = w, i[9] = b, i[10] = _, i[11] = B, i[12] = C, i[13] = L, i[14] = P, i[15] = G, i;
}
function Li(i, e) {
  var t = e[0], s = e[1], l = e[2], h = e[3], d = e[4], u = e[5], m = e[6], w = e[7], b = e[8], _ = e[9], B = e[10], C = e[11], L = e[12], P = e[13], G = e[14], v = e[15], N = t * u - s * d, R = t * m - l * d, D = t * w - h * d, O = s * m - l * u, I = s * w - h * u, W = l * w - h * m, Q = b * P - _ * L, U = b * G - B * L, $ = b * v - C * L, T = _ * G - B * P, k = _ * v - C * P, M = B * v - C * G, x = N * M - R * k + D * T + O * $ - I * U + W * Q;
  return x ? (x = 1 / x, i[0] = (u * M - m * k + w * T) * x, i[1] = (l * k - s * M - h * T) * x, i[2] = (P * W - G * I + v * O) * x, i[3] = (B * I - _ * W - C * O) * x, i[4] = (m * $ - d * M - w * U) * x, i[5] = (t * M - l * $ + h * U) * x, i[6] = (G * D - L * W - v * R) * x, i[7] = (b * W - B * D + C * R) * x, i[8] = (d * k - u * $ + w * Q) * x, i[9] = (s * $ - t * k - h * Q) * x, i[10] = (L * I - P * D + v * N) * x, i[11] = (_ * D - b * I - C * N) * x, i[12] = (u * U - d * T - m * Q) * x, i[13] = (t * T - s * U + l * Q) * x, i[14] = (P * R - L * O - G * N) * x, i[15] = (b * O - _ * R + B * N) * x, i) : null;
}
function Oi(i, e, t) {
  var s = t[0], l = t[1], h = t[2], d = void 0, u = void 0, m = void 0, w = void 0, b = void 0, _ = void 0, B = void 0, C = void 0, L = void 0, P = void 0, G = void 0, v = void 0;
  return e === i ? (i[12] = e[0] * s + e[4] * l + e[8] * h + e[12], i[13] = e[1] * s + e[5] * l + e[9] * h + e[13], i[14] = e[2] * s + e[6] * l + e[10] * h + e[14], i[15] = e[3] * s + e[7] * l + e[11] * h + e[15]) : (d = e[0], u = e[1], m = e[2], w = e[3], b = e[4], _ = e[5], B = e[6], C = e[7], L = e[8], P = e[9], G = e[10], v = e[11], i[0] = d, i[1] = u, i[2] = m, i[3] = w, i[4] = b, i[5] = _, i[6] = B, i[7] = C, i[8] = L, i[9] = P, i[10] = G, i[11] = v, i[12] = d * s + b * l + L * h + e[12], i[13] = u * s + _ * l + P * h + e[13], i[14] = m * s + B * l + G * h + e[14], i[15] = w * s + C * l + v * h + e[15]), i;
}
function Ni(i, e, t, s) {
  var l = s[0], h = s[1], d = s[2], u = Math.sqrt(l * l + h * h + d * d), m = void 0, w = void 0, b = void 0, _ = void 0, B = void 0, C = void 0, L = void 0, P = void 0, G = void 0, v = void 0, N = void 0, R = void 0, D = void 0, O = void 0, I = void 0, W = void 0, Q = void 0, U = void 0, $ = void 0, T = void 0, k = void 0, M = void 0, x = void 0, K = void 0;
  return u < Gn ? null : (u = 1 / u, l *= u, h *= u, d *= u, m = Math.sin(t), w = Math.cos(t), b = 1 - w, _ = e[0], B = e[1], C = e[2], L = e[3], P = e[4], G = e[5], v = e[6], N = e[7], R = e[8], D = e[9], O = e[10], I = e[11], W = l * l * b + w, Q = h * l * b + d * m, U = d * l * b - h * m, $ = l * h * b - d * m, T = h * h * b + w, k = d * h * b + l * m, M = l * d * b + h * m, x = h * d * b - l * m, K = d * d * b + w, i[0] = _ * W + P * Q + R * U, i[1] = B * W + G * Q + D * U, i[2] = C * W + v * Q + O * U, i[3] = L * W + N * Q + I * U, i[4] = _ * $ + P * T + R * k, i[5] = B * $ + G * T + D * k, i[6] = C * $ + v * T + O * k, i[7] = L * $ + N * T + I * k, i[8] = _ * M + P * x + R * K, i[9] = B * M + G * x + D * K, i[10] = C * M + v * x + O * K, i[11] = L * M + N * x + I * K, e !== i && (i[12] = e[12], i[13] = e[13], i[14] = e[14], i[15] = e[15]), i);
}
function $t(i, e) {
  return i[0] = 1, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = 1, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = 1, i[11] = 0, i[12] = e[0], i[13] = e[1], i[14] = e[2], i[15] = 1, i;
}
function Vn(i, e, t, s, l) {
  var h = 1 / Math.tan(e / 2), d = void 0;
  return i[0] = h / t, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = h, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[11] = -1, i[12] = 0, i[13] = 0, i[15] = 0, l != null && l !== 1 / 0 ? (d = 1 / (s - l), i[10] = (l + s) * d, i[14] = 2 * l * s * d) : (i[10] = -1, i[14] = -2 * s), i;
}
var Un = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zn(i, e) {
  return e = { exports: {} }, i(e, e.exports), e.exports;
}
var ir = zn(function(i) {
  (function(e, t) {
    var s = Math.pow(2, -24), l = Math.pow(2, 32), h = Math.pow(2, 53);
    function d(w) {
      var b = new ArrayBuffer(256), _ = new DataView(b), B, C = 0;
      function L(T) {
        for (var k = b.byteLength, M = C + T; k < M; )
          k *= 2;
        if (k !== b.byteLength) {
          var x = _;
          b = new ArrayBuffer(k), _ = new DataView(b);
          for (var K = C + 3 >> 2, Y = 0; Y < K; ++Y)
            _.setUint32(Y * 4, x.getUint32(Y * 4));
        }
        return B = T, _;
      }
      function P() {
        C += B;
      }
      function G(T) {
        P(L(8).setFloat64(C, T));
      }
      function v(T) {
        P(L(1).setUint8(C, T));
      }
      function N(T) {
        for (var k = L(T.length), M = 0; M < T.length; ++M)
          k.setUint8(C + M, T[M]);
        P();
      }
      function R(T) {
        P(L(2).setUint16(C, T));
      }
      function D(T) {
        P(L(4).setUint32(C, T));
      }
      function O(T) {
        var k = T % l, M = (T - k) / l, x = L(8);
        x.setUint32(C, M), x.setUint32(C + 4, k), P();
      }
      function I(T, k) {
        k < 24 ? v(T << 5 | k) : k < 256 ? (v(T << 5 | 24), v(k)) : k < 65536 ? (v(T << 5 | 25), R(k)) : k < 4294967296 ? (v(T << 5 | 26), D(k)) : (v(T << 5 | 27), O(k));
      }
      function W(T) {
        var k;
        if (T === !1)
          return v(244);
        if (T === !0)
          return v(245);
        if (T === null)
          return v(246);
        if (T === t)
          return v(247);
        switch (typeof T) {
          case "number":
            if (Math.floor(T) === T) {
              if (0 <= T && T <= h)
                return I(0, T);
              if (-h <= T && T < 0)
                return I(1, -(T + 1));
            }
            return v(251), G(T);
          case "string":
            var M = [];
            for (k = 0; k < T.length; ++k) {
              var x = T.charCodeAt(k);
              x < 128 ? M.push(x) : x < 2048 ? (M.push(192 | x >> 6), M.push(128 | x & 63)) : x < 55296 ? (M.push(224 | x >> 12), M.push(128 | x >> 6 & 63), M.push(128 | x & 63)) : (x = (x & 1023) << 10, x |= T.charCodeAt(++k) & 1023, x += 65536, M.push(240 | x >> 18), M.push(128 | x >> 12 & 63), M.push(128 | x >> 6 & 63), M.push(128 | x & 63));
            }
            return I(3, M.length), N(M);
          default:
            var K;
            if (Array.isArray(T))
              for (K = T.length, I(4, K), k = 0; k < K; ++k)
                W(T[k]);
            else if (T instanceof Uint8Array)
              I(2, T.length), N(T);
            else {
              var Y = Object.keys(T);
              for (K = Y.length, I(5, K), k = 0; k < K; ++k) {
                var H = Y[k];
                W(H), W(T[H]);
              }
            }
        }
      }
      if (W(w), "slice" in b)
        return b.slice(0, C);
      for (var Q = new ArrayBuffer(C), U = new DataView(Q), $ = 0; $ < C; ++$)
        U.setUint8($, _.getUint8($));
      return Q;
    }
    function u(w, b, _) {
      var B = new DataView(w), C = 0;
      typeof b != "function" && (b = function(M) {
        return M;
      }), typeof _ != "function" && (_ = function() {
        return t;
      });
      function L(M, x) {
        return C += x, M;
      }
      function P(M) {
        return L(new Uint8Array(w, C, M), M);
      }
      function G() {
        var M = new ArrayBuffer(4), x = new DataView(M), K = D(), Y = K & 32768, H = K & 31744, we = K & 1023;
        if (H === 31744)
          H = 255 << 10;
        else if (H !== 0)
          H += 127 - 15 << 10;
        else if (we !== 0)
          return we * s;
        return x.setUint32(0, Y << 16 | H << 13 | we << 13), x.getFloat32(0);
      }
      function v() {
        return L(B.getFloat32(C), 4);
      }
      function N() {
        return L(B.getFloat64(C), 8);
      }
      function R() {
        return L(B.getUint8(C), 1);
      }
      function D() {
        return L(B.getUint16(C), 2);
      }
      function O() {
        return L(B.getUint32(C), 4);
      }
      function I() {
        return O() * l + O();
      }
      function W() {
        return B.getUint8(C) !== 255 ? !1 : (C += 1, !0);
      }
      function Q(M) {
        if (M < 24)
          return M;
        if (M === 24)
          return R();
        if (M === 25)
          return D();
        if (M === 26)
          return O();
        if (M === 27)
          return I();
        if (M === 31)
          return -1;
        throw "Invalid length encoding";
      }
      function U(M) {
        var x = R();
        if (x === 255)
          return -1;
        var K = Q(x & 31);
        if (K < 0 || x >> 5 !== M)
          throw "Invalid indefinite length element";
        return K;
      }
      function $(M, x) {
        for (var K = 0; K < x; ++K) {
          var Y = R();
          Y & 128 && (Y < 224 ? (Y = (Y & 31) << 6 | R() & 63, x -= 1) : Y < 240 ? (Y = (Y & 15) << 12 | (R() & 63) << 6 | R() & 63, x -= 2) : (Y = (Y & 15) << 18 | (R() & 63) << 12 | (R() & 63) << 6 | R() & 63, x -= 3)), Y < 65536 ? M.push(Y) : (Y -= 65536, M.push(55296 | Y >> 10), M.push(56320 | Y & 1023));
        }
      }
      function T() {
        var M = R(), x = M >> 5, K = M & 31, Y, H;
        if (x === 7)
          switch (K) {
            case 25:
              return G();
            case 26:
              return v();
            case 27:
              return N();
          }
        if (H = Q(K), H < 0 && (x < 2 || 6 < x))
          throw "Invalid length";
        switch (x) {
          case 0:
            return H;
          case 1:
            return -1 - H;
          case 2:
            if (H < 0) {
              for (var we = [], te = 0; (H = U(x)) >= 0; )
                te += H, we.push(P(H));
              var me = new Uint8Array(te), ye = 0;
              for (Y = 0; Y < we.length; ++Y)
                me.set(we[Y], ye), ye += we[Y].length;
              return me;
            }
            return P(H);
          case 3:
            var Ue = [];
            if (H < 0)
              for (; (H = U(x)) >= 0; )
                $(Ue, H);
            else
              $(Ue, H);
            return String.fromCharCode.apply(null, Ue);
          case 4:
            var Ie;
            if (H < 0)
              for (Ie = []; !W(); )
                Ie.push(T());
            else
              for (Ie = new Array(H), Y = 0; Y < H; ++Y)
                Ie[Y] = T();
            return Ie;
          case 5:
            var ue = {};
            for (Y = 0; Y < H || H < 0 && !W(); ++Y) {
              var Ke = T();
              ue[Ke] = T();
            }
            return ue;
          case 6:
            return b(T(), H);
          case 7:
            switch (H) {
              case 20:
                return !1;
              case 21:
                return !0;
              case 22:
                return null;
              case 23:
                return t;
              default:
                return _(H);
            }
        }
      }
      var k = T();
      if (C !== w.byteLength)
        throw "Remaining bytes";
      return k;
    }
    var m = { encode: d, decode: u };
    typeof t == "function" && t.amd ? t("cbor/cbor", m) : i.exports ? i.exports = m : e.CBOR || (e.CBOR = m);
  })(Un);
});
/**
 * This files defines the HoloPlayClient class and Message class.
 *
 * Copyright (c) [2019] [Looking Glass Factory]
 *
 * @link    https://lookingglassfactory.com/
 * @file    This files defines the HoloPlayClient class and Message class.
 * @author  Looking Glass Factory.
 * @version 0.0.8
 * @license SEE LICENSE IN LICENSE.md
 */
const Qn = typeof window > "u" ? require("ws") : window.WebSocket;
class Xn {
  constructor(e, t, s, l = !1, h, d, u) {
    this.reqs = [], this.reps = [], this.requestId = this.getRequestId(), this.debug = l, this.isGreedy = d, this.errCallback = t, this.closeCallback = s, this.alwaysdebug = !1, this.isConnected = !1;
    let m = null;
    h || d || u ? m = new Wn(h, d, u, this.debug) : (l && (this.alwaysdebug = !0), typeof e == "function" && (m = new Hn())), this.openWebsocket(m, e);
  }
  sendMessage(e, t = 60) {
    this.alwaysdebug && (e.cmd.debug = !0);
    let s = e.toCbor();
    return this.sendRequestObj(s, t);
  }
  disconnect() {
    this.ws.close();
  }
  openWebsocket(e = null, t = null) {
    this.ws = new Qn("ws://localhost:11222/driver", ["rep.sp.nanomsg.org"]), this.ws.parent = this, this.ws.binaryType = "arraybuffer", this.ws.onmessage = this.messageHandler, this.ws.onopen = () => {
      this.isConnected = !0, this.debug && console.log("socket open"), e != null && this.sendMessage(e).then(t);
    }, this.ws.onerror = this.onSocketError, this.ws.onclose = this.onClose;
  }
  sendRequestObj(e, t) {
    return new Promise((s, l) => {
      let h = {
        id: this.requestId++,
        parent: this,
        payload: e,
        success: s,
        error: l,
        send: function() {
          this.debug && console.log("attemtping to send request with ID " + this.id), this.timeout = setTimeout(h.send.bind(this), t * 1e3);
          let d = new Uint8Array(e.byteLength + 4);
          new DataView(d.buffer).setUint32(0, this.id), d.set(new Uint8Array(this.payload), 4), this.parent.ws.send(d.buffer);
        }
      };
      this.reqs.push(h), h.send();
    });
  }
  messageHandler(e) {
    console.log("message");
    let t = e.data;
    if (t.byteLength < 4)
      return;
    let l = new DataView(t).getUint32(0);
    if (l < 2147483648) {
      this.parent.err("bad nng header");
      return;
    }
    let h = this.parent.findReqIndex(l);
    if (h == -1) {
      this.parent.err("got reply that doesn't match known request!");
      return;
    }
    let d = { id: l, payload: ir.decode(t.slice(4)) };
    d.payload.error == 0 ? this.parent.reqs[h].success(d.payload) : this.parent.reqs[h].error(d.payload), clearTimeout(this.parent.reqs[h].timeout), this.parent.reqs.splice(h, 1), this.parent.reps.push(d), this.debug && console.log(d.payload);
  }
  getRequestId() {
    return Math.floor(this.prng() * 2147483647) + 2147483648;
  }
  onClose(e) {
    this.parent.isConnected = !1, this.parent.debug && console.log("socket closed"), typeof this.parent.closeCallback == "function" && this.parent.closeCallback(e);
  }
  onSocketError(e) {
    this.parent.debug && console.log(e), typeof this.parent.errCallback == "function" && this.parent.errCallback(e);
  }
  err(e) {
    this.debug && console.log("[DRIVER ERROR]" + e);
  }
  findReqIndex(e) {
    let t = 0;
    for (; t < this.reqs.length; t++)
      if (this.reqs[t].id == e)
        return t;
    return -1;
  }
  prng() {
    return this.rng == null && (this.rng = Yn()), this.rng();
  }
}
class rr {
  constructor(e, t) {
    this.cmd = e, this.bin = t;
  }
  toCbor() {
    return ir.encode(this);
  }
}
class Wn extends rr {
  constructor(e = "", t = !1, s = "", l = !1) {
    let h = { init: {} };
    e != "" && (h.init.appid = e), s != "" && (h.init.onclose = s), t && (h.init.greedy = !0), l && (h.init.debug = !0), super(h, null);
  }
}
class Hn extends rr {
  constructor() {
    let e = { info: {} };
    super(e, null);
  }
}
function Yn() {
  function i(l) {
    for (var h = 0, d = 1779033703 ^ l.length; h < l.length; h++)
      d = Math.imul(d ^ l.charCodeAt(h), 3432918353), d = d << 13 | d >>> 19;
    return function() {
      return d = Math.imul(d ^ d >>> 16, 2246822507), d = Math.imul(d ^ d >>> 13, 3266489909), (d ^= d >>> 16) >>> 0;
    };
  }
  function e(l, h, d, u) {
    return () => {
      var m = h << 9, w = l * 5;
      return w = (w << 7 | w >>> 25) * 9, d ^= l, u ^= h, h ^= d, l ^= u, d ^= m, u = u << 11 | u >>> 21, (w >>> 0) / 4294967296;
    };
  }
  var t = Date.now(), s = i(t.toString());
  return e(s(), s(), s(), s());
}
function jn(i, ...e) {
  let t = i[0];
  for (let s = 1; s < i.length; ++s) {
    const l = e[s - 1];
    t += typeof l == "number" ? l.toPrecision(10) : l, t += i[s];
  }
  return t;
}
function Zn(i) {
  return jn`
  precision mediump float;
  uniform int u_viewType;
  uniform sampler2D u_texture;
  varying vec2 v_texcoord;
  const float pitch    = ${i.pitch};
  const float tilt     = ${i.tilt};
  const float center   = ${i.calibration.center.value};
  const float invView  = ${i.calibration.invView.value};
  const float flipX    = ${i.calibration.flipImageX.value};
  const float flipY    = ${i.calibration.flipImageY.value};
  const float subp     = ${i.subp};
  const float numViews = ${i.numViews};
  const float tilesX   = ${i.quiltWidth};
  const float tilesY   = ${i.quiltHeight};
  const vec2 quiltViewPortion = vec2(
    ${i.quiltWidth * i.tileWidth / i.framebufferWidth},
    ${i.quiltHeight * i.tileHeight / i.framebufferHeight});
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
}
const ni = 1.6;
let Kt;
function Ve() {
  return Kt === void 0 && (Kt = $n()), Kt;
}
const qn = {
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
}, $n = () => new class extends EventTarget {
  constructor() {
    super();
    const i = (e) => {
      e && this.dispatchEvent(new Event("on-config-changed")), new Promise((s) => {
        this._ensureConfigChangeEvent = s;
      }).then(() => i(!0));
    };
    i(!1), this.calibration = qn, new Xn(
      (e) => {
        if (e.devices.length < 1) {
          console.error("No Looking Glass devices found!");
          return;
        }
        e.devices.length > 1 && console.warn("More than one Looking Glass device found... using the first one"), this.calibration = e.devices[0].calibration;
      },
      (e) => {
        console.error("Error creating Looking Glass client:", e);
      }
    ), this.tileHeight = 320, this.numViews = 2, this.trackballX = 0, this.trackballY = 0, this.targetX = 0, this.targetY = ni, this.targetZ = -0.5, this.targetDiam = 2, this.fovy = 13 / 180 * Math.PI, this.depthiness = 1.25, this.inlineView = 1;
  }
  get calibration() {
    return this._calibration;
  }
  set calibration(i) {
    this._calibration = nr(i), this._ensureConfigChangeEvent();
  }
  get tileHeight() {
    return this._tileHeight;
  }
  set tileHeight(i) {
    this._tileHeight = i, this._ensureConfigChangeEvent();
  }
  get numViews() {
    return this._numViews;
  }
  set numViews(i) {
    this._numViews = i, this._ensureConfigChangeEvent();
  }
  get targetX() {
    return this._targetX;
  }
  set targetX(i) {
    this._targetX = i, this._ensureConfigChangeEvent();
  }
  get targetY() {
    return this._targetY;
  }
  set targetY(i) {
    this._targetY = i, this._ensureConfigChangeEvent();
  }
  get targetZ() {
    return this._targetZ;
  }
  set targetZ(i) {
    this._targetZ = i, this._ensureConfigChangeEvent();
  }
  get trackballX() {
    return this._trackballX;
  }
  set trackballX(i) {
    this._trackballX = i, this._ensureConfigChangeEvent();
  }
  get trackballY() {
    return this._trackballY;
  }
  set trackballY(i) {
    this._trackballY = i, this._ensureConfigChangeEvent();
  }
  get targetDiam() {
    return this._targetDiam;
  }
  set targetDiam(i) {
    this._targetDiam = i, this._ensureConfigChangeEvent();
  }
  get fovy() {
    return this._fovy;
  }
  set fovy(i) {
    this._fovy = i, this._ensureConfigChangeEvent();
  }
  get depthiness() {
    return this._depthiness;
  }
  set depthiness(i) {
    this._depthiness = i, this._ensureConfigChangeEvent();
  }
  get inlineView() {
    return this._inlineView;
  }
  set inlineView(i) {
    this._inlineView = i, this._ensureConfigChangeEvent();
  }
  get aspect() {
    return this.calibration.screenW.value / this.calibration.screenH.value;
  }
  get tileWidth() {
    return Math.round(this.tileHeight * this.aspect);
  }
  get framebufferWidth() {
    const i = this.tileWidth * this.tileHeight * this.numViews;
    return 2 ** Math.ceil(Math.log2(Math.max(Math.sqrt(i), this.tileWidth)));
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
    const i = this.calibration.screenW.value / this.calibration.DPI.value;
    return this.calibration.pitch.value * i * Math.cos(Math.atan(1 / this.calibration.slope.value));
  }
}();
function nr(i) {
  return Object.freeze(i), i === void 0 || Object.getOwnPropertyNames(i).forEach(function(e) {
    i[e] !== null && (typeof i[e] == "object" || typeof i[e] == "function") && !Object.isFrozen(i[e]) && nr(i[e]);
  }), i;
}
function Kn(i) {
  const e = Ve(), t = document.createElement("style");
  document.head.appendChild(t), t.sheet.insertRule(
    "#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }"
  );
  const s = document.createElement("div");
  s.id = "LookingGlassWebXRControls", s.style.position = "fixed", s.style.zIndex = 1e3, s.style.padding = "4px", s.style.width = "315px", s.style.height = "360px", s.style.maxWidth = "calc(100vw - 18px)", s.style.maxHeight = "calc(100vh - 18px)", s.style.whiteSpace = "nowrap", s.style.overflowY = "scroll", s.style.scrollbarWidth = "thin", s.style.scrollbarColor = "thistle transparent", s.style.background = "rgba(0, 0, 0, 0.6)", s.style.color = "white", s.style.padding = "2px", s.style.border = "3px solid black", s.style.right = "6px", s.style.bottom = "6px";
  const l = document.createElement("div");
  s.appendChild(l), l.style.width = "100%", l.style.textAlign = "center", l.style.fontWeight = "bold", l.innerText = "LookingGlass View Controls ";
  const h = document.createElement("div");
  s.appendChild(h), h.style.width = "100%", h.style.whiteSpace = "normal", h.style.textAlign = "center", h.innerHTML = "Camera: click popup and use WASD, mouse left/right drag, and scroll.";
  const d = document.createElement("input");
  l.appendChild(d), d.type = "button", d.value = "\u2190", d._otherValue = "\u2192", d.onclick = () => {
    [s.style.right, s.style.left] = [s.style.left, s.style.right], [d.value, d._otherValue] = [d._otherValue, d.value];
  };
  const u = document.createElement("div");
  s.appendChild(u);
  const m = (v, N, R) => {
    const D = R.stringify, O = document.createElement("div");
    u.appendChild(O);
    const I = v, W = e[v], Q = document.createElement("label");
    if (O.appendChild(Q), Q.innerText = R.label, Q.setAttribute("for", I), Q.style.width = "80px", Q.style.display = "inline-block", Q.style.textDecoration = "dotted underline 1px", Q.title = R.title, N.type !== "checkbox") {
      const M = document.createElement("input");
      O.appendChild(M), M.type = "button", M.value = "\u238C", M.alt = "reset", M.title = "Reset value to default", M.style.padding = "0 4px", M.onclick = () => {
        U.value = W, U.oninput();
      };
    }
    const U = document.createElement("input");
    O.appendChild(U), Object.assign(U, N), U.id = I, U.title = R.title, U.value = N.value !== void 0 ? N.value : W;
    const $ = (M) => {
      e[v] = M, k(M);
    };
    U.oninput = () => {
      const M = N.type === "range" ? parseFloat(U.value) : N.type === "checkbox" ? U.checked : U.value;
      $(M);
    };
    const T = (M) => {
      let x = M(e[v]);
      R.fixRange && (x = R.fixRange(x), U.max = Math.max(parseFloat(U.max), x), U.min = Math.min(parseFloat(U.min), x)), U.value = x, $(x);
    };
    N.type === "range" && (U.style.width = "110px", U.style.height = "16px", U.onwheel = (M) => {
      T((x) => x + Math.sign(M.deltaX - M.deltaY) * N.step);
    });
    let k = () => {
    };
    if (D) {
      const M = document.createElement("span");
      O.appendChild(M), k = (x) => {
        M.innerHTML = D(x);
      }, k(W);
    }
    return T;
  };
  m(
    "tileHeight",
    { type: "range", min: 160, max: 455, step: 1 },
    {
      label: "resolution",
      title: "resolution of each view",
      stringify: (v) => `${(v * e.aspect).toFixed()}&times;${v.toFixed()}`
    }
  ), m(
    "numViews",
    { type: "range", min: 1, max: 145, step: 1 },
    {
      label: "# views",
      title: "number of different viewing angles to render",
      stringify: (v) => v.toFixed()
    }
  );
  const w = m(
    "trackballX",
    { type: "range", min: -Math.PI, max: 1.0001 * Math.PI, step: 0.5 / 180 * Math.PI },
    {
      label: "trackball x",
      title: "camera trackball x",
      fixRange: (v) => (v + Math.PI * 3) % (Math.PI * 2) - Math.PI,
      stringify: (v) => `${(v / Math.PI * 180).toFixed()}&deg;`
    }
  ), b = m(
    "trackballY",
    { type: "range", min: -0.5 * Math.PI, max: 0.5001 * Math.PI, step: 1 / 180 * Math.PI },
    {
      label: "trackball y",
      title: "camera trackball y",
      fixRange: (v) => Math.max(-0.5 * Math.PI, Math.min(v, 0.5 * Math.PI)),
      stringify: (v) => `${(v / Math.PI * 180).toFixed()}&deg;`
    }
  ), _ = m(
    "targetX",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target x",
      title: "target position x",
      fixRange: (v) => v,
      stringify: (v) => v.toFixed(2) + " m"
    }
  ), B = m(
    "targetY",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target y",
      title: "target position y",
      fixRange: (v) => v,
      stringify: (v) => v.toFixed(2) + " m"
    }
  ), C = m(
    "targetZ",
    { type: "range", min: -20, max: 20, step: 0.1 },
    {
      label: "target z",
      title: "target position z",
      fixRange: (v) => v,
      stringify: (v) => v.toFixed(2) + " m"
    }
  ), L = m(
    "targetDiam",
    { type: "range", min: 0.2, max: 20, step: 0.1 },
    {
      label: "target size",
      title: "diameter of the target sphere to fit in the screen",
      fixRange: (v) => Math.max(0.2, v),
      stringify: (v) => `${(v * 100).toFixed()} cm`
    }
  );
  m(
    "fovy",
    { type: "range", min: 1 / 180 * Math.PI, max: 120.1 / 180 * Math.PI, step: 1 / 180 * Math.PI },
    {
      label: "fov",
      title: "perspective fov (degrades stereo effect)",
      fixRange: (v) => Math.max(1 / 180 * Math.PI, Math.min(v, 120.1 / 180 * Math.PI)),
      stringify: (v) => {
        const N = v / Math.PI * 180, R = Math.atan(Math.tan(v / 2) * e.aspect) * 2 / Math.PI * 180;
        return `${N.toFixed()}&deg;&times;${R.toFixed()}&deg;`;
      }
    }
  ), m(
    "depthiness",
    { type: "range", min: 0, max: 2, step: 0.01 },
    {
      label: "depthiness",
      title: 'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',
      fixRange: (v) => Math.max(0, v),
      stringify: (v) => `${v.toFixed(2)}x`
    }
  ), m(
    "inlineView",
    { type: "range", min: 0, max: 2, step: 1 },
    {
      label: "inline view",
      title: "what to show inline on the original canvas (swizzled = no overwrite)",
      fixRange: (v) => Math.max(0, Math.min(v, 2)),
      stringify: (v) => v === 0 ? "swizzled" : v === 1 ? "center" : v === 2 ? "quilt" : "?"
    }
  ), i.oncontextmenu = (v) => {
    v.preventDefault();
  }, i.addEventListener("wheel", (v) => {
    L((N) => {
      const D = Math.log(N) / Math.log(1.1);
      return Math.pow(1.1, D + v.deltaY * 0.01);
    });
  }), i.addEventListener("mousemove", (v) => {
    const N = v.movementX, R = -v.movementY;
    if (v.buttons & 2 || v.buttons & 1 && (v.shiftKey || v.ctrlKey)) {
      const D = e.trackballX, O = e.trackballY, I = -Math.cos(D) * N + Math.sin(D) * Math.sin(O) * R, W = -Math.cos(O) * R, Q = Math.sin(D) * N + Math.cos(D) * Math.sin(O) * R;
      _((U) => U + I * e.targetDiam * 1e-3), B((U) => U + W * e.targetDiam * 1e-3), C((U) => U + Q * e.targetDiam * 1e-3);
    } else
      v.buttons & 1 && (w((D) => D - N * 0.01), b((D) => D - R * 0.01));
  });
  const P = { w: 0, a: 0, s: 0, d: 0 };
  i.addEventListener("keydown", (v) => {
    switch (v.code) {
      case "KeyW":
        P.w = 1;
        break;
      case "KeyA":
        P.a = 1;
        break;
      case "KeyS":
        P.s = 1;
        break;
      case "KeyD":
        P.d = 1;
        break;
    }
  }), i.addEventListener("keyup", (v) => {
    switch (v.code) {
      case "KeyW":
        P.w = 0;
        break;
      case "KeyA":
        P.a = 0;
        break;
      case "KeyS":
        P.s = 0;
        break;
      case "KeyD":
        P.d = 0;
        break;
    }
  }), requestAnimationFrame(G);
  function G() {
    let v = P.d - P.a, N = P.w - P.s;
    v && N && (v *= Math.sqrt(0.5), N *= Math.sqrt(0.5));
    const R = e.trackballX, D = e.trackballY, O = Math.cos(R) * v - Math.sin(R) * Math.cos(D) * N, I = -Math.sin(D) * N, W = -Math.sin(R) * v - Math.cos(R) * Math.cos(D) * N;
    _((Q) => Q + O * e.targetDiam * 0.03), B((Q) => Q + I * e.targetDiam * 0.03), C((Q) => Q + W * e.targetDiam * 0.03), requestAnimationFrame(G);
  }
  return s;
}
const Le = Symbol("LookingGlassXRWebGLLayer"), be = document.createElement("canvas");
be.tabIndex = 0;
const Gi = be.getContext("2d", { alpha: !1 });
be.addEventListener("dblclick", function() {
  this.requestFullscreen();
});
const Jt = Kn(be);
class Jn extends Ki {
  constructor(e, t, s) {
    super(e, t, s);
    const l = Ve(), h = this[He].config, d = t.createTexture();
    let u, m;
    const w = t.createFramebuffer(), b = t.enable.bind(t), _ = t.disable.bind(t), B = t.getExtension("OES_vertex_array_object"), C = 34229, L = B ? B.bindVertexArrayOES.bind(B) : t.bindVertexArray.bind(t), P = () => {
      const te = t.getParameter(t.TEXTURE_BINDING_2D);
      if (t.bindTexture(t.TEXTURE_2D, d), t.texImage2D(
        t.TEXTURE_2D,
        0,
        t.RGBA,
        l.framebufferWidth,
        l.framebufferHeight,
        0,
        t.RGBA,
        t.UNSIGNED_BYTE,
        null
      ), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.bindTexture(t.TEXTURE_2D, te), u) {
        const me = t.getParameter(t.RENDERBUFFER_BINDING);
        t.bindRenderbuffer(t.RENDERBUFFER, u), t.renderbufferStorage(
          t.RENDERBUFFER,
          m.format,
          l.framebufferWidth,
          l.framebufferHeight
        ), t.bindRenderbuffer(t.RENDERBUFFER, me);
      }
    };
    (h.depth || h.stencil) && (h.depth && h.stencil ? m = { format: t.DEPTH_STENCIL, attachment: t.DEPTH_STENCIL_ATTACHMENT } : h.depth ? m = { format: t.DEPTH_COMPONENT16, attachment: t.DEPTH_ATTACHMENT } : h.stencil && (m = { format: t.STENCIL_INDEX8, attachment: t.STENCIL_ATTACHMENT }), u = t.createRenderbuffer()), P(), l.addEventListener("on-config-changed", P);
    const G = t.getParameter(t.FRAMEBUFFER_BINDING);
    t.bindFramebuffer(t.FRAMEBUFFER, w), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, d, 0), (h.depth || h.stencil) && t.framebufferRenderbuffer(t.FRAMEBUFFER, m.attachment, t.RENDERBUFFER, u), t.bindFramebuffer(t.FRAMEBUFFER, G);
    const v = t.createProgram(), N = t.createShader(t.VERTEX_SHADER);
    t.attachShader(v, N);
    const R = t.createShader(t.FRAGMENT_SHADER);
    t.attachShader(v, R);
    {
      const te = `
       attribute vec2 a_position;
       varying vec2 v_texcoord;
       void main() {
         gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
         v_texcoord = a_position;
       }
     `;
      t.shaderSource(N, te), t.compileShader(N), t.getShaderParameter(N, t.COMPILE_STATUS) || console.warn(t.getShaderInfoLog(N));
    }
    let D, O, I;
    const W = () => {
      const te = Zn(l);
      if (te === D)
        return;
      if (D = te, t.shaderSource(R, te), t.compileShader(R), !t.getShaderParameter(R, t.COMPILE_STATUS)) {
        console.warn(t.getShaderInfoLog(R));
        return;
      }
      if (t.linkProgram(v), !t.getProgramParameter(v, t.LINK_STATUS)) {
        console.warn(t.getProgramInfoLog(v));
        return;
      }
      O = t.getAttribLocation(v, "a_position"), I = t.getUniformLocation(v, "u_viewType");
      const me = t.getUniformLocation(v, "u_texture"), ye = t.getParameter(t.CURRENT_PROGRAM);
      t.useProgram(v), t.uniform1i(me, 0), t.useProgram(ye);
    };
    l.addEventListener("on-config-changed", W);
    const Q = B ? B.createVertexArrayOES() : t.createVertexArray(), U = t.createBuffer(), $ = t.getParameter(t.ARRAY_BUFFER_BINDING), T = t.getParameter(C);
    L(Q), t.bindBuffer(t.ARRAY_BUFFER, U), t.bufferData(t.ARRAY_BUFFER, new Float32Array([
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
    ]), t.STATIC_DRAW), t.enableVertexAttribArray(O), t.vertexAttribPointer(O, 2, t.FLOAT, !1, 0, 0), L(T), t.bindBuffer(t.ARRAY_BUFFER, $);
    const k = () => {
      console.assert(this[Le].LookingGlassEnabled), t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer);
      const te = t.getParameter(t.COLOR_CLEAR_VALUE), me = t.getParameter(t.DEPTH_CLEAR_VALUE), ye = t.getParameter(t.STENCIL_CLEAR_VALUE);
      t.clearColor(0, 0, 0, 0), t.clearDepth(1), t.clearStencil(0), t.clear(t.DEPTH_BUFFER_BIT | t.COLOR_BUFFER_BIT | t.STENCIL_BUFFER_BIT), t.clearColor(te[0], te[1], te[2], te[3]), t.clearDepth(me), t.clearStencil(ye);
    }, M = t.canvas;
    let x, K;
    const Y = () => {
      if (!this[Le].LookingGlassEnabled)
        return;
      (M.width !== l.calibration.screenW.value || M.height !== l.calibration.screenH.value) && (x = M.width, K = M.height, M.width = l.calibration.screenW.value, M.height = l.calibration.screenH.value);
      const te = t.getParameter(C), me = t.getParameter(t.CULL_FACE), ye = t.getParameter(t.BLEND), Ue = t.getParameter(t.DEPTH_TEST), Ie = t.getParameter(t.STENCIL_TEST), ue = t.getParameter(t.SCISSOR_TEST), Ke = t.getParameter(t.VIEWPORT), Ot = t.getParameter(t.FRAMEBUFFER_BINDING), xt = t.getParameter(t.RENDERBUFFER_BINDING), Je = t.getParameter(t.CURRENT_PROGRAM), St = t.getParameter(t.ACTIVE_TEXTURE);
      {
        const Mt = t.getParameter(t.TEXTURE_BINDING_2D);
        t.bindFramebuffer(t.FRAMEBUFFER, null), t.useProgram(v), L(Q), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, d), t.disable(t.BLEND), t.disable(t.CULL_FACE), t.disable(t.DEPTH_TEST), t.disable(t.STENCIL_TEST), t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight), t.uniform1i(I, 0), t.drawArrays(t.TRIANGLES, 0, 6), Gi.clearRect(0, 0, be.width, be.height), Gi.drawImage(M, 0, 0), l.inlineView !== 0 && (t.uniform1i(I, l.inlineView), t.drawArrays(t.TRIANGLES, 0, 6)), t.bindTexture(t.TEXTURE_2D, Mt);
      }
      t.activeTexture(St), t.useProgram(Je), t.bindRenderbuffer(t.RENDERBUFFER, xt), t.bindFramebuffer(t.FRAMEBUFFER, Ot), t.viewport(...Ke), (ue ? b : _)(t.SCISSOR_TEST), (Ie ? b : _)(t.STENCIL_TEST), (Ue ? b : _)(t.DEPTH_TEST), (ye ? b : _)(t.BLEND), (me ? b : _)(t.CULL_FACE), L(te);
    };
    let H;
    window.addEventListener("unload", () => {
      H && H.close(), H = void 0;
    });
    const we = (te, me) => {
      !!H != te && (te ? (W(), be.style.position = "fixed", be.style.top = "0", be.style.left = "0", be.style.width = "100%", be.style.height = "100%", be.width = l.calibration.screenW.value, be.height = l.calibration.screenH.value, document.body.appendChild(Jt), H = window.open("", void 0, "width=640,height=360"), H.document.title = "Looking Glass Window (fullscreen me on Looking Glass!)", H.document.body.style.background = "black", H.document.body.appendChild(be), console.assert(me), H.onbeforeunload = me) : (Jt.parentElement.removeChild(Jt), M.width = x, M.height = K, H.onbeforeunload = void 0, H.close(), H = void 0));
    };
    this[Le] = {
      LookingGlassEnabled: !1,
      framebuffer: w,
      clearFramebuffer: k,
      blitTextureToDefaultFramebufferIfNeeded: Y,
      moveCanvasToWindow: we
    };
  }
  get framebuffer() {
    return this[Le].LookingGlassEnabled ? this[Le].framebuffer : null;
  }
  get framebufferWidth() {
    return Ve().framebufferWidth;
  }
  get framebufferHeight() {
    return Ve().framebufferHeight;
  }
}
class es extends ci {
  constructor(e) {
    super(e), this.sessions = /* @__PURE__ */ new Map(), this.viewSpaces = [], this.basePoseMatrix = ke(), this.inlineProjectionMatrix = ke(), this.inlineInverseViewMatrix = ke(), this.LookingGlassProjectionMatrices = [], this.LookingGlassInverseViewMatrices = [];
  }
  onBaseLayerSet(e, t) {
    const s = this.sessions.get(e);
    s.baseLayer = t;
    const l = t[Le];
    l.LookingGlassEnabled = s.immersive, s.immersive && l.moveCanvasToWindow(!0, () => {
      this.endSession(e);
    });
  }
  isSessionSupported(e) {
    return e === "inline" || e === "immersive-vr";
  }
  isFeatureSupported(e) {
    switch (e) {
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
        return console.warn("LookingGlassXRDevice.isFeatureSupported: feature not understood:", e), !1;
    }
  }
  async requestSession(e, t) {
    if (!this.isSessionSupported(e))
      return Promise.reject();
    const s = e !== "inline", l = new is(e, t);
    return this.sessions.set(l.id, l), s && this.dispatchEvent("@@webxr-polyfill/vr-present-start", l.id), Promise.resolve(l.id);
  }
  requestAnimationFrame(e) {
    return this.global.requestAnimationFrame(e);
  }
  cancelAnimationFrame(e) {
    this.global.cancelAnimationFrame(e);
  }
  onFrameStart(e, t) {
    const s = this.sessions.get(e), l = Ve();
    if (s.immersive) {
      const h = Math.tan(0.5 * l.fovy), d = 0.5 * l.targetDiam / h, u = d - l.targetDiam, m = this.basePoseMatrix;
      $t(m, [l.targetX, l.targetY, l.targetZ]), Ni(m, m, l.trackballX, [0, 1, 0]), Ni(m, m, -l.trackballY, [1, 0, 0]), Oi(m, m, [0, 0, d]);
      for (let b = 0; b < l.numViews; ++b) {
        const _ = (b + 0.5) / l.numViews - 0.5, B = Math.tan(l.viewCone * _), C = d * B, L = this.LookingGlassInverseViewMatrices[b] = this.LookingGlassInverseViewMatrices[b] || ke();
        Oi(L, m, [C, 0, 0]), Li(L, L);
        const P = Math.max(u + t.depthNear, 0.01), G = u + t.depthFar, v = P * h, N = v, R = -v, D = P * -B, O = l.aspect * v, I = D + O, W = D - O, Q = this.LookingGlassProjectionMatrices[b] = this.LookingGlassProjectionMatrices[b] || ke();
        kn(
          Q,
          2 * P / (I - W),
          0,
          0,
          0,
          0,
          2 * P / (N - R),
          0,
          0,
          (I + W) / (I - W),
          (N + R) / (N - R),
          -(G + P) / (G - P),
          -1,
          0,
          0,
          -2 * G * P / (G - P),
          0
        );
      }
      s.baseLayer[Le].clearFramebuffer();
    } else {
      const h = s.baseLayer.context, d = h.drawingBufferWidth / h.drawingBufferHeight;
      Vn(
        this.inlineProjectionMatrix,
        t.inlineVerticalFieldOfView,
        d,
        t.depthNear,
        t.depthFar
      ), $t(this.basePoseMatrix, [0, ni, 0]), Li(this.inlineInverseViewMatrix, this.basePoseMatrix);
    }
  }
  onFrameEnd(e) {
    this.sessions.get(e).baseLayer[Le].blitTextureToDefaultFramebufferIfNeeded();
  }
  async requestFrameOfReferenceTransform(e, t) {
    const s = ke();
    switch (e) {
      case "viewer":
      case "local":
        return $t(s, [0, -ni, 0]), s;
      case "local-floor":
        return s;
      default:
        throw new Error("XRReferenceSpaceType not understood");
    }
  }
  endSession(e) {
    const t = this.sessions.get(e);
    t.immersive && t.baseLayer && (t.baseLayer[Le].moveCanvasToWindow(!1), this.dispatchEvent("@@webxr-polyfill/vr-present-end", e)), t.ended = !0;
  }
  doesSessionSupportReferenceSpace(e, t) {
    const s = this.sessions.get(e);
    return s.ended ? !1 : s.enabledFeatures.has(t);
  }
  getViewSpaces(e) {
    if (e === "immersive-vr") {
      const t = Ve();
      for (let s = this.viewSpaces.length; s < t.numViews; ++s)
        this.viewSpaces[s] = new rs(s);
      return this.viewSpaces.length = t.numViews, this.viewSpaces;
    }
  }
  getViewport(e, t, s, l, h) {
    if (h === void 0) {
      const u = this.sessions.get(e).baseLayer.context;
      l.x = 0, l.y = 0, l.width = u.drawingBufferWidth, l.height = u.drawingBufferHeight;
    } else {
      const d = Ve(), u = h % d.quiltWidth, m = Math.floor(h / d.quiltWidth);
      l.x = d.tileWidth * u, l.y = d.tileHeight * m, l.width = d.tileWidth, l.height = d.tileHeight;
    }
    return !0;
  }
  getProjectionMatrix(e, t) {
    return t === void 0 ? this.inlineProjectionMatrix : this.LookingGlassProjectionMatrices[t] || ke();
  }
  getBasePoseMatrix() {
    return this.basePoseMatrix;
  }
  getBaseViewMatrix() {
    return this.inlineInverseViewMatrix;
  }
  _getViewMatrixByIndex(e) {
    return this.LookingGlassInverseViewMatrices[e] = this.LookingGlassInverseViewMatrices[e] || ke();
  }
  getInputSources() {
    return [];
  }
  getInputPose(e, t, s) {
    return null;
  }
  onWindowResize() {
  }
}
let ts = 0;
class is {
  constructor(e, t) {
    this.mode = e, this.immersive = e === "immersive-vr" || e === "immersive-ar", this.id = ++ts, this.baseLayer = null, this.inlineVerticalFieldOfView = Math.PI * 0.5, this.ended = !1, this.enabledFeatures = t;
  }
}
class rs extends $e {
  constructor(e) {
    super(), this.viewIndex = e;
  }
  get eye() {
    return "none";
  }
  _onPoseUpdate(e) {
    this._inverseBaseMatrix = e._getViewMatrixByIndex(this.viewIndex);
  }
}
class ns extends Nn {
  constructor(e) {
    super(), console.warn(e || 'Looking Glass WebXR "polyfill" overriding native WebXR API.');
    for (const s in yt)
      this.global[s] = yt[s];
    this.global.XRWebGLLayer = Jn, this.injected = !0;
    const t = Promise.resolve(new es(this.global));
    this.xr = new Qi(t), Object.defineProperty(this.global.navigator, "xr", {
      value: this.xr,
      configurable: !0
    });
  }
}
const ss = Ve();
export {
  ss as LookingGlassConfig,
  ns as LookingGlassWebXRPolyfill
};
