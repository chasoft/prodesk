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

import React, { useCallback, useRef, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, ButtonBase, ClickAwayListener, Grow, Paper, Popper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import LaunchIcon from "@mui/icons-material/Launch"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ActionMenuItem = React.forwardRef((props, ref) => {
	const { ItemIcon, onClick, children } = props
	return (
		<ButtonBase
			ref={ref}
			onClick={() => { onClick() }}
			sx={{ display: "block", width: "100%", textAlign: "left" }}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					fontWeight: 500,
					"&:hover": {
						backgroundColor: "action.hover",
						cursor: "pointer",
					},
				}}
			>

				<Typography sx={{ ml: 2, color: "grey.500", fontWeight: "bold" }}>
					{children}
				</Typography>

				{<ItemIcon
					id="detailsRightButton" size="small"
					fontSize="small"
					sx={{
						fill: (theme) => theme.palette.grey[500],
						my: 1, mr: 2,
						cursor: "pointer"
					}}
					onClick={(e) => {
						e.stopPropagation()
						console.log("action clicked")
					}}
				/>}

			</Box>
		</ButtonBase>
	)
})

ActionMenuItem.displayName = "ActionMenuItem"

ActionMenuItem.propTypes = {
	ItemIcon: PropTypes.object,
	onClick: PropTypes.func,
	children: PropTypes.node
}

export const Divider = () => (
	<Box sx={{
		borderTop: "1px solid transparent",
		mt: 1, pt: 1, mx: 3,
		borderColor: "divider"
	}} />
)

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const AddNewPopupMenu = ({ category, subcategory, actions, placement, children }) => {
	const ref = useRef(null)
	const [open, setOpen] = useState(false)

	const PopupMenuItem = useCallback(({ ItemIcon, title, description, category, subcategory }) => {
		return (
			<Box sx={{
				px: 3, py: 1,
				":hover": {
					cursor: "pointer",
					backgroundColor: "action.hover",
					"&>div>svg": {
						fill: (theme) => theme.palette.primary.main
					},
					"&>div>p": {
						color: "primary.main"
					}
				}
			}}>
				<Box sx={{
					display: "flex",
					alignItems: "center",
				}}>
					<ItemIcon fontSize="small" sx={{ fill: (theme) => theme.palette.grey[500] }} />
					<Typography sx={{
						ml: 1,
						fontWeight: 500,
					}}>{title}</Typography>
				</Box>
				<Typography sx={{
					color: "grey.500",
					fontWeight: 500,
					fontSize: "0.8rem"
				}}>
					{description}
				</Typography>
			</Box>
		)

	}, [])

	return (
		<>
			<div ref={ref} id="popper-trigger" onClick={() => { setOpen(true) }}>
				{children}
			</div>
			<Popper
				id="popup-addmore"
				anchorEl={ref.current}
				open={open}
				placement={placement ?? "right"}
				transition
			>
				{({ TransitionProps }) => (
					<ClickAwayListener onClickAway={() => { setOpen(false) }}>
						<Grow in={open} {...TransitionProps}>
							<Paper elevation={4} sx={{ py: 2 }}>

								{actions.map((item, idx) => (
									<>
										<PopupMenuItem
											ItemIcon={item.icon}
											title={item.title}
											description={item.description}
											onClick={() => { }}
										/>
										{(idx !== actions.length - 1) && <Divider />}
									</>
								))}

							</Paper>
						</Grow>
					</ClickAwayListener>
				)}
			</Popper>
		</>
	)
}

AddNewPopupMenu.propTypes = {
	category: PropTypes.string,
	subcategory: PropTypes.string,
	actions: PropTypes.array,
	placement: PropTypes.string,
	children: PropTypes.node,
}

export default AddNewPopupMenu