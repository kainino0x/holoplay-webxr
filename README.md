# WebXR for Looking Glass (Unofficial!)

Implements the WebXR API (using [webxr-polyfill](https://github.com/immersive-web/webxr-polyfill))
for [Looking Glass Factory](https://lookingglassfactory.com/)'s Looking Glass devices.

This project contains both a **library** and a **WebExtension** that injects the library before page load.

This repo contains builds of both the library and the (unpacked) extension.
In order to install the extension, simply clone the repository and point your browser at the directory.
(Tested in Chrome 89 and Firefox 86.)

- To install in Chrome, navigate to `chrome://extensions`, select the `Load Unpacked` button, and point at the cloned directory.

Thanks to [WebXR Emulator Extension](https://github.com/MozillaReality/WebXR-emulator-extension)
from which I took the skeleton of this project.

## [Live Demo](https://kai.graphics/holoplay-webxr/third_party/webxr-samples/)

This fork of [webxr-samples](https://github.com/immersive-web/webxr-samples)
has been modified to unconditionally use WebXR for HoloPlay instead.

## Status

- Tested on all Looking Glass gen 1 and Looking Glass gen2 devices.
- Extension has not been published in the Chrome Web Store or Firefox Add-ons.

## Compatibility

- [webxr-samples](https://github.com/immersive-web/webxr-samples): Works!
- Three.js: works as of v141 release (thanks to @CodyJasonBennet for the PR [here](https://github.com/mrdoob/three.js/pull/23972)!)
    ([tested page](https://threejs.org/examples/webxr_vr_cubes.html))
- Babylon.js: Works! [Fixed](https://github.com/BabylonJS/Babylon.js/pull/9853) in version `5.0.0-alpha.9`.
    ([tested page](https://playground.babylonjs.com/#F41V6N))
- Sketchfab: Renders a blank screen (not sure why).

## Hacking

- `npm run build` to build.
- `npm run serve` to serve the demos.
