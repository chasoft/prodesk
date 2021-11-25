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
import { FormControlLabel, Switch, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const SettingsSwitch = ({
	title,
	state,
	setState,
	stateDescription,
	description
}) => {
	return (
		<>
			{title &&
				<Typography variant="caption" style={{ display: "block" }}>
					{title}
				</Typography>}

			<FormControlLabel
				control={
					<Switch
						checked={state}
						onChange={(e) => setState(e.target.checked)}
						name="checkedB"
						color="primary"
					/>
				}
				label={stateDescription[state ? 1 : 0]}
			/>

			{description &&
				<Typography
					sx={{
						color: "grey.600",
						fontSize: "0.75rem"
					}}
				>
					{description}
				</Typography>}
		</>
	)
}
SettingsSwitch.propTypes = {
	title: PropTypes.string,
	state: PropTypes.bool,
	setState: PropTypes.func,
	stateDescription: PropTypes.array,
	description: PropTypes.string
}

export default SettingsSwitch