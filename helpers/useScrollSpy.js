/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.0     ║ *
 * ╠═══════════════════════════════════════════════════════════════════╣ *
 * ║                                                                   ║ *
 * ║   @author     A. Cao <cao@anh.pw>                                 ║ *
 * ║   @copyright  Chasoft Labs © 2021                                 ║ *
 * ║   @link       https://chasoft.net                                 ║ *
 * ║                                                                   ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║ @license This product is licensed and sold at CodeCanyon.net      ║ *
 * ║ If you have downloaded this from another site or received it from ║ *
 * ║ someone else than me, then you are engaged in an illegal activity.║ *
 * ║ You must delete this software immediately or buy a proper license ║ *
 * ║ from http://codecanyon.net/user/chasoft/portfolio?ref=chasoft.    ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║      THANK YOU AND DON'T HESITATE TO CONTACT ME FOR ANYTHING      ║ *
 * ╚═══════════════════════════════════════════════════════════════════╝ *
 ************************************************************************/

import { useEffect, useRef, useState } from "react"

//THIRD-PARTY
import { throttle } from "lodash"

//PROJECT IMPORT


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

//Note: I get idea from //github/pettiboy/react-ui-scrollspy/blob/main/src/ScrollSpy/ScrollSpy.tsx
export default function useScrollSpy({ headings, options = {} }) {
	const { offsetTop = 0, offsetBottom = 0 } = options

	const [activeHeadingId, setActiveHeadingId] = useState()

	const prevIdTracker = useRef("")

	const isVisible = (anchor) => {

		const el = document.getElementById(anchor)

		if (!el) return false

		const rectInView = el.getBoundingClientRect()

		const useHeight = window.innerHeight
		const hitbox_top = useHeight
		const element_top = rectInView.top
		const element_bottom = rectInView.top + useHeight

		return (
			hitbox_top < element_bottom + offsetBottom &&
			hitbox_top > element_top - offsetTop
		)
	}

	const checkAndUpdateActiveScrollSpy = () => {
		if (!headings || headings.length === 0) return
		for (let i = 0; i < headings.length; i++) {
			const elementIsVisible = isVisible(headings[i].id)
			if (elementIsVisible) {
				const changeHighlightedItemId = headings[i].id
				if (prevIdTracker.current === changeHighlightedItemId) return
				prevIdTracker.current = changeHighlightedItemId
				setActiveHeadingId(changeHighlightedItemId)
				break
			}
		}
	}

	useEffect(() => {
		const checker = throttle(checkAndUpdateActiveScrollSpy, 400)
		window.addEventListener("scroll", checker)
		return () => window.removeEventListener("scroll", checker)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	})

	return activeHeadingId
}