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
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import LaunchIcon from "@mui/icons-material/Launch"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// eslint-disable-next-line react/display-name
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
ActionMenuItem.propTypes = {
	ItemIcon: PropTypes.object,
	onClick: PropTypes.func,
	children: PropTypes.node
}

const Divider = () => (
	<Box sx={{
		borderTop: "1px solid transparent",
		mt: 1, pt: 1, mx: 3,
		borderColor: "divider"
	}} />
)

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ActionMenuGroup = () => {
	const [open, setOpen] = useState(false)
	const anchorRef = useRef(null)

	const PopupMenuItem = useCallback(({ ItemIcon, title, description }) => {
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
			<Box
				sx={{
					mt: 3,
					borderTop: "1px solid transparent",
					borderColor: "divider"
				}}
			>
				<ActionMenuItem ref={anchorRef} ItemIcon={AddIcon} onClick={() => setOpen(true)}>
					New
				</ActionMenuItem>
				<ActionMenuItem ItemIcon={FolderOutlinedIcon} onClick={() => { }}>
					File
				</ActionMenuItem>
			</Box>

			<Popper
				id="popup-addmore"
				anchorEl={anchorRef.current}
				open={open}
				placement="right"
				transition
			>
				{({ TransitionProps }) => (
					<ClickAwayListener onClickAway={() => { setOpen(false) }}>
						<Grow in={open} {...TransitionProps}>
							<Paper elevation={4} sx={{ py: 2 }}>

								<PopupMenuItem
									ItemIcon={AddIcon}
									title="New article"
									description="Create a new plain text page"
									onClick={() => {

									}}
								/>

								<Divider />

								<PopupMenuItem
									ItemIcon={PlaylistAddIcon}
									title="New category"
									description="Group pages around key topics"
									onClick={() => {

									}}
								/>

								<Divider />

								<PopupMenuItem
									ItemIcon={LaunchIcon}
									title="New external link"
									description="Link to external websites"
									onClick={() => {

									}}
								/>

							</Paper>
						</Grow>
					</ClickAwayListener>
				)}
			</Popper>

		</>
	)
}

export default ActionMenuGroup