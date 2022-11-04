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
declare const DefaultCalibration: {
    configVersion: string;
    pitch: {
        value: number;
    };
    slope: {
        value: number;
    };
    center: {
        value: number;
    };
    viewCone: {
        value: number;
    };
    invView: {
        value: number;
    };
    verticalAngle: {
        value: number;
    };
    DPI: {
        value: number;
    };
    screenW: {
        value: number;
    };
    screenH: {
        value: number;
    };
    flipImageX: {
        value: number;
    };
    flipImageY: {
        value: number;
    };
    flipSubp: {
        value: number;
    };
};
export declare const DefaultEyeHeight: number;
declare const DefaultConfig: {
    tileHeight: number;
    numViews: number;
    trackballX: number;
    trackballY: number;
    targetX: number;
    targetY: number;
    targetZ: number;
    targetDiam: number;
    fovy: number;
    depthiness: number;
    inlineView: number;
};
export declare type CalibrationType = typeof DefaultCalibration;
export declare type ConfigType = typeof DefaultConfig;
export declare class LookingGlassConfig extends EventTarget {
    private _calibration;
    private _config;
    constructor(cfg?: Partial<ConfigType>);
    private syncCalibration;
    private onConfigChange;
    get calibration(): CalibrationType;
    set calibration(value: Partial<CalibrationType>);
    get config(): ConfigType;
    set config(value: Partial<ConfigType> | undefined);
    /**
     * defines the height of the individual quilt view, the width is then set based on the aspect ratio of the connected device.
     */
    get tileHeight(): number;
    set tileHeight(v: number);
    /**
     * defines the number of views to be rendered
     */
    get numViews(): number;
    set numViews(v: number);
    /**
     * defines the position of the camera on the X-axis
     */
    get targetX(): number;
    set targetX(v: number);
    /**
     * defines the position of the camera on the Y-axis
     */
    get targetY(): number;
    set targetY(v: number);
    /**
     * defines the position of the camera on the X-axis
     */
    get targetZ(): number;
    set targetZ(v: number);
    /**
     * defines the rotation of the camera on the X-axis
     */
    get trackballX(): number;
    set trackballX(v: number);
    /**
     * defines the rotation of the camera on the Y-axis
     */
    get trackballY(): number;
    set trackballY(v: number);
    /**
     * defines the size of the camera, this makes your scene bigger or smaller without changing the focus.
     */
    get targetDiam(): number;
    set targetDiam(v: number);
    /**
     * defines the vertical FOV of your camera (defined in radians)
     */
    get fovy(): number;
    set fovy(v: number);
    /**
     * modifies to the view frustum to increase or decrease the perceived depth of the scene.
     */
    get depthiness(): number;
    set depthiness(v: number);
    /**
     * changes how the original canvas on your main web page is displayed, can show the encoded subpixel matrix, a single centered view, or a quilt view.
     */
    get inlineView(): number;
    set inlineView(v: number);
    get aspect(): number;
    get tileWidth(): number;
    get framebufferWidth(): number;
    get quiltWidth(): number;
    get quiltHeight(): number;
    get framebufferHeight(): number;
    get viewCone(): number;
    get tilt(): number;
    get subp(): number;
    get pitch(): number;
}
export declare function getLookingGlassConfig(config?: Partial<ConfigType>): LookingGlassConfig;
export {};
