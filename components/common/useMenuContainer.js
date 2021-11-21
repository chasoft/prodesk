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
import { ClickAwayListener, Grow, MenuList, Paper, Popper } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const MenuContainer = ({ open, anchorRef, elevation = 4, handleClose, handleListKeyDown, placement, transformOrigin, zIndex, children }) => {
	return (
		<Popper
			open={open}
			anchorEl={anchorRef.current}
			role={undefined}
			placement={placement}
			transition
			disablePortal
			style={{ zIndex: zIndex ?? 1 }}
		>
			{({ TransitionProps }) => (
				<Grow {...TransitionProps} style={{ transformOrigin: transformOrigin }}>
					<Paper elevation={elevation} sx={{ minWidth: "120px" }}>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList
								autoFocusItem={open}
								id="composition-menu"
								aria-labelledby="composition-button"
								onKeyDown={handleListKeyDown}
								onClick={handleClose}
							>
								{children}
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	)
}
MenuContainer.propTypes = {
	open: PropTypes.bool,
	anchorRef: PropTypes.any,
	elevation: PropTypes.number,
	handleClose: PropTypes.func,
	handleListKeyDown: PropTypes.func,
	placement: PropTypes.string,
	transformOrigin: PropTypes.string,
	zIndex: PropTypes.number,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const useMenuContainer = () => {
	const anchorRef = useRef(null)
	const [open, setOpen] = useState(false)

	const handlers = React.useMemo(
		() => ({
			handleToggle: () => {
				setOpen((prevOpen) => !prevOpen)
			},
			handleClose: (e) => {
				if (anchorRef.current && anchorRef.current.contains(e.target)) {
					return
				}
				setOpen(false)
			},
			handleListKeyDown: (e) => {
				if (e.key === "Tab") {
					e.preventDefault()
					setOpen(false)
				} else if (e.key === "Escape") {
					setOpen(false)
				}
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

	return [MenuContainer, open, anchorRef, handlers]
}

export default useMenuContainer