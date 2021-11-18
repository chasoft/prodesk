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
import { Avatar, AvatarGroup, Box, Button, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { isEqual, sortBy } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { isMobile } from "react-device-detect"
import { useDeepCompareEffect } from "react-use"

//PROJECT IMPORT
import useProfilesGroup from "../../helpers/useProfilesGroup"
import { getUiSettings } from "./../../redux/selectors"
import { DepartmentMembersCount } from "./Tickets/DepartmentsOverview"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import { REDIRECT_URL, USERGROUP } from "../../helpers/constants"
import { setRedirect } from "../../redux/slices/redirect"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const StaffListChooserDialog = ({ open, members, addMemberCallback, handleClose }) => {
	const [selected, setSelected] = useState(members)
	const { isSmallScreen } = useSelector(getUiSettings)
	const {
		userList: supporterList = [],
		isLoading: isLoadingSupporterList
	} = useProfilesGroup([USERGROUP.USER.code, USERGROUP.MEMBER.code], { inverting: true })

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

	const isModified = isEqual(sortBy(members), sortBy(selected)) === false

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
				{isLoadingSupporterList &&
					<Box sx={{
						display: "flex",
						height: "200px",
						alignItems: "center",
						justifyContent: "center",
					}}>
						<CircularProgress />
					</Box>}

				{(!isLoadingSupporterList && supporterList.length === 0) &&
					<DialogContentText>
						You don&apos;t have any staff. Please go to User management to ....
					</DialogContentText>
				}

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
										secondaryAction={
											<Checkbox
												edge="end"
												onChange={handleToggleStaff(staff.username)}
												checked={selected.indexOf(staff.username) !== -1}
												inputProps={{ "aria-labelledby": labelId }}
											/>
										}
										disablePadding
									>
										<ListItemButton>
											<ListItemAvatar>
												<Avatar
													src={staff.photoURL}
													alt={staff.displayName}
												/>
											</ListItemAvatar>
											<ListItemText
												id={labelId}
												primary={`${staff.displayName} (${staff.username})`}
												secondary={staff.email}
											/>
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
StaffListChooserDialog.propTypes = {
	open: PropTypes.bool,
	members: PropTypes.array,
	addMemberCallback: PropTypes.func,
	handleClose: PropTypes.func
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const MembersList = ({ members, addMemberCallback }) => {
	const dispatch = useDispatch()
	const [membersCache, setMembersCache] = useState(members)
	const [memberProfiles, setMemberProfiles] = useState([])

	const {
		userList: staffList = [],
		isLoading: isLoadingStaffList
	} = useProfilesGroup(
		[
			USERGROUP.USER.code,
			USERGROUP.MEMBER.code
		],
		{ inverting: true }
	)

	const [openStaffListChooserDialog, setOpenStaffListChooserDialog] = useState(false)
	/*
		members is an array of usernames only,
		then, we need to get full profile of these usernames,
		anyway, sometime, an item in members would not be existed in staffList
		maybe... that user is fired/removed from staffList
	*/
	useDeepCompareEffect(() => {
		setMembersCache(members)
	}, [members])

	useDeepCompareEffect(() => {
		const verifiedList = membersCache
			.map(u => staffList.find(i => i.username === u))
			.filter(i => i !== undefined)
		setMemberProfiles(verifiedList)
	}, [staffList, membersCache])

	if (isLoadingStaffList) {
		return (
			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "50px"
			}}>
				<CircularProgress />
			</Box>
		)
	}

	return <>
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Typography variant="caption" sx={{ mr: 1 }}>
				Members
			</Typography>
		</Box>
		<Box sx={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center"
		}}>

			<Box>
				{memberProfiles.map((profile) => (
					<Chip
						key={profile.username}
						avatar={<Avatar src={profile.photoURL}></Avatar>}
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
						}}
					/>
				))}
			</Box>

			<Tooltip arrow title="Add members" placement="top">
				<Button
					color="primary"
					sx={{ mt: -0.5 }}
					startIcon={<AddIcon />}
					variant="outlined"
					onClick={() => setOpenStaffListChooserDialog(true)}
				>
					Add
				</Button>
			</Tooltip>

			<StaffListChooserDialog
				open={openStaffListChooserDialog}
				members={members}
				addMemberCallback={(members) => {
					setMembersCache(members)
					addMemberCallback(members)
				}}
				handleClose={() => setOpenStaffListChooserDialog(false)}
			/>
		</Box>

	</>
}
MembersList.propTypes = {
	members: PropTypes.array,
	addMemberCallback: PropTypes.func
}

export default MembersList