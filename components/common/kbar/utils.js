import * as React from "react"
import { EMPTY } from "@helpers/constants"

export function swallowEvent(event) {
	event.stopPropagation()
	event.preventDefault()
}

export function useOuterClick(dom, cb) {
	const cbRef = React.useRef(cb)
	cbRef.current = cb

	React.useEffect(() => {
		function handler(event) {
			if (dom.current?.contains(event.target)) {
				return
			}
			cbRef.current()
		}
		["mousedown", "touchstart"].forEach((ev) => {
			window.addEventListener(ev, handler, true)
		})
		return () =>
			["mousedown", "touchstart"].forEach((ev) =>
				window.removeEventListener(ev, handler, true)
			)
	}, [dom])
}

export function usePointerMovedSinceMount() {
	const [moved, setMoved] = React.useState(false)

	React.useEffect(() => {
		function handler() {
			setMoved(true)
		}

		if (!moved) {
			window.addEventListener("pointermove", handler)
			return () => window.removeEventListener("pointermove", handler)
		}
	}, [moved])

	return moved
}

export function randomId() {
	return Math.random().toString(36).substring(2, 9)
}

export function createAction(params) {
	return {
		id: randomId(),
		...params,
	}
}

export function noop() { }

export const useIsomorphicLayout =
	typeof window === "undefined" ? noop : React.useLayoutEffect

// https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
export function getScrollbarWidth() {
	const outer = document.createElement("div")
	outer.style.visibility = "hidden"
	outer.style.overflow = "scroll"
	document.body.appendChild(outer)
	const inner = document.createElement("div")
	outer.appendChild(inner)
	const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
	if (typeof outer.parentNode.removeChild === "function")
		outer.parentNode.removeChild(outer)
	return scrollbarWidth
}

export function useThrottledValue(value, ms = 100) {
	const [throttledValue, setThrottledValue] = React.useState(value)
	const lastRan = React.useRef(Date.now())

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setThrottledValue(value)
			lastRan.current = Date.now()
		}, lastRan.current - (Date.now() - ms))

		return () => {
			clearTimeout(timeout)
		}
	}, [ms, value])

	return throttledValue
}

export function shouldRejectKeystrokes({ ignoreWhenFocused } = { ignoreWhenFocused: EMPTY.ARRAY }) {
	const inputs = ["input", "textarea", ...ignoreWhenFocused].map((el) =>
		el.toLowerCase()
	)

	const activeElement = document.activeElement
	const ignoreStrokes =
		activeElement &&
		(inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1 ||
			activeElement.attributes.getNamedItem("role")?.value === "textbox" ||
			activeElement.attributes.getNamedItem("contenteditable")?.value ===
			"true")

	return ignoreStrokes
}