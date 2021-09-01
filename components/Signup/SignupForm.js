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
	Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography, makeStyles
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { SignInLink } from "../common"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "400px"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	higherPanel: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(0, 0, 4)
	},
	form: {

	},
	hideAtBigScreen: {
		[theme.breakpoints.up("md")]: { display: "none" },
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const SignupForm = () => {
	const classes = useStyles()
	return (
		<Paper className={classes.root} elevation={0}>


			<div className={classes.higherPanel}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h1">
					Sign up
				</Typography>
			</div>

			<form className={classes.form} noValidate>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete="name" name="name" variant="outlined" required
							fullWidth id="name" label="Name" autoFocus margin="dense"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined" required fullWidth id="userName"
							label="Username" name="username" autoComplete="username" margin="dense"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined" required fullWidth id="email" label="Email Address" name="email"
							autoComplete="email" margin="dense"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined" required fullWidth name="password"
							label="Password" type="password" id="password"
							autoComplete="current-password" margin="dense"
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Checkbox value="allowExtraEmails" color="primary" />}
							label="I want to receive inspiration, marketing promotions and updates via email."
						/>
					</Grid>
				</Grid>

				<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
					Create Account
				</Button>

				<Grid container justifyContent="flex-end" className={classes.hideAtBigScreen}>
					<Grid item>

						<SignInLink />

					</Grid>
				</Grid>

			</form>
		</Paper>
	)
}

export default SignupForm