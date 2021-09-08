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

//CORE SYSTEM
import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Button, makeStyles, Typography, Grid, TextField } from "@material-ui/core"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"

//PROJECT IMPORT
import { Logo } from "./../../components/common"
import { getInstallLayout } from "./InstallLayout"
import { createAdminAccount } from "../../helpers/userAuthentication"
import { useSnackbar } from "notistack"
import { useDispatch } from "react-redux"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

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
 * MAIN RENDER                                                   *
 *****************************************************************/

function CreateSuperAdmin() {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()

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
			createAdminAccount({
				email: values.email,
				password: values.password,
				name: values.name
			}, { enqueueSnackbar, dispatch })
		},
	})

	return (
		<>
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
						type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
						disabled={!(formik.isValid && formik.dirty)}
					>
						Create Superadmin Account
					</Button>

				</form>

			</div>
		</>
	)
}
CreateSuperAdmin.propTypes = { children: PropTypes.any }

CreateSuperAdmin.getLayout = getInstallLayout

export default CreateSuperAdmin