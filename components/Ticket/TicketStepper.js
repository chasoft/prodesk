import { nanoid } from "nanoid"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	makeStyles, Button, Grid, IconButton, Paper, Step, StepContent, StepLabel, Stepper, Tooltip, Typography
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"


import EditOutlinedIcon from "@material-ui/icons/EditOutlined"

import { getNewTicket } from "../../redux/selectors"
import { setInitNewTicketData, setCurrentStep } from "../../redux/slices/newTicket"
import NewTicketStep1 from "./step1"
import NewTicketStep2 from "./step2"
import NewTicketStep3 from "./step3"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
	actionsContainer: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(0),
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
		dispatch(setCurrentStep(currentStep + 1))
	}

	const handleBack = () => {
		dispatch(setCurrentStep(currentStep - 1))
	}

	const handleReset = () => { dispatch(setCurrentStep(0)) }

	const getInputtedData = (index) => {
		switch (index) {
			case 0: return `❓ ${subject}`
			case 1: {
				if (selectedCategory.subCat === "")
					return `🏙 ${selectedDepartment} | ⚡ ${selectedPriority} | 📚 ${selectedCategory.cat}`
				else
					return `🏙 ${selectedDepartment} | ⚡ ${selectedPriority} | 📚 ${selectedCategory.cat} / ${selectedCategory.subCat}`
			}
			case 2: return `📝 ${message}`
			default: return ""
		}
	}

	/* Load init data for newTicket Redux
		- list of priority/department/category
	TODO: replace this hardcode by firebase fetch data
	 */
	useEffect(() => {
		dispatch(setInitNewTicketData({
			tid: nanoid(10),
			subject: "",
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
			message: "<p></p>"
		}))
	}, [dispatch])


	return (
		<div className={classes.root}>

			<Grid container className={classes.user}>
				<Grid item>
					<Typography style={{ fontWeight: "bold" }}>Display name</Typography>
				</Grid>
				<Grid item>
					<Typography>Brian</Typography>
					<Tooltip title="Edit display name">
						<IconButton aria-label="edit" size="small">
							<EditOutlinedIcon />
						</IconButton>
					</Tooltip>
				</Grid>
			</Grid>
			<Stepper activeStep={currentStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel
							optional={(currentStep > index) ? getInputtedData(index) : ""}
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
						onClick={handleReset} className={classes.button} variant="outlined"
						fullWidth={isSmallScreen ? true : false}
					>
						Open another ticket
					</Button>
					<Button
						onClick={handleReset} className={classes.button} variant="contained" color="primary"
						fullWidth={isSmallScreen ? true : false}
					>
						Go to Dashboard
					</Button>
				</Paper>
			)}
		</div >
	)
}