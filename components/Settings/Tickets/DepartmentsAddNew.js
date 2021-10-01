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


import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Button, Grid, TextField } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import MembersList from "./../MembersList"
import SettingsSwitch from "./../../common/SettingsSwitch"
import { SettingsContentActionBar, SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"
import { setActiveSettingPanel } from "./../../../redux/slices/uiSettings"
import { DEPARTMENT_PAGES } from "./../../../pages/admin/settings/tickets/department"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DepartmentsAddNew = ({ onClick, backBtnClick }) => {
	const dispatch = useDispatch()
	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				Add new department
			</SettingsContentHeader>

			<SettingsContentDetails>
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
			</SettingsContentDetails>

			<SettingsContentActionBar>
				<Button variant="outlined" onClick={() => { dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.OVERVIEW)) }}>Cancel</Button>
				<Button variant="contained" color="primary" onClick={() => {
					onClick()
					dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.OVERVIEW))
				}}>Add</Button>
			</SettingsContentActionBar>

		</>
	)
}

DepartmentsAddNew.propTypes = {
	onClick: PropTypes.func,
	backBtnClick: PropTypes.func,
}

export default DepartmentsAddNew