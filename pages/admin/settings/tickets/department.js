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
import { Button, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "./../../../../redux/selectors"
import useUiSettings from "./../../../../helpers/useUiSettings"
import { setActiveSettingPanel } from "./../../../../redux/slices/uiSettings"
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
 * DUMMY DATA                                                    *
 *****************************************************************/

const DUMMY_DEPARTMENTS = [
	{
		id: 1,
		department: "Sales",
		description: "Sales Department",
		availableForAll: false,
		isPublic: false,
		members: [
			{ username: "brian", displayName: "Brian", photoURL: "/img/default-avatar.png" },
			{ username: "caoanh", displayName: "Cao Anh", photoURL: "/img/default-avatar.png" },
			{ username: "phu", displayName: "Phu", photoURL: "/img/default-avatar.png" }
		]
	},
	{
		id: 2,
		department: "Accounts",
		description: "Accounts Department",
		availableForAll: true,
		isPublic: true,
		members: [
			{ username: "brian", displayName: "Brian", photoURL: "/img/default-avatar.png" },
		]
	},
	{
		id: 3,
		department: "Complain",
		description: "Take care our users",
		availableForAll: false,
		isPublic: true,
		members: [

		]
	},
	{
		id: 4,
		department: "Technical",
		description: "Let our core value bright",
		availableForAll: true,
		isPublic: false,
		head: "caoanh",
		members: [
			{ username: "brian", displayName: "Brian", photoURL: "/default-avatar/1.png" },
			{ username: "caoanh", displayName: "Cao Anh", photoURL: "/default-avatar/2.png" },
			{ username: "phu", displayName: "Phu", photoURL: "/default-avatar/3.png" },
			{ username: "tai", displayName: "Tai", photoURL: "/default-avatar/4.png" },
			{ username: "whoami", displayName: "WhoAmI", photoURL: "/default-avatar/5.png" }
		]
	},
]

const getDepartmentById = (id) => {
	const index = DUMMY_DEPARTMENTS.map(item => item.id).indexOf(id)
	return DUMMY_DEPARTMENTS[index]
}

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
	const [showContent, setShowContent] = useState(false)

	const dispatch = useDispatch()
	const { activeSettingPanel } = useSelector(getUiSettings)

	//Whether a group is selected, then show DepartmetsDetails
	const aGroupSelected = Object.entries(DEPARTMENT_PAGES).map(item => item[1]).indexOf(activeSettingPanel) === -1

	useUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.DEPARTMENT,
		activePanel: DEPARTMENT_PAGES.OVERVIEW,
		background: {
			height: "132px",
			backgroundImage: ""
		}
	})

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

				<SettingsList sx={{ display: { xs: showContent ? "none" : "initial", sm: "initial", flexGrow: showContent ? 0 : 1 } }}>

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

					<ListTitle>Available departments</ListTitle>

					{DUMMY_DEPARTMENTS.map((item) => (
						<ListItem
							key={item.id}
							selected={activeSettingPanel === item.id}
							icon={<BusinessIcon fontSize="small" />}
							onClick={() => {
								dispatch(setActiveSettingPanel(item.id))
								setShowContent(true)
							}}
						>
							{item.department}
						</ListItem>
					))}

				</SettingsList>

				<SettingsContent sx={{ display: { xs: showContent ? "initial" : "none", sm: "initial", flexGrow: showContent ? 1 : 0 } }}>

					{(activeSettingPanel === DEPARTMENT_PAGES.OVERVIEW)
						&& <DepartmentsOverview
							dataDepartments={DUMMY_DEPARTMENTS}
							callback={(id) => dispatch(setActiveSettingPanel(id))}
							backBtnClick={setShowContent}
						/>}

					{(activeSettingPanel === DEPARTMENT_PAGES.ADD_NEW_DEPARTMENT)
						&& <DepartmentsAddNew
							onClick={() => { console.log("Add new department") }}
							backBtnClick={setShowContent}
						/>}


					{aGroupSelected
						&& <DepartmentsDetails
							dataDepartment={getDepartmentById(activeSettingPanel)}
							backBtnClick={setShowContent}
						/>}

				</SettingsContent>

			</SettingsContainer>
		</>
	)
}

TicketSettingsDepartment.getLayout = getLayout

export default TicketSettingsDepartment