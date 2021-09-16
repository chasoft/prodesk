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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { FormControlLabel, makeStyles, Switch, Typography } from "@material-ui/core"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
	},
	description: {
		color: theme.palette.grey[600],
		// padding: theme.spacing(2),
		fontSize: "0.75rem"
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const SettingsSwitch = ({ title, state, setState, stateDescription, description }) => {
	const classes = useStyles()
	return (
		<>
			<Typography variant="caption" style={{ display: "block" }}>{title}</Typography>
			<FormControlLabel
				control={
					<Switch
						checked={state}
						onChange={() => setState(p => !p)}
						name="checkedB"
						color="primary"
					/>
				}
				label={stateDescription[state ? 1 : 0]}
			/>
			<Typography className={classes.description}>{description}</Typography>
		</>
	)
}
SettingsSwitch.propTypes = {
	title: PropTypes.string,
	state: PropTypes.bool,
	setState: PropTypes.bool,
	stateDescription: PropTypes.array,
	description: PropTypes.string
}

export default SettingsSwitch