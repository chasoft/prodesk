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
import { Avatar, Box, Button, IconButton, MenuItem, Typography, ListItemText, ListItemIcon, Divider } from "@mui/material"

//THIRD-PARTY]
import dayjs from "dayjs"
import { useSnackbar } from "notistack"
import { isMobile } from "react-device-detect"
import relativeTime from "dayjs/plugin/relativeTime"
import CopyToClipboard from "react-copy-to-clipboard"

import {
	trim,
	random,
} from "lodash"

import {
	useSelector,
	useDispatch
} from "react-redux"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"
import ConfirmDialog from "@components/common/ConfirmDialog"

import { TYPE } from "@redux/slices/firestoreApiConstants"
import { setEditorData } from "@redux/slices/textEditor"
import {
	getAuth,
	getTextEditor,
	getUiSettings
} from "@redux/selectors"
import {
	useDeleteTicketReplyMutation,
	useUpdateTicketReplyMutation
} from "@redux/slices/firestoreApi"

import useGetProfileByUsername from "@helpers/useGetProfileByUsername"
import { requestSilentRefetching } from "@helpers/realtimeApi"
import {
	CODE,
	DATE_FORMAT,
	STATUS_FILTER
} from "@helpers/constants"

//ASSETS
import EditIcon from "@mui/icons-material/Edit"
import LinkIcon from "@mui/icons-material/Link"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import DescriptionIcon from "@mui/icons-material/Description"
import useMenuContainer from "@components/common/useMenuContainer"
import NewCannedReplyDialog from "./NewCannedReplyDialog"
import { useRouter } from "next/router"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function ReplyCreatedAt({ createdAt, sx }) {
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

function ReplyItemPopupMenu({
	editMode, setEditMode, setOpenConfirmDialog, setOpenNewCannedReplyDialog, trid, sx
}) {

	const router = useRouter()
	const { enqueueSnackbar } = useSnackbar()

	const [
		MenuContainer, open, anchorRef, {
			handleToggle, handleClose, handleListKeyDown
		}
	] = useMenuContainer()

	return (
		<Box sx={sx}>
			<IconButton
				size="large"
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<MoreVertIcon />
			</IconButton>

			<MenuContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				handleListKeyDown={handleListKeyDown}
				placement="bottom-end"
				transformOrigin="right top"
			>
				<CopyToClipboard
					text={
						//TODO: the link is not full, still missing the domain name
						router.asPath + "#" + trid}
					onCopy={() => {
						enqueueSnackbar("Link copied", { variant: "info" })
					}}
				>
					<MenuItem>
						<ListItemIcon>
							<LinkIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>Copy Link</ListItemText>
					</MenuItem>
				</CopyToClipboard>

				{!editMode ?
					<MenuItem onClick={() => { setEditMode(true) }}>
						<ListItemIcon>
							<EditIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>Edit</ListItemText>
					</MenuItem> : null}

				<MenuItem onClick={() => { setOpenConfirmDialog(true) }}>
					<ListItemIcon>
						<DeleteIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Delete...</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => { setOpenNewCannedReplyDialog(true) }}>
					<ListItemIcon>
						<DescriptionIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Convert to canned-reply...</ListItemText>
				</MenuItem>
			</MenuContainer>
		</Box>
	)
}
ReplyItemPopupMenu.propTypes = {
	editMode: PropTypes.bool.isRequired,
	setEditMode: PropTypes.func.isRequired,
	setOpenConfirmDialog: PropTypes.func.isRequired,
	setOpenNewCannedReplyDialog: PropTypes.func.isRequired,
	trid: PropTypes.string.isRequired,
	sx: PropTypes.object,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ReplyItem({ isAdmin, replyItem, ticketUsername, ticketStatus, departmentId, isFirst = false }) {
	const dispatch = useDispatch()
	const { editorData } = useSelector(getTextEditor)
	const { currentUser } = useSelector(getAuth)
	const { isSmallScreen } = useSelector(getUiSettings)

	const [editMode, setEditMode] = useState(false)
	const [replyItemContent, setReplyItemContent] = useState(replyItem.content)
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
	const [openNewCannedReplyDialog, setOpenNewCannedReplyDialog] = useState(false)

	const [deleteTicketReply] = useDeleteTicketReplyMutation()
	const [updateTicketReply] = useUpdateTicketReplyMutation()

	const profile = useGetProfileByUsername(replyItem.username)

	const handleUpdateReply = async () => {
		setEditMode(false)
		setReplyItemContent(editorData)
		const res = await updateTicketReply({
			ticketItem: {
				username: ticketUsername,
				tid: replyItem.tid,
			},
			replyItem: {
				trid: replyItem.trid,
				content: editorData
			}
		})

		if (res?.data.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: currentUser.username,
				tag: [{ type: TYPE.TICKETS, id: replyItem.tid.concat("_replies") }],
				target: {
					isForUser: true,
					isForAdmin: false,
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	const handleDeleteReply = async (confirmed) => {
		if (confirmed === false) return

		console.log("processing to delete replyId", replyItem.trid)
		const res = await deleteTicketReply({
			username: ticketUsername,
			tid: replyItem.tid,
			trid: replyItem.trid
		})

		if (res?.data.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: currentUser.username,
				tag: [{ type: TYPE.TICKETS, id: replyItem.tid.concat("_replies") }],
				target: {
					isForUser: true,
					isForAdmin: false,
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	const handleCancelUpdateReply = () => {
		//repeat(...) used here is a trick to force re-render ticketItem's editor
		setReplyItemContent(prev => prev + " ".repeat(random(20)))
		dispatch(setEditorData(""))
		setEditMode(false)
	}

	dayjs.extend(relativeTime)

	return (
		<Box id={replyItem.trid} sx={{
			display: "flex",
			px: 3, py: { xs: 3, md: 4 },
			flexDirection: { xs: "column", sm: "row" },
			...(!isFirst && { borderTop: "1px solid", borderColor: "divider" }),
			...(editMode && { backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) }),
			":hover": {
				backgroundColor:
					editMode
						? (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
						: "action.hover",
				transition: "background-color 500ms cubic-bezier(0.4, 0, 0.2, 1)",
			},
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
						mr: -1
					}}
				/>

				{(isAdmin && ticketStatus !== STATUS_FILTER.CLOSED && (isSmallScreen || isMobile))
					? <ReplyItemPopupMenu
						sx={{ mr: -2 }}
						editMode={editMode}
						setEditMode={setEditMode}
						setOpenConfirmDialog={setOpenConfirmDialog}
						setOpenNewCannedReplyDialog={setOpenNewCannedReplyDialog}
						trid={replyItem.trid}
					/> : null}
			</Box>

			<Box sx={{
				flexGrow: 1,
				pr: { xs: 1, sm: editMode ? 5 : 0 }
			}}>
				<Box sx={{
					display: { xs: "none", sm: "flex" },
					justifyContent: "flex-end"
				}}>
					<ReplyCreatedAt createdAt={replyItem.createdAt} />

					{(isAdmin && ticketStatus !== STATUS_FILTER.CLOSED && !isSmallScreen & !isMobile)
						? <ReplyItemPopupMenu
							editMode={editMode}
							setEditMode={setEditMode}
							setOpenConfirmDialog={setOpenConfirmDialog}
							setOpenNewCannedReplyDialog={setOpenNewCannedReplyDialog}
							trid={replyItem.trid}
						/> : null}
				</Box>

				<Box sx={{
					display: "flex",
					flexDirection: "column",
					my: { xs: 2, sm: 0 },
					mx: { xs: 0, sm: 1 },
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
								disabled={trim(editorData) === "" || trim(replyItemContent) === trim(editorData)}
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

			<NewCannedReplyDialog
				content={replyItemContent}
				createdBy={currentUser.username}
				departmentId={departmentId}
				open={openNewCannedReplyDialog}
				setOpen={setOpenNewCannedReplyDialog}
			/>
		</Box >
	)
}
ReplyItem.propTypes = {
	isAdmin: PropTypes.bool,
	replyItem: PropTypes.object.isRequired,
	ticketUsername: PropTypes.string.isRequired,
	ticketStatus: PropTypes.string.isRequired,
	departmentId: PropTypes.string.isRequired,
	isFirst: PropTypes.bool
}

export default ReplyItem