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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import ReplyDialog from "../Post/Replies/ReplyDialog"

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

const PopupMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => { setAnchorEl(event.currentTarget) }
	const handleClose = () => { setAnchorEl(null) }

	return (
		<>

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

		</>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketContent() {
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

				<Typography variant="h2" sx={{ fontWeight: 500 }} >
					Heading of the post Heading of the post Heading of the
				</Typography>


				<Box sx={{ display: { xs: "none", sm: "initial" } }}>
					<PopupMenu />
				</Box>

			</Box>

			<Box sx={{
				px: { xs: 3, md: 6 },
				pb: { xs: 0, md: 3 },
				"&>p": { lineHeight: "1.5rem" }
			}}
			>
				<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>

				<p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>

				<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>

				<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
			</Box>

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

export default TicketContent