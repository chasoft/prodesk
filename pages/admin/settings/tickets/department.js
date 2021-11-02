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

// MATERIAL-UI
import { Box, Button, CircularProgress, Typography } from "@mui/material"

//THIRD-PARTY
import { some } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "./../../../../redux/selectors"
import useUiSettings from "./../../../../helpers/useUiSettings"
import { setActiveSettingPanel } from "./../../../../redux/slices/uiSettings"
import { useGetDepartmentsQuery } from "../../../../redux/slices/firestoreApi"
import DepartmentsAddNew from "./../../../../components/Settings/Tickets/DepartmentsAddNew"
import DepartmentsDetails from "./../../../../components/Settings/Tickets/DepartmentsDetails"
import DepartmentsOverview from "./../../../../components/Settings/Tickets/DepartmentsOverview"
import { getLayout, TICKET_SETTINGS_NAMES } from "./../../../../components/Settings/InnerLayoutTickets"
import { ListItem, ListTitle, SettingsContainer, SettingsContent, SettingsHeader, SettingsList } from "./../../../../components/Settings/SettingsPanel"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import InfoIcon from "@mui/icons-material/Info"
import BusinessIcon from "@mui/icons-material/Business"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const DEPARTMENT_PAGES = {
	OVERVIEW: "Departments overview",
	ADD_NEW_DEPARTMENT: "Add new ticket department"
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketSettingsDepartment() {

	useUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.DEPARTMENT,
		activePanel: DEPARTMENT_PAGES.OVERVIEW,
		background: {
			backgroundImage: ""
		}
	})

	const dispatch = useDispatch()
	const [showContent, setShowContent] = useState(false)
	const { activeSettingPanel } = useSelector(getUiSettings)

	const { data: departments, isLoading } = useGetDepartmentsQuery(undefined)

	const hasSelectedDepartment = isLoading ? false : some(departments, { department: activeSettingPanel })

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>Departments</Typography>
				<Button
					variant="contained" color="primary" size="small" startIcon={<AddIcon />}
					onClick={() => {
						dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.ADD_NEW_DEPARTMENT))
						setShowContent(true)
					}}
				>
					Add New
				</Button>
			</SettingsHeader>

			<SettingsContainer>

				<SettingsList showContent={showContent}>
					<ListItem
						selected={activeSettingPanel === DEPARTMENT_PAGES.OVERVIEW}
						icon={<InfoIcon fontSize="small" />}
						onClick={() => {
							dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.OVERVIEW))
							setShowContent(true)
						}}
					>
						Overview
					</ListItem>

					<ListTitle>{(departments?.length > 0) ? "Available departments" : "No available department"}</ListTitle>

					{isLoading
						? <div>Loading</div>
						: departments.map((item) => (
							<ListItem
								key={item.did}
								selected={activeSettingPanel === item.department}
								icon={<BusinessIcon fontSize="small" />}
								onClick={() => {
									dispatch(setActiveSettingPanel(item.department))
									setShowContent(true)
								}}
							>
								{item.department}
							</ListItem>
						))}

				</SettingsList>

				<SettingsContent showContent={showContent}>

					{isLoading
						? <Box sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							minHeight: "200px"
						}}>
							<CircularProgress />
						</Box>
						: (activeSettingPanel === DEPARTMENT_PAGES.OVERVIEW)
						&& <DepartmentsOverview backBtnClick={setShowContent} />}

					{(activeSettingPanel === DEPARTMENT_PAGES.ADD_NEW_DEPARTMENT)
						&& <DepartmentsAddNew backBtnClick={setShowContent} />}

					{hasSelectedDepartment
						&& <DepartmentsDetails backBtnClick={setShowContent} />}

				</SettingsContent>

			</SettingsContainer>
		</>
	)
}

TicketSettingsDepartment.getLayout = getLayout

export default TicketSettingsDepartment