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

import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

// MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from "@mui/material"

//THIRD-PARTY
import { nanoid } from "nanoid"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"
import { LearnMoreAdvancedTextEditor } from "@components/common"
import { useAddTicketReplyMutation } from "@redux/slices/firestoreApi"

import {
	getAuth,
	getTextEditor,
	getUiSettings
} from "@redux/selectors"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ReplyDialog = ({ children }) => {
	const theme = useTheme()
	const [open, setOpen] = useState(false)
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const { currentUser } = useSelector(getAuth)
	const { ticketId } = useSelector(getUiSettings)
	const { editorData } = useSelector(getTextEditor)
	const [addTicketReply] = useAddTicketReplyMutation()

	const handleClose = () => { setOpen(false) }
	const handleClickOpen = () => { setOpen(true) }
	const loadLocalStorage = () => { return localStorage.getItem("NewReply") ?? "" }

	const handleGetEditorData = (data) => {
		localStorage.setItem("NewReply", data)
		console.log(data)
	}

	const handleCancelReply = () => {
		setOpen(false)
		localStorage.removeItem("NewReply")
	}

	const handleSubmitReply = () => {
		setOpen(false)
		const trid = nanoid()
		addTicketReply({
			ticketItem: {
				username: currentUser.username,
				tid: ticketId,
			},
			replyItem: {
				trid,
				tid: ticketId,
				content: editorData,
				username: currentUser.username,
			}
		})
		localStorage.removeItem("NewReply")
	}

	const descriptionElementRef = useRef(null)
	useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef
			if (descriptionElement !== null) {
				descriptionElement.focus()
			}
		}
	}, [open])

	return (
		<>
			<span onClick={handleClickOpen}>{children}</span>
			<Dialog
				open={open}
				onClose={handleClose}
				fullScreen={fullScreen}
				maxWidth="md"
				scroll="paper"
			>

				<DialogTitle sx={{
					bgcolor: "primary.dark",
					color: "#FFF",
					typography: "h4",
					mt: 0,
				}}>
					Create Reply
				</DialogTitle>

				<DialogContent sx={{ mt: 2 }}>
					<Box sx={{
						pl: { xs: 1, sm: 4 }, py: 3, border: "1px solid #F0F0F0",
						width: { sm: "500px", md: "650px", lg: "700px" }
					}}>
						<TextEditor
							defaultValue={loadLocalStorage()}
							placeholder="Provides as many details as possible..."
							onChange={handleGetEditorData}
						/>
					</Box>
				</DialogContent>

				<DialogActions sx={{ justifyContent: "flex-end", pr: 3, mb: 2 }}>
					<Button
						size="small" variant="outlined"
						onClick={handleCancelReply}
						sx={{ px: 3, minWidth: "100px" }}
					>
						Cancel
					</Button>

					<Button
						size="small" variant="contained"
						onClick={handleSubmitReply}
						sx={{ px: 4, minWidth: "100px" }}
					>
						Post
					</Button>
				</DialogActions>

				<Box
					sx={{
						display: "flex",
						px: 3, py: 2,
						backgroundColor: "#F8F9FA",
						borderBottomLeftRadius: "0.5rem",
						borderBottomRightRadius: "0.5rem",
						borderTop: "1px solid",
						borderTopColor: "divider"
					}}
				>
					<LearnMoreAdvancedTextEditor />
				</Box>

			</Dialog>
		</>
	)
}
ReplyDialog.propTypes = {
	ticketId: PropTypes.string,
	children: PropTypes.node
}

export default ReplyDialog