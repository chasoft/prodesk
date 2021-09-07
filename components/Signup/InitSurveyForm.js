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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React from "react"
import { Button, Paper, Typography, makeStyles, RadioGroup, FormControlLabel, Radio } from "@material-ui/core"
import { doInitSurvey } from "../../helpers/firebase"
import { useDispatch, useSelector } from "react-redux"
import { getAuth } from "../../redux/selectors"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useRouter } from "next/router"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		justifyContent: "center",
		marginBottom: theme.spacing(4),
	},
	options: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		"& > *": {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
		padding: theme.spacing(4, 2, 4)
	},
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const AnOption = () => {
	return (
		<RadioGroup aria-label="gender" name="gender1" value={0} onChange={() => { }}>
			<FormControlLabel value="female" control={<Radio />} />
		</RadioGroup>
	)
}

const InitSurveyForm = () => {
	const classes = useStyles()
	const { currentUser } = useSelector(getAuth)
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			purpose: "1"
		},
		// validationSchema: validationSchema,
		onSubmit: async (values) => {
			doInitSurvey({
				username: currentUser.username,
				payload: values
			}, { enqueueSnackbar, dispatch })
		},
	})


	return (
		<>
			<Paper className={classes.root} elevation={0}>

				<div style={{ marginBottom: "2rem" }}>
					<Typography variant="h1">What brings you to ProDesk</Typography>
					<Typography variant="body1">Select the options that best describe you. Don&apos;t worry, you can explore other options later.</Typography>
				</div>

				<form className={classes.form} onSubmit={formik.handleSubmit}>
					<div className={classes.options}>
						<Paper><AnOption /></Paper>
						<Paper><AnOption /></Paper>
						<Paper><AnOption /></Paper>
					</div>

					<Button type="submit" variant="contained" color="primary">Finish</Button>
				</form>

			</Paper>
		</>
	)
}

export default InitSurveyForm