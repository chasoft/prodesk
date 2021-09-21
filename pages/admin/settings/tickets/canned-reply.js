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
import { Button, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "../../../../redux/selectors"
import updateUiSettings from "../../../../helpers/updateUiSettings"
import { setActiveSettingPanel } from "../../../../redux/slices/uiSettings"
import CannedRepliesAddNew from "../../../../components/Settings/CannedReplies/CannedRepliesAddNew"
import CannedRepliesDetails from "../../../../components/Settings/CannedReplies/CannedRepliesDetails"
import CannedRepliesOverview from "../../../../components/Settings/CannedReplies/CannedRepliesOverview"
import { getLayout, TICKET_SETTINGS_NAMES } from "../../../../components/Settings/InnerLayoutTickets"
import { ListItem, ListTitle, SettingsContainer, SettingsHeader, SettingsList } from "../../../../components/common/SettingsPanel"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import QuickreplyIcon from "@mui/icons-material/Quickreply"
import InfoIcon from "@mui/icons-material/Info"

/*****************************************************************
 * DUMMY DATA                                                    *
 *****************************************************************/

const DUMMY_DEPARTMENTS = [
	{
		id: "df31",
		department: "Sales",
		description: "Sales Department",
		availableForAll: false,
		isPublic: false,
	},
	{
		id: "4564e",
		department: "Accounts",
		description: "Accounts Department",
		availableForAll: true,
		isPublic: true,
	},
	{
		id: "324ed",
		department: "Complain",
		description: "Take care our users",
		availableForAll: false,
		isPublic: true,
	},
	{
		id: "3243s",
		department: "Technical",
		description: "Let our core value bright",
		availableForAll: true,
		isPublic: false,
	},
]


const CANNED_REPLIES = [
	{
		id: 1,
		//departmentId is the 
		departmentId: "Sales",
		departmentName: "Sales"  
		description: "dfds",
		counter: 5, // number of times which this cannedreply used
		content: "###hello3",
		createdAt: "2021-09-10",
		updatedAt: "2021-09-12",
		createdBy: { username: "brian" },
		updatedBy: { username: "caoanh" },
		history: [
			{
				description: "dfds",
				content: "###hello1",
				updatedAt: "2021-09-10",
				updatedBy: { username: "caoanh" },
			},
			{
				description: "dfds",
				content: "###hello2",
				updatedAt: "2021-09-10",
				updatedBy: { username: "caoanh" },
			},
		]
	},
	{
		id: 2,
		group: "Sales",
		description: "dfds sds sd sd s",
		counter: 1,
		content: "### World 3",
		createdAt: "2021-09-10",
		updatedAt: "2021-09-12",
		createdBy: { username: "brian" },
		updatedBy: { username: "caoanh" },
		history: [
			{
				description: "dfds",
				content: "### World 1",
				updatedAt: "2021-09-10",
				updatedBy: { username: "caoanh" },
			},
			{
				description: "dfds",
				content: "### World 2",
				updatedAt: "2021-09-10",
				updatedBy: { username: "caoanh" },
			},
		]
	},
	{
		id: 3,
		group: "",
		description: "dfds sds sd sd s",
		counter: 1,
		content: "### World 3",
		createdAt: "2021-09-10",
		updatedAt: "2021-09-12",
		createdBy: { username: "brian" },
		updatedBy: { username: "caoanh" },
		history: [
			{
				description: "dfds",
				content: "### World 1",
				updatedAt: "2021-09-10",
				updatedBy: { username: "caoanh" },
			},
			{
				description: "dfds",
				content: "### World 2",
				updatedAt: "2021-09-10",
				updatedBy: { username: "caoanh" },
			},
		]
	}
]

const getDepartmentById = (id) => {
	const index = Object.entries(CANNED_REPLIES).map(item => item[1].id).indexOf(id)
	if (index !== -1)
		return CANNED_REPLIES[index]
	return []
}

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/
export const CANNED_REPLY_PAGES = {
	OVERVIEW: "",
	ADD_NEW_CANNED_REPLY: "Add new canned-reply",
	GENERAL_GROUP: "General"
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketSettingsCannedReply() {

	const dispatch = useDispatch()
	const { activeSettingPanel } = useSelector(getUiSettings)

	updateUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.CANNED_REPLY,
		activePanel: CANNED_REPLY_PAGES.OVERVIEW,
		background: {
			height: "132px",
			backgroundImage: ""
		}
	})

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>Canned Replies</Typography>
				<Button
					variant="contained" color="primary" size="small" startIcon={<AddIcon />}
					onClick={() => { dispatch(setActiveSettingPanel(CANNED_REPLY_PAGES.ADD_NEW_CANNED_REPLY)) }}
				>
					Add canned reply
				</Button>
			</SettingsHeader>

			<SettingsContainer>

				<SettingsList>

					<ListItem
						selected={activeSettingPanel === CANNED_REPLY_PAGES.OVERVIEW}
						icon={<InfoIcon fontSize="small" />}
						onClick={() => { dispatch(setActiveSettingPanel(CANNED_REPLY_PAGES.OVERVIEW)) }}
					>
						Overview
					</ListItem>

					<ListTitle>Available groups</ListTitle>

					<ListItem
						selected={activeSettingPanel === (CANNED_REPLY_PAGES.GENERAL_GROUP)}
						icon={<QuickreplyIcon fontSize="small" />}
						onClick={() => { dispatch(setActiveSettingPanel(CANNED_REPLY_PAGES.GENERAL_GROUP)) }}
					>
						{CANNED_REPLY_PAGES.GENERAL_GROUP}
					</ListItem>

					{CANNED_REPLIES.map((item) => (
						<ListItem
							key={item.id}
							selected={activeSettingPanel === item.id}
							icon={<QuickreplyIcon fontSize="small" />}
							onClick={() => { dispatch(setActiveSettingPanel(item.id)) }}
						>
							{item.department}
						</ListItem>
					))}

				</SettingsList>

				{(activeSettingPanel === CANNED_REPLY_PAGES.OVERVIEW)
					&& <CannedRepliesDetails dataCannedReply={getDepartmentById(activeSettingPanel)} />}

				{
					(activeSettingPanel === CANNED_REPLY_PAGES.OVERVIEW)
						? <CannedRepliesOverview
							dataCannedReplies={CANNED_REPLIES}
							callback={(id) => dispatch(setActiveSettingPanel(id))}
						/>
						: (activeSettingPanel === CANNED_REPLY_PAGES.ADD_NEW_CANNED_REPLY)
							? <CannedRepliesAddNew />
							: <CannedRepliesDetails dataCannedReply={getDepartmentById(activeSettingPanel)} />
				}

			</SettingsContainer>
		</>
	)
}

TicketSettingsCannedReply.getLayout = getLayout

export default TicketSettingsCannedReply