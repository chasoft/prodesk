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

import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Chip, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "../../../../redux/selectors"
import useUiSettings from "../../../../helpers/useUiSettings"
import { setActiveSettingPanel } from "../../../../redux/slices/uiSettings"
import { getLayout, TICKET_SETTINGS_NAMES } from "../../../../components/Settings/InnerLayoutTickets"
import { ListItem, ListTitle, SettingsContainer, SettingsContent, SettingsContentDetails, SettingsContentHeader, SettingsContentHelper, SettingsContentHelperLearnMore, SettingsContentHelperText, SettingsHeader, SettingsList } from "../../../../components/Settings/SettingsPanel"

//ASSETS
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import LabelIcon from "@mui/icons-material/Label"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import PageLabels from "../../../../components/Settings/Tickets/Labels"

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

				<SettingsContentHelperText>
					<p>Prodesk only support 3 default levels of priotity:&nbsp;</p>
					<div>
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
					<span>There is no customization for this setting. <SettingsContentHelperLearnMore target="/docs" /></span>

				</SettingsContentHelperText>

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

				<SettingsContentHelperText>
					<p>Prodesk only support 4 default ticket statuses:</p>
					<p>1. <b>Open</b>: newly created ticket</p>
					<p>2. <b>Pending</b>: ticket is waiting reply from supporter</p>
					<p>3. <b>Replied</b>: ticket is replied, many be waiting for responding from customer</p>
					<p>4. <b>Closed</b>: solved ticket</p>
					<span>There is no customization for this setting. <SettingsContentHelperLearnMore target="/docs" /></span>

				</SettingsContentHelperText>

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
			height: "132px",
			backgroundImage: ""
		}
	})

	const dispatch = useDispatch()
	const [showContent, setShowContent] = useState(false)
	const { activeSettingPanel } = useSelector(getUiSettings)

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>Others settings</Typography>
			</SettingsHeader>

			<SettingsContainer>

				<SettingsList showContent={showContent}>

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