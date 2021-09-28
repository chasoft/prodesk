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

import React, { useEffect } from "react"

// MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"
import { batch } from "react-redux"

//PROJECT IMPORT
import NewTicketStep1 from "./step1"
import NewTicketStep2 from "./step2"
import NewTicketStep3 from "./step3"
import { getNewTicket } from "../../redux/selectors"
import { setRedirect } from "../../redux/slices/redirect"
import { getPlainTextFromMarkDown } from "./../../helpers/utils"
import { setInitNewTicketData, setCurrentStep, resetNewTicket } from "../../redux/slices/newTicket"
import { LearnMoreAdvancedTextEditor } from "../common"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const getStepContent = (step, callback) => {
	switch (step) {
		case 0: return <NewTicketStep1 callback={callback} />
		case 1: return <NewTicketStep2 />
		case 2: return <NewTicketStep3 />
		default: return "Completed"
	}
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function TicketStepper() {
	const dispatch = useDispatch()
	const { newTicket } = useSelector(getNewTicket)
	const { currentStep, isReadyNextStep,
		subject, message, selectedCategory, selectedPriority, selectedDepartment
	} = newTicket
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))

	const steps = ["Create your question", "Select details", "Describe & post"]

	const handleNext = () => {
		if (currentStep === steps.length - 1) {
			alert("Submitted")
		}

		dispatch(setCurrentStep(currentStep + 1))
	}

	const handleBack = () => {
		dispatch(setCurrentStep(currentStep - 1))
	}

	// const handleReset = () => {
	// 	batch(() => {
	// 		dispatch(setCurrentStep(0))
	// 		dispatch(resetNewTicket())
	// 	})
	// }

	const handleViewTicket = (tid) => {
		dispatch(setRedirect(`/client/tickets/${tid}`))
	}

	const getInputtedData = (index) => {
		switch (index) {
			case 0: return `Your question: ${subject}`
			case 1: return `Department: ${selectedDepartment} | Priority: ${selectedPriority} | Category: ${selectedCategory.cat} ${selectedCategory.subCat ? " / " + selectedCategory.subCat : ""}`
			case 2: return `📝 ${getPlainTextFromMarkDown(message)}`
			default: return ""
		}
	}

	/* Load init data for newTicket Redux
		- list of priority/department/category
	TODO: replace this hardcode by firebase fetch data
	 */
	useEffect(() => {
		batch(() => {
			dispatch(setInitNewTicketData({
				//tid: nanoid(10),
				//subject: "",
				departments: ["Sales", "Marketing", "Accounting", "Technical", "Managing"],
				priorities: ["Low", "Normal", "High"],
				categories: {
					"domain": [".org", ".com", ".net", ".io"],
					"Hosting": ["VPS", "Dedicated Server", "Wordpres Hosting", "Serverless"],
					"SSL": ["TypeA", "TypeB", "TypeC", "TypeD"],
					"DNS": ["CNAME RECORD", "A RECORD", "TXT RECORD"],
					"Complaint": [],
				},
				defaultCategory: "Hosting",
				defaultSubCategory: {
					"domain": ".com",
					"Hosting": "Dedicated Server",
					"SSL": "TypeA",
					"DNS": "TXT RECORD",
				},
				defaultPriority: "Normal",
				defaultDepartment: "Sales",
				message: ""
			}))
			dispatch(resetNewTicket())
		})

	}, [dispatch])


	return (
		<div style={{ width: "100%" }}>

			<Stepper activeStep={currentStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel
							optional={(currentStep > index) ? <Typography variant="caption">{getInputtedData(index)}</Typography> : ""}
						> {label}</StepLabel>
						<StepContent style={{ paddingTop: "1rem" }}>
							<div>{getStepContent(index, handleNext)}</div>
							<Box sx={{
								mt: 1,
								mb: 0,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								...(currentStep === steps.length - 1 ? { my: 2 } : {})
							}}>

								<div>
									<Button onClick={handleBack} sx={{
										mr: 1, pl: 2, pr: 2,
										display: (currentStep === 0) ? "none" : "initial"
									}}>
										Back
									</Button>
									<Button
										disabled={!isReadyNextStep}
										variant="outlined" color="primary"
										onClick={handleNext}
										sx={{ pl: 2, pr: 2 }}
									>
										{currentStep === steps.length - 1 ? "Submit" : "Continue"}
									</Button>
								</div>

								{(currentStep === steps.length - 1) &&
									<LearnMoreAdvancedTextEditor
										text="Learn more about"
										linkText="advanced text editor"
									/>
								}

							</Box>
						</StepContent>
					</Step>
				))}
			</Stepper >

			{
				currentStep === steps.length && (
					<Paper square elevation={0} sx={{ padding: 3 }}>
						<Typography sx={{ mb: 1 }}>Your ticket has just been submitted. Our dedicated staffs would check and feedback soon.</Typography>
						<Button
							onClick={() => handleViewTicket(newTicket.tid)}
							fullWidth={isSmallScreen ? true : false}
							variant="outlined"
							sx={{
								mt: 1, mr: 1,
								pl: 2, pr: 2,
							}}
						>
							View your ticket
						</Button>
						<Button
							onClick={() => dispatch(setRedirect("/client"))}
							fullWidth={isSmallScreen ? true : false}
							variant="contained" color="primary"
							sx={{
								mt: 1, mr: 1,
								pl: 2, pr: 2,
							}}
						>
							Go to Dashboard
						</Button>
					</Paper>
				)
			}

		</div >
	)
}