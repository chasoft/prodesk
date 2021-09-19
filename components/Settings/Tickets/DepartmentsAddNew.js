/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║      DomainHub - Your Trusted Domain Partner (SaaS Platform)      ║ *
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
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import React from "react"
import PropTypes from "prop-types"

import makeStyles from "@mui/styles/makeStyles"
import { Grid, TextField, Typography } from "@mui/material"

//THIRD-PARTY
import AvatarList from "../../common/AvatarList"
import SettingsSwitch from "../../common/SettingsSwitch"
import MembersList from "../MembersList"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "1rem",
		marginBottom: "1rem",
	},
	item: {
		cursor: "pointer",
		"&:hover": {
			background: theme.palette.action.hover
		},
		padding: theme.spacing(2, 3),
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(2, 2)
		},
	}
}))

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DepartmentsAddNew = ({ dataDepartment, onClick }) => {
	const classes = useStyles()

	return (
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
	)
}

DepartmentsAddNew.propTypes = {
	dataDepartment: PropTypes.array,
	onClick: PropTypes.func,
}

export default DepartmentsAddNew