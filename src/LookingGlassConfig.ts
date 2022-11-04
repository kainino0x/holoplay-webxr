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

import * as HoloPlayCore from "holoplay-core"

const DefaultCalibration = {
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
}

export const DefaultEyeHeight: number = 1.6
const DefaultConfig = {
	tileHeight: 512,
	numViews: 45,
	trackballX: 0,
	trackballY: 0,
	targetX: 0,
	targetY: DefaultEyeHeight,
	targetZ: -0.5,
	targetDiam: 2.0,
	fovy: (13.0 / 180) * Math.PI,
	depthiness: 1.25,
	inlineView: 1,
}

export type CalibrationType = typeof DefaultCalibration
export type ConfigType = typeof DefaultConfig

export class LookingGlassConfig extends EventTarget {
	private _calibration: CalibrationType = deepFreeze(DefaultCalibration)
	private _config: ConfigType = deepFreeze(DefaultConfig)

	constructor(cfg?: Partial<ConfigType>) {
		super()
		this._config = { ...this._config, ...cfg }
		this.syncCalibration()
	}

	private syncCalibration() {
		const client = new HoloPlayCore.Client(
			(msg) => {
				if (msg.devices.length < 1) {
					console.error("No Looking Glass devices found!")
					return
				}
				if (msg.devices.length > 1) {
					console.warn("More than one Looking Glass device found... using the first one")
				}
				this.calibration = msg.devices[0].calibration
			},
			(err) => {
				console.error("Error creating Looking Glass client:", err)
			}
		)
	}

	private onConfigChange() {
		this.dispatchEvent(new Event("on-config-changed"))
	}

	public get calibration(): CalibrationType {
		return this._calibration
	}

	public set calibration(value: Partial<CalibrationType>) {
		this._calibration = {
			...this._calibration,
			...value,
		}
		this.onConfigChange()
	}

	public get config(): ConfigType {
		return this._config
	}

	public set config(value: Partial<ConfigType> | undefined) {
		if (value != undefined) {
			this._config = {
				...this._config,
				...value,
			}
			this.onConfigChange()
		}
	}

	// configurable

	/**
	 * defines the height of the individual quilt view, the width is then set based on the aspect ratio of the connected device.
	 */
	public get tileHeight(): number {
		return this._config.tileHeight
	}

	set tileHeight(v: number) {
		this._config.tileHeight = v
		this.onConfigChange()
	}

	/**
	 * defines the number of views to be rendered
	 */
	get numViews() {
		return this._config.numViews
	}

	set numViews(v) {
		this._config.numViews = v
		this.onConfigChange()
	}

	/**
	 * defines the position of the camera on the X-axis
	 */
	get targetX() {
		return this._config.targetX
	}

	set targetX(v) {
		this._config.targetX = v
		this.onConfigChange()
	}

	/**
	 * defines the position of the camera on the Y-axis
	 */
	get targetY() {
		return this._config.targetY
	}

	set targetY(v) {
		this._config.targetY = v
		this.onConfigChange()
	}

	/**
	 * defines the position of the camera on the X-axis
	 */
	get targetZ() {
		return this._config.targetZ
	}

	set targetZ(v) {
		this._config.targetZ = v
		this.onConfigChange()
	}

	/**
	 * defines the rotation of the camera on the X-axis
	 */
	get trackballX() {
		return this._config.trackballX
	}

	set trackballX(v) {
		this._config.trackballX = v
		this.onConfigChange()
	}

	/**
	 * defines the rotation of the camera on the Y-axis
	 */
	get trackballY() {
		return this._config.trackballY
	}

	set trackballY(v) {
		this._config.trackballY = v
		this.onConfigChange()
	}

	/**
	 * defines the size of the camera, this makes your scene bigger or smaller without changing the focus.
	 */
	get targetDiam() {
		return this._config.targetDiam
	}

	set targetDiam(v) {
		this._config.targetDiam = v
		this.onConfigChange()
	}

	/**
	 * defines the vertical FOV of your camera (defined in radians)
	 */
	get fovy() {
		return this._config.fovy
	}

	set fovy(v) {
		this._config.fovy = v
		this.onConfigChange()
	}

	/**
	 * modifies to the view frustum to increase or decrease the perceived depth of the scene.
	 */
	get depthiness() {
		return this._config.depthiness
	}

	set depthiness(v) {
		this._config.depthiness = v
		this.onConfigChange()
	}

	/**
	 * changes how the original canvas on your main web page is displayed, can show the encoded subpixel matrix, a single centered view, or a quilt view.
	 */
	get inlineView() {
		return this._config.inlineView
	}

	set inlineView(v) {
		this._config.inlineView = v
		this.onConfigChange()
	}

	// Computed

	public get aspect() {
		return this._calibration.screenW.value / this._calibration.screenH.value
	}

	public get tileWidth() {
		return Math.round(this.tileHeight * this.aspect)
	}

	public get framebufferWidth() {
		const numPixels = this.tileWidth * this.tileHeight * this.numViews
		return 2 ** Math.ceil(Math.log2(Math.max(Math.sqrt(numPixels), this.tileWidth)))
	}

	public get quiltWidth() {
		return Math.floor(this.framebufferWidth / this.tileWidth)
	}

	public get quiltHeight() {
		return Math.ceil(this.numViews / this.quiltWidth)
	}

	public get framebufferHeight() {
		return 2 ** Math.ceil(Math.log2(this.quiltHeight * this.tileHeight))
	}

	public get viewCone() {
		return ((this._calibration.viewCone.value * this.depthiness) / 180) * Math.PI
	}

	public get tilt() {
		return (
			(this._calibration.screenH.value / (this._calibration.screenW.value * this._calibration.slope.value)) *
			(this._calibration.flipImageX.value ? -1 : 1)
		)
	}

	public get subp() {
		return 1 / (this._calibration.screenW.value * 3)
	}

	public get pitch() {
		const screenInches = this._calibration.screenW.value / this._calibration.DPI.value
		return (
			this._calibration.pitch.value * screenInches * Math.cos(Math.atan(1.0 / this._calibration.slope.value))
		)
	}
}

let globalLkgConfig: LookingGlassConfig | null = null
export function getLookingGlassConfig(config?: Partial<ConfigType>) {
	if (globalLkgConfig == null) {
		globalLkgConfig = new LookingGlassConfig(config)
	} else {
		globalLkgConfig.config = config
	}
	return globalLkgConfig
}

function deepFreeze<T extends object>(o: T): T {
	Object.freeze(o)
	if (o === undefined) {
		return o
	}

	Object.getOwnPropertyNames(o).forEach(function (prop) {
		if (
			o[prop] !== null &&
			(typeof o[prop] === "object" || typeof o[prop] === "function") &&
			!Object.isFrozen(o[prop])
		) {
			deepFreeze(o[prop])
		}
	})

	return o
}
