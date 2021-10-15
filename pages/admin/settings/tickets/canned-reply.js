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
import { some } from "lodash"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "./../../../../redux/selectors"
import useUiSettings from "./../../../../helpers/useUiSettings"
import { useGetDepartmentsQuery } from "../../../../redux/slices/firestoreApi"
import { setActiveSettingPanel, setSelectedCrid } from "./../../../../redux/slices/uiSettings"
import CannedRepliesGroup from "./../../../../components/Settings/CannedReplies/CannedRepliesGroup"
import CannedRepliesAddNew from "./../../../../components/Settings/CannedReplies/CannedRepliesAddNew"
import { getLayout, TICKET_SETTINGS_NAMES } from "./../../../../components/Settings/InnerLayoutTickets"
import CannedRepliesOverview from "./../../../../components/Settings/CannedReplies/CannedRepliesOverview"
import { ListItem, ListTitle, SettingsContainer, SettingsContent, SettingsHeader, SettingsList } from "./../../../../components/Settings/SettingsPanel"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import QuickreplyIcon from "@mui/icons-material/Quickreply"
import InfoIcon from "@mui/icons-material/Info"

/*****************************************************************
 * DUMMY DATA                                                    *
 *****************************************************************/

// const CANNED_REPLIES = [
// 	{
// 		id: 1,
// 		departmentId: "df31",
// 		departmentName: "Sales",
// 		description: "dfds",
// 		counter: 5, // number of times which this cannedreply used
// 		content: "###hello3",
// 		createdAt: "2021-09-10",
// 		updatedAt: "2021-09-12",
// 		createdBy: { username: "brian" },
// 		updatedBy: { username: "caoanh" },
// 		history: [
// 			{
// 				description: "dfds",
// 				content: "###hello1",
// 				updatedAt: "2021-09-10",
// 				updatedBy: { username: "caoanh" },
// 			},
// 			{
// 				description: "dfds",
// 				content: "###hello2",
// 				updatedAt: "2021-09-10",
// 				updatedBy: { username: "caoanh" },
// 			},
// 		]
// 	},
// 	{
// 		id: 2,
// 		departmentId: "4564e",
// 		departmentName: "Accounts",
// 		description: "dfds sds sd sd s",
// 		counter: 1,
// 		content: `# how are you today?dfddfdf

// - [ ] this is an item
// - [ ] next item
// - [ ] third item

// \
// `,
// 		createdAt: "2021-09-10",
// 		updatedAt: "2021-09-12",
// 		createdBy: { username: "brian" },
// 		updatedBy: { username: "caoanh" },
// 		history: [
// 			{
// 				description: "dfds",
// 				content: "### World 1",
// 				updatedAt: "2021-09-10",
// 				updatedBy: { username: "caoanh" },
// 			},
// 			{
// 				description: "dfds",
// 				content: "### World 2",
// 				updatedAt: "2021-09-10",
// 				updatedBy: { username: "caoanh" },
// 			},
// 		]
// 	},
// 	{
// 		id: 3,
// 		departmentId: "3243s",
// 		departmentName: "Technical",
// 		description: "dfds sds sd sd s",
// 		counter: 1,
// 		content: "### World 3",
// 		createdAt: "2021-09-10",
// 		updatedAt: "2021-09-12",
// 		createdBy: { username: "brian" },
// 		updatedBy: { username: "demo" },
// 		history: [
// 			{
// 				description: "dfds",
// 				content: "### World 1",
// 				updatedAt: "2021-09-10",
// 				updatedBy: { username: "caoanh" },
// 			},
// 			{
// 				description: "dfds",
// 				content: "### World 2",
// 				updatedAt: "2021-09-10",
// 				updatedBy: { username: "caoanh" },
// 			},
// 		]
// 	},
// 	{
// 		id: 4,
// 		counter: 1,
// 		departmentId: "General",
// 		description: "dfds heneral sds sd sd s",
// 		content: "### Wor General Group hehe ld 3",
// 		createdAt: "2021-09-10",
// 		updatedAt: "2021-09-12",
// 		createdBy: { username: "brian" },
// 		updatedBy: { username: "caoanh" },
// 	},
// 	{
// 		id: 5,
// 		counter: 1,
// 		departmentId: "General",
// 		description: "dfds heneral sds sd sd s",
// 		content: "### Wor General Group hehe ld 3",
// 		createdAt: "2021-09-10",
// 		updatedAt: "2021-09-12",
// 		createdBy: { username: "brian" },
// 		updatedBy: { username: "caoanh" },
// 	}
// ]

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const CANNED_REPLY_PAGES = {
	OVERVIEW: "Overview",
	GENERAL_GROUP: "General",
	ADD_NEW_CANNED_REPLY: "Add new canned-reply",
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketSettingsCannedReply() {

	useUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.CANNED_REPLY,
		activePanel: CANNED_REPLY_PAGES.OVERVIEW,
		background: {
			height: "132px",
			backgroundImage: ""
		}
	})

	const dispatch = useDispatch()
	const { data: departments, isLoading } = useGetDepartmentsQuery(undefined)
	const { activeSettingPanel } = useSelector(getUiSettings)	// used to keep selected Group (aka department)
	const [showContent, setShowContent] = useState(false)

	const hasSelectedGroup =
		(isLoading)
			? false
			: some(departments, { department: activeSettingPanel })

	console.log("why? TicketSettingsCannedReply")

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>Canned Replies</Typography>
				<Button
					variant="contained" color="primary" size="small" startIcon={<AddIcon />}
					onClick={() => {
						dispatch(setActiveSettingPanel(CANNED_REPLY_PAGES.ADD_NEW_CANNED_REPLY))
						setShowContent(true)
					}}
				>
					Add New
				</Button>
			</SettingsHeader>

			<SettingsContainer>

				<SettingsList showContent={showContent}>

					<ListItem
						selected={activeSettingPanel === CANNED_REPLY_PAGES.OVERVIEW}
						icon={<InfoIcon fontSize="small" />}
						onClick={() => {
							dispatch(setActiveSettingPanel(CANNED_REPLY_PAGES.OVERVIEW))
							setShowContent(true)
						}}
					>
						{CANNED_REPLY_PAGES.OVERVIEW}
					</ListItem>

					<ListTitle>Available groups</ListTitle>

					{isLoading
						? <div>Loading...</div>
						: departments.map((item) => (
							<ListItem
								key={item.did}
								selected={activeSettingPanel === item.department}
								icon={<QuickreplyIcon fontSize="small" />}
								onClick={() => {
									reduxBatch(() => {
										dispatch(setActiveSettingPanel(item.department))
										dispatch(setSelectedCrid(""))
									})
									setShowContent(true)
								}}
							>
								{item.department}
								<Typography variant="caption" sx={{ display: "block", mt: -1 }}>{item.description}</Typography>
							</ListItem>
						))}

				</SettingsList>

				<SettingsContent showContent={showContent}>

					{(activeSettingPanel === CANNED_REPLY_PAGES.OVERVIEW)
						&& <CannedRepliesOverview backBtnClick={setShowContent} />}

					{(activeSettingPanel === CANNED_REPLY_PAGES.ADD_NEW_CANNED_REPLY)
						&& <CannedRepliesAddNew backBtnClick={setShowContent} />}

					{(activeSettingPanel === CANNED_REPLY_PAGES.GENERAL_GROUP || hasSelectedGroup)
						&& <CannedRepliesGroup backBtnClick={setShowContent} />}

				</SettingsContent>

			</SettingsContainer>
		</>
	)
}

TicketSettingsCannedReply.getLayout = getLayout

export default TicketSettingsCannedReply