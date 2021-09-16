/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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

// MATERIAL-UI
import { Button, Grid, TextField, Typography } from "@material-ui/core"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getLayout, TICKET_SETTINGS_NAMES } from "../../../../../components/Settings/InnerLayoutTickets"
import updateUiSettings from "../../../../../helpers/updateUiSettings"

//ASSETS
import AddIcon from "@material-ui/icons/Add"
import InfoIcon from "@material-ui/icons/Info"
import SettingsPanel, { ContentHelper, ListItem, ListTitle } from "../../../../../components/common/SettingsPanel"

import BusinessIcon from "@material-ui/icons/Business"
import { setActiveSettingPanel } from "../../../../../redux/slices/uiSettings"

import { getUiSettings } from "../../../../../redux/selectors"
import SettingsSwitch from "../../../../../components/common/SettingsSwitch"
import MembersList from "../../../../../components/Settings/MembersList"
import AvatarList from "../../../../../components/common/AvatarList"
import SimpleListItem, { SimpleListItemEmpty } from "../../../../../components/common/SimpleList/SimpleListItem"
import SimpleList from "../../../../../components/common/SimpleList"
/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DUMMY_DEPARTMENT = [
	{
		id: 1,
		department: "Sales",
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
		availableForAll: true,
		isPublic: true,
		members: [
			{ username: "brian", displayName: "Brian", photoURL: "/img/default-avatar.png" },
		]
	},
	{
		id: 3,
		department: "Complain",
		availableForAll: false,
		isPublic: true,
		members: [

		]
	},
	{
		id: 4,
		department: "Technical",
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
	const index = Object.entries(DUMMY_DEPARTMENT).map(item => item[1].id).indexOf(id)
	return DUMMY_DEPARTMENT[index]
}

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function TicketSettingsDepartment() {

	const dispatch = useDispatch()
	const { activeSettingPanel } = useSelector(getUiSettings)

	updateUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.DEPARTMENT,
		background: {
			height: "132px",
			backgroundImage: ""
		}
	})

	return (
		<SettingsPanel
			title="Departments"
			rightAction={
				<Button
					variant="contained" color="primary" startIcon={<AddIcon />} size="small"
					onClick={() => { dispatch(setActiveSettingPanel("AddNewDepartment")) }}
				>
					Add department
				</Button>
			}
			list={
				<>
					<ListItem
						selected={activeSettingPanel === ""}
						icon={<InfoIcon fontSize="small" />}
						onClick={() => { dispatch(setActiveSettingPanel("")) }}
					>
						Overview
					</ListItem>

					<ListTitle>Available departments</ListTitle>

					{
						DUMMY_DEPARTMENT.map((item) => {
							return (
								<ListItem
									key={item.id}
									selected={activeSettingPanel === item.id}
									icon={<BusinessIcon fontSize="small" />}
									onClick={() => { dispatch(setActiveSettingPanel(item.id)) }}
								>
									{item.department}
								</ListItem>
							)
						})
					}
				</>
			}
			helper={
				<ContentHelper
					title={
						(activeSettingPanel === "")
							? "Department Summary"
							: (
								(activeSettingPanel === "AddNewDepartment")
									? "Add new department"
									: getDepartmentById(activeSettingPanel).department
							)

					}
				/>
			}
			actionBar={
				(activeSettingPanel === "AddNewDepartment")
					? <div></div>
					: null
			}
			style={(activeSettingPanel === "") ? { padding: 0 } : {}}
		>

			{/* Start BODY */}

			{
				(activeSettingPanel === "")
					?
					<SimpleList elevation={0}>
						{
							DUMMY_DEPARTMENT.length > 0
								?
								DUMMY_DEPARTMENT.map((item) => {
									return (
										<SimpleListItem
											key={item.id}
											onClick={() => { dispatch(setActiveSettingPanel(item.id)) }}
											content={
												<>
													<Typography variant="h3" style={{ margin: 0 }}>{item.department}</Typography>
													<div style={{ display: "flex", alignItems: "center" }}>
														<Typography variant="caption">{item.note}</Typography>
														{item.note ? <>&nbsp;|&nbsp;</> : null}
														<Typography variant="caption" style={{ margin: 0 }}>
															{item.members.length} members
														</Typography>
													</div>
												</>
											}
											extraContent={
												<div style={{ display: "flex", alignItems: "center" }}>
													<AvatarList dataSource={item.members} />
												</div>
											}
										/>
									)
								})
								:
								<SimpleListItemEmpty
									message={
										<div>
											<Typography>
												You&apos;ve no department for the moment.
											</Typography>
										</div>
									}
								/>
						}
					</SimpleList>
					:
					(
						(DUMMY_DEPARTMENT.map(item => item.id).indexOf(activeSettingPanel) !== -1)
							?
							<Grid container spacing={4}>

								<Grid item xs={12}>
									<TextField
										value={getDepartmentById(activeSettingPanel).department}
										label="Name of the department"
										placeholder="eg. Sales, Accounting..."
										fullWidth />
								</Grid>

								<Grid item xs={12}>
									<SettingsSwitch
										title="All members"
										state={getDepartmentById(activeSettingPanel).availableForAll}
										setState={() => { }}
										stateDescription={["Only selected members", "All members"]}
										description="Allow access to the department to all members, or exclusively to a specified group of members."
									/>
								</Grid>

								<Grid item xs={12}>
									<SettingsSwitch
										title="Public"
										state={getDepartmentById(activeSettingPanel).isPublic}
										setState={() => { }}
										stateDescription={["For internal use only", "Available for all users"]}
										description="If the department is public, it allows users to select this department when creating the ticket, otherwise only members can reassign to this department."
									/>
								</Grid>

								<Grid item xs={12}>
									<MembersList
										dataSource={getDepartmentById(activeSettingPanel).members}
										addMemberCallback={() => { }}
									/>
									<div style={{ height: "2rem" }}></div>
								</Grid>
							</Grid>
							:
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<TextField
										label="Name of the department"
										placeholder="eg. Sales, Accounting..."
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<SettingsSwitch
										title="All members"
										state={false}
										setState={() => { }}
										stateDescription={["Only selected members", "All members"]}
										description="Allow access to the department to all members, or exclusively to a specified group of members."
									/>
								</Grid>

								<Grid item xs={12}>
									<SettingsSwitch
										title="Public"
										state={true}
										setState={() => { }}
										stateDescription={["For internal use only", "Available for all users"]}
										description="If the department is public, it allows users to select this department when creating the ticket, otherwise only members can reassign to this department."
									/>
								</Grid>

								<Grid item xs={12}>
									<MembersList
										dataSource={[]}
										addMemberCallback={() => { }}
									/>

								</Grid>
							</Grid>
					)
			}

			{/* End of BODY */}
		</SettingsPanel >
	)
}

TicketSettingsDepartment.getLayout = getLayout

export default TicketSettingsDepartment