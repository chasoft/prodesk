/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

import React, { useState } from "react"

// MATERIAL-UI
import { Button, CircularProgress, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { LoginLink } from "@components/common"

import { REDIRECT_URL } from "@helpers/constants"
import {
	regEmail,
	regRule
} from "@helpers/regex"

import { setRedirect } from "@redux/slices/redirect"

import {
	useGetAppSettingsQuery,
	useSignUpWithEmailMutation
} from "@redux/slices/firestoreApi"

import {
	RegContainer,
	RegHeader,
	useFlexDirection
} from "@layout/RegLayout"

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
		.min(4, "At least 4 characters")
		.matches(regRule, "lowercase, no spacing, no special characters")
		.required("Username is required"),
	email: yup
		.string("Enter your email")
		.matches(regEmail, "Enter a valid email")
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

function SignupForm() {
	const dispatch = useDispatch()
	const [isProcessing, setIsProcessing] = useState(false)
	const [signUpWithEmail] = useSignUpWithEmailMutation()
	const { enqueueSnackbar } = useSnackbar()
	const { data: AppSettings, isLoading } = useGetAppSettingsQuery()

	useFlexDirection({ payload: "row" })

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
			if (AppSettings?.restrictedUsernames && AppSettings?.restrictedUsernames?.indexOf(values.username.toLowerCase()) !== -1) {
				enqueueSnackbar("Your provided username is restricted", { variant: "error" })
				return
			}

			setIsProcessing(true)

			const res = await signUpWithEmail({
				email: values.email,
				password: values.password,
				name: values.name,
				username: values.username
			})

			if (res?.error) {
				enqueueSnackbar(res.error.data.message, { variant: "error" })
				setIsProcessing(false)
				return
			}

			dispatch(setRedirect(REDIRECT_URL.SIGNUP.CREATE_PROFILE))

			//We don't need to set this variable to false,
			//at this moment, the page is redirecting
			// setIsProcessing(false)
		}
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
							value={formik.values.username.toLowerCase()}
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
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
							variant="outlined"
							required />
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
							required />
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
							required />
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Checkbox
								id="agreement"
								name="agreement"
								checked={formik.values.agreement}
								onChange={formik.handleChange}
								error={new Boolean(formik.errors.agreement)}
								color="primary" />}
							label="I want to receive inspiration, marketing promotions and updates via email." />
					</Grid>
				</Grid>

				<Button
					type="submit" fullWidth variant="contained" color="primary"
					sx={{ mt: 3, mx: 0, mb: 2 }}
					disabled={(!formik.isValid || isLoading || isProcessing)}
				>
					Create Account &nbsp; {isProcessing && <CircularProgress size={14} />}
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