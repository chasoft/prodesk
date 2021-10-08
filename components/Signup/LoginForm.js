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
import React from "react"

// MATERIAL-UI
import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
} from "@mui/material"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { ForgotPasswordLink, SignUpLink } from "./../common"
import { signInWithEmail } from "./../../helpers/firebase/login"
import { RegContainer, RegHeader, useFlexDirection } from "./../../layout/RegLayout"

//ASSETS
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { getRedirect } from "./../../redux/selectors"

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
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { redirectAfterLoginURL } = useSelector(getRedirect)

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
			}, { enqueueSnackbar, dispatch, redirectAfterLoginURL })
		},
	})

	useFlexDirection({ payload: "row" })

	return (
		<RegContainer>

			<RegHeader
				icon={<LockOutlinedIcon />}
				title="Login"
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
				<Grid item sx={{ display: { xs: "initial", lg: "none" } }}>
					<SignUpLink />
				</Grid>
			</Grid>

		</RegContainer>
	)
}

export default LoginForm