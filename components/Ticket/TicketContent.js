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
import { Box, CircularProgress, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import ReplyDialog from "../Post/Replies/ReplyDialog"

//ASSETS
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ReplyIcon from "@mui/icons-material/Reply"
import CloseIcon from "@mui/icons-material/Close"
import TextEditor from "../common/TextEditor"
import { useGetTicketContentQuery } from "../../redux/slices/firestoreApi"
import { useSelector } from "react-redux"
import { getAuth } from "../../redux/selectors"

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

const PopupMenu = ({ ticketId }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClose = () => { setAnchorEl(null) }
	const handleClick = (event) => { setAnchorEl(event.currentTarget) }

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

PopupMenu.propTypes = {
	ticketId: PropTypes.string
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketContent({ ticket }) {
	const { currentUser } = useSelector(getAuth)
	const { data: ticketContent, isLoadingContent } = useGetTicketContentQuery({
		username: currentUser.username,
		tid: ticket.tid
	})

	if (isLoadingContent) {
		return (
			<Paper component="main" sx={{
				borderRadius: "0.5rem",
				mt: 2
			}}>
				<CircularProgress />
			</Paper>
		)
	}

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
					{ticket.subject}
				</Typography>


				<Box sx={{ display: { xs: "none", sm: "initial" } }}>
					<PopupMenu ticketId={ticket.tid} />
				</Box>

			</Box>

			<Box sx={{
				px: { xs: 3, sm: 6 },
				pb: { xs: 2, sm: 4 },
				"&>p": { lineHeight: "1.5rem" }
			}}>
				<TextEditor
					value={ticketContent?.text}
					readOnly={true}
				/>
			</Box>

			<Box sx={{
				display: { xs: "flex", md: "none" },
				px: { xs: 3, md: 6 },
				py: { xs: 2, md: 2 },
				backgroundColor: "#F8F9FA",
				borderBottomLeftRadius: "0.5rem",
				borderBottomRightRadius: "0.5rem",
				borderTop: "1px solid",
				borderTopColor: "divider"
			}}>
				<Typography variant="caption">
					Community content may not be verified or up-to-date. Learn more.
				</Typography>
			</Box>

		</Paper>
	)
}
TicketContent.propTypes = {
	ticket: PropTypes.object
}

export default TicketContent