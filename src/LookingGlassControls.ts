import { getLookingGlassConfig } from "./LookingGlassConfig"

//lkgCanvas is defined in LookingGlassXRWebGLLayer.js, it is required when calling this function
export function makeControls(lkgCanvas) {
	const cfg = getLookingGlassConfig()

	const styleElement = document.createElement("style")
	document.head.appendChild(styleElement)
	styleElement.sheet?.insertRule("#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }")

	const c = document.createElement("div")
	c.id = "LookingGlassWebXRControls"
	c.style.position = "fixed"
	c.style.zIndex = "1000"
	c.style.padding = "4px"
	c.style.width = "315px"
	c.style.height = "360px"
	c.style.maxWidth = "calc(100vw - 18px)"
	c.style.maxHeight = "calc(100vh - 18px)"
	c.style.whiteSpace = "nowrap"
	c.style.overflowY = "scroll"
	// c.style.scrollbarWidth = 'thin';
	// c.style.scrollbarColor = 'thistle transparent';
	c.style.background = "rgba(0, 0, 0, 0.6)"
	c.style.color = "white"
	c.style.padding = "2px"
	c.style.border = "3px solid black"
	c.style.right = "6px"
	c.style.bottom = "6px"

	const title = document.createElement("div")
	c.appendChild(title)
	title.style.width = "100%"
	title.style.textAlign = "center"
	title.style.fontWeight = "bold"
	title.innerText = "LookingGlass View Controls "

	const help = document.createElement("div")
	c.appendChild(help)
	help.style.width = "100%"
	help.style.whiteSpace = "normal"
	help.style.textAlign = "center"
	help.innerHTML = "Camera: click popup and use WASD, mouse left/right drag, and scroll."

	const lrToggle = document.createElement("input")
	title.appendChild(lrToggle)
	lrToggle.type = "button"
	lrToggle.value = "←"
	lrToggle.dataset.otherValue = "→"
	lrToggle.onclick = () => {
		;[c.style.right, c.style.left] = [c.style.left, c.style.right]
		;[lrToggle.value, lrToggle.dataset.otherValue] = [lrToggle.dataset.otherValue || "", lrToggle.value]
	}

	const controlListDiv = document.createElement("div")
	c.appendChild(controlListDiv)

	const addControl = (name, attrs, opts) => {
		const stringify = opts.stringify

		const controlLineDiv = document.createElement("div")
		controlListDiv.appendChild(controlLineDiv)

		const controlID = name
		const initialValue = cfg[name]

		const label = document.createElement("label")
		controlLineDiv.appendChild(label)
		label.innerText = opts.label
		label.setAttribute("for", controlID)
		label.style.width = "80px"
		label.style.display = "inline-block"
		label.style.textDecoration = "dotted underline 1px"
		label.title = opts.title

		if (attrs.type !== "checkbox") {
			const reset = document.createElement("input")
			controlLineDiv.appendChild(reset)
			reset.type = "button"
			reset.value = "⎌"
			reset.alt = "reset"
			reset.title = "Reset value to default"
			reset.style.padding = "0 4px"
			reset.onclick = (e) => {
				control.value = initialValue
				control.oninput!(e)
			}
		}

		const control = document.createElement("input")
		controlLineDiv.appendChild(control)
		Object.assign(control, attrs)
		control.id = controlID
		control.title = opts.title
		control.value = attrs.value !== undefined ? attrs.value : initialValue

		// The source of truth for the control value is in cfg, not the element's
		// 'value' field. The text next to the control shows the real value.
		const updateValue = (newValue) => {
			cfg[name] = newValue
			updateNumberText(newValue)
		}
		control.oninput = () => {
			// Only in oninput do we actually read the control's value.
			const newValue =
				attrs.type === "range"
					? parseFloat(control.value)
					: attrs.type === "checkbox"
					? control.checked
					: control.value
			updateValue(newValue)
		}

		const updateExternally = (callback) => {
			let newValue = callback(cfg[name])
			if (opts.fixRange) {
				newValue = opts.fixRange(newValue)
				control.max = Math.max(parseFloat(control.max), newValue).toString()
				control.min = Math.min(parseFloat(control.min), newValue).toString()
			}
			control.value = newValue
			updateValue(newValue)
		}

		if (attrs.type === "range") {
			control.style.width = "110px"
			control.style.height = "16px"
			control.onwheel = (ev) => {
				updateExternally((oldValue) => oldValue + Math.sign(ev.deltaX - ev.deltaY) * attrs.step)
			}
		}

		let updateNumberText = (value) => {}

		if (stringify) {
			const numberText = document.createElement("span")
			controlLineDiv.appendChild(numberText)
			updateNumberText = (v) => {
				numberText.innerHTML = stringify(v)
			}
			updateNumberText(initialValue)
		}

		return updateExternally
	}

	addControl(
		"tileHeight",
		{ type: "range", min: 160, max: 455, step: 1 },
		{
			label: "resolution",
			title: "resolution of each view",
			stringify: (v) => `${(v * cfg.aspect).toFixed()}&times;${v.toFixed()}`,
		}
	)
	addControl(
		"numViews",
		{ type: "range", min: 1, max: 145, step: 1 },
		{
			label: "# views",
			title: "number of different viewing angles to render",
			stringify: (v) => v.toFixed(),
		}
	)

	const setTrackballX = addControl(
		"trackballX",
		{
			type: "range",
			min: -Math.PI,
			max: 1.0001 * Math.PI,
			step: (0.5 / 180) * Math.PI,
		},
		{
			label: "trackball x",
			title: "camera trackball x",
			fixRange: (v) => ((v + Math.PI * 3) % (Math.PI * 2)) - Math.PI,
			stringify: (v) => `${((v / Math.PI) * 180).toFixed()}&deg;`,
		}
	)
	const setTrackballY = addControl(
		"trackballY",
		{
			type: "range",
			min: -0.5 * Math.PI,
			max: 0.5001 * Math.PI,
			step: (1.0 / 180) * Math.PI,
		},
		{
			label: "trackball y",
			title: "camera trackball y",
			fixRange: (v) => Math.max(-0.5 * Math.PI, Math.min(v, 0.5 * Math.PI)),
			stringify: (v) => `${((v / Math.PI) * 180).toFixed()}&deg;`,
		}
	)

	const setTargetX = addControl(
		"targetX",
		{ type: "range", min: -20, max: 20, step: 0.1 },
		{
			label: "target x",
			title: "target position x",
			fixRange: (v) => v,
			stringify: (v) => v.toFixed(2) + " m",
		}
	)
	const setTargetY = addControl(
		"targetY",
		{ type: "range", min: -20, max: 20, step: 0.1 },
		{
			label: "target y",
			title: "target position y",
			fixRange: (v) => v,
			stringify: (v) => v.toFixed(2) + " m",
		}
	)
	const setTargetZ = addControl(
		"targetZ",
		{ type: "range", min: -20, max: 20, step: 0.1 },
		{
			label: "target z",
			title: "target position z",
			fixRange: (v) => v,
			stringify: (v) => v.toFixed(2) + " m",
		}
	)

	addControl(
		"fovy",
		{
			type: "range",
			min: (1.0 / 180) * Math.PI,
			max: (120.1 / 180) * Math.PI,
			step: (1.0 / 180) * Math.PI,
		},
		{
			label: "fov",
			title: "perspective fov (degrades stereo effect)",
			fixRange: (v) => Math.max((1.0 / 180) * Math.PI, Math.min(v, (120.1 / 180) * Math.PI)),
			stringify: (v) => {
				const xdeg = (v / Math.PI) * 180
				const ydeg = ((Math.atan(Math.tan(v / 2) * cfg.aspect) * 2) / Math.PI) * 180
				return `${xdeg.toFixed()}&deg;&times;${ydeg.toFixed()}&deg;`
			},
		}
	)

	addControl(
		"depthiness",
		{ type: "range", min: 0, max: 2, step: 0.01 },
		{
			label: "depthiness",
			title:
				'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',
			fixRange: (v) => Math.max(0, v),
			stringify: (v) => `${v.toFixed(2)}x`,
		}
	)

	addControl(
		"inlineView",
		{ type: "range", min: 0, max: 2, step: 1 },
		{
			label: "inline view",
			title: "what to show inline on the original canvas (swizzled = no overwrite)",
			fixRange: (v) => Math.max(0, Math.min(v, 2)),
			stringify: (v) => (v === 0 ? "swizzled" : v === 1 ? "center" : v === 2 ? "quilt" : "?"),
		}
	)

	lkgCanvas.oncontextmenu = (ev) => {
		ev.preventDefault()
	}

	lkgCanvas.addEventListener("wheel", (ev) => {
		const old = cfg.targetDiam
		const GAMMA = 1.1
		const logOld = Math.log(old) / Math.log(GAMMA)
		return (cfg.targetDiam = Math.pow(GAMMA, logOld + ev.deltaY * 0.01))
	})

	lkgCanvas.addEventListener("mousemove", (ev) => {
		const mx = ev.movementX,
			my = -ev.movementY
		if (ev.buttons & 2 || (ev.buttons & 1 && (ev.shiftKey || ev.ctrlKey))) {
			const tx = cfg.trackballX,
				ty = cfg.trackballY
			const dx = -Math.cos(tx) * mx + Math.sin(tx) * Math.sin(ty) * my
			const dy = -Math.cos(ty) * my
			const dz = Math.sin(tx) * mx + Math.cos(tx) * Math.sin(ty) * my
			setTargetX((v) => v + dx * cfg.targetDiam * 0.001)
			setTargetY((v) => v + dy * cfg.targetDiam * 0.001)
			setTargetZ((v) => v + dz * cfg.targetDiam * 0.001)
		} else if (ev.buttons & 1) {
			setTrackballX((v) => v - mx * 0.01)
			setTrackballY((v) => v - my * 0.01)
		}
	})

	const keys = { w: 0, a: 0, s: 0, d: 0 }
	lkgCanvas.addEventListener("keydown", (ev) => {
		switch (ev.code) {
			case "KeyW":
				keys.w = 1
				break
			case "KeyA":
				keys.a = 1
				break
			case "KeyS":
				keys.s = 1
				break
			case "KeyD":
				keys.d = 1
				break
		}
	})
	lkgCanvas.addEventListener("keyup", (ev) => {
		switch (ev.code) {
			case "KeyW":
				keys.w = 0
				break
			case "KeyA":
				keys.a = 0
				break
			case "KeyS":
				keys.s = 0
				break
			case "KeyD":
				keys.d = 0
				break
		}
	})

	requestAnimationFrame(flyCamera)
	function flyCamera() {
		let kx = keys.d - keys.a
		let ky = keys.w - keys.s
		if (kx && ky) {
			kx *= Math.sqrt(0.5)
			ky *= Math.sqrt(0.5)
		}
		const tx = cfg.trackballX,
			ty = cfg.trackballY
		const dx = Math.cos(tx) * kx - Math.sin(tx) * Math.cos(ty) * ky
		const dy = -Math.sin(ty) * ky
		const dz = -Math.sin(tx) * kx - Math.cos(tx) * Math.cos(ty) * ky
		setTargetX((v) => v + dx * cfg.targetDiam * 0.03)
		setTargetY((v) => v + dy * cfg.targetDiam * 0.03)
		setTargetZ((v) => v + dz * cfg.targetDiam * 0.03)
		requestAnimationFrame(flyCamera)
	}

	return c
}
