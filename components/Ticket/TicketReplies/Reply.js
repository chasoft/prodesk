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

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { useGetProfilesQuery } from "../../../redux/slices/firestoreApi"
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { size } from "lodash"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

//PROJECT IMPORT
import TextEditor from "./../../common/TextEditor"
import { DATE_FORMAT } from "../../../helpers/constants"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"
import useConfirmDialogYesNo from "../../common/useConfirmDialogYesNo"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ReplyItem({ isAdmin, replyItem, isFirst = false }) {

	const { profile } = useGetProfilesQuery(undefined, {
		selectFromResult: ({ data }) => ({
			profile: data?.find((profile) => profile.username === replyItem.username) ?? undefined,
		})
	})

	const { ConfirmDialogYesNo, open, setOpen, agreed, setAgreed } = useConfirmDialogYesNo()

	dayjs.extend(relativeTime)

	return (
		<Box sx={{
			display: "flex",
			px: 3, py: { xs: 3, md: 4 },
			flexDirection: { xs: "column", sm: "row" },
			...(!isFirst && { borderTop: "1px solid", borderColor: "divider" }),
			":hover": {
				backgroundColor: "action.hover",
				transition: "background-color 500ms cubic-bezier(0.4, 0, 0.2, 1)",
				"& > #delete-reply-button": {
					visibility: "visible"
				}
			},
			"& > #delete-reply-button": {
				visibility: "hidden"
			}
		}}>

			<Box sx={{
				display: "flex",
				flexDirection: { xs: "row", sm: "column" },
				justifyContent: { xs: "space-between", sm: "flex-start" },
				alignItems: "center",
			}}>

				<Box sx={{
					display: { xs: "flex", sm: "block" },
					flexDirection: { xs: "row", sm: "column" },
					alignItems: "center",
					overflow: "hidden",
					width: { xs: "initial", sm: "80px" },
					textOverflow: "ellipsis",
					flexGrow: 1,
				}}>
					<Avatar
						alt="Remy Sharp"
						src={profile ? profile.photoURL : "/avatar/1.png"}
						sx={{
							marginLeft: "auto",
							marginRight: "auto"
						}}
					/>

					<Typography noWrap variant="caption" sx={{
						fontWeight: 500,
						flexGrow: 1,
						mx: { xs: 2, sm: 0 },
						mt: { xs: 0, sm: 2 }
					}}>
						{size(profile) ? profile.displayName : "Loading..."}
					</Typography>

					<Box sx={{
						display: { xs: "flex", sm: "none" },
						flexDirection: { xs: "column", sm: "row" },
						alignItems: "flex-end",
					}}>
						<Typography>
							{dayjs(replyItem.createdAt).format(DATE_FORMAT.LONG)}
						</Typography>
						<Typography noWrap color="textSecondary" sx={{ fontStyle: "italic", textAlign: "right" }}>
							({dayjs(replyItem.createdAt).fromNow()})
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box sx={{ flexGrow: 1 }}>

				<Box sx={{
					display: { xs: "none", sm: "flex" },
					alignItems: "space-between",
					ml: { xs: 0, sm: 3 },
					mb: 1
				}}>
					<Typography variant="caption" >
						<b>{profile?.displayName}</b> replied by {dayjs(replyItem.createdAt).format(DATE_FORMAT.LONG)}&nbsp;
					</Typography>
					<Typography variant="caption" color="textSecondary" sx={{ fontStyle: "italic" }}>
						({dayjs(replyItem.createdAt).fromNow()})
					</Typography>
				</Box>

				<Box sx={{
					my: { xs: 2, sm: 0 },
					ml: { xs: 0, sm: 3 },
					"&>p": { lineHeight: "1.5rem" }
				}}>
					<TextEditor
						value={replyItem.content}
						readOnly={true} >
					</TextEditor>
				</Box>

				{(replyItem.createdAt !== replyItem.updatedAt)
					? <Typography variant="caption" color="textSecondary" sx={{
						my: 1,
						ml: { xs: 0, sm: 3 }
					}}>
						<span>last edited {dayjs(replyItem.updatedAt).fromNow()} </span>
					</Typography>
					: null}
			</Box>

			{isAdmin &&
				<Box
					id="delete-reply-button"
					sx={{
						float: "right",
						mt: { xs: -2, md: -3 },
						mr: -2
					}}
				>
					<Tooltip title="Delete reply..." placement="top" >
						<IconButton onClick={() => { setOpen(true) }}>
							<DeleteIcon color="warning" />
						</IconButton>
					</Tooltip>

					<ConfirmDialogYesNo
						title="Delete reply confirmation"
						open={open}
						setOpen={setOpen}
						setHasAgreed={setAgreed}
					>
						<Box sx={{
							display: "flex"
						}}>
							<DeleteIcon sx={{ width: 60, height: 60, mr: 2 }} color="warning" />
							<Typography sx={{ lineHeight: 2 }}>
								Are you sure you want to delete this reply?<br />Please note that this action can not be undo.
							</Typography>
						</Box>
					</ConfirmDialogYesNo>
				</Box>}

			{agreed && "you confirmed to delete"}
			{console.log({ hasAgreed: agreed, trid: replyItem.trid })}

		</Box >
	)
}
ReplyItem.propTypes = {
	isAdmin: PropTypes.bool,
	replyItem: PropTypes.object,
	isFirst: PropTypes.bool
}

export default ReplyItem