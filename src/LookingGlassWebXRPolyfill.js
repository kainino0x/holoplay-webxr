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

import WebXRPolyfill from '@lookingglass/webxr-polyfill';
import XRSystem from '@lookingglass/webxr-polyfill/src/api/XRSystem';
import API from '@lookingglass/webxr-polyfill/src/api/index';
import LookingGlassXRDevice from './LookingGlassXRDevice';
import LookingGlassXRWebGLLayer from './LookingGlassXRWebGLLayer';

export default class LookingGlassWebXRPolyfill extends WebXRPolyfill {
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
