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
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton, TextField } from "@mui/material"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getRedirect } from "./../../redux/selectors"
import { setRedirect } from "../../redux/slices/redirect"
import { ForgotPasswordLink, SignUpLink } from "./../common"
import { USERGROUP, REDIRECT_URL } from "./../../helpers/constants"
import { RegContainer, RegHeader, useFlexDirection } from "./../../layout/RegLayout"
import { useSignInWithEmailMutation, useSignInWithGoogleMutation } from "./../../redux/slices/firestoreApi"

//ASSETS
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { GithubIcon, GoogleIcon, TwitterIcon } from "../svgIcon"

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