/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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
import { CircularProgressBox } from "@components/common"
import useUiSettings from "@helpers/useUiSettings"
import { useGetDepartmentsQuery } from "@redux/slices/firestoreApi"
import CannedRepliesGroup from "@components/Settings/CannedReplies/CannedRepliesGroup"
import CannedRepliesAddNew from "@components/Settings/CannedReplies/CannedRepliesAddNew"
import CannedRepliesOverview from "@components/Settings/CannedReplies/CannedRepliesOverview"
import { EMPTY } from "@helpers/constants"

import {
	getLayout,
	TICKET_SETTINGS_NAMES
} from "@components/Settings/InnerLayoutTickets"

import {
	setActiveSettingPanel,
	setIsAddNewPanel,
	setSelectedCrid
} from "@redux/slices/uiSettings"

import {
	ListItem,
	ListTitle,
	SettingsContainer,
	SettingsContent,
	SettingsHeader,
	SettingsList
} from "@components/common/Settings"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import InfoIcon from "@mui/icons-material/Info"
import QuickreplyIcon from "@mui/icons-material/Quickreply"

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
			backgroundImage: ""
		}
	})

	const dispatch = useDispatch()
	const [showContent, setShowContent] = useState(false)

	// used to keep selected canned-replies group (aka department)
	const activeSettingPanel = useSelector(s => s.uiSettingsState.activeSettingPanel)
	const isAddNewPanel = useSelector(s => s.uiSettingsState.isAddNewPanel)

	const {
		data: departments = EMPTY.ARRAY,
		isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const hasSelectedGroup =
		(isLoadingDepartments)
			? false
			: some(departments, { did: activeSettingPanel })

	const handleShowCannedRepliesOverview = () => {
		dispatch(setActiveSettingPanel(CANNED_REPLY_PAGES.OVERVIEW))
		setShowContent(true)
	}

	const handleShowCannedRepliesGroup = (department) => {
		reduxBatch(() => {
			dispatch(setSelectedCrid(""))
			dispatch(setActiveSettingPanel(department.did))
			dispatch(setIsAddNewPanel(false))
		})
		setShowContent(true)
	}

	const handleAddNewCannedReply = () => {
		//if there is currently only 1 department,
		//then, just select it automatically
		if (departments.length === 1) {
			reduxBatch(() => {
				dispatch(setIsAddNewPanel(true))
				dispatch(setActiveSettingPanel(departments[0].did))
			})
		} else {
			dispatch(setIsAddNewPanel(true))
		}
		setShowContent(true)
	}

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>
					Canned Replies
				</Typography>
				<Button
					size="small"
					color="primary"
					variant="contained"
					startIcon={<AddIcon />}
					disabled={departments.length === 0}
					onClick={handleAddNewCannedReply}
				>
					Add New
				</Button>
			</SettingsHeader>

			<SettingsContainer>

				<SettingsList showContent={showContent} sx={{ pb: 3 }}>

					<ListItem
						icon={<InfoIcon fontSize="small" />}
						onClick={handleShowCannedRepliesOverview}
						selected={activeSettingPanel === CANNED_REPLY_PAGES.OVERVIEW}
					>
						{CANNED_REPLY_PAGES.OVERVIEW}
					</ListItem>

					<ListTitle>Available groups</ListTitle>

					{isLoadingDepartments
						? <CircularProgressBox minHeight="100px" />
						: departments.map((department) => (
							<ListItem
								key={department.did}
								icon={<QuickreplyIcon fontSize="small" />}
								selected={activeSettingPanel === department.did}
								onClick={() => handleShowCannedRepliesGroup(department)}
							>
								{department.name}
								<Typography variant="caption" sx={{
									display: "block",
									mt: -1
								}}>
									{department.description}
								</Typography>
							</ListItem>
						))}

				</SettingsList>

				<SettingsContent showContent={showContent}>

					{(activeSettingPanel === CANNED_REPLY_PAGES.OVERVIEW && isAddNewPanel === false) &&
						<CannedRepliesOverview
							departmentCreated={departments.length > 0}
							backBtnClick={setShowContent}
						/>}

					{((activeSettingPanel === CANNED_REPLY_PAGES.GENERAL_GROUP || hasSelectedGroup) && isAddNewPanel === false) &&
						<CannedRepliesGroup
							backBtnClick={setShowContent}
						/>}

					{(isAddNewPanel === true) &&
						<CannedRepliesAddNew
							backBtnClick={setShowContent}
						/>}

				</SettingsContent>

			</SettingsContainer>
		</>
	)
}

TicketSettingsCannedReply.getLayout = getLayout

export default TicketSettingsCannedReply