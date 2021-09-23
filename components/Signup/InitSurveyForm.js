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
import { Box, Button, FormControlLabel, Paper, Radio, RadioGroup, Typography } from "@mui/material"

//THIRD-PARTY
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "../../redux/selectors"
import { doInitSurvey } from "../../helpers/firebase"
import { RegContainer } from "../../layout/RegLayout"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

// const AnOption = () => {
// 	return (
// 		<RadioGroup aria-label="gender" name="gender1" value={0} onChange={() => { }}>
// 			<FormControlLabel
// 				value="female"
// 				control={
// 					<Radio name="purpose" />
// 				}
// 			/>
// 		</RadioGroup>
// 	)
// }

const InitSurveyForm = () => {
	const { currentUser } = useSelector(getAuth)
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			surveyOptions: "Option1"
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
		<RegContainer>

			<div style={{ marginBottom: "2rem" }}>
				<Typography variant="h1">What brings you to ProDesk</Typography>
				<Typography variant="body1">Select the options that best describe you. Don&apos;t worry, you can explore other options later.</Typography>
			</div>

			<form onSubmit={formik.handleSubmit}>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						"& > *": {
							m: 1,
							width: (theme) => theme.spacing(16),
							height: (theme) => theme.spacing(16),
						},
						px: 2, py: 4
					}}
				>
					<RadioGroup
						name="surveyOptions"
						value={formik.values.surveyOptions}
						onChange={formik.handleChange}
					>
						<Paper>
							<FormControlLabel
								label="Option 1" control={<Radio />}
								value="Option1"
							/>
						</Paper>
						<Paper>
							<FormControlLabel
								label="Option 2" control={<Radio />}
								value="Option2"
							/>
						</Paper>
						<Paper>
							<FormControlLabel
								label="Option 3" control={<Radio />}
								value="Option3"
							/>
						</Paper>
					</RadioGroup>
				</Box>

				<Button type="submit" variant="contained" color="primary">Finish</Button>
			</form>

		</RegContainer>
	)
}

export default InitSurveyForm