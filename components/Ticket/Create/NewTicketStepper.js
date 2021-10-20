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

import React, { useEffect, useRef } from "react"

// MATERIAL-UI
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material"

//THIRD-PARTY
import { size } from "lodash"
import { nanoid } from "nanoid"
import slugify from "react-slugify"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import NewTicketStep1 from "./NewTicketStep1"
import NewTicketStep2 from "./NewTicketStep2"
import NewTicketStep3 from "./NewTicketStep3"
import { LearnMoreAdvancedTextEditor } from "./../../common"
import { STATUS_FILTER } from "./../../../helpers/constants"
import { setRedirect } from "./../../../redux/slices/redirect"
import { setCurrentStep } from "./../../../redux/slices/newTicket"
import { getPlainTextFromMarkDown } from "./../../../helpers/utils"
import { getAuth, getNewTicket, getTextEditor } from "./../../../redux/selectors"
import { useAddTicketMutation, useGetCategoriesQuery, useGetDepartmentsQuery } from "./../../../redux/slices/firestoreApi"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/
const steps = ["Create your question", "Select details", "Describe & post"]

export const useGetTicketDetails = () => {
	const { data: categories, isLoadingCategories } = useGetCategoriesQuery()
	const { data: departments, isLoadingDepartments } = useGetDepartmentsQuery()

	const { selectedDepartment, selectedCategory, selectedSubCategory, selectedPriority } = useSelector(getNewTicket)
	const defaultCategory = categories?.find(i => i.default === true)?.name ?? ""
	const subCategories = categories?.find(i => i.name === (selectedCategory ?? defaultCategory))?.subCategories ?? []
	const defaultSubCategory = subCategories?.find(i => i.default === true)?.name ?? ""

	const res = {
		selectedDepartment: (size(departments) > 0) ? selectedDepartment ?? departments[0].department : "",
		//
		selectedPriority: selectedPriority,
		//
		categories,
		selectedCategory: selectedCategory ?? defaultCategory,
		defaultCategory,
		//
		subCategories,
		selectedSubCategory: selectedSubCategory ?? defaultSubCategory,
		defaultSubCategory,
		//
		isLoading: Boolean(isLoadingCategories) || Boolean(isLoadingDepartments)
	}

	console.log("useGetTicketDetails", res)

	return res
}

export const useGetNewTicketData = () => {
	const res = useRef([])
	const { editorData } = useSelector(getTextEditor)
	const { subject, selectedPriority } = useSelector(getNewTicket)
	const { selectedDepartment, selectedCategory, selectedSubCategory } = useGetTicketDetails()

	useEffect(() => {
		res.current[0] = `Your question: ${subject}`
	}, [subject])

	useEffect(() => {
		res.current[1] = `Department: ${selectedDepartment} | Priority: ${selectedPriority} | Category: ${selectedCategory} ${selectedSubCategory}`
	}, [selectedCategory, selectedDepartment, selectedPriority, selectedSubCategory])

	useEffect(() => {
		res.current[2] = `📝 ${getPlainTextFromMarkDown(editorData)}`
	}, [editorData])

	return res.current
}

const StepperControlButtons = () => {
	const dispatch = useDispatch()
	const { editorData } = useSelector(getTextEditor)
	const { currentStep, subject } = useSelector(getNewTicket)

	const [addTicket] = useAddTicketMutation()
	const { currentUser } = useSelector(getAuth)
	const raw = useGetTicketDetails()


	const handleGoBack = () => { dispatch(setCurrentStep(currentStep - 1)) }
	const handleGoNext = () => {
		if (currentStep === steps.length - 1) {
			console.log("Submit new ticket")
			//
			const tid = nanoid()
			addTicket({
				ticketItem: {
					tid,
					username: currentUser.username,
					subject: subject,
					department: raw.selectedDepartment,
					priority: raw.selectedPriority,
					category: raw.selectedCategory,
					subCatgory: raw.selectedSubCategory,
					status: STATUS_FILTER.OPEN,
					slug: slugify(subject + "/" + tid)
				},
				content: { text: editorData }
			})

		}
		dispatch(setCurrentStep(currentStep + 1))
	}

	return (
		<Box sx={{
			mt: 1,
			mb: 0,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			...(currentStep === steps.length - 1 ? { my: 2 } : {})
		}}>

			<div>
				<Button onClick={handleGoBack} sx={{
					mr: 1, pl: 2, pr: 2,
					display: (currentStep === 0) ? "none" : "initial"
				}}>
					Back
				</Button>

				<Button
					disabled={
						(currentStep === 0 && subject.length < 10)
						|| (currentStep === 2 && editorData.length < 20)
					}
					variant="contained" color="primary"
					onClick={handleGoNext}
					sx={{ pl: 2, pr: 2 }}
				>
					{currentStep === steps.length - 1
						? "Submit"
						: "Continue"}
				</Button>
			</div>

			{(currentStep === steps.length - 1) &&
				<LearnMoreAdvancedTextEditor
					text="Learn more about"
					linkText="advanced text editor"
				/>}

		</Box>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function TicketStepper() {
	const dispatch = useDispatch()

	const newTicketData = useGetNewTicketData()
	const { currentStep } = useSelector(getNewTicket)

	return (
		<div style={{ width: "100%" }}>

			<Stepper activeStep={currentStep} orientation="vertical">

				{steps.map((label, index) => (

					<Step key={label}>
						<StepLabel
							optional={
								(currentStep > index)
									?
									<Typography variant="caption">
										{newTicketData[index]}
									</Typography>
									: ""
							}
						>
							{label}
						</StepLabel>

						<StepContent style={{ paddingTop: "1rem" }}>
							{index === 0 && <NewTicketStep1 goNextStep={() => dispatch(setCurrentStep(1))} />}
							{index === 1 && <NewTicketStep2 />}
							{index === 2 && <NewTicketStep3 />}
							<StepperControlButtons />
						</StepContent>
					</Step>
				))}

			</Stepper >

			{currentStep === steps.length && (
				<Paper square elevation={0} sx={{ padding: 3 }}>

					<Typography sx={{ mb: 1 }}>
						Your ticket has just been submitted. Our dedicated staffs would check and feedback soon.
					</Typography>

					<Button
						onClick={() => { }}
						variant="outlined"
						sx={{
							mt: 1, mr: 1,
							pl: 2, pr: 2,
							width: { xs: "100%", sm: "initial" }
						}}
					>
						View your ticket
					</Button>

					<Button
						onClick={() => dispatch(setRedirect("/client"))}
						variant="contained" color="primary"
						sx={{
							mt: 1, mr: 1,
							pl: 2, pr: 2,
							width: { xs: "100%", sm: "initial" }
						}}
					>
						Go to Dashboard
					</Button>

				</Paper>
			)}

		</div>
	)
}