/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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
	Avatar,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Box,
	TextField,
	Typography,

} from "@mui/material"

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
// import { useRouter } from "next/router"

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
 * MAIN RENDER                                                   *
 *****************************************************************/

const SocialLoginForm = () => {
	const { enqueueSnackbar } = useSnackbar()
	// const router = useRouter()
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
				}, { enqueueSnackbar })
			}
			catch (e) {
				console.log(e.message)
				enqueueSnackbar(e.message, { variant: "error" })
			}
		},
	})

	return (
		<Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, }}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					flexGrow: 1,
					maxWidth: "400px",
					mb: 4
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						pt: 0, px: 0, pb: 4
					}}
				>
					<Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h1">
						Sign up
					</Typography>
				</Box>
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
			</Box>
		</Box>
	)
}

export default SocialLoginForm