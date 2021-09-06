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
import { signUpWithEmail } from "../../helpers/userAuthentication"
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
	password: yup
		.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
	password2: yup
		.string("Confirm your password")
		.oneOf([yup.ref("password"), null], "Passwords must match"),
	agreement: yup
		.boolean().isTrue("You must agree with our Terms & services")
})

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const SignupForm = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const router = useRouter()

	updateFlexDirection({ payload: "row" })

	const formik = useFormik({
		initialValues: {
			name: "",
			username: "",
			email: "",
			password: "",
			password2: "",
			agreement: false
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			if (!isUsernameAvailable(values.username)) {
				enqueueSnackbar("Username is existed. Please choose another one!", { variant: "error" })
				return
			}

			signUpWithEmail({
				email: values.email,
				password: values.password,
				name: values.name,
				username: values.username
			}, { router, enqueueSnackbar })
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
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
							variant="outlined"
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="password"
							name="password"
							label="Password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
							variant="outlined"
							type="password"
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="password2"
							name="password2"
							label="Confirm Password"
							value={formik.values.password2}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.password2 && Boolean(formik.errors.password2)}
							helperText={formik.touched.password2 && formik.errors.password2}
							variant="outlined"
							type="password"
							required
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

export default SignupForm