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
import PropTypes from "prop-types"
// import { useRouter } from "next/router"

// MATERIAL-UI
import { Button, Typography, Grid, TextField } from "@mui/material"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { Logo } from "./../../components/common"
import { REDIRECT_URL } from "./../../helpers/constants"
import { getInstallLayout } from "./InstallLayout"
import { loginTemp } from "../../redux/slices/auth"
import { setRedirect } from "../../redux/slices/redirect"
import { useCreateAdminAccountMutation } from "./../../redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const validationSchema = yup.object({
	name: yup
		.string("Enter your name, you can change later")
		.required("Name is required"),
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
		.required("Confirm your password")
})

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function CreateSuperAdmin() {
	// const router = useRouter()
	const dispatch = useDispatch()
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()
	const [createAdminAccount] = useCreateAdminAccountMutation()

	const formik = useFormik({
		initialValues: {
			name: "",
			username: "superadmin",
			email: "",
			password: "",
			password2: ""
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			enqueueSnackbar("Creating SuperAdmin account", { variant: "info" })

			const res = await createAdminAccount({
				email: values.email,
				password: values.password,
				name: values.name
			})

			if (res?.error) {
				enqueueSnackbar(res.error.data.message, { variant: "error" })
			}

			dispatch(loginTemp({
				uid: res.data.uid,
				email: values.email,
				displayName: values.name,
				group: "superadmin",
				photoURL: "/avatar/admin-default.png",
				username: "superadmin"
			})) //keep uid for next step

			closeSnackbar()
			enqueueSnackbar("Account created", { variant: "success" })

			dispatch(setRedirect(REDIRECT_URL.SIGNUP.INSTALL_COMPLETED))
			// router.push(REDIRECT_URL.SIGNUP.INSTALL_COMPLETED)
		},
	})

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<div style={{ padding: "3rem" }}>
				<Logo />
			</div>
			<Typography variant="h1">
				Creating Superadmin Account
			</Typography>
			<Typography variant="button">
				Register an account and this would be set as SuperAdmin account!
			</Typography>
			<div style={{ padding: "3rem" }}>

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
								variant="outlined"
								disabled
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
					</Grid>

					<Button
						type="submit" fullWidth variant="contained" color="primary"
						sx={{
							mt: 3, mb: 2, mx: 0
						}}
						disabled={!(formik.isValid && formik.dirty)}
					>
						Create Superadmin Account
					</Button>

				</form>

			</div>
		</div>
	)
}
CreateSuperAdmin.propTypes = { children: PropTypes.any }

CreateSuperAdmin.getLayout = getInstallLayout

export default CreateSuperAdmin