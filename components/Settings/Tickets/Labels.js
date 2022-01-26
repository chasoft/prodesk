/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

//PROJECT IMPORT

import React, { useState } from "react"
import PropTypes from "prop-types"

//MATERIAL-UI
import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import nanoid from "@helpers/nanoid"
import { useSelector } from "react-redux"
import { filter, isEqual, random, uniqueId } from "lodash"
import { TransitionGroup } from "react-transition-group"

//PROJECT IMPORT
import { CircularProgressBox } from "@components/common"
import { CODE } from "@helpers/constants"
import { TYPE } from "@redux/slices/firestoreApiConstants"
import { requestSilentRefetching } from "@helpers/realtimeApi"

import {
	HUE,
	SHADE,
	ColorTable,
} from "@components/common/ColorPicker"

import {
	ContentHelperText,
	SettingsContentDetails,
	SettingsContentHeader,
	SettingsContentHelper,
	SettingsContentHelperLearnMore,
} from "@components/common/Settings"

import {
	useAddLabelMutation,
	useDeleteLabelMutation,
	useGetLabelsQuery,
	useUpdateLabelMutation
} from "@redux/slices/firestoreApi"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import SaveIcon from "@mui/icons-material/Save"
import LabelIcon from "@mui/icons-material/Label"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function LabelEditorDialog({ open, handleClose }) {
	const [addLabel] = useAddLabelMutation()
	const isSmallScreen = useSelector(s => s.uiSettingsState.isSmallScreen)
	const { data: labels, isLoading } = useGetLabelsQuery()

	const handleAddNewLabel = async () => {
		const lid = nanoid()
		const incNum = uniqueId()
		addLabel({
			lid,
			name: "Label " + incNum,
			color: Object.entries(HUE)[random(18)][1][SHADE[random(7)]]
		})
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth={isSmallScreen}
		>
			<DialogTitle sx={{ fontSize: "1.5em", fontWeight: 500 }}>
				Add New Label
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Label is advanced feature to manage your tickets in case you have so many tickets and types of tickets which Department, Category/Subcategory still not enough.
				</DialogContentText>

				<Box sx={{
					display: "flex",
					justifyContent: "flex-end",
					my: 2
				}}>
					<Button
						startIcon={<AddIcon />}
						size="small"
						variant="contained"
						onClick={handleAddNewLabel}
					>
						Add new
					</Button>
				</Box>

				{isLoading
					? <CircularProgressBox minHeight="100px" />
					: (labels.length === 0)
						? <div>Label list is empty</div>
						: labels.map((label) => <SubCatItem key={label.lid} currentItem={label} />)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} sx={{ mb: 1, mr: 2, px: 4 }}>Close</Button>
			</DialogActions>
		</Dialog>
	)
}
LabelEditorDialog.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func
}

export function SubCatItem({ currentItem, labels }) {
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const [updateLabel] = useUpdateLabelMutation()
	const [deleteLabel] = useDeleteLabelMutation()

	//local memory
	const [color, setColor] = useState(currentItem.color)
	const [name, setName] = useState(currentItem.name)
	//
	const [showColorTable, setShowColorTable] = useState(false)

	const isModified = currentItem.color !== color || currentItem.name !== name

	const handleDeleteLabel = async (confirmed) => {
		if (confirmed === false)
			return

		//get newList of labels
		const newList = filter(labels, l => l.lid !== currentItem.lid)
		await deleteLabel({
			labelItem: { lid: currentItem.lid },
			fullList: newList
		})
	}

	const handleUpdateLabel = async () => {
		await updateLabel({
			...currentItem,
			name,
			color,
			updatedAt: dayjs().valueOf(),
			updatedBy: currentUser.username
		})
	}

	return (
		<Box sx={{
			display: "flex",
			px: 2,
			":hover": {
				backgroundColor: "action.hover",
			},
		}}>

			<Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>

				<Collapse timeout={{ enter: 600 }} in={!showColorTable} sx={{
					display: "flex", alignItems: "center", flexGrow: 1
				}}>
					<Box sx={{ display: "flex" }}>
						<LabelIcon
							sx={{ color: color, mr: 0.5, cursor: "pointer" }}
							onClick={() => { setShowColorTable(true) }} />
						<InputBase
							fullWidth
							value={name}
							onChange={(e) => { setName(e.target.value) }}
							sx={{
								color,
								cursor: "pointer",
								borderBottom: "1px solid transparent",
								"&.Mui-focused": {
									borderColor: isModified ? (theme) => theme.palette.warning.main : color
								}
							}} />
					</Box>
				</Collapse>

				<Collapse timeout={{ enter: 600 }} in={showColorTable} sx={{
					py: 2, justifyItems: "center", width: showColorTable ? "initial" : "0px"
				}}>
					<Box sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
						<Box sx={{
							display: "flex",
							alignItems: "center"
						}}>
							Select color for label
							<span style={{
								fontWeight: "bold",
								color,
								display: "flex",
								alignItems: "center",
								marginLeft: "8px"
							}}>
								<LabelIcon
									sx={{ color: color, mr: 0.5, cursor: "pointer" }} />
								{name}
							</span>
						</Box>
						<IconButton onClick={() => { setShowColorTable(false) }}>
							<CloseIcon />
						</IconButton>
					</Box>
					<ColorTable getSelectedColor={(color) => {
						setColor(color)
						setShowColorTable(false)
					}} />

				</Collapse>

			</Box>

			{!showColorTable &&
				<Box id="buttons" sx={{
					display: "flex",
					alignItems: "center"
				}}>
					{isModified &&
						<Tooltip title="Save changes" placement="left">
							<IconButton
								sx={{ ":hover": { color: "primary.main" } }}
								onClick={handleUpdateLabel}
							>
								<SaveIcon fontSize="small" color="warning" />
							</IconButton>
						</Tooltip>}

					<Tooltip title="Delete" placement="right">
						<IconButton
							sx={{ ":hover": { color: "warning.main" } }}
							onClick={handleDeleteLabel}
						>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>}

		</Box>
	)
}
SubCatItem.propTypes = {
	currentItem: PropTypes.object,
	labels: PropTypes.array
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function PageLabels({ backBtnClick }) {
	const [addLabel] = useAddLabelMutation()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const { data: labels, isLoading } = useGetLabelsQuery()

	const handleAddNewLabel = async () => {
		const lid = nanoid()
		const incNum = uniqueId()
		const res = await addLabel({
			lid,
			name: "Label " + incNum,
			color: Object.entries(HUE)[random(18)][1][SHADE[random(7)]],
			createdBy: currentUser.username,
			updatedBy: currentUser.username,
			createdAt: dayjs().valueOf(),
			updatedAt: dayjs().valueOf()
		})

		if (res?.data?.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: currentUser.username,
				tag: [{ type: TYPE.LABELS, id: "LIST" }],
				target: {
					isForUser: true,
					isForAdmin: false,
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	return (
		<>
			<SettingsContentHeader
				backBtnOnClick={() => backBtnClick(false)}
				rightButton={<Button
					startIcon={<AddIcon />}
					size="small"
					variant="contained"
					onClick={handleAddNewLabel}
				>
					Add new
				</Button>}
			>
				Labels
			</SettingsContentHeader>

			<SettingsContentHelper>
				<ContentHelperText>
					<Typography paragraph>
						Support tickets are categorized by Department, Category &amp; Sub-Category and now you can have deeper categorization by creating labels.
						<SettingsContentHelperLearnMore target="/docs" />
					</Typography>
				</ContentHelperText>
			</SettingsContentHelper>

			<SettingsContentDetails>
				{isLoading
					? <CircularProgressBox />
					: (labels.length === 0)
						? <Box sx={{
							py: 3,
							fontStyle: "italic",
							color: "text.secondary",
							textAlign: "center"
						}}>
							Label list is empty
						</Box>
						: <TransitionGroup>
							{labels.map((label) => <Collapse key={label.lid}>
								<SubCatItem
									currentItem={label}
									labels={labels} />
							</Collapse>)}
						</TransitionGroup>}
			</SettingsContentDetails>
		</>
	)
}

PageLabels.propTypes = {
	backBtnClick: PropTypes.func,
}

export default PageLabels