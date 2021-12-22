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
import { Box } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

import {
	ContentGroup,
	ContentRow,
	ContentDescription,
} from "@components/common/Settings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


export default function GeneralAppSettings() {

	return (
		<ContentGroup title="Site Identity">

			<ContentDescription>
				Change the name, title, icon for your site here
			</ContentDescription>

			<ContentRow
				title="Site Info"
				defaultContent={
					<Box>
						Default state
					</Box>
				}
				editModeContent={
					<Box>
						Edit state
					</Box>
				}
				handleSave={() => { }}
				handleCancel={() => { }}
			/>

			<ContentRow
				title="Login methods"
				defaultContent={
					<Box>
						Active login methods
					</Box>
				}
				editModeContent={
					<Box>
						login via Email, Google Account, Github Account, Twitter account
					</Box>
				}
				handleSave={() => { }}
				handleCancel={() => { }}
			/>
		</ContentGroup >
	)
}