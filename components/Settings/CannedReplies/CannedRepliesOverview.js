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
import PropTypes from "prop-types"

// MATERIAL-UI
// import { Box, Container, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { SettingsContentHeader, SettingsContentHelper, SettingsContentHelperText } from "./../../Settings/SettingsPanel"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesOverview = ({ backBtnClick }) => {
	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				Canned replies overview
			</SettingsContentHeader>

			<SettingsContentHelper>
				<SettingsContentHelperText>
					Canned repliesCanned repliesCanned repliesCanned repliesCanned repliesCanned repliesCanned repliesCanned replies
				</SettingsContentHelperText>
				<SettingsContentHelperText>
					Canned repliesCanned repliesCanned repliesCanned repliesCanned repliesCanned repliesCanned repliesCanned repliesCanned repliesCanned replies
				</SettingsContentHelperText>
			</SettingsContentHelper>
		</>
	)
}
CannedRepliesOverview.propTypes = {
	backBtnClick: PropTypes.func,
}

export default CannedRepliesOverview