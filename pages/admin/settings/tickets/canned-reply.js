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

import React, { useState, useMemo } from "react"

// MATERIAL-UI
import { Button, Typography } from "@mui/material"

//THIRD-PARTY
import { some, filter } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "./../../../../redux/selectors"
import useUiSettings from "./../../../../helpers/useUiSettings"
import { setActiveSettingPanel } from "./../../../../redux/slices/uiSettings"
import CannedRepliesAddNew from "./../../../../components/Settings/CannedReplies/CannedRepliesAddNew"
import CannedRepliesGroup from "./../../../../components/Settings/CannedReplies/CannedRepliesGroup"
import CannedRepliesOverview from "./../../../../components/Settings/CannedReplies/CannedRepliesOverview"
import { getLayout, TICKET_SETTINGS_NAMES } from "./../../../../components/Settings/InnerLayoutTickets"
import { ListItem, ListTitle, SettingsContainer, SettingsContent, SettingsHeader, SettingsList } from "./../../../../components/Settings/SettingsPanel"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import QuickreplyIcon from "@mui/icons-material/Quickreply"
import InfoIcon from "@mui/icons-material/Info"

/*****************************************************************
 * DUMMY DATA                                                    *
 *****************************************************************/

const DUMMY_DEPARTMENTS = [
	{
		id: "General",
		department: "General",
		description: "Balconey",
		availableForAll: false,
		isPublic: false,
	},
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
		departmentId: "df31",
		departmentName: "Sales",
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
		departmentId: "4564e",
		departmentName: "Accounts",
		description: "dfds sds sd sd s",
		counter: 1,
		content: `# how are you today?dfddfdf

- [ ] this is an item
- [ ] next item
- [ ] third item

\
`,
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
		departmentId: "3243s",
		departmentName: "Technical",
		description: "dfds sds sd sd s",
		counter: 1,
		content: "### World 3",
		createdAt: "2021-09-10",
		updatedAt: "2021-09-12",
		createdBy: { username: "brian" },
		updatedBy: { username: "demo" },
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
		id: 4,
		counter: 1,
		departmentId: "General",
		description: "dfds heneral sds sd sd s",
		content: "### Wor General Group hehe ld 3",
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
		id: 5,
		counter: 1,
		departmentId: "General",
		description: "dfds heneral sds sd sd s",
		content: "### Wor General Group hehe ld 3",
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

/* this is for DEMO only, working version will query a list of cannedreply based on provided departmentId */
const getCannedRepliesByDepartmentId = (id) => filter(CANNED_REPLIES, { departmentId: id })

const getGroupInfoByDepartmentId = (id) => DUMMY_DEPARTMENTS.find(item => item.id === id)


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
	const { activeSettingPanel } = useSelector(getUiSettings)
	const [showContent, setShowContent] = useState(false)

	//Whether a group is selected, then show CannedReplyDetails
	const aGroupSelected = useMemo(() =>
		some(CANNED_REPLY_PAGES, (i) => i === activeSettingPanel), [activeSettingPanel]
	)

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

				<SettingsList sx={{ display: { xs: showContent ? "none" : "initial", sm: "initial", flexGrow: showContent ? 0 : 1 } }}>

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

					{DUMMY_DEPARTMENTS.map((item) => (
						<ListItem
							key={item.id}
							selected={activeSettingPanel === item.id}
							icon={<QuickreplyIcon fontSize="small" />}
							onClick={() => {
								dispatch(setActiveSettingPanel(item.id))
								setShowContent(true)
							}}
						>
							{item.department}
							<Typography variant="caption" sx={{ display: "block", mt: -1 }}>{item.description}</Typography>
						</ListItem>
					))}

				</SettingsList>

				<SettingsContent sx={{ display: { xs: showContent ? "initial" : "none", sm: "initial", flexGrow: showContent ? 1 : 0 } }}>

					{(activeSettingPanel === CANNED_REPLY_PAGES.OVERVIEW)
						&& <CannedRepliesOverview backBtnClick={setShowContent} />}

					{(activeSettingPanel === CANNED_REPLY_PAGES.ADD_NEW_CANNED_REPLY)
						&& <CannedRepliesAddNew backBtnClick={setShowContent} />}

					{(activeSettingPanel === CANNED_REPLY_PAGES.GENERAL_GROUP || aGroupSelected)
						&& <CannedRepliesGroup
							groupInfo={getGroupInfoByDepartmentId(activeSettingPanel)}
							cannedReplies={getCannedRepliesByDepartmentId(activeSettingPanel)}
							backBtnClick={setShowContent}
						/>}

				</SettingsContent>

			</SettingsContainer>
		</>
	)
}

TicketSettingsCannedReply.getLayout = getLayout

export default TicketSettingsCannedReply