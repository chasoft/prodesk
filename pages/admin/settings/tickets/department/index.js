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
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout, TICKET_SETTINGS_NAMES } from "../../../../../components/Settings/InnerLayoutTickets"
import updateUiSettings from "../../../../../helpers/updateUiSettings"
import GeneralList from "../../../../../components/common/GeneralList"
import GeneralListItem, { GeneralListItemEmpty } from "../../../../../components/common/GeneralList/GeneralListItem"
import AvatarList from "../../../../../components/common/AvatarList"

//ASSETS
import AddIcon from "@material-ui/icons/Add"
import TicketDepartmentDetailsDialog from "../../../../../components/Settings/TicketDepartmentDetailsDialog"
import AddMemberList from "../../../../../components/Settings/AddMemberList"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DUMMY_DEPARTMENT = [
	{
		id: 1,
		department: "Sales", note: "",
		members: [
			{ username: "brian", displayName: "Brian", photoURL: "/img/default-avatar.png" },
			{ username: "caoanh", displayName: "Cao Anh", photoURL: "/img/default-avatar.png" },
			{ username: "phu", displayName: "Phu", photoURL: "/img/default-avatar.png" }
		]
	},
	{
		id: 2,
		department: "Accounts", note: "",
		members: [
			{ username: "brian", displayName: "Brian", photoURL: "/img/default-avatar.png" },
		]
	},
	{
		id: 3,
		department: "Complain",
		note: "",
		members: [
		]
	},
	{
		id: 4,
		department: "Technical", note: "Solve technical questions",
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

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function TicketSettingsDepartment() {

	updateUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.DEPARTMENT,
		background: {
			height: "132px",
			backgroundImage: ""
		}
	})

	return (
		<>
			<GeneralList
				title="Department"
				rightAction={
					<>
						<Button
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
						>
							Add department
						</Button>
					</>
				}
			>
				{
					DUMMY_DEPARTMENT.length > 0
						?
						DUMMY_DEPARTMENT.map((item) => {
							return (
								<GeneralListItem
									key={item.id}
									link={`/admin/settings/tickets/department/${item.id}`}
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
											<Tooltip title="Add members" placement="bottom">
												<AddMemberList department={item.department}>
													<IconButton color="secondary" aria-label="add an alarm">
														<AddIcon />
													</IconButton>
												</AddMemberList>
											</Tooltip>
										</div>
									}
								/>
							)
						})
						:
						<GeneralListItemEmpty
							message={
								<div>
									<Typography>
										You&apos;ve no department for the moment, <a onClick={() => { alert("Show A dialog") }}>click here</a> to create a new department.
									</Typography>
								</div>
							}
						/>
				}
			</GeneralList>
		</>
	)
}

TicketSettingsDepartment.getLayout = getLayout
export default TicketSettingsDepartment