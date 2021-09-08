import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	makeStyles, Button, Grid, IconButton, Paper, Step, StepContent, StepLabel, Stepper, Tooltip, Typography
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"


import EditOutlinedIcon from "@material-ui/icons/EditOutlined"

import { getNewTicket } from "../../redux/selectors"
import { setInitNewTicketData, setCurrentStep, resetNewTicket } from "../../redux/slices/newTicket"
import NewTicketStep1 from "./step1"
import NewTicketStep2 from "./step2"
import NewTicketStep3 from "./step3"
import { batch } from "react-redux"
import { setRedirect } from "../../redux/slices/redirect"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	actionsContainer: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(0),
		display: "flex",
		justifyContent: "space-between"
	},
	uploadDiv: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		flexGrow: 1,
		border: "1px solid red"
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
	user: {
		paddingLeft: theme.spacing(3),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		borderBottom: "1px solid",
		borderBottomColor: theme.palette.divider,
		"& > div": {
			display: "flex",
			flexDirection: "row",
			marginRight: "1rem",
			alignItems: "center"
		}
	},
	hide: {
		display: "none"
	}
}))

const getStepContent = (step, callback) => {
	switch (step) {
		case 0: return <NewTicketStep1 callback={callback} />
		case 1: return <NewTicketStep2 />
		case 2: return <NewTicketStep3 />
		default: return "Completed"
	}
}

export default function TicketStepper() {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { newTicket } = useSelector(getNewTicket)
	const { currentStep, isReadyNextStep,
		subject, message, selectedCategory, selectedPriority, selectedDepartment
	} = newTicket
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"))

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
			case 2: return `📝 ${message}`
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
				//message: "<p></p>"
			}))
			dispatch(resetNewTicket())
		})

	}, [dispatch])


	return (
		<div className={classes.root}>


			<Stepper activeStep={currentStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel
							optional={(currentStep > index) ? <Typography variant="caption">{getInputtedData(index)}</Typography> : ""}
						> {label}</StepLabel>
						<StepContent style={{ paddingTop: "1rem" }}>
							<div>{getStepContent(index, handleNext)}</div>
							<div className={classes.actionsContainer}>
								<div>
									<Button
										onClick={handleBack}
										className={`${classes.button} ${(currentStep === 0) ? classes.hide : null}`}
									>
										Back
									</Button>
									<Button
										disabled={!isReadyNextStep}
										variant="outlined" color="primary"
										onClick={handleNext} className={classes.button} >
										{currentStep === steps.length - 1 ? "Submit" : "Continue"}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
				))
				}
			</Stepper >
			{currentStep === steps.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Button
						onClick={() => handleViewTicket(newTicket.tid)}
						fullWidth={isSmallScreen ? true : false}
						className={classes.button} variant="outlined"
					>
						View your ticket
					</Button>
					<Button
						onClick={() => dispatch(setRedirect("/client/tickets"))}
						fullWidth={isSmallScreen ? true : false}
						className={classes.button} variant="contained" color="primary"
					>
						Go to Dashboard
					</Button>
				</Paper>
			)}
		</div >
	)
}