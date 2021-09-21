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


import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Button, Container, Grid, TextField } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import MembersList from "../MembersList"
import SettingsSwitch from "../../common/SettingsSwitch"
import { SettingsContent, SettingsContentActionBar, SettingsContentHeader } from "../../common/SettingsPanel"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesAddNew = ({ dataCannedReply, onClick }) => (
	<SettingsContent>
		<SettingsContentHeader>
			Add new department
		</SettingsContentHeader>

		<Container sx={{ pt: { xs: 3, sm: 2 } }}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<TextField
						label="Name of the department"
						placeholder="eg. Sales, Accounting..."
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<SettingsSwitch
						title="All members"
						state={false}
						setState={() => { }}
						stateDescription={["Only selected members", "All members"]}
						description="Allow access to the department to all members, or exclusively to a specified group of members."
					/>
				</Grid>

				<Grid item xs={12}>
					<SettingsSwitch
						title="Public"
						state={true}
						setState={() => { }}
						stateDescription={["For internal use only", "Available for all users"]}
						description="If the department is public, it allows users to select this department when creating the ticket, otherwise only members can reassign to this department."
					/>
				</Grid>

				<Grid item xs={12}>
					<MembersList
						dataSource={[]}
						addMemberCallback={() => { }}
					/>
				</Grid>
			</Grid>
		</Container>

		<SettingsContentActionBar>
			<Button variant="outlined">Cancel</Button>
			<Button variant="contained" color="primary">Add</Button>
		</SettingsContentActionBar>

	</SettingsContent>
)

CannedRepliesAddNew.propTypes = {
	dataCannedReply: PropTypes.array,
	onClick: PropTypes.func,
}

export default CannedRepliesAddNew