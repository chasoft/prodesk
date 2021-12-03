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

import React, { useState, useEffect, useRef } from "react"

// MATERIAL-UI
import { Box, Button, CircularProgress, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material"

//THIRD-PARTY
import { size } from "lodash"
import nanoid from "@helpers/nanoid"
import slugify from "react-slugify"
import { useDeepCompareEffect } from "react-use"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import NewTicketStep1 from "@components/Ticket/Create/NewTicketStep1"
import NewTicketStep2 from "@components/Ticket/Create/NewTicketStep2"
import NewTicketStep3 from "@components/Ticket/Create/NewTicketStep3"
import { LearnMoreAdvancedTextEditor } from "@components/common"

import useAdmin from "@helpers/useAdmin"
import useProfilesGroup from "@helpers/useProfilesGroup"
import { addNewNotification } from "@helpers/realtimeApi"
import { getPlainTextFromMarkDown } from "@helpers/utils"
import { CODE, REDIRECT_URL, STATUS_FILTER, USERGROUP } from "@helpers/constants"

import { setRedirect } from "@redux/slices/redirect"
import { ACTIONS, TYPE } from "@redux/slices/firestoreApiConstants"
import { getAuth, getNewTicket, getTextEditor } from "@redux/selectors"
import { setCurrentStep, setNewlyAddedTicketSlug } from "@redux/slices/newTicket"
import { useAddTicketMutation, useGetCategoriesQuery, useGetDepartmentsQuery } from "@redux/slices/firestoreApi"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const steps = [
	"Create your question",
	"Select details",
	"Describe & post"
]

export const useGetTicketDetails = () => {
	const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery()
	const { data: departments, isLoading: isLoadingDepartments } = useGetDepartmentsQuery()

	const { selectedDepartmentId, selectedCategory, selectedSubCategory, selectedPriority } = useSelector(getNewTicket)
	const defaultCategory = categories?.find(i => i.default === true)?.name ?? ""
	const subCategories = categories?.find(i => i.name === (selectedCategory ?? defaultCategory))?.subCategories ?? []
	const defaultSubCategory = subCategories?.find(i => i.default === true)?.name ?? ""

	const res = {
		selectedDepartmentId: (size(departments) > 0) ? selectedDepartmentId ?? departments[0].did : "",
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
		isLoading: isLoadingCategories || isLoadingDepartments
	}

	return res
}

export const useGetNewTicketData = () => {
	const res = useRef([])
	const { editorData } = useSelector(getTextEditor)
	const { subject, selectedPriority } = useSelector(getNewTicket)

	const {
		selectedCategory,
		selectedDepartmentId,
		selectedSubCategory
	} = useGetTicketDetails()

	const {
		data: departments = [],
		isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery()

	useEffect(() => {
		res.current[0] = `Your question: ${subject}`
	}, [subject])

	useDeepCompareEffect(
		() => {
			const departmentName = departments.find(
				department => department.did === selectedDepartmentId
			)?.name ?? "<Empty>"

			res.current[1] = `Department: ${departmentName} | Priority: ${selectedPriority} | Category: ${selectedCategory} ${selectedSubCategory}`
		},
		[
			departments,
			selectedCategory,
			selectedPriority,
			selectedSubCategory,
			selectedDepartmentId,
		]
	)

	useEffect(() => {
		res.current[2] = `📝 ${getPlainTextFromMarkDown(editorData)}`
	}, [editorData])

	return { data: res.current, isLoading: isLoadingDepartments }
}

const StepperControlButtons = () => {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(getAuth)
	const { editorData } = useSelector(getTextEditor)
	const [isProcessingNewTicket, setIsProcessingNewTicket] = useState(false)

	const {
		currentStep,
		onBehalf,
		subject
	} = useSelector(getNewTicket)

	const [addTicket] = useAddTicketMutation()
	const { isAdminURL } = useAdmin()

	const raw = useGetTicketDetails()

	const {
		data: departments,
		isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const {
		userList: allAdminProfiles = [],
		isLoading: isLoadingAllAdminProfiles
	} = useProfilesGroup(
		[
			USERGROUP.SUPERADMIN.code,
			USERGROUP.ADMIN.code,
			USERGROUP.STAFF.code,
			USERGROUP.AGENT.code
		]
	)

	const handleGoBack = () => {
		dispatch(setCurrentStep(currentStep - 1))
	}

	const handleGoNext = async () => {
		let slug
		if (currentStep === steps.length - 1) {
			setIsProcessingNewTicket(true)
			//
			const tid = nanoid()
			slug = slugify(subject) + "/" + tid
			const res = await addTicket({
				tid,
				//owner of the ticket
				username: onBehalf ?? currentUser.username,
				//who create the ticket
				//sometimes, admin will create ticket on behalf of customer
				createdBy: currentUser.username,
				subject: subject,
				departmentId: raw.selectedDepartmentId,
				priority: raw.selectedPriority,
				category: raw.selectedCategory,
				subCatgory: raw.selectedSubCategory,
				status: STATUS_FILTER.OPEN,
				staffInCharge: [],
				note: {
					content: "",
				},
				slug,
				content: editorData
			})

			if (res?.data.code === CODE.SUCCESS) {

				const invalidatesTags = {
					trigger: currentUser.username,
					tag: [{ type: TYPE.TICKETS, id: "LIST" }],
					target: {
						isForUser: true,
						isForAdmin: true,
					}
				}

				const notisContent = {
					actionType: ACTIONS.ADD_TICKET,
					iconURL: currentUser.photoURL,
					title: currentUser.username + " just opened new ticket",
					description: subject,
					slug,
				}

				//Determine who will receive notifications
				//about this newly created ticket
				const selectedDepartment = departments.find(
					department => department.did === raw.selectedDepartmentId
				) ?? {}

				const receivers =
					(selectedDepartment?.availableForAll)
						? allAdminProfiles.map(profile => profile.username)
						: selectedDepartment.members

				await addNewNotification(receivers, notisContent, invalidatesTags)
			}

			setIsProcessingNewTicket(false)
		}

		reduxBatch(() => {
			dispatch(setNewlyAddedTicketSlug(slug))
			dispatch(setCurrentStep(currentStep + 1))
		})
	}

	return (
		<Box sx={{
			mt: 2,
			mb: 0,
			display: "flex",
			alignItems: "center",
			justifyContent: { xs: "flex-end", sm: "space-between" },
			...(currentStep === steps.length - 1 ? { my: 5 } : {})
		}}>

			<div>
				<Button onClick={handleGoBack} sx={{
					mr: 1, px: { xs: 4, sm: 2 },
					display: (currentStep === 0) ? "none" : "initial"
				}}>
					Back
				</Button>

				<Button
					disabled={
						(
							currentStep === 0 && subject.length < 10 || isAdminURL
								? (
									onBehalf
										? (false || subject.length < 10)
										: true
								)
								: false
						)
						|| (currentStep === 2 && editorData.length < 20)
						|| isLoadingDepartments
						|| isLoadingAllAdminProfiles
					}
					variant="contained" color="primary"
					onClick={handleGoNext}
					sx={{ px: { xs: 4, sm: 2 } }}
				>
					{currentStep === steps.length - 1
						? <span>
							Submit
							{isProcessingNewTicket
								? <CircularProgress size="14" />
								: null}
						</span>
						: "Continue"}
				</Button>
			</div>

			{(currentStep === steps.length - 1) &&
				<Box sx={{ display: { xs: "none", sm: "initial" } }}>
					<LearnMoreAdvancedTextEditor
						text="Learn more about"
						linkText="advanced text editor"
					/>
				</Box>}

		</Box>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function TicketStepper() {
	const dispatch = useDispatch()

	const {
		data: newTicketData,
		isLoading
	} = useGetNewTicketData()

	const {
		currentStep,
		newlyAddedTicketSlug
	} = useSelector(getNewTicket)

	const { isAdminURL } = useAdmin()

	if (isLoading) return null

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
						onClick={() => dispatch(
							setRedirect((
								isAdminURL
									? REDIRECT_URL.ADMIN.TICKETS
									: REDIRECT_URL.CLIENT.TICKETS)
								+ "/" + newlyAddedTicketSlug
							)
						)}
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
						onClick={() => dispatch(setRedirect(
							isAdminURL ? REDIRECT_URL.ADMIN.TICKETS : REDIRECT_URL.CLIENT.TICKETS
						))}
						variant="contained" color="primary"
						sx={{
							mt: 1, mr: 1,
							pl: 2, pr: 2,
							width: { xs: "100%", sm: "initial" }
						}}
					>
						{isAdminURL ? "Go to Tickets management" : "Go to All tickets"}
					</Button>

				</Paper>
			)}

		</div>
	)
}