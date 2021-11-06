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
import React from "react"

// MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

//THIRD-PARTY
import { size } from "lodash"
import { nanoid } from "nanoid"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "./../../common/TextEditor"
import { STATUS_FILTER } from "./../../../helpers/constants"
import { LearnMoreAdvancedTextEditor } from "./../../common"
import { useAddTicketReplyMutation } from "../../../redux/slices/firestoreApi"
import { getAuth, getTextEditor } from "../../../redux/selectors"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ReplyDialog = ({
	ticketId,
	ticketStatus,
	ticketUsername,
	//
	open,
	setOpen
}) => {

	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const { currentUser } = useSelector(getAuth)
	const { editorData } = useSelector(getTextEditor)
	const [addTicketReply] = useAddTicketReplyMutation()

	const loadLocalStorage = () => localStorage.getItem("NewReply") ?? ""
	const getEditorData = (data) => { localStorage.setItem("NewReply", data) }
	const handleCancelReply = () => { setOpen(false); localStorage.removeItem("NewReply") }

	const handleSubmitReply = async () => {
		setOpen(false)
		//prevent non-owner to reply a closed ticket
		if (currentUser.username !== ticketUsername && ticketStatus === STATUS_FILTER.CLOSED) return

		const trid = nanoid()
		const newReplyItem = {
			ticketItem: {
				username: ticketUsername,
				tid: ticketId,
				...((currentUser.username === ticketUsername)
					? ((ticketStatus !== STATUS_FILTER.OPEN) ? { status: STATUS_FILTER.PENDING } : {})
					: { status: STATUS_FILTER.REPLIED }
				)
			},
			replyItem: {
				trid,
				tid: ticketId,
				content: editorData,
				username: currentUser.username,
			}
		}
		await addTicketReply(newReplyItem)
		localStorage.removeItem("NewReply")
	}

	return (
		<Dialog
			open={open}
			onClose={() => { setOpen(false) }}
			fullScreen={fullScreen}
			maxWidth="md"
			scroll="paper"
		>

			<DialogTitle sx={{
				bgcolor: "primary.dark",
				color: "#FFF",
				typography: "h3",
				mt: 0,
			}}>
				Create Reply
			</DialogTitle>

			<DialogContent sx={{ mt: 2 }}>
				<Box sx={{
					pl: 4, py: 3, border: "1px solid #FAFAFA",
					width: { sm: "500px", md: "650px", lg: "700px" }
				}}>
					<TextEditor
						defaultValue={loadLocalStorage()}
						placeholder="Provides as many details as possible..."
						onChange={getEditorData}
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
					disabled={loadLocalStorage() < 10 || size(editorData) < 10}
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
	)
}
ReplyDialog.propTypes = {
	ticketId: PropTypes.string.isRequired,
	ticketStatus: PropTypes.string.isRequired,
	ticketUsername: PropTypes.string.isRequired,
	//
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
}

export default ReplyDialog