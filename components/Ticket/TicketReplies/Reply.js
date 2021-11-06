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
import { alpha } from "@mui/material/styles"
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY]
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { random } from "lodash"
import { useSelector, useDispatch } from "react-redux"

//PROJECT IMPORT
import TextEditor from "./../../common/TextEditor"
import ConfirmDialog from "../../common/ConfirmDialog"
import { DATE_FORMAT } from "../../../helpers/constants"
import { getTextEditor } from "./../../../redux/selectors"
import { setEditorData } from "./../../../redux/slices/textEditor"
import { useDeleteTicketReplyMutation, useUpdateTicketReplyMutation } from "../../../redux/slices/firestoreApi"

//ASSETS
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import useGetProfileByUsername from "../../../helpers/useGetProfileByUsername"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ReplyCreatedAt = ({ createdAt, sx }) => {
	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			flexWrap: "wrap",
			...sx
		}}>
			<Typography variant="caption" sx={{
				display: "flex",
				alignItems: "center",
				fontStyle: "italic"
			}}>
				<AccessTimeIcon sx={{ fontSize: 18 }} />&nbsp;
				{dayjs(createdAt).format(DATE_FORMAT.LONG)}&nbsp;
			</Typography>
			<Typography color="textSecondary" sx={{ fontStyle: "italic" }}>
				({dayjs(createdAt).fromNow()})
			</Typography>
		</Box>
	)
}
ReplyCreatedAt.propTypes = {
	createdAt: PropTypes.any,
	prefixText: PropTypes.string,
	dateTimeFormat: PropTypes.string,
	sx: PropTypes.object
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ReplyItem({ isAdmin, replyItem, ticketUsername, isFirst = false }) {

	const profile = useGetProfileByUsername(replyItem.username)

	const dispatch = useDispatch()
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [replyItemContent, setReplyItemContent] = useState(replyItem.content)
	const { editorData } = useSelector(getTextEditor)
	const [deleteTicketReply] = useDeleteTicketReplyMutation()
	const [updateTicketReply] = useUpdateTicketReplyMutation()

	const handleDeleteReply = async (confirmed) => {
		if (confirmed) {
			console.log("processing to delete replyId", replyItem.trid)
			await deleteTicketReply({
				username: ticketUsername,
				tid: replyItem.tid,
				trid: replyItem.trid
			})
		}
	}

	const handleUpdateReply = async () => {
		setEditMode(false)
		setReplyItemContent(editorData)
		await updateTicketReply({
			ticketItem: {
				username: ticketUsername,
				tid: replyItem.tid,
			},
			replyItem: {
				trid: replyItem.trid,
				content: editorData
			}
		})
	}

	const handleCancelUpdateReply = () => {
		setReplyItemContent(prev => prev + " ".repeat(random(20)))
		dispatch(setEditorData(""))
		setEditMode(false)
	}

	dayjs.extend(relativeTime)

	return (
		<Box sx={{
			display: "flex",
			px: 3, py: { xs: 3, md: 4 },
			flexDirection: { xs: "column", sm: "row" },
			...(!isFirst && { borderTop: "1px solid", borderColor: "divider" }),
			...(editMode && { backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) }),
			":hover": {
				backgroundColor: editMode
					? (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
					: "action.hover",
				transition: "background-color 500ms cubic-bezier(0.4, 0, 0.2, 1)",
				"& > #actionButtons": {
					visibility: "visible"
				}
			},
			"& > #actionButtons": {
				visibility: "hidden"
			}
		}}>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				flexDirection: { xs: "row", sm: "column" },
				justifyContent: { xs: "space-between", sm: "flex-start" },
				minWidth: { xs: "initial", sm: "80px" },
				overflow: "hidden",
				textOverflow: "ellipsis",
			}}>
				<Avatar
					alt={profile?.displayName}
					src={profile?.photoURL ?? "/avatar/1.png"}
					sx={{
						marginLeft: "auto",
						marginRight: "auto"
					}}
				/>

				<Typography noWrap variant="caption" sx={{
					fontWeight: 500,
					mx: { xs: 2, sm: 0 },
					mt: { xs: 0, sm: 2 },
					flexGrow: { xs: 1, sm: 0 }

				}}>
					{profile?.displayName ?? "..."}
				</Typography>

				<ReplyCreatedAt
					createdAt={replyItem.createdAt}
					sx={{
						display: { xs: "flex", sm: "none" },
						flexDirection: { xs: "column", sm: "row" },
						alignItems: "flex-end",
					}}
				/>
			</Box>

			<Box sx={{
				flexGrow: 1,
				pr: { xs: 1, sm: editMode ? 5 : 0 }
			}}>
				<ReplyCreatedAt
					createdAt={replyItem.createdAt}
					sx={{ display: { xs: "none", sm: "flex" } }}
				/>

				<Box sx={{
					display: "flex",
					flexDirection: "column",
					my: { xs: 2, sm: 0 },
					ml: { xs: 0, sm: 3 },
					"&>p": { lineHeight: "1.5rem" }
				}}>
					<TextEditor
						value={replyItemContent}
						readOnly={editMode === false}
					/>

					{editMode &&
						<Box sx={{
							display: "flex",
							justifyContent: "flex-end",
							pt: 2,
							mt: 2,
							borderTop: "1px solid transparent",
							borderColor: "primary.main"
						}}>
							<Button
								size="small" variant="outlined"
								onClick={handleCancelUpdateReply}
								sx={{ px: 3, minWidth: "100px" }}
							>
								Cancel
							</Button>

							<Button
								size="small" variant="contained"
								onClick={handleUpdateReply}
								sx={{ ml: 2, px: 4, minWidth: "100px" }}
								disabled={editorData.trim() === "" || replyItemContent.trim() === editorData.trim()}
							>
								Update
							</Button>
						</Box>
					}
				</Box>

				{(replyItem.createdAt !== replyItem.updatedAt)
					? <Box sx={{ marginTop: editMode ? 0 : 3 }}>
						<Typography variant="caption" color="textSecondary" sx={{
							my: 1,
							ml: { xs: 0, sm: 3 }
						}}>
							<span>last edited {dayjs(replyItem.updatedAt).fromNow()} </span>
						</Typography>
					</Box>
					: null}
			</Box>

			{isAdmin &&
				<Box
					id="actionButtons"
					sx={{
						display: "flex",
						flexDirection: { xs: "row", sm: "column" },
						justifyContent: { xs: "flex-end", sm: "flex-start" },
						float: "right",
						mt: { xs: -2, md: -3 },
						mr: -2,
						"&>button>#deleteIcon:hover": {
							fill: (theme) => theme.palette.warning.main
						},
						"&>button>#editIcon:hover": {
							fill: (theme) => theme.palette.primary.main
						}
					}}
				>
					{editMode === false &&
						<>
							<Tooltip title="Delete reply..." placement="left" >
								<IconButton onClick={() => { setOpenConfirmDialog(true) }}>
									<DeleteIcon id="deleteIcon" />
								</IconButton>
							</Tooltip>
							<Tooltip title="Edit reply" placement="left" >
								<IconButton onClick={() => { setEditMode(true) }}>
									<EditIcon id="editIcon" />
								</IconButton>
							</Tooltip>
						</>}

					<ConfirmDialog
						okButtonText="Delete"
						color="warning"
						open={openConfirmDialog}
						setOpen={setOpenConfirmDialog}
						callback={handleDeleteReply}
					>
						<Box sx={{
							display: "flex"
						}}>
							<DeleteIcon sx={{ width: 60, height: 60, mr: 2 }} color="warning" />
							<Typography sx={{ lineHeight: 2 }}>
								Are you sure you want to delete this reply?<br />Please note that this action can not be undo.
							</Typography>
						</Box>
					</ConfirmDialog>
				</Box>}
		</Box >
	)
}
ReplyItem.propTypes = {
	isAdmin: PropTypes.bool,
	replyItem: PropTypes.object.isRequired,
	ticketUsername: PropTypes.string.isRequired,
	isFirst: PropTypes.bool
}

export default ReplyItem