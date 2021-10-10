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

import React from "react"

// MATERIAL-UI
import { Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { getLayout, TICKET_SETTINGS_NAMES } from "./../../../../components/Settings/InnerLayoutTickets"
import useUiSettings from "./../../../../helpers/useUiSettings"
import { SettingsContainer, SettingsContent, SettingsContentDetails, SettingsContentHeader, SettingsContentHelper, SettingsContentHelperLearnMore, SettingsContentHelperText, SettingsHeader } from "./../../../../components/Settings/SettingsPanel"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketSettings() {

	useUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.GENERAL,
		background: {
			height: "132px",
			backgroundImage: ""
		}
	})

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>Ticket Settings</Typography>
			</SettingsHeader>

			<SettingsContainer>
				<SettingsContent>

					<SettingsContentHeader hasBackBtn={false}>
						Ticket
					</SettingsContentHeader>

					<SettingsContentHelper>

						<SettingsContentHelperText>
							Department Overview Department Overview Department Overview Department Overview Department Overview
							Department Overview Department Overview Department Overview Department
							<SettingsContentHelperLearnMore target="/admin" />
						</SettingsContentHelperText>


					</SettingsContentHelper>

					<SettingsContentDetails>

						<Typography>hello world</Typography>
						<Typography>hello world</Typography>
						<Typography>hello world</Typography>

					</SettingsContentDetails>


				</SettingsContent>
			</SettingsContainer>
		</>
	)
}

TicketSettings.getLayout = getLayout
export default TicketSettings