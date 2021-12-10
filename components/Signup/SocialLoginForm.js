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
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField
} from "@mui/material"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useSelector, useDispatch } from "react-redux"

//PROJECT IMPORT
import {
	RegContainer,
	RegHeader,
	useFlexDirection
} from "@layout/RegLayout"

import { LoginLink } from "@components/common"

import { regRule } from "@helpers/regex"
import { REDIRECT_URL } from "@helpers/constants"
import { isUsernameAvailable } from "@redux/slices/firestoreApiBase"

import { getAuth } from "@redux/selectors"
import { setRedirect } from "@redux/slices/redirect"
import { useSignUpViaGoogleMutation } from "@redux/slices/firestoreApi"

//ASSETS
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

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
	agreement: yup
		.boolean().isTrue("You must agree with our Terms & services")
})

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SocialLoginForm() {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)
	const [signUpViaGoogle] = useSignUpViaGoogleMutation()

	useFlexDirection({ payload: "row" })

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
				const res = isUsernameAvailable(values.username)
				if (res.error) {
					enqueueSnackbar("Checking username availability failed", { variant: "warning" })
					return
				}

				if (res.isUsernameAvailable === false) {
					enqueueSnackbar("Username is existed. Please choose another one!", { variant: "warning" })
					return
				}

				await signUpViaGoogle({
					uid: currentUser.uid,
					email: values.email,
					name: values.name,
					username: values.username,
					photoURL: currentUser.photoURL
				})

				//Go to next step -> /signup/create-profile  (to update avatar & location)
				dispatch(setRedirect(REDIRECT_URL.SIGNUP.CREATE_PROFILE))
			}
			catch (e) {
				console.log(e.message)
				enqueueSnackbar(e.message, { variant: "error" })
			}
		},
	})

	return (
		<RegContainer>

			<RegHeader
				icon={<LockOutlinedIcon />}
				title="Sign up" />

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
							required />
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
							required />
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="email"
							name="email"
							label="Email Address"
							value={formik.values.email}
							variant="outlined"
							disabled />
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Checkbox
								id="agreement"
								name="agreement"
								checked={formik.values.agreement}
								onChange={formik.handleChange}
								error={Boolean(formik.errors.agreement)}
								color="primary" />}
							label="I want to receive inspiration, marketing promotions and updates via email." />
					</Grid>
				</Grid>

				<Button
					fullWidth
					type="submit" variant="contained" color="primary"
					sx={{ mt: 3, mx: 0, mb: 2 }}
					disabled={!(formik.isValid && formik.dirty)}
				>
					Create Account
				</Button>

				<Box sx={{ display: { md: "none", xs: "block" } }}>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<LoginLink />
						</Grid>
					</Grid>
				</Box>

			</form>
		</RegContainer>
	)
}

export default SocialLoginForm