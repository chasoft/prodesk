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
import { Grid, TextField, Typography } from "@mui/material"

//PROJECT IMPORT
import MembersList from "./../MembersList"
import SettingsSwitch from "./../../common/SettingsSwitch"
import { SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//TODO: Auto update data onBlur

const DepartmentsDetails = ({ dataDepartment = [], backBtnClick }) => {
	if (dataDepartment.length === 0) {
		return (
			<>
				<Typography>There is something happen! Selected department not found!</Typography>
			</>
		)
	}

	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				{dataDepartment.department}
			</SettingsContentHeader>

			<SettingsContentDetails>
				<Grid container spacing={4}>

					<Grid item xs={12}>
						<TextField
							value={dataDepartment.department}
							label="Name of the department"
							placeholder="eg. Sales, Accounting..."
							fullWidth
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							value={dataDepartment.description}
							label="Department description (Optional)"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12}>
						<SettingsSwitch
							title="All members"
							state={dataDepartment.availableForAll}
							setState={() => { }}
							stateDescription={["Only selected members", "All members"]}
							description="Allow access to the department to all members, or exclusively to a specified group of members."
						/>
					</Grid>

					<Grid item xs={12}>
						<SettingsSwitch
							title="Public"
							state={dataDepartment.isPublic}
							setState={() => { }}
							stateDescription={["For internal use only", "Available for all users"]}
							description="If the department is public, it allows users to select this department when creating the ticket, otherwise only members can reassign to this department."
						/>
					</Grid>

					<Grid item xs={12}>
						<MembersList
							dataSource={dataDepartment.members}
							addMemberCallback={() => { }}
						/>
						<div style={{ height: "2rem" }}></div>
					</Grid>
				</Grid>
			</SettingsContentDetails>
		</>
	)
}

DepartmentsDetails.propTypes = {
	dataDepartment: PropTypes.object,
	onClick: PropTypes.func,
	backBtnClick: PropTypes.func,
}

export default DepartmentsDetails