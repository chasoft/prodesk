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

//CORE SYSTEM
import React from "react"

// MATERIAL-UI
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography, makeStyles } from "@material-ui/core"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"

//PROJECT IMPORT
import { ForgotPasswordLink, LoginLink } from "../common"
import { updateFlexDirection } from "./../../layout/RegLayout"

//ASSETS
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { signInWithEmail } from "./../../helpers/userAuthentication"
import { useDispatch } from "react-redux"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		justifyContent: "center",
		maxWidth: "400px",
		marginBottom: theme.spacing(4)
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
	submit: {
		margin: theme.spacing(0, 0, 2),
	},
}))


const validationSchema = yup.object({
	username: yup
		.string("Enter your username or Email address")
		.required("Username or Email address is required"),
	password: yup
		.string("Enter your password")
		.required("Password is required")
})

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const LoginForm = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			username: "",
			password: ""
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			signInWithEmail({
				username: values.username,
				password: values.password
			}, { enqueueSnackbar, dispatch })
		},
	})

	updateFlexDirection({ payload: "row" })

	return (
		<Paper className={classes.root} elevation={0}>

			<div className={classes.higherPanel}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h1">
					Login
				</Typography>
			</div>

			<form className={classes.form} onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							id="username"
							name="username"
							label="Username or Email address"
							variant="outlined"
							autoComplete="username"
							value={formik.values.username}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.username && Boolean(formik.errors.username)}
							helperText={formik.touched.username && formik.errors.username}
							fullWidth
							required
							autoFocus
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="password"
							name="password"
							label="Password"
							type="password"
							variant="outlined"
							autoComplete="current-password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={!(formik.isValid && formik.dirty)}
						>
							Login
						</Button>
					</Grid>
				</Grid>
			</form>
			<Grid container>
				<Grid item xs>
					<ForgotPasswordLink />
				</Grid>
				<Grid item>
					<LoginLink />
				</Grid>
			</Grid>

		</Paper>
	)
}

export default LoginForm