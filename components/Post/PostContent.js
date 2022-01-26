/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import ReplyDialog from "./Replies/ReplyDialog"
import ThreadMessagePayload from "./ThreadMessagePayload"

//ASSETS
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ReplyIcon from "@mui/icons-material/Reply"
import CloseIcon from "@mui/icons-material/Close"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const MenuItemStyled = ({ ItemIcon, children, ...otherProps }) => {
	return (
		<MenuItem {...otherProps}>
			{<ItemIcon fontSize="small" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />}
			<Typography style={{ marginLeft: "0.5rem", marginRight: "3rem" }}>
				{children}
			</Typography>
		</MenuItem>
	)
}
MenuItemStyled.propTypes = {
	ItemIcon: PropTypes.object,
	children: PropTypes.node
}

const PostPopupMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => { setAnchorEl(event.currentTarget) }
	const handleClose = () => { setAnchorEl(null) }

	return (
		<div>

			<IconButton onClick={handleClick} size="large">
				<MoreVertIcon />
			</IconButton>

			<Menu
				anchorEl={anchorEl} open={open} onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "right", }}
				transformOrigin={{ vertical: "top", horizontal: "right", }}
			>

				<ReplyDialog>
					<MenuItemStyled ItemIcon={ReplyIcon}>
						Reply
					</MenuItemStyled>
				</ReplyDialog>

				<MenuItemStyled
					ItemIcon={CloseIcon}
					onClick={() => {
						console.log("Ticket \"Closed\"")
						handleClose()
					}}
				>
					Close
				</MenuItemStyled>

			</Menu>

		</div>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function PostContent() {
	return (
		<Paper component="main" sx={{
			borderRadius: "0.5rem",
			mt: 2
		}}>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				top: "28px",
				pl: { xs: 3, md: 6 },
				pt: { xs: 4, md: 4 },
				pr: { xs: 2, md: 3 }
			}}>
				<Box sx={{
					display: "flex",
					alignItems: "center",
				}}>
					<Avatar
						alt="Remy Sharp" src="/avatar/default.jpg"
						sx={{
							bgcolor: "#FFF",
							width: 64, height: 64,
							mr: 2
						}}
					/>
					<Typography variant="h2">
						Heading of the post Heading of the post Heading of the
					</Typography>
				</Box>


				<PostPopupMenu />

			</Box>

			<ThreadMessagePayload />

			<Box
				sx={{
					display: { xs: "flex", md: "none" },
					px: { xs: 3, md: 6 },
					py: { xs: 2, md: 2 },
					backgroundColor: "#F8F9FA",
					borderBottomLeftRadius: "0.5rem",
					borderBottomRightRadius: "0.5rem",
					borderTop: "1px solid",
					borderTopColor: "divider"
				}}
			>
				<Typography variant="caption">
					Community content may not be verified or up-to-date. Learn more.
				</Typography>
			</Box>

		</Paper>
	)
}

export default PostContent