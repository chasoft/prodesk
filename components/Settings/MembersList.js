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
import { Avatar, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { isEqual, sortBy } from "lodash"
import { isMobile } from "react-device-detect"
import { useDeepCompareEffect } from "react-use"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { CircularProgressBox } from "@components/common"

import { setRedirect } from "@redux/slices/redirect"

import useProfilesGroup from "@helpers/useProfilesGroup"
import { REDIRECT_URL, USERGROUP } from "@helpers/constants"

//ASSETS
import AddIcon from "@mui/icons-material/Add"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function AddMembersDialog({ open, members, addMemberCallback, handleClose }) {
	const [selected, setSelected] = useState(members)
	const isSmallScreen = useSelector(s => s.uiSettingsState.isSmallScreen)

	const {
		userList: supporterList = [], isLoading: isLoadingSupporterList
	} = useProfilesGroup(
		[
			USERGROUP.USER.code,
			USERGROUP.MEMBER.code
		],
		{ inverting: true }
	)

	useDeepCompareEffect(() => {
		setSelected(members)
	}, [members])

	const handleToggleStaff = (value) => () => {
		const currentIndex = selected.indexOf(value)
		const newChecked = [...selected]
		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}
		setSelected(newChecked)
	}

	const isModified = isEqual(
		sortBy(members),
		sortBy(selected)
	) === false

	const handleUpdateStaffList = () => {
		if (isModified) {
			console.log("memberList selected")
			addMemberCallback(selected)
		}
		handleClose()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth={isSmallScreen}
			fullScreen={isMobile || isSmallScreen}
		>
			<DialogTitle sx={{ fontSize: "1.5em", fontWeight: 500 }}>Add members</DialogTitle>
			<DialogContent>
				{isLoadingSupporterList && <CircularProgressBox />}

				{(!isLoadingSupporterList && supporterList.length === 0) &&
					<DialogContentText>
						You don&apos;t have any staff. Please go to User management to ....
					</DialogContentText>}

				{(!isLoadingSupporterList && supporterList.length > 0) &&
					<>
						<DialogContentText sx={{ my: 1 }}>
							Add staffs/agents who are in charge of supporting tickets in current department.
						</DialogContentText>

						<List dense sx={{ width: "100%", minWidth: 360, bgcolor: "background.paper" }}>
							{supporterList.map((staff) => {
								const labelId = `checkbox-list-secondary-label-${staff.username}`
								return (
									<ListItem
										key={staff.username}
										secondaryAction={<Checkbox
											edge="end"
											onChange={handleToggleStaff(staff.username)}
											checked={selected.indexOf(staff.username) !== -1}
											inputProps={{ "aria-labelledby": labelId }} />}
										disablePadding
									>
										<ListItemButton>
											<ListItemAvatar>
												<Avatar
													src={staff.photoURL}
													alt={staff.displayName} />
											</ListItemAvatar>
											<ListItemText
												id={labelId}
												primary={`${staff.displayName} (${staff.username})`}
												secondary={staff.email} />
										</ListItemButton>
									</ListItem>
								)
							})}
						</List>
					</>}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					sx={{ mb: 1, mr: 2, px: 4 }}
				>
					Close
				</Button>

				<Button
					onClick={handleUpdateStaffList}
					disabled={!isModified}
					variant="contained"
					sx={{ mb: 1, mr: 2, px: 4 }}
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}
AddMembersDialog.propTypes = {
	open: PropTypes.bool,
	members: PropTypes.array,
	addMemberCallback: PropTypes.func,
	handleClose: PropTypes.func
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function MembersList({ members, addMemberCallback }) {
	const dispatch = useDispatch()
	const [membersCache, setMembersCache] = useState(members)
	const [memberProfiles, setMemberProfiles] = useState([])

	const {
		userList: administrativeUsers = [], isLoading: isLoadingStaffList
	} = useProfilesGroup(
		[
			USERGROUP.USER.code,
			USERGROUP.MEMBER.code
		],
		{ inverting: true }
	)

	const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false)

	useDeepCompareEffect(() => {
		setMembersCache(members)
	}, [members])

	/*
		members is an array of usernames only,
		then, we need to get full profile of these usernames,
		anyway, sometime, an item in members would not be existed in staffList
		maybe... that user is fired/removed from staffList
	*/
	useDeepCompareEffect(() => {
		const verifiedMembers = membersCache
			.map(memberCache => administrativeUsers.find(user => user.username === memberCache))
			.filter(e => e !== undefined)
		setMemberProfiles(verifiedMembers)
	}, [administrativeUsers, membersCache])

	if (isLoadingStaffList)
		return <CircularProgressBox minHeight="50px" />

	return <>
		<Typography variant="caption">
			Members
		</Typography>
		<Box sx={{
			display: "flex",
			alignItems: "center",
			marginTop: 1,
			marginLeft: -0.5
		}}>

			<Tooltip arrow title="Add members" placement="top">
				<IconButton
					color="primary"
					aria-label="add new members for current department"
					onClick={() => setOpenAddMemberDialog(true)}
				>
					<AddIcon />
				</IconButton>
			</Tooltip>

			<div>
				{memberProfiles.map((profile) => (
					<Chip
						key={profile.username}
						avatar={<Avatar src={profile.photoURL} />}
						label={profile.displayName}
						variant="outlined"
						sx={{
							mb: 0.5,
							mx: 0.5,
							".MuiChip-avatar": { color: "#FFF", fontWeight: 700 }
						}}
						onClick={(e) => {
							e.stopPropagation()
							dispatch(setRedirect(REDIRECT_URL.ADMIN.USERS + "/" + profile.username))
						}} />
				))}
			</div>

			<AddMembersDialog
				members={members}
				open={openAddMemberDialog}
				addMemberCallback={(members) => {
					setMembersCache(members)
					addMemberCallback(members)
				}}
				handleClose={() => setOpenAddMemberDialog(false)} />
		</Box>

	</>
}
MembersList.propTypes = {
	members: PropTypes.array,
	addMemberCallback: PropTypes.func
}

export default MembersList