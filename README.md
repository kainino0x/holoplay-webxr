# Looking Glass WebXR Library

This library implements the WebXR API (using [webxr-polyfill](https://github.com/immersive-web/webxr-polyfill))
for [Looking Glass Factory](https://lookingglassfactory.com/)'s Looking Glass displays. Using this allows you to bring your three.js or babylon.js scenes into the Looking Glass without having to modify either library, enabling a simple and clean way to bring your 3D experiences into the Looking Glass. 

Thanks to [Kai Ninomiya](https://kai.graphics/) for putting in the time and effort to develop this library, and allowing Looking Glass to maintain this fork. 

Thanks to [WebXR Emulator Extension](https://github.com/MozillaReality/WebXR-emulator-extension)
from which the skeleton of this project is built.

## How to use

This library is published on [npm](https://www.npmjs.com/package/@lookingglass/webxr) you can install it by running `npm install @lookingglass/webxr`

There are two main imports you'll need to import as follows: 
- `import {LookingGlassWebXRPolyfill, LookingGlassConfig }from "@lookingglass/webxr"` 

Once you've imported the packages you'll need to define both the LookingGlassConfig as well as the LookingGlassWebXRPolyfill. 

The `LookingGlassConfig` controls the holographic camera and has the following properties: 
- **tileHeight** - defines the height of the individual quilt view, the width is then set based on the aspect ratio of the connected device. 
- **numViews** - defines the number of views to be rendered
- **targetX** - defines the position of the camera on the X-axis
- **targetY** - defines the position of the camera on the Y-axis
- **targetZ** - defines the position of the camera on the Z-axis
- **trackballX** - defines the rotation of the camera on the X-axis
- **trackballZ** - defines the rotation of the camera on the Z-axis
- **targetDiam** - defines the size of the camera, this makes your scene bigger or smaller without changing the focus. 
- **fovy** - defines the vertical FOV of your camera (defined in radians)
- **depthiness** - modifies to the view frustum to increase or decrease the perceived depth of the scene. 
- **inlineView**- changes how the original canvas on your main web page is displayed, can show the encoded subpixel matrix, a single centered view, or a quilt view. 

The `LookingGlassWebXRPolyfill` implements the WebXR override and allows you to target the Looking Glass. 

## Status

- Tested on all Looking Glass gen 1 and Looking Glass gen 2 devices. 

- This library currently runs on Chrome and Firefox, though we recommend Chrome (or a chromium based browser) for best performance. Safari currently does not work due to a limitation with their websocket API, and inability to communicate with Looking Glass Bridge.

## Compatibility

- [webxr-samples](https://github.com/immersive-web/webxr-samples): Works!
- Three.js: works as of v141 release (thanks to @CodyJasonBennet for the PR [here](https://github.com/mrdoob/three.js/pull/23972)!)
    ([tested page](https://threejs.org/examples/webxr_vr_cubes.html))
- Babylon.js: Works! [Fixed](https://github.com/BabylonJS/Babylon.js/pull/9853) in version `5.0.0-alpha.9`.
    ([tested page](https://playground.babylonjs.com/#F41V6N))

## Hacking

- `npm run build` to build.

## Linking Locally

- in order to build locally and link as a dependency to another project you must comment out the `external` line in the `vite.config.js` file, then run `npm run build` after that you can run `npm link` or `yarn link` to use the local package as a sym-link in your project. 
