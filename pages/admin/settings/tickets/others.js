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

import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Chip, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import PageLabels from "@components/Settings/Tickets/Labels"
import useUiSettings from "@helpers/useUiSettings"
import { STATUS_FILTER } from "@helpers/constants"
import { TicketStatus } from "@components/Ticket/AdminTicketListItem"
import { setActiveSettingPanel } from "@redux/slices/uiSettings"

import {
	getLayout,
	TICKET_SETTINGS_NAMES
} from "@components/Settings/InnerLayoutTickets"

import {
	ListItem,
	ListTitle,
	ContentHelperText,
	SettingsContainer,
	SettingsContent,
	SettingsContentDetails,
	SettingsContentHeader,
	SettingsContentHelper,
	SettingsContentHelperLearnMore,
	SettingsHeader,
	SettingsList
} from "@components/common/Settings"

//ASSETS
import LabelIcon from "@mui/icons-material/Label"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const OTHERS_PAGES = {
	LABELS: { name: "Labels", icon: <LabelIcon fontSize="small" /> },
	STATUS: { name: "Ticket status", icon: <DoneAllIcon fontSize="small" /> },
	PRIORITIES: { name: "Priorities", icon: <PriorityHighIcon fontSize="small" /> },
}

const PagePriorities = ({ backBtnClick }) => {
	return (
		<>
			<SettingsContentHeader
				backBtnOnClick={() => backBtnClick(false)}
			>
				Priorities settings
			</SettingsContentHeader>

			<SettingsContentHelper>

				<ContentHelperText>
					<Typography paragraph>
						Prodesk only support 3 default levels of priotity:&nbsp;
					</Typography>

					<div style={{ paddingBottom: "16px" }}>
						<Chip
							label="Low"
							size="small"
						/>
						&nbsp;
						<Chip
							label="Normal"
							size="small"
							color="primary"
						/>
						&nbsp;and&nbsp;
						<Chip
							label="High"
							size="small"
							color="warning"
						/>
					</div>

					<Typography paragraph>
						There is no customization for this setting. <SettingsContentHelperLearnMore target="/docs" />
					</Typography>

				</ContentHelperText>

			</SettingsContentHelper>


			<SettingsContentDetails>
				{/* No content */}
			</SettingsContentDetails>
		</>
	)
}
PagePriorities.propTypes = { backBtnClick: PropTypes.func }

const PageStatuses = ({ backBtnClick }) => {
	return (
		<>
			<SettingsContentHeader
				backBtnOnClick={() => backBtnClick(false)}
			>
				Ticket status
			</SettingsContentHeader>

			<SettingsContentHelper>

				<ContentHelperText>

					<Typography paragraph>
						Prodesk only support 4 default ticket statuses:
					</Typography>

					<div style={{ paddingTop: "16px", paddingBottom: "16px" }}>
						<div>
							1. {<TicketStatus status={STATUS_FILTER.OPEN} />} newly created ticket
						</div>
						<div>
							2. {<TicketStatus status={STATUS_FILTER.PENDING} />} ticket is waiting reply from supporter
						</div>
						<div>
							3. {<TicketStatus status={STATUS_FILTER.REPLIED} />} ticket is replied, may be waiting for responding from customer
						</div>
						<div>
							4. {<TicketStatus status={STATUS_FILTER.CLOSED} />} solved ticket
						</div>
					</div>

					<Typography paragraph>
						There is no customization for this setting. <SettingsContentHelperLearnMore target="/docs" />
					</Typography>

				</ContentHelperText>

			</SettingsContentHelper>


			<SettingsContentDetails>
				{/* No content */}
			</SettingsContentDetails>
		</>
	)
}
PageStatuses.propTypes = { backBtnClick: PropTypes.func }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketSettingsOthers() {

	useUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.OTHERS,
		activePanel: OTHERS_PAGES.LABELS.name,
		background: {
			backgroundImage: ""
		}
	})

	const dispatch = useDispatch()
	const [showContent, setShowContent] = useState(false)
	const activeSettingPanel = useSelector(s => s.uiSettingsState.activeSettingPanel)

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>Others settings</Typography>
			</SettingsHeader>

			<SettingsContainer>

				<SettingsList showContent={showContent} sx={{ pb: 3 }}>

					<ListTitle>Other settings</ListTitle>

					{Object.entries(OTHERS_PAGES).map((tab) => (
						<ListItem
							key={tab[1].name}
							selected={activeSettingPanel === tab[1].name}
							icon={tab[1].icon}
							onClick={() => {
								dispatch(setActiveSettingPanel(tab[1].name))
								setShowContent(true)
							}}
						>
							{tab[1].name}
						</ListItem>
					))}

				</SettingsList>


				<SettingsContent showContent={showContent}>

					{(activeSettingPanel === OTHERS_PAGES.LABELS.name)
						&& <PageLabels backBtnClick={setShowContent} />}

					{(activeSettingPanel === OTHERS_PAGES.STATUS.name)
						&& <PageStatuses backBtnClick={setShowContent} />}

					{(activeSettingPanel === OTHERS_PAGES.PRIORITIES.name)
						&& <PagePriorities backBtnClick={setShowContent} />}

				</SettingsContent>
			</SettingsContainer>
		</>
	)
}

TicketSettingsOthers.getLayout = getLayout

export default TicketSettingsOthers