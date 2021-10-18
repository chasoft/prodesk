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
import { Box, CircularProgress, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import AvatarList from "./../../common/AvatarList"
import { useGetDepartmentsQuery } from "./../../../redux/slices/firestoreApi"
import { setActiveSettingPanel } from "./../../../redux/slices/uiSettings"
import { SettingsContentDetails, SettingsContentHeader, SettingsContentHelper, SettingsContentHelperLearnMore, SettingsContentHelperText } from "./../../Settings/SettingsPanel"

//ASSETS
import PublicIcon from "@mui/icons-material/Public"
import FingerprintIcon from "@mui/icons-material/Fingerprint"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DepartmentsOverview = ({ backBtnClick }) => {

	const dispatch = useDispatch()
	const { data: departments, isLoading } = useGetDepartmentsQuery(undefined)

	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				Departments overview
			</SettingsContentHeader>

			<SettingsContentHelper>
				<SettingsContentHelperText>
					Departments are must have to get the system up and running. eg. Sales, Technical, Accounting...
					<SettingsContentHelperLearnMore target="/docs" />
				</SettingsContentHelperText>
			</SettingsContentHelper>

			{isLoading ?
				<SettingsContentDetails>
					<CircularProgress />
				</SettingsContentDetails>
				: departments.map((item) => (
					<Box
						key={item.did}
						onClick={() => dispatch(setActiveSettingPanel(item.department))}
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
									{item.department}
								</Typography>

								{item.availableForAll
									?
									<Tooltip title="All members" placement="top">
										<FingerprintIcon fontSize="small" color="disabled" sx={{ ml: 1 }} />
									</Tooltip>
									:
									<Tooltip title="Only selected members" placement="top">
										<FingerprintIcon fontSize="small" color="action" sx={{ ml: 1 }} />
									</Tooltip>}

								{item.isPublic
									?
									<Tooltip title="Available for all users" placement="top">
										<PublicIcon fontSize="small" color="action" sx={{ ml: 1 }} />
									</Tooltip>
									:
									<Tooltip title="For internal use only" placement="top">
										<PublicIcon fontSize="small" color="disabled" sx={{ ml: 1 }} />
									</Tooltip>}

							</Box>
							<Box sx={{
								display: "flex",
								flexDirection: { xs: "column", md: "row" }
							}}>
								<Typography variant="caption" sx={{ margin: 0 }}>
									{item.description}
									{item.description ? <>&nbsp; | &nbsp; </> : null}
								</Typography>

								<Typography variant="caption" style={{ margin: 0 }}>
									{item.members.length} members
								</Typography>
							</Box>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center" }}>
							<AvatarList dataSource={item.members} />
						</Box>

					</Box>
				))
			}
		</>
	)
}

DepartmentsOverview.propTypes = {
	backBtnClick: PropTypes.func,
}

export default DepartmentsOverview