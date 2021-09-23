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

// MATERIAL-UI
import { Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { LoginLink } from "../common"
import { regRule } from "../../helpers/regex"
import { isUsernameAvailable } from "../../helpers/firebase"
import { signUpWithEmail } from "../../helpers/userAuthentication"
import { RegContainer, RegHeader, updateFlexDirection } from "./../../layout/RegLayout"

//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

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
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Confirm your password"),
	agreement: yup
		.boolean().isTrue("You must agree with our Terms & services")
})

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const SignupForm = () => {
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()

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
			}, { enqueueSnackbar, dispatch })
		},
	})

	return (
		<RegContainer>

			<RegHeader
				icon={<LockOutlinedIcon />}
				title="Sign up"
			/>

			<form onSubmit={formik.handleSubmit}>
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
									error={new Boolean(formik.errors.agreement)}
									color="primary"
								/>
							}
							label="I want to receive inspiration, marketing promotions and updates via email."
						/>
					</Grid>
				</Grid>

				<Button
					type="submit" fullWidth variant="contained" color="primary"
					sx={{ mt: 3, mx: 0, mb: 2 }}
					disabled={!(formik.isValid && formik.dirty)}
				>
					Create Account
				</Button>

				<Grid container justifyContent="flex-end">
					<Grid item sx={{ display: { xs: "initial", lg: "none" } }}>
						<LoginLink />
					</Grid>
				</Grid>

			</form>
		</RegContainer>
	)
}

export default SignupForm