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
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import {
	ContentHelperText,
	SettingsContentHeader,
	SettingsContentHelper,
	SettingsContentHelperLearnMore,
} from "@components/common/Settings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function CannedRepliesOverview({ departmentCreated, backBtnClick }) {
	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				Canned replies overview
			</SettingsContentHeader>

			<SettingsContentHelper>
				<ContentHelperText>
					<Typography paragraph>
						Canned-replies are great to speed up your supporting or prevent repeative actions. They are linked & grouped by departments.
					</Typography>
					<Typography paragraph>
						You can create new canned-replies here or convert any existing replies to canned-replies.
						<SettingsContentHelperLearnMore target="/docs" />
					</Typography>
					{!departmentCreated &&
						<Typography paragraph>
							You can not add any new canned-reply for there is no department created.Click here to go to <Link href="/admin/settings/tickets/department" passHref><Box component="a" href="just-a-placeholder" sx={{ color: "primary.main" }}>department settings</Box></Link>, create at least one department and come back later.
						</Typography>}
				</ContentHelperText>
			</SettingsContentHelper>
		</>
	)
}
CannedRepliesOverview.propTypes = {
	departmentCreated: PropTypes.bool.isRequired,
	backBtnClick: PropTypes.func,
}

export default CannedRepliesOverview