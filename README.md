# Looking Glass WebXR Library

**In order to use Looking Glass WebXR with your Looking Glass you must install Looking Glass Bridge -> [Download it here.](https://lookingglassfactory.com/software/looking-glass-bridge)**

The Looking Glass WebXR Library provides a WebXR API for targeting Looking Glass displays, this means that any 3D web framework that supports WebXR will work with the Looking Glass WebXR library. Ready to turn the internet holographic? Let's have some fun!

Looking Glass WebXR works in Chromium based browsers and Firefox, though we recommend chrome-based browsers for best performance.
Safari is not currently supported.

We've tested our WebXR Library with the following WebGL frameworks. If you use one and don't see it here, reach out on discord! We'd love to support as many as possible, it's likely yours may work too! 
- Three.JS (v141+) 
- Babylon.JS (v5.0+)
- PlayCanvas ()

### Using WebXR
To view a WebXR project on your Looking Glass you'll need to click the "View in XR" button. 
This will open up a small pop-up window. 
Drag this over to your Looking Glass display and then double click to have the hologram display properly. 

On MacOS systems you must have chrome or Firefox be in windowed mode, and not running in Fullscreen. Running in full screen will cause the window to open in a new tab instead of a new window. 

### Developing with the Looking Glass WebXR Library

This library is published on npm you can install it by running `npm install @lookingglass/webxr`

There are two main imports you'll need to import as follows:
`import {LookingGlassWebXRPolyfill, LookingGlassConfig }from "@lookingglass/webxr"`

Once you've imported the packages you'll need to define both the LookingGlassConfig as well as the LookingGlassWebXRPolyfill.
The LookingGlassConfig controls the holographic camera and has the following properties:
tileHeight   - defines the height of the individual quilt view, the width is then set based on the aspect ratio of the connected device.
- numViews   - defines the number of views to be rendered
- targetX    - defines the position of the camera on the X-axis
- targetY    - defines the position of the camera on the Y-axis
- targetZ    - defines the position of the camera on the Z-axis
- trackballX - defines the rotation of the camera on the X-axis
- trackballZ - defines the rotation of the camera on the Z-axis
- targetDiam - defines the size of the camera, this makes your scene bigger or smaller without changing the focus.
- fovy       - defines the vertical FOV of your camera (defined in radians)
- depthiness - modifies to the view frustum to increase or decrease the perceived depth of the scene.
- inlineView - changes how the original canvas on your main web page is displayed, can show the encoded subpixel matrix, a single centered view, or a quilt view.

The `LookingGlassWebXRPolyfill` implements the WebXR override and allows you to target the Looking Glass.

### Installation
Since Looking Glass WebXR is engine agnostic there are a few settings that will be the same regardless of what 3D engine you're working with. 

#### Using NPM/Yarn
You can import the Looking Glass WebXR library by running the following command in your web project.

`npm install @lookingglass/webxr`
or, if you use the yarn package manager. 
`yarn install @lookingglass/webxr`

#### Using a Script Tag
You can also use a `<script>` tag, like shown in the following examples: 

```javascript
<script type="module">
import { LookingGlassWebXRPolyfill, LookingGlassConfig } from "https://unpkg.com/@lookingglass/webxr@0.1.9/dist/@lookingglass/webxr.js"
const config = LookingGlassConfig
config.tileHeight = 512
config.numViews = 45
config.targetY = 0
config.targetZ = 0
config.targetDiam = 3
config.fovy = (14 * Math.PI) / 180
new LookingGlassWebXRPolyfill()
</script>
```

### Demos
We've got some demos setup for [three.js](https://docs.lookingglassfactory.com/developer-tools/webxr/three.js), [react-three-fiber](https://docs.lookingglassfactory.com/developer-tools/webxr/react-three-fiber), and [Spline](https://docs.lookingglassfactory.com/developer-tools/webxr/spline)

### The Looking Glass WebXR Library is open source and originally developed by [Kai Ninomiya](https://kai.graphics). We're excited to continue working in and supporting open-source technology!
