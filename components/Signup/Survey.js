/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React from "react"
import {
	Button, Paper, Typography, makeStyles, RadioGroup, FormControlLabel, Radio
} from "@material-ui/core"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
	options: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		"& > *": {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const AnOption = () => {
	return (
		<RadioGroup aria-label="gender" name="gender1" value={0} onChange={() => { }}>
			<FormControlLabel value="female" control={<Radio />} />
		</RadioGroup>
	)
}

const Survey = () => {
	const classes = useStyles()
	return (
		<Paper className={classes.root} elevation={0}>

			<Typography variant="h1">What brings you to ProDesk</Typography>
			<Typography variant="body1">Select the options that best describe you. Don&apos;t worry, you can explore other options later.</Typography>

			<div className={classes.options}>
				<Paper><AnOption /></Paper>
				<Paper><AnOption /></Paper>
				<Paper><AnOption /></Paper>
			</div>

			<Button variant="contained" color="primary">
				Finish
			</Button>


		</Paper>
	)
}

export default Survey