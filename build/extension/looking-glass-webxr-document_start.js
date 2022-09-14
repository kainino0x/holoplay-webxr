
        (() => {
          const fn = () => {
      
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@lookingglass/webxr-polyfill'), require('@lookingglass/webxr-polyfill/src/api/XRSystem'), require('@lookingglass/webxr-polyfill/src/api/index'), require('webxr-polyfill/src/devices/XRDevice'), require('webxr-polyfill/src/api/XRSpace'), require('webxr-polyfill/src/api/XRWebGLLayer')) :
  typeof define === 'function' && define.amd ? define(['@lookingglass/webxr-polyfill', '@lookingglass/webxr-polyfill/src/api/XRSystem', '@lookingglass/webxr-polyfill/src/api/index', 'webxr-polyfill/src/devices/XRDevice', 'webxr-polyfill/src/api/XRSpace', 'webxr-polyfill/src/api/XRWebGLLayer'], factory) :
  (global = global || self, global.LookingGlassWebXRPolyfill = factory(global.WebXRPolyfill, global.XRSystem, global.API, global.XRDevice, global.XRSpace, global.XRWebGLLayer));
}(this, (function (WebXRPolyfill, XRSystem, API, XRDevice, XRSpace, XRWebGLLayer) { 'use strict';

  WebXRPolyfill = WebXRPolyfill && Object.prototype.hasOwnProperty.call(WebXRPolyfill, 'default') ? WebXRPolyfill['default'] : WebXRPolyfill;
  XRSystem = XRSystem && Object.prototype.hasOwnProperty.call(XRSystem, 'default') ? XRSystem['default'] : XRSystem;
  API = API && Object.prototype.hasOwnProperty.call(API, 'default') ? API['default'] : API;
  XRDevice = XRDevice && Object.prototype.hasOwnProperty.call(XRDevice, 'default') ? XRDevice['default'] : XRDevice;
  XRSpace = XRSpace && Object.prototype.hasOwnProperty.call(XRSpace, 'default') ? XRSpace['default'] : XRSpace;
  var XRWebGLLayer__default = 'default' in XRWebGLLayer ? XRWebGLLayer['default'] : XRWebGLLayer;

  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;

  function create() {
    var out = new ARRAY_TYPE(9);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }
    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }

  function create$1() {
    var out = new ARRAY_TYPE(16);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function invert(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function translate(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    var a00 = void 0,
        a01 = void 0,
        a02 = void 0,
        a03 = void 0;
    var a10 = void 0,
        a11 = void 0,
        a12 = void 0,
        a13 = void 0;
    var a20 = void 0,
        a21 = void 0,
        a22 = void 0,
        a23 = void 0;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
      a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
      a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];
      out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
      out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
      out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  function rotate(out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.sqrt(x * x + y * y + z * z);
    var s = void 0,
        c = void 0,
        t = void 0;
    var a00 = void 0,
        a01 = void 0,
        a02 = void 0,
        a03 = void 0;
    var a10 = void 0,
        a11 = void 0,
        a12 = void 0,
        a13 = void 0;
    var a20 = void 0,
        a21 = void 0,
        a22 = void 0,
        a23 = void 0;
    var b00 = void 0,
        b01 = void 0,
        b02 = void 0;
    var b10 = void 0,
        b11 = void 0,
        b12 = void 0;
    var b20 = void 0,
        b21 = void 0,
        b22 = void 0;
    if (len < EPSILON) {
      return null;
    }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];
    b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }
  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = void 0;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }

  function create$2() {
    var out = new ARRAY_TYPE(3);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }
  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  function fromValues(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len = x * x + y * y + z * z;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      out[2] = a[2] * len;
    }
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    var bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  var len = length;
  var forEach = function () {
    var vec = create$2();
    return function (a, stride, offset, count, fn, arg) {
      var i = void 0,
          l = void 0;
      if (!stride) {
        stride = 3;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
      }
      return a;
    };
  }();

  function create$3() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }
    return out;
  }
  function normalize$1(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len = x * x + y * y + z * z + w * w;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
      out[3] = w * len;
    }
    return out;
  }
  var forEach$1 = function () {
    var vec = create$3();
    return function (a, stride, offset, count, fn, arg) {
      var i = void 0,
          l = void 0;
      if (!stride) {
        stride = 4;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
      }
      return a;
    };
  }();

  function create$4() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    out[3] = 1;
    return out;
  }
  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  function slerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    var omega = void 0,
        cosom = void 0,
        sinom = void 0,
        scale0 = void 0,
        scale1 = void 0;
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if (1.0 - cosom > EPSILON) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1.0 - t;
      scale1 = t;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  function fromMat3(out, m) {
    var fTrace = m[0] + m[4] + m[8];
    var fRoot = void 0;
    if (fTrace > 0.0) {
      fRoot = Math.sqrt(fTrace + 1.0);
      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      var i = 0;
      if (m[4] > m[0]) i = 1;
      if (m[8] > m[i * 3 + i]) i = 2;
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }
    return out;
  }
  var normalize$2 = normalize$1;
  var rotationTo = function () {
    var tmpvec3 = create$2();
    var xUnitVec3 = fromValues(1, 0, 0);
    var yUnitVec3 = fromValues(0, 1, 0);
    return function (out, a, b) {
      var dot$1 = dot(a, b);
      if (dot$1 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$1;
        return normalize$2(out, out);
      }
    };
  }();
  var sqlerp = function () {
    var temp1 = create$4();
    var temp2 = create$4();
    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  var setAxes = function () {
    var matr = create();
    return function (out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize$2(out, fromMat3(out, matr));
    };
  }();

  function create$5() {
    var out = new ARRAY_TYPE(2);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }
    return out;
  }
  var forEach$2 = function () {
    var vec = create$5();
    return function (a, stride, offset, count, fn, arg) {
      var i = void 0,
          l = void 0;
      if (!stride) {
        stride = 2;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];a[i + 1] = vec[1];
      }
      return a;
    };
  }();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }
  var cbor = createCommonjsModule(function (module) {
  (function(global, undefined$1) {var POW_2_24 = Math.pow(2, -24),
      POW_2_32 = Math.pow(2, 32),
      POW_2_53 = Math.pow(2, 53);
  function encode(value) {
    var data = new ArrayBuffer(256);
    var dataView = new DataView(data);
    var lastLength;
    var offset = 0;
    function ensureSpace(length) {
      var newByteLength = data.byteLength;
      var requiredLength = offset + length;
      while (newByteLength < requiredLength)
        newByteLength *= 2;
      if (newByteLength !== data.byteLength) {
        var oldDataView = dataView;
        data = new ArrayBuffer(newByteLength);
        dataView = new DataView(data);
        var uint32count = (offset + 3) >> 2;
        for (var i = 0; i < uint32count; ++i)
          dataView.setUint32(i * 4, oldDataView.getUint32(i * 4));
      }
      lastLength = length;
      return dataView;
    }
    function write() {
      offset += lastLength;
    }
    function writeFloat64(value) {
      write(ensureSpace(8).setFloat64(offset, value));
    }
    function writeUint8(value) {
      write(ensureSpace(1).setUint8(offset, value));
    }
    function writeUint8Array(value) {
      var dataView = ensureSpace(value.length);
      for (var i = 0; i < value.length; ++i)
        dataView.setUint8(offset + i, value[i]);
      write();
    }
    function writeUint16(value) {
      write(ensureSpace(2).setUint16(offset, value));
    }
    function writeUint32(value) {
      write(ensureSpace(4).setUint32(offset, value));
    }
    function writeUint64(value) {
      var low = value % POW_2_32;
      var high = (value - low) / POW_2_32;
      var dataView = ensureSpace(8);
      dataView.setUint32(offset, high);
      dataView.setUint32(offset + 4, low);
      write();
    }
    function writeTypeAndLength(type, length) {
      if (length < 24) {
        writeUint8(type << 5 | length);
      } else if (length < 0x100) {
        writeUint8(type << 5 | 24);
        writeUint8(length);
      } else if (length < 0x10000) {
        writeUint8(type << 5 | 25);
        writeUint16(length);
      } else if (length < 0x100000000) {
        writeUint8(type << 5 | 26);
        writeUint32(length);
      } else {
        writeUint8(type << 5 | 27);
        writeUint64(length);
      }
    }
    function encodeItem(value) {
      var i;
      if (value === false)
        return writeUint8(0xf4);
      if (value === true)
        return writeUint8(0xf5);
      if (value === null)
        return writeUint8(0xf6);
      if (value === undefined$1)
        return writeUint8(0xf7);
      switch (typeof value) {
        case "number":
          if (Math.floor(value) === value) {
            if (0 <= value && value <= POW_2_53)
              return writeTypeAndLength(0, value);
            if (-POW_2_53 <= value && value < 0)
              return writeTypeAndLength(1, -(value + 1));
          }
          writeUint8(0xfb);
          return writeFloat64(value);
        case "string":
          var utf8data = [];
          for (i = 0; i < value.length; ++i) {
            var charCode = value.charCodeAt(i);
            if (charCode < 0x80) {
              utf8data.push(charCode);
            } else if (charCode < 0x800) {
              utf8data.push(0xc0 | charCode >> 6);
              utf8data.push(0x80 | charCode & 0x3f);
            } else if (charCode < 0xd800) {
              utf8data.push(0xe0 | charCode >> 12);
              utf8data.push(0x80 | (charCode >> 6)  & 0x3f);
              utf8data.push(0x80 | charCode & 0x3f);
            } else {
              charCode = (charCode & 0x3ff) << 10;
              charCode |= value.charCodeAt(++i) & 0x3ff;
              charCode += 0x10000;
              utf8data.push(0xf0 | charCode >> 18);
              utf8data.push(0x80 | (charCode >> 12)  & 0x3f);
              utf8data.push(0x80 | (charCode >> 6)  & 0x3f);
              utf8data.push(0x80 | charCode & 0x3f);
            }
          }
          writeTypeAndLength(3, utf8data.length);
          return writeUint8Array(utf8data);
        default:
          var length;
          if (Array.isArray(value)) {
            length = value.length;
            writeTypeAndLength(4, length);
            for (i = 0; i < length; ++i)
              encodeItem(value[i]);
          } else if (value instanceof Uint8Array) {
            writeTypeAndLength(2, value.length);
            writeUint8Array(value);
          } else {
            var keys = Object.keys(value);
            length = keys.length;
            writeTypeAndLength(5, length);
            for (i = 0; i < length; ++i) {
              var key = keys[i];
              encodeItem(key);
              encodeItem(value[key]);
            }
          }
      }
    }
    encodeItem(value);
    if ("slice" in data)
      return data.slice(0, offset);
    var ret = new ArrayBuffer(offset);
    var retView = new DataView(ret);
    for (var i = 0; i < offset; ++i)
      retView.setUint8(i, dataView.getUint8(i));
    return ret;
  }
  function decode(data, tagger, simpleValue) {
    var dataView = new DataView(data);
    var offset = 0;
    if (typeof tagger !== "function")
      tagger = function(value) { return value; };
    if (typeof simpleValue !== "function")
      simpleValue = function() { return undefined$1; };
    function read(value, length) {
      offset += length;
      return value;
    }
    function readArrayBuffer(length) {
      return read(new Uint8Array(data, offset, length), length);
    }
    function readFloat16() {
      var tempArrayBuffer = new ArrayBuffer(4);
      var tempDataView = new DataView(tempArrayBuffer);
      var value = readUint16();
      var sign = value & 0x8000;
      var exponent = value & 0x7c00;
      var fraction = value & 0x03ff;
      if (exponent === 0x7c00)
        exponent = 0xff << 10;
      else if (exponent !== 0)
        exponent += (127 - 15) << 10;
      else if (fraction !== 0)
        return fraction * POW_2_24;
      tempDataView.setUint32(0, sign << 16 | exponent << 13 | fraction << 13);
      return tempDataView.getFloat32(0);
    }
    function readFloat32() {
      return read(dataView.getFloat32(offset), 4);
    }
    function readFloat64() {
      return read(dataView.getFloat64(offset), 8);
    }
    function readUint8() {
      return read(dataView.getUint8(offset), 1);
    }
    function readUint16() {
      return read(dataView.getUint16(offset), 2);
    }
    function readUint32() {
      return read(dataView.getUint32(offset), 4);
    }
    function readUint64() {
      return readUint32() * POW_2_32 + readUint32();
    }
    function readBreak() {
      if (dataView.getUint8(offset) !== 0xff)
        return false;
      offset += 1;
      return true;
    }
    function readLength(additionalInformation) {
      if (additionalInformation < 24)
        return additionalInformation;
      if (additionalInformation === 24)
        return readUint8();
      if (additionalInformation === 25)
        return readUint16();
      if (additionalInformation === 26)
        return readUint32();
      if (additionalInformation === 27)
        return readUint64();
      if (additionalInformation === 31)
        return -1;
      throw "Invalid length encoding";
    }
    function readIndefiniteStringLength(majorType) {
      var initialByte = readUint8();
      if (initialByte === 0xff)
        return -1;
      var length = readLength(initialByte & 0x1f);
      if (length < 0 || (initialByte >> 5) !== majorType)
        throw "Invalid indefinite length element";
      return length;
    }
    function appendUtf16data(utf16data, length) {
      for (var i = 0; i < length; ++i) {
        var value = readUint8();
        if (value & 0x80) {
          if (value < 0xe0) {
            value = (value & 0x1f) <<  6
                  | (readUint8() & 0x3f);
            length -= 1;
          } else if (value < 0xf0) {
            value = (value & 0x0f) << 12
                  | (readUint8() & 0x3f) << 6
                  | (readUint8() & 0x3f);
            length -= 2;
          } else {
            value = (value & 0x0f) << 18
                  | (readUint8() & 0x3f) << 12
                  | (readUint8() & 0x3f) << 6
                  | (readUint8() & 0x3f);
            length -= 3;
          }
        }
        if (value < 0x10000) {
          utf16data.push(value);
        } else {
          value -= 0x10000;
          utf16data.push(0xd800 | (value >> 10));
          utf16data.push(0xdc00 | (value & 0x3ff));
        }
      }
    }
    function decodeItem() {
      var initialByte = readUint8();
      var majorType = initialByte >> 5;
      var additionalInformation = initialByte & 0x1f;
      var i;
      var length;
      if (majorType === 7) {
        switch (additionalInformation) {
          case 25:
            return readFloat16();
          case 26:
            return readFloat32();
          case 27:
            return readFloat64();
        }
      }
      length = readLength(additionalInformation);
      if (length < 0 && (majorType < 2 || 6 < majorType))
        throw "Invalid length";
      switch (majorType) {
        case 0:
          return length;
        case 1:
          return -1 - length;
        case 2:
          if (length < 0) {
            var elements = [];
            var fullArrayLength = 0;
            while ((length = readIndefiniteStringLength(majorType)) >= 0) {
              fullArrayLength += length;
              elements.push(readArrayBuffer(length));
            }
            var fullArray = new Uint8Array(fullArrayLength);
            var fullArrayOffset = 0;
            for (i = 0; i < elements.length; ++i) {
              fullArray.set(elements[i], fullArrayOffset);
              fullArrayOffset += elements[i].length;
            }
            return fullArray;
          }
          return readArrayBuffer(length);
        case 3:
          var utf16data = [];
          if (length < 0) {
            while ((length = readIndefiniteStringLength(majorType)) >= 0)
              appendUtf16data(utf16data, length);
          } else
            appendUtf16data(utf16data, length);
          return String.fromCharCode.apply(null, utf16data);
        case 4:
          var retArray;
          if (length < 0) {
            retArray = [];
            while (!readBreak())
              retArray.push(decodeItem());
          } else {
            retArray = new Array(length);
            for (i = 0; i < length; ++i)
              retArray[i] = decodeItem();
          }
          return retArray;
        case 5:
          var retObject = {};
          for (i = 0; i < length || length < 0 && !readBreak(); ++i) {
            var key = decodeItem();
            retObject[key] = decodeItem();
          }
          return retObject;
        case 6:
          return tagger(decodeItem(), length);
        case 7:
          switch (length) {
            case 20:
              return false;
            case 21:
              return true;
            case 22:
              return null;
            case 23:
              return undefined$1;
            default:
              return simpleValue(length);
          }
      }
    }
    var ret = decodeItem();
    if (offset !== data.byteLength)
      throw "Remaining bytes";
    return ret;
  }
  var obj = { encode: encode, decode: decode };
  if (typeof undefined$1 === "function" && undefined$1.amd)
    undefined$1("cbor/cbor", obj);
  else if ( module.exports)
    module.exports = obj;
  else if (!global.CBOR)
    global.CBOR = obj;
  })(commonjsGlobal);
  });
  const WebSocket =
      typeof window === 'undefined' ? require('ws') : window.WebSocket;
  class Client {
    constructor(
        initCallback, errCallback, closeCallback, debug = false, appId, isGreedy,
        oncloseBehavior) {
      this.reqs = [];
      this.reps = [];
      this.requestId = this.getRequestId();
      this.debug = debug;
      this.isGreedy = isGreedy;
      this.errCallback = errCallback;
      this.closeCallback = closeCallback;
      this.alwaysdebug = false;
      this.isConnected = false;
      let initCmd = null;
      if (appId || isGreedy || oncloseBehavior) {
        initCmd = new InitMessage(appId, isGreedy, oncloseBehavior, this.debug);
      } else {
        if (debug) this.alwaysdebug = true;
        if (typeof initCallback == 'function') initCmd = new InfoMessage();
      }
      this.openWebsocket(initCmd, initCallback);
    }
    sendMessage(msg, timeoutSecs = 60) {
      if (this.alwaysdebug) msg.cmd.debug = true;
      let cborData = msg.toCbor();
      return this.sendRequestObj(cborData, timeoutSecs);
    }
    disconnect() {
      this.ws.close();
    }
    openWebsocket(firstCmd = null, initCallback = null) {
      this.ws =
          new WebSocket('ws://localhost:11222/driver', ['rep.sp.nanomsg.org']);
      this.ws.parent = this;
      this.ws.binaryType = 'arraybuffer';
      this.ws.onmessage = this.messageHandler;
      this.ws.onopen = (() => {
        this.isConnected = true;
        if (this.debug) {
          console.log('socket open');
        }
        if (firstCmd != null) {
          this.sendMessage(firstCmd).then(initCallback);
        }
      });
      this.ws.onerror = this.onSocketError;
      this.ws.onclose = this.onClose;
    }
    sendRequestObj(data, timeoutSecs) {
      return new Promise((resolve, reject) => {
        let reqObj = {
          id: this.requestId++,
          parent: this,
          payload: data,
          success: resolve,
          error: reject,
          send: function() {
            if (this.debug)
              console.log('attemtping to send request with ID ' + this.id);
            this.timeout = setTimeout(reqObj.send.bind(this), timeoutSecs * 1000);
            let tmp = new Uint8Array(data.byteLength + 4);
            let view = new DataView(tmp.buffer);
            view.setUint32(0, this.id);
            tmp.set(new Uint8Array(this.payload), 4);
            this.parent.ws.send(tmp.buffer);
          }
        };
        this.reqs.push(reqObj);
        reqObj.send();
      });
    }
    messageHandler(event) {
      console.log('message');
      let data = event.data;
      if (data.byteLength < 4) return;
      let view = new DataView(data);
      let replyId = view.getUint32(0);
      if (replyId < 0x80000000) {
        this.parent.err('bad nng header');
        return;
      }
      let i = this.parent.findReqIndex(replyId);
      if (i == -1) {
        this.parent.err('got reply that doesn\'t match known request!');
        return;
      }
      let rep = {id: replyId, payload: cbor.decode(data.slice(4))};
      if (rep.payload.error == 0) {
        this.parent.reqs[i].success(rep.payload);
      } else {
        this.parent.reqs[i].error(rep.payload);
      }
      clearTimeout(this.parent.reqs[i].timeout);
      this.parent.reqs.splice(i, 1);
      this.parent.reps.push(rep);
      if (this.debug) {
        console.log(rep.payload);
      }
    }
    getRequestId() {
      return Math.floor(this.prng() * (0x7fffffff)) + 0x80000000;
    }
    onClose(event) {
      this.parent.isConnected = false;
      if (this.parent.debug) {
        console.log('socket closed');
      }
      if (typeof this.parent.closeCallback == 'function')
        this.parent.closeCallback(event);
    }
    onSocketError(error) {
      if (this.parent.debug) {
        console.log(error);
      }
      if (typeof this.parent.errCallback == 'function') {
        this.parent.errCallback(error);
      }
    }
    err(errorMsg) {
      if (this.debug) {
        console.log('[DRIVER ERROR]' + errorMsg);
      }
    }
    findReqIndex(replyId) {
      let i = 0;
      for (; i < this.reqs.length; i++) {
        if (this.reqs[i].id == replyId) {
          return i;
        }
      }
      return -1;
    }
    prng() {
      if (this.rng == undefined) {
        this.rng = generateRng();
      }
      return this.rng();
    }
  }
  class Message {
    constructor(cmd, bin) {
      this.cmd = cmd;
      this.bin = bin;
    }
    toCbor() {
      return cbor.encode(this);
    }
  }
  class InitMessage extends Message {
    constructor(appId = '', isGreedy = false, onclose = '', debug = false) {
      let cmd = {'init': {}};
      if (appId != '') cmd['init'].appid = appId;
      if (onclose != '') cmd['init'].onclose = onclose;
      if (isGreedy) cmd['init'].greedy = true;
      if (debug) cmd['init'].debug = true;
      super(cmd, null);
    }
  }
  class InfoMessage extends Message {
    constructor() {
      let cmd = {'info': {}};
      super(cmd, null);
    }
  }
  function generateRng() {
    function xmur3(str) {
      for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353), h = h << 13 | h >>> 19;
      return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
      }
    }
    function xoshiro128ss(a, b, c, d) {
      return (() => {
        var t = b << 9, r = a * 5;
        r = (r << 7 | r >>> 25) * 9;
        c ^= a;
        d ^= b;
        b ^= c;
        a ^= d;
        c ^= t;
        d = d << 11 | d >>> 21;
        return (r >>> 0) / 4294967296;
      })
    }  var state = Date.now();
    var seed = xmur3(state.toString());
    return xoshiro128ss(seed(), seed(), seed(), seed());
  }

  const kDefaultEyeHeight = 1.6;
  let config;
  const getLookingGlassConfig = () => {
    if (config === undefined) config = makeConfig();
    return config;
  };
  const kFakeCalibration = {
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
    flipSubp: { value: 0 },
  };
  const makeConfig = () => new class extends EventTarget {
    constructor() {
      super();
      const fireChanged = (dispatch) => {
        if (dispatch) this.dispatchEvent(new Event('on-config-changed'));
        const changePromise = new Promise(r => { this._ensureConfigChangeEvent = r; });
        changePromise.then(() => fireChanged(true));
      };
      fireChanged(false);
      this.calibration = kFakeCalibration;
      const client = new Client(
        (msg) => {
          if (msg.devices.length < 1) {
            console.error('No Looking Glass devices found!');
            return;
          }
          if (msg.devices.length > 1) {
            console.warn('More than one Looking Glass device found... using the first one');
          }
          this.calibration = msg.devices[0].calibration;
        },
        (err) => {
          console.error('Error creating Looking Glass client:', err);
        });
      this.tileHeight = 320;
      this.numViews = 2;
      this.trackballX = 0;
      this.trackballY = 0;
      this.targetX = 0;
      this.targetY = kDefaultEyeHeight;
      this.targetZ = -0.5;
      this.targetDiam = 2.0;
      this.fovy = 13.0 / 180 * Math.PI;
      this.depthiness = 1.25;
      this.inlineView = 1;
    }
    get calibration() { return this._calibration; }
    set calibration(v) { this._calibration = deepFreeze(v); this._ensureConfigChangeEvent(); }
    get tileHeight() { return this._tileHeight; } set tileHeight(v) { this._tileHeight = v; this._ensureConfigChangeEvent(); }
    get numViews  () { return this._numViews;   } set numViews  (v) { this._numViews   = v; this._ensureConfigChangeEvent(); }
    get targetX   () { return this._targetX;    } set targetX   (v) { this._targetX    = v; this._ensureConfigChangeEvent(); }
    get targetY   () { return this._targetY;    } set targetY   (v) { this._targetY    = v; this._ensureConfigChangeEvent(); }
    get targetZ   () { return this._targetZ;    } set targetZ   (v) { this._targetZ    = v; this._ensureConfigChangeEvent(); }
    get trackballX() { return this._trackballX; } set trackballX(v) { this._trackballX = v; this._ensureConfigChangeEvent(); }
    get trackballY() { return this._trackballY; } set trackballY(v) { this._trackballY = v; this._ensureConfigChangeEvent(); }
    get targetDiam() { return this._targetDiam; } set targetDiam(v) { this._targetDiam = v; this._ensureConfigChangeEvent(); }
    get fovy      () { return this._fovy;       } set fovy      (v) { this._fovy       = v; this._ensureConfigChangeEvent(); }
    get depthiness() { return this._depthiness; } set depthiness(v) { this._depthiness = v; this._ensureConfigChangeEvent(); }
    get inlineView() { return this._inlineView; } set inlineView(v) { this._inlineView = v; this._ensureConfigChangeEvent(); }
    get aspect() { return this.calibration.screenW.value / this.calibration.screenH.value; }
    get tileWidth() { return Math.round(this.tileHeight * this.aspect); }
    get framebufferWidth() {
      const numPixels = this.tileWidth * this.tileHeight * this.numViews;
      return 2 ** Math.ceil(Math.log2(Math.max(Math.sqrt(numPixels), this.tileWidth)));
    }
    get quiltWidth() { return Math.floor(this.framebufferWidth / this.tileWidth); }
    get quiltHeight() { return Math.ceil(this.numViews / this.quiltWidth); }
    get framebufferHeight() { return 2 ** Math.ceil(Math.log2(this.quiltHeight * this.tileHeight)); }
    get viewCone() { return this.calibration.viewCone.value * this.depthiness / 180 * Math.PI; }
    get tilt() {
      return this.calibration.screenH.value /
        (this.calibration.screenW.value * this.calibration.slope.value) *
        (this.calibration.flipImageX.value ? -1 : 1);
    }
    get subp() { return 1 / (this.calibration.screenW.value * 3); }
    get pitch() {
      const screenInches = this.calibration.screenW.value / this.calibration.DPI.value;
      return this.calibration.pitch.value * screenInches *
        Math.cos(Math.atan(1.0 / this.calibration.slope.value));
    }
  };
  function deepFreeze(o) {
    Object.freeze(o);
    if (o === undefined) {
      return o;
    }
    Object.getOwnPropertyNames(o).forEach(function (prop) {
      if (o[prop] !== null
        && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
        && !Object.isFrozen(o[prop])) {
        deepFreeze(o[prop]);
      }
    });
    return o;
  }

  const PRIVATE = Symbol('LookingGlassXRWebGLLayer');
  const lkgCanvas = document.createElement('canvas');
  lkgCanvas.tabIndex = 0;
  const lkgCtx = lkgCanvas.getContext('2d', { alpha: false });
  lkgCanvas.addEventListener('dblclick', function () {
    this.requestFullscreen();
  });
  const controls = makeControls(lkgCanvas);
  class LookingGlassXRWebGLLayer extends XRWebGLLayer__default {
    constructor(session, gl, layerInit) {
      super(session, gl, layerInit);
      const cfg = getLookingGlassConfig();
      const config = this[XRWebGLLayer.PRIVATE].config;
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
          gl.uniform1i(u_texture, 0);
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
        console.assert(this[PRIVATE].LookingGlassEnabled);
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
      let origWidth, origHeight;
      const blitTextureToDefaultFramebufferIfNeeded = () => {
        if (!this[PRIVATE].LookingGlassEnabled) return;
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
            gl.uniform1i(u_viewType, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            lkgCtx.clearRect(0, 0, lkgCanvas.width, lkgCanvas.height);
            lkgCtx.drawImage(appCanvas, 0, 0);
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
          popup.document.title = 'Looking Glass Window (fullscreen me on Looking Glass!)';
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
        LookingGlassEnabled: false,
        framebuffer,
        clearFramebuffer,
        blitTextureToDefaultFramebufferIfNeeded,
        moveCanvasToWindow,
      };
    }
    get framebuffer() { return this[PRIVATE].LookingGlassEnabled ? this[PRIVATE].framebuffer : null; }
    get framebufferWidth() { return getLookingGlassConfig().framebufferWidth; }
    get framebufferHeight() { return getLookingGlassConfig().framebufferHeight; }
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
  function makeControls(lkgCanvas) {
    const cfg = getLookingGlassConfig();
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    styleElement.sheet.insertRule(
      '#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }');
    const c = document.createElement('div');
    c.id = 'LookingGlassWebXRControls';
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
    title.innerText = 'LookingGlass View Controls ';
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
      const updateValue = newValue => {
        cfg[name] = newValue;
        updateNumberText(newValue);
      };
      control.oninput = () => {
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
    lkgCanvas.oncontextmenu = ev => { ev.preventDefault(); };
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

  class LookingGlassXRDevice extends XRDevice {
    constructor(global) {
      super(global);
      this.sessions = new Map();
      this.viewSpaces = [];
      this.basePoseMatrix = create$1();
      this.inlineProjectionMatrix = create$1();
      this.inlineInverseViewMatrix = create$1();
      this.LookingGlassProjectionMatrices = [];
      this.LookingGlassInverseViewMatrices = [];
    }
    onBaseLayerSet(sessionId, layer) {
      const session = this.sessions.get(sessionId);
      session.baseLayer = layer;
      const baseLayerPrivate = layer[PRIVATE];
      baseLayerPrivate.LookingGlassEnabled = session.immersive;
      if (session.immersive) {
        baseLayerPrivate.moveCanvasToWindow(true, () => {
          this.endSession(sessionId);
        });
      }
    }
    isSessionSupported(mode) {
      return mode === 'inline' || mode === 'immersive-vr';
    }
    isFeatureSupported(featureDescriptor) {
      switch (featureDescriptor) {
        case 'viewer': return true;
        case 'local': return true;
        case 'local-floor': return true;
        case 'bounded-floor': return false;
        case 'unbounded': return false;
        default:
          console.warn('LookingGlassXRDevice.isFeatureSupported: feature not understood:', featureDescriptor);
          return false;
      }
    }
    async requestSession(mode, enabledFeatures) {
      if (!this.isSessionSupported(mode)) {
        return Promise.reject();
      }
      const immersive = mode !== 'inline';
      const session = new Session(mode, enabledFeatures);
      this.sessions.set(session.id, session);
      if (immersive) {
        this.dispatchEvent('@@webxr-polyfill/vr-present-start', session.id);
      }
      return Promise.resolve(session.id);
    }
    requestAnimationFrame(callback) {
      return this.global.requestAnimationFrame(callback);
    }
    cancelAnimationFrame(handle) {
      this.global.cancelAnimationFrame(handle);
    }
    onFrameStart(sessionId, renderState) {
      const session = this.sessions.get(sessionId);
      const cfg = getLookingGlassConfig();
      if (session.immersive) {
        const tanHalfFovy = Math.tan(0.5 * cfg.fovy);
        const focalDistance = 0.5 * cfg.targetDiam / tanHalfFovy;
        const clipPlaneBias = focalDistance - cfg.targetDiam;
        const mPose = this.basePoseMatrix;
        fromTranslation(mPose, [cfg.targetX, cfg.targetY, cfg.targetZ]);
        rotate(mPose, mPose, cfg.trackballX, [0, 1, 0]);
        rotate(mPose, mPose, -cfg.trackballY, [1, 0, 0]);
        translate(mPose, mPose, [0, 0, focalDistance]);
        for (let i = 0; i < cfg.numViews; ++i) {
          const fractionAlongViewCone = (i + 0.5) / cfg.numViews - 0.5;
          const tanAngleToThisCamera = Math.tan(cfg.viewCone * fractionAlongViewCone);
          const offsetAlongBaseline = focalDistance * tanAngleToThisCamera;
          const mView = (this.LookingGlassInverseViewMatrices[i] = this.LookingGlassInverseViewMatrices[i] || create$1());
          translate(mView, mPose, [offsetAlongBaseline, 0, 0]);
          invert(mView, mView);
          const n = Math.max(clipPlaneBias + renderState.depthNear, 0.01);
          const f = clipPlaneBias + renderState.depthFar;
          const halfYRange = n * tanHalfFovy;
          const t = halfYRange, b = -halfYRange;
          const midpointX = n * -tanAngleToThisCamera;
          const halfXRange = cfg.aspect * halfYRange;
          const r = midpointX + halfXRange, l = midpointX - halfXRange;
          const mProj = (this.LookingGlassProjectionMatrices[i] = this.LookingGlassProjectionMatrices[i] || create$1());
          set(mProj,
            2 * n / (r - l), 0, 0, 0,
            0, 2 * n / (t - b), 0, 0,
            (r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n), -1,
            0, 0, -2 * f * n / (f - n), 0);
        }
        const baseLayerPrivate = session.baseLayer[PRIVATE];
        baseLayerPrivate.clearFramebuffer();
      } else {
        const gl = session.baseLayer.context;
        const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
        perspective(this.inlineProjectionMatrix, renderState.inlineVerticalFieldOfView, aspect,
          renderState.depthNear, renderState.depthFar);
        fromTranslation(this.basePoseMatrix, [0, kDefaultEyeHeight, 0]);
        invert(this.inlineInverseViewMatrix, this.basePoseMatrix);
      }
    }
    onFrameEnd(sessionId) {
      const session = this.sessions.get(sessionId);
      session.baseLayer[PRIVATE].blitTextureToDefaultFramebufferIfNeeded();
    }
    async requestFrameOfReferenceTransform(type, options) {
      const matrix = create$1();
      switch (type) {
        case 'viewer':
        case 'local':
          fromTranslation(matrix, [0, -kDefaultEyeHeight, 0]);
          return matrix;
        case 'local-floor':
          return matrix;
        default:
          throw new Error('XRReferenceSpaceType not understood');
      }
    }
    endSession(sessionId) {
      const session = this.sessions.get(sessionId);
      if (session.immersive && session.baseLayer) {
        session.baseLayer[PRIVATE].moveCanvasToWindow(false);
        this.dispatchEvent('@@webxr-polyfill/vr-present-end', sessionId);
      }
      session.ended = true;
    }
    doesSessionSupportReferenceSpace(sessionId, type) {
      const session = this.sessions.get(sessionId);
      if (session.ended) {
        return false;
      }
      return session.enabledFeatures.has(type);
    }
    getViewSpaces(mode) {
      if (mode === 'immersive-vr') {
        const cfg = getLookingGlassConfig();
        for (let i = this.viewSpaces.length; i < cfg.numViews; ++i) {
          this.viewSpaces[i] = new LookingGlassXRSpace(i);
        }
        this.viewSpaces.length = cfg.numViews;
        return this.viewSpaces;
      }
      return undefined;
    }
    getViewport(sessionId, eye, layer, target, viewIndex) {
      if (viewIndex === undefined) {
        const session = this.sessions.get(sessionId);
        const gl = session.baseLayer.context;
        target.x = 0;
        target.y = 0;
        target.width = gl.drawingBufferWidth;
        target.height = gl.drawingBufferHeight;
      } else {
        const cfg = getLookingGlassConfig();
        const col = viewIndex % cfg.quiltWidth;
        const row = Math.floor(viewIndex / cfg.quiltWidth);
        target.x = cfg.tileWidth * col;
        target.y = cfg.tileHeight * row;
        target.width = cfg.tileWidth;
        target.height = cfg.tileHeight;
      }
      return true;
    }
    getProjectionMatrix(eye, viewIndex) {
      if (viewIndex === undefined) { return this.inlineProjectionMatrix; }
      return this.LookingGlassProjectionMatrices[viewIndex] || create$1();
    }
    getBasePoseMatrix() {
      return this.basePoseMatrix;
    }
    getBaseViewMatrix() {
      return this.inlineInverseViewMatrix;
    }
    _getViewMatrixByIndex(viewIndex) {
      return (this.LookingGlassInverseViewMatrices[viewIndex] = this.LookingGlassInverseViewMatrices[viewIndex] || create$1());
    }
    getInputSources() { return []; }
    getInputPose(inputSource, coordinateSystem, poseType) { return null; }
    onWindowResize() { }
  }let SESSION_ID = 0;
  class Session {
    constructor(mode, enabledFeatures) {
      this.mode = mode;
      this.immersive = mode === 'immersive-vr' || mode === 'immersive-ar';
      this.id = ++SESSION_ID;
      this.baseLayer = null;
      this.inlineVerticalFieldOfView = Math.PI * 0.5;
      this.ended = false;
      this.enabledFeatures = enabledFeatures;
    }
  }
  class LookingGlassXRSpace extends XRSpace {
    constructor(viewIndex) {
      super();
      this.viewIndex = viewIndex;
    }
    get eye() { return 'none'; }
    _onPoseUpdate(device) {
      this._inverseBaseMatrix = device._getViewMatrixByIndex(this.viewIndex);
    }
  }

  class LookingGlassWebXRPolyfill extends WebXRPolyfill {
    constructor(message) {
      super();
      console.warn(message || 'Looking Glass WebXR "polyfill" overriding native WebXR API.');
      for (const className in API) {
        this.global[className] = API[className];
      }
      this.global.XRWebGLLayer = LookingGlassXRWebGLLayer;
      this.injected = true;
      const devicePromise = Promise.resolve(new LookingGlassXRDevice(this.global));
      this.xr = new XRSystem(devicePromise);
      Object.defineProperty(this.global.navigator, 'xr', {
        value: this.xr,
        configurable: true,
      });
    }
  }

  return LookingGlassWebXRPolyfill;

})));

          };
          const script = document.createElement("script");
          script.textContent = '(' + fn.toString() +
            ')(); new LookingGlassWebXRPolyfill("LookingGlass WebXR extension overriding native WebXR API. Disable extension to stop.");';
          (document.head || document.documentElement).prepend(script);
          script.parentNode.removeChild(script);
        })();
      
