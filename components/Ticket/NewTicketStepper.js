import dynamic from "next/dynamic"
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import StepContent from "@material-ui/core/StepContent"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { Typography, Grid, IconButton, Tooltip, Select, MenuItem, FormHelperText } from "@material-ui/core"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import InputBase from "@material-ui/core/InputBase"
import InputLabel from "@material-ui/core/InputLabel"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"

import { useDispatch, useSelector } from "react-redux"
import { getNewTicket } from "./../../redux/selectors"
import { useEffect } from "react"

import { setNewTicketData, setSelectedCategory } from "./../../redux/slices/newTicket"
import { nanoid } from "nanoid"
const TextEditor = dynamic(() => import("./../TextEditor"), { ssr: false })

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
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))

function getSteps() {
	return ["Create your question", "Select details", "Describe & post"]
}

function getStepContent(step) {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { newTicket } = useSelector(getNewTicket)
	const {
		tid,
		/* User Inputed value */
		subject, message,
		/* Selection */
		category, priority, department,
		/* SelectedValue */
		selectedCategory, selectedPriority, selectedDepartment,
		/* defaultValue */
		defaultCategory, defaultSubCategory, defaultPriority, defaultDepartment
	} = newTicket

	switch (step) {
		case 0:
			return (
				<form>
					<TextField
						id="outlined-helperText"
						label="My question"
						placeholder="Subject Title Goes Here (Please put long-form question in Describe &amp; post section below)"
						helperText="10 characters required"
						variant="outlined"
						value={subject}
						onChange={(e) => {
							dispatch(setNewTicketData({ subject: e.target.value }))
						}}
						fullWidth
						InputLabelProps={{ shrink: true }}
					/>
				</form>
			)
		case 1:
			return (
				<form>
					{(department.length === 0) ?
						<div style={{ display: "block" }}>
							Please setup Department information!...
						</div>
						:
						<FormControl className={classes.formControl}>
							<InputLabel shrink id="department">Department</InputLabel>
							<Select
								labelId="department"
								id="department"
								value={selectedDepartment ? selectedDepartment : defaultDepartment}
								onChange={(e) => {
									dispatch(setNewTicketData({ selectedDepartment: e.target.value }))
								}}
								displayEmpty
							>
								{
									department?.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)
								}
							</Select>
							<FormHelperText>Department</FormHelperText>
						</FormControl>
					}

					{(Object.entries(category).length === 0) ?
						<div style={{ display: "block" }}>
							Please setup Category information!...
						</div>
						: <>
							<FormControl className={classes.formControl}>
								<InputLabel shrink id="category">Category</InputLabel>
								<Select
									labelId="category"
									id="category"
									value={selectedCategory.cat ? selectedCategory.cat : defaultCategory}
									onChange={(e) => {
										dispatch(setSelectedCategory({ cat: e.target.value }))
									}}
									displayEmpty
								>
									{
										Object.entries(category)?.map(
											(item) => <MenuItem key={item[0]} value={item[0]}>{item[0]}</MenuItem>
										)
									}
								</Select>
								<FormHelperText>Category</FormHelperText>
							</FormControl>

							{
								/*
									Render SubCategory if available based on current selected `selectedCategory.cat`
								 */
								(Object.entries(category)[selectedCategory.cat].length === 0) ? null
									:
									<FormControl className={classes.formControl}>
										<InputLabel shrink id="category">Sub-Category</InputLabel>
										<Select
											labelId="sub-category"
											id="sub-category"
											value={selectedCategory.subCat ? selectedCategory.subCat : defaultSubCategory[selectedCategory.cat]}
											onChange={(e) => {
												dispatch(setSelectedCategory({ subCat: e.target.value }))
											}}
											displayEmpty
										>
											{
												Object.entries(category)[selectedCategory.cat]?.map(
													(item) => <MenuItem key={item} value={item}>{item}</MenuItem>
												)
											}
										</Select>
										<FormHelperText>Sub-Category</FormHelperText>
									</FormControl>
							}
						</>
					}

					{(priority.length === 0) ?
						<div style={{ display: "block" }}>
							Please setup Priority information!...
						</div>
						:
						<FormControl className={classes.formControl}>
							<InputLabel shrink id="priority">Priority</InputLabel>
							<Select
								labelId="priority"
								id="priority"
								value={selectedPriority ? selectedPriority : defaultPriority}
								onChange={(e) => {
									dispatch(setNewTicketData({ selectedPriority: e.target.value }))
								}}
								displayEmpty
							>
								{
									priority?.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)
								}
							</Select>
							<FormHelperText>Priority</FormHelperText>
						</FormControl>
					}

				</form >
			)
		case 2:
			return <form>
				<TextEditor data={message} handleData={(data) => {
					dispatch(setNewTicketData({ message: data }))
				}} />
				<Typography>Please describe your issue in detail.</Typography>
			</form>
		default:
			return "Unknown step"
	}
}

export default function NewTicketStepper() {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [activeStep, setActiveStep] = useState(0)
	const steps = getSteps()

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleReset = () => {
		setActiveStep(0)
	}

	/* Load init data for newTicket Redux
		- list of priority/department/category
	 */
	useEffect(() => {
		dispatch(setNewTicketData({
			tid: nanoid(10),
			subject: "",
			department: ["Sales, Marketing, Accounting, Technical, Managing"],
			priority: ["Low", "Normal", "High"],
			category: {
				"domain": [".org", ".com", ".net", ".io"],
				"Hosting": ["VPS", "Dedicated Server", "Wordpres Hosting", "Serverless"],
				"SSL": ["TypeA", "TypeB", "TypeC", "TypeD"],
				"DNS": ["CNAME RECORD", "A RECORD", "TXT RECORD"],
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
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
						<StepContent style={{ paddingTop: "1rem" }}>
							<div>{getStepContent(index)}</div>
							<div className={classes.actionsContainer}>
								<div>
									<Button
										disabled={activeStep === 0} onClick={handleBack}
										className={`${classes.button} ${(activeStep === 0) ? classes.hide : null}`}
									>
										Back
									</Button>
									<Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
										{activeStep === steps.length - 1 ? "Finish" : "Next"}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Button onClick={handleReset} className={classes.button}>
						Reset
					</Button>
				</Paper>
			)}
		</div>
	)
}