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

//CORE SYSTEM
import React, { useState } from "react"

// MATERIAL-UI
import { Box, Button, CircularProgress, IconButton, Checkbox, FormControlLabel, Grid, SvgIcon, TextField } from "@mui/material"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getRedirect } from "./../../redux/selectors"
import { ForgotPasswordLink, SignUpLink } from "./../common"
import { USERGROUP, REDIRECT_URL } from "./../../helpers/constants"
import { useSignInWithEmailMutation, useSignInWithGoogleMutation } from "./../../redux/slices/firestoreApi"
import { RegContainer, RegHeader, useFlexDirection } from "./../../layout/RegLayout"

//ASSETS
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { setRedirect } from "../../redux/slices/redirect"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const validationSchema = yup.object({
	username: yup
		.string("Enter your username or Email address")
		.required("Username or Email address is required"),
	password: yup
		.string("Enter your password")
		.required("Password is required")
})

function GoogleIcon(props) {
	return (
		<SvgIcon {...props}>
			<g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
				<path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
				<path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
				<path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
				<path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
			</g>
		</SvgIcon>
	)
}

function TwitterIcon(props) {
	return (
		<SvgIcon {...props} viewBox="0 0 248 204">
			<g>
				<path fill="#1D9BF0" d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04   C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66   c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64   c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76   c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26   c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z" />
			</g>
		</SvgIcon>
	)
}

function GithubIcon(props) {
	return (
		<SvgIcon {...props} viewBox="0 0 2350 2314.8">
			<g>
				<path fill="#000" d="M1175,0C525.8,0,0,525.8,0,1175c0,552.2,378.9,1010.5,890.1,1139.7c-5.9-14.7-8.8-35.3-8.8-55.8v-199.8H734.4  c-79.3,0-152.8-35.2-185.1-99.9c-38.2-70.5-44.1-179.2-141-246.8c-29.4-23.5-5.9-47,26.4-44.1c61.7,17.6,111.6,58.8,158.6,120.4  c47,61.7,67.6,76.4,155.7,76.4c41.1,0,105.7-2.9,164.5-11.8c32.3-82.3,88.1-155.7,155.7-190.9c-393.6-47-581.6-240.9-581.6-505.3  c0-114.6,49.9-223.3,132.2-317.3c-26.4-91.1-61.7-279.1,11.8-352.5c176.3,0,282,114.6,308.4,143.9c88.1-29.4,185.1-47,284.9-47  c102.8,0,196.8,17.6,284.9,47c26.4-29.4,132.2-143.9,308.4-143.9c70.5,70.5,38.2,261.4,8.8,352.5c82.3,91.1,129.3,202.7,129.3,317.3  c0,264.4-185.1,458.3-575.7,499.4c108.7,55.8,185.1,214.4,185.1,331.9V2256c0,8.8-2.9,17.6-2.9,26.4  C2021,2123.8,2350,1689.1,2350,1175C2350,525.8,1824.2,0,1175,0L1175,0z" />
			</g>
		</SvgIcon>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const LoginForm = () => {
	useFlexDirection({ payload: "row" })
	const [isLoading, setIsLoading] = useState(false)
	//
	const dispatch = useDispatch()
	const { redirectAfterLoginURL } = useSelector(getRedirect)
	//
	const [signInWithEmail] = useSignInWithEmailMutation()
	const [signInWithGoogle] = useSignInWithGoogleMutation()
	const { enqueueSnackbar } = useSnackbar()
	//
	const formik = useFormik({
		initialValues: { username: "", password: "" },
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setIsLoading(true)
			const res = await signInWithEmail({ username: values.username, password: values.password })
			if (res?.error) {
				enqueueSnackbar(res.error.data.message, { variant: "error" })
				setIsLoading(false)
				return
			}
			//redirect after login if necessary
			if (redirectAfterLoginURL === "") {
				dispatch(setRedirect((res.data.group === USERGROUP.USER)
					? REDIRECT_URL.CLIENT
					: REDIRECT_URL.ADMIN)
				)
			}
			setIsLoading(false)
		},
	})

	return (
		<RegContainer>

			<RegHeader
				icon={<LockOutlinedIcon />}
				title="Login"
			/>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				mb: 2
			}}>

				<Button
					variant="outlined"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexGrow: 1
					}}
					onClick={() => { signInWithGoogle() }}
				>
					<GoogleIcon sx={{ mr: 1 }} /><span>Sign in with Google</span>
				</Button>

				<IconButton sx={{ ml: 1 }}>
					<GithubIcon />
				</IconButton>

				<IconButton sx={{ ml: 1 }}>
					<TwitterIcon />
				</IconButton>

			</Box>

			<Box
				component="hr"
				sx={{
					padding: 0,
					overflow: "visible",
					border: "none",
					borderTop: "1px solid #e0e0e0",
					color: "#6e6d7a",
					textAlign: "center",
					width: "100%",
					":after": {
						content: "\"OR\"",
						display: "inline-block",
						position: "relative",
						top: "-10px",
						padding: "0 16px",
						background: "#fff"
					}
				}}
			/>

			<form onSubmit={formik.handleSubmit}>
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
							sx={{ mt: 0, mx: 0, mb: 2 }}
							disabled={!(formik.isValid && formik.dirty) || isLoading}
						>
							Login &nbsp; {isLoading && <CircularProgress size={14} />}
						</Button>
					</Grid>
				</Grid>
			</form>
			<Grid container>
				<Grid item xs>
					<ForgotPasswordLink />
				</Grid>
				<Grid item sx={{ display: { xs: "initial", lg: "none" } }}>
					<SignUpLink />
				</Grid>
			</Grid>

		</RegContainer>
	)
}

export default LoginForm