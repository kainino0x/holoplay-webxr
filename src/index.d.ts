/// <reference types="vite/client" />

declare module "@lookingglass/webxr-polyfill/src/WebXRPolyfill" {
	export default class WebXRPolyfill {
		public global: any;
		public injected: boolean;
		public xr: any;
		constructor(): void;
	}
}

declare module "@lookingglass/webxr-polyfill/src/devices/XRDevice" {
	export default class XRDevice extends EventTarget {
		constructor(global: any): void;
		public dispatchEvent: (...args: any) => void;
		public global: any;
		public sessions: any;
		public basePoseMatrix: any[];
		public viewSpaces: any[];
		public inlineProjectionMatrix: any[];
		public inlineInverseViewMatrix: any[];
		public LookingGlassProjectionMatrices: any[];
		public LookingGlassInverseViewMatrices: any[];
	}
}

declare module "@lookingglass/webxr-polyfill/src/api/XRSpace" {
	export default class XRSpace {
		public _inverseBaseMatrix: Float32Array;
		constructor(specialType?: string, inputSource?: any): void;
	}
}

declare module "holoplay-core" {
	export namespace HoloPlayCore {}

	export class Client {
		constructor(...args: any): void;
	}

	export function Shader(config: any): any;
}

declare module "@lookingglass/webxr-polyfill" {
	export namespace HoloPlayCore {}

	export class Client {
		constructor(...args: any): void;
	}
}
