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
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"

// MATERIAL-UI
import {
	Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography, makeStyles, Hidden
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

//THIRD-PARTY
import { useFormik } from "formik"
import * as yup from "yup"

//PROJECT IMPORT
import { LoginLink } from "../common"
import { updateFlexDirection } from "./../../layout/RegLayout"
import { regRule } from "../../helpers/regex"
import { isUsernameAvailable } from "../../helpers/firebase"
import { useSnackbar } from "notistack"
import { signUpViaSocialAccount } from "../../helpers/userAuthentication"
import { getAuth } from "../../redux/selectors"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

//ASSETS


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
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const validationSchema = yup.object({
	name: yup
		.string("Enter your name, you can change later")
		.required("Name is required"),
	username: yup
		.string("Enter your username")
		.min(3, "At least 3 characters")
		.matches(regRule, "lowercase, no spacing, no special characters")
		.required("Username is required"),
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	agreement: yup
		.boolean().isTrue("You must agree with our Terms & services")
})

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const SocialLoginForm = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const router = useRouter()
	const { currentUser } = useSelector(getAuth)

	updateFlexDirection({ payload: "row" })

	const formik = useFormik({
		initialValues: {
			name: currentUser.displayName,
			username: "",
			email: currentUser.email,
			agreement: false
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				if (!(await isUsernameAvailable(values.username))) {
					enqueueSnackbar("Username is existed. Please choose another one!", { variant: "warning" })
					return
				}
				await signUpViaSocialAccount({
					uid: currentUser.uid,
					email: values.email,
					name: values.name,
					username: values.username,
					photoURL: currentUser.photoURL
				}, { enqueueSnackbar, router })
			}
			catch (e) {
				console.log(e.message)
				enqueueSnackbar(e.message, { variant: "error" })
			}
		},
	})

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
			<form className={classes.form} onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							id="name"
							name="name"
							label="Name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							variant="outlined"
							autoFocus
							required
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							id="userName"
							name="username"
							label="Username"
							value={formik.values.username}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.username && Boolean(formik.errors.username)}
							helperText={formik.touched.username && formik.errors.username}
							variant="outlined"
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="email"
							name="email"
							label="Email Address"
							value={formik.values.email}
							variant="outlined"
							disabled
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									id="agreement"
									name="agreement"
									checked={formik.values.agreement}
									onChange={formik.handleChange}
									error={Boolean(formik.errors.agreement)}
									color="primary"
								/>
							}
							label="I want to receive inspiration, marketing promotions and updates via email."
						/>
					</Grid>
				</Grid>

				<Button
					type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
					disabled={!(formik.isValid && formik.dirty)}
				>
					Create Account
				</Button>

				<Hidden mdUp>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<LoginLink />
						</Grid>
					</Grid>
				</Hidden>

			</form>
		</Paper>
	)
}

export default SocialLoginForm