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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { ClickAwayListener, Grow, Paper, Popper } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
export function getScrollbarWidth() {
	const outer = document.createElement("div")
	outer.style.visibility = "hidden"
	outer.style.overflow = "scroll"
	document.body.appendChild(outer)
	const inner = document.createElement("div")
	outer.appendChild(inner)
	const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
	outer.parentNode?.removeChild(outer)
	return scrollbarWidth
}

function PopupContainer({ open, anchorRef, elevation, sx, handleClose, placement, transformOrigin, children }) {
	return (
		<Popper
			open={open}
			anchorEl={anchorRef.current}
			role={undefined}
			placement={placement}
			transition
			disablePortal
			style={{ zIndex: 999 }}
		>
			{({ TransitionProps }) => (
				<Grow {...TransitionProps} style={{ transformOrigin: transformOrigin }}>
					<Paper elevation={elevation} sx={{ ...sx }}>
						<ClickAwayListener onClickAway={handleClose}>
							<div>
								{children}
							</div>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	)
}
PopupContainer.propTypes = {
	open: PropTypes.bool,
	anchorRef: PropTypes.any,
	elevation: PropTypes.number,
	sx: PropTypes.object,
	handleClose: PropTypes.func,
	placement: PropTypes.string,
	transformOrigin: PropTypes.string,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function usePopupContainer() {
	const anchorRef = useRef(null)
	const [open, setOpen] = useState(false)

	const handlers = React.useMemo(
		() => ({
			handleToggle: () => {
				setOpen((prevOpen) => !prevOpen)
			},
			handleOpen: () => {
				setOpen(true)
			},
			handleClose: (e) => {
				if (anchorRef.current && anchorRef.current?.contains(e.current?.target)) {
					return
				}
				setOpen(false)
			},
		}),
		[]
	)

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open)
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus()
		}
		prevOpen.current = open
	}, [open])

	return [PopupContainer, open, anchorRef, handlers]
}

export default usePopupContainer