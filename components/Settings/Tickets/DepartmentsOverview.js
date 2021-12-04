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

//PROJECT IMPORT

import React from "react"
import PropTypes from "prop-types"

//MATERIAL-UI
import { Avatar, Box, Chip, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import AvatarList from "@components/common/AvatarList"

import {
	SettingsContentDetails,
	SettingsContentHeader,
	SettingsContentHelper,
	SettingsContentHelperText,
	SettingsContentHelperLearnMore,
} from "@components/common/Settings"

import { setActiveSettingPanel } from "@redux/slices/uiSettings"
import { useGetDepartmentsQuery } from "@redux/slices/firestoreApi"
import { CircularProgressBox } from "@components/common"

//ASSETS
import PublicIcon from "@mui/icons-material/Public"
import FingerprintIcon from "@mui/icons-material/Fingerprint"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function DepartmentMembersCount({ count }) {
	return (
		<Chip
			size="small"
			avatar={<Avatar sx={{ bgcolor: "primary.light" }}>{count}</Avatar>}
			label={count > 1 ? "members" : "member"}
			variant="outlined"
			sx={{ ".MuiChip-avatar": { color: "#FFF", fontWeight: 700 } }}
			onClick={(e) => e.stopPropagation()} />
	)
}
DepartmentMembersCount.propTypes = {
	count: PropTypes.number
}

function DepartmentAvailableForAll() {
	return (
		<Chip
			size="small"
			label="Available for all"
			color="primary"
			sx={{ ".MuiChip-avatar": { color: "#FFF", fontWeight: 700 } }}
			onClick={(e) => e.stopPropagation()} />
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function DepartmentsOverview({ backBtnClick }) {
	const dispatch = useDispatch()
	const { data: departments, isLoading } = useGetDepartmentsQuery(undefined)

	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				Departments overview
			</SettingsContentHeader>

			<SettingsContentHelper>
				<SettingsContentHelperText>
					Departments are your basic support blocks. They are usually Sales, Technical, Accounting,..etc.
					Administrators can view all tickets of any departments but only members of department will receive related notifications.
					<hr style={{ borderColor: "transparent", marginTop: "3px" }} />
					After deploying your support system, try avoid to delete any departments for they would affect existing tickets. In almost all cases, renaming would be better than deleting.
					<SettingsContentHelperLearnMore target="/docs" />
				</SettingsContentHelperText>
			</SettingsContentHelper>

			{isLoading ?
				<SettingsContentDetails>
					<CircularProgressBox />
				</SettingsContentDetails>
				: departments.map((department) => (
					<Box
						key={department.did}
						onClick={() => dispatch(setActiveSettingPanel(department.name))}
						sx={{
							display: "flex",
							p: 3,
							":hover": {
								cursor: "pointer",
								bgcolor: "action.hover",
							},
							":last-child:hover": {
								borderBottomRightRadius: "0.5rem",
							},
						}}
					>
						<Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
							<Box sx={{
								display: "flex",
								alignItems: "center"
							}}>
								<Typography variant="h3" style={{ margin: 0 }}>
									{department.name}
								</Typography>

								{department.availableForAll
									?
									<Tooltip arrow title="All members" placement="top">
										<FingerprintIcon
											fontSize="small"
											color="primary"
											sx={{ ml: 1 }} />
									</Tooltip>
									:
									<Tooltip arrow title="Only selected members" placement="top">
										<FingerprintIcon
											fontSize="small"
											color="warning"
											sx={{ ml: 1 }} />
									</Tooltip>}

								{department.isPublic
									?
									<Tooltip arrow title="Available for all users" placement="top">
										<PublicIcon
											fontSize="small"
											color="primary"
											sx={{ ml: 1 }} />
									</Tooltip>
									:
									<Tooltip arrow title="For internal use only" placement="top">
										<PublicIcon
											fontSize="small"
											color="disabled"
											sx={{ ml: 1 }} />
									</Tooltip>}

							</Box>
							<Box sx={{
								display: "flex",
								alignItems: "center",
								flexDirection: { xs: "column", md: "row" }
							}}>
								<Typography variant="caption" sx={{ margin: 0 }}>
									{department.description}
									{department.description ? <>&nbsp; | &nbsp; </> : null}
								</Typography>

								{(department.availableForAll === false)
									? <DepartmentMembersCount count={department.members.length} />
									: <DepartmentAvailableForAll />}
							</Box>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center" }}>
							{(department.availableForAll === false) &&
								<AvatarList members={department.members} />}
						</Box>

					</Box>
				))}
		</>
	)
}

DepartmentsOverview.propTypes = {
	backBtnClick: PropTypes.func,
}

export default DepartmentsOverview