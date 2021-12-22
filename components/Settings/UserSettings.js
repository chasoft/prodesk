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
import { Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

import { getLayout } from "@layout/AdminLayout"

import {
	ContentGroup,
	ContentRow,
	ContentDescription,
	SettingsContainer,
	SettingsContent,
	SettingsHeader
} from "@components/common/Settings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function SampleBlock() {
	return (

		<ContentGroup title="User Settings">
			<ContentDescription>
				Yes please
			</ContentDescription>

			<ContentRow title="Users">
				<Box sx={{
					display: "flex",
					flexDirection: { xs: "column", xss: "row" },
					py: 2
				}}>

					helllooo....

				</Box>
			</ContentRow>

			<ContentRow title="Members">
				<Box sx={{
					display: "flex",
					flexDirection: { xs: "column", xss: "row" },
					py: 2
				}}>

					helllooo....

				</Box>
			</ContentRow>

		</ContentGroup >
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function UserSettings() {
	return (
		<>
			<SettingsHeader>
				<Typography variant="h1" sx={{ mt: 5 }}>
					User Settings
				</Typography>
			</SettingsHeader>

			<SettingsContainer>
				<SettingsContent>

					<SampleBlock />

				</SettingsContent>
			</SettingsContainer>
		</>
	)
}

UserSettings.getLayout = getLayout

export default UserSettings