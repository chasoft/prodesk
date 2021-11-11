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

//PROJECT IMPORT

import React, { useState } from "react"
import PropTypes from "prop-types"

//MATERIAL-UI
import { Box, Button, Collapse, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { nanoid } from "nanoid"
import { useSelector } from "react-redux"
import { uniqueId, random } from "lodash"

//PROJECT IMPORT
import { getUiSettings } from "./../../../redux/selectors"
import { ColorTable, HUE, SHADE } from "../../common/ColorPicker"
import { useAddLabelMutation, useDeleteLabelMutation, useGetLabelsQuery, useUpdateLabelMutation } from "./../../../redux/slices/firestoreApi"
import { SettingsContentDetails, SettingsContentHeader, SettingsContentHelper, SettingsContentHelperLearnMore, SettingsContentHelperText } from "./../../Settings/SettingsPanel"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import SaveIcon from "@mui/icons-material/Save"
import LabelIcon from "@mui/icons-material/Label"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const LabelEditorDialog = ({ open, handleClose }) => {
	const [addLabel] = useAddLabelMutation()
	const { isSmallScreen } = useSelector(getUiSettings)
	const { data: labels, isLoading } = useGetLabelsQuery()
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth={isSmallScreen}
		>
			<DialogTitle sx={{ fontSize: "1.5em", fontWeight: 500 }}>Add New Label</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Label is advanced feature to manage your tickets in case you have so many tickets and types of tickets which Department, Category/Subcategory still not enough.
				</DialogContentText>
				<DialogContentText sx={{ mt: 1 }}>
					Please note that if you delete a label which is used, then the label will be still remained with the ticket.
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
						onClick={async () => {
							const lid = nanoid()
							const incNum = uniqueId()
							addLabel({
								lid,
								name: "Label " + incNum,
								color: Object.entries(HUE)[random(18)][1][SHADE[random(7)]]
							})
						}}
					>
						Add new
					</Button>
				</Box>

				{isLoading
					? <Box sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "100px"
					}}>
						<CircularProgress />
					</Box>
					: (labels.length === 0)
						? <div>Label list is empty</div>
						: labels.map((label) => <SubCatItem key={label.lid} currentItem={label} />)
				}
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

export const SubCatItem = ({ currentItem }) => {
	const [updateLabel] = useUpdateLabelMutation()
	const [deleteLabel] = useDeleteLabelMutation()

	//local memory
	const [color, setColor] = useState(currentItem.color)
	const [name, setName] = useState(currentItem.name)
	//
	const [showColorTable, setShowColorTable] = useState(false)

	const isModified = currentItem.color !== color || currentItem.name !== name

	const handleDeleteLabel = async () => {
		await deleteLabel({ lid: currentItem.lid })
	}

	const handleUpdateLabel = async () => {
		await updateLabel({
			...currentItem,
			name,
			color
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
							onClick={() => { setShowColorTable(true) }}
						/>
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
							}}
						/>
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
						<Typography>Select color for label <b>&quot;{name}&quot;</b></Typography>
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
				</Box>
			}

		</Box >
	)
}
SubCatItem.propTypes = { currentItem: PropTypes.object }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const PageLabels = ({ backBtnClick }) => {
	const [addLabel] = useAddLabelMutation()
	const { data: labels, isLoading } = useGetLabelsQuery()
	return (
		<>
			<SettingsContentHeader
				backBtnOnClick={() => backBtnClick(false)}
				rightButton={
					<Button
						startIcon={<AddIcon />}
						size="small"
						variant="contained"
						onClick={async () => {
							const lid = nanoid()
							const incNum = uniqueId()
							addLabel({
								lid,
								name: "Label " + incNum,
								color: Object.entries(HUE)[random(18)][1][SHADE[random(7)]]
							})
						}}
					>
						Add new
					</Button>
				}
			>
				Labels
			</SettingsContentHeader>

			<SettingsContentHelper>
				<SettingsContentHelperText>
					Support tickets are categorized by Department, Category &amp; Sub-Category and now you can have deeper categorization by creating labels.
				</SettingsContentHelperText>
				<SettingsContentHelperText>
					Please note that if you delete a label which is used, then the label will be still remained with the ticket.
					<SettingsContentHelperLearnMore target="/docs" />
				</SettingsContentHelperText>

			</SettingsContentHelper>

			<SettingsContentDetails>
				{isLoading
					? <Box sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "200px"
					}}>
						<CircularProgress />
					</Box>
					: (labels.length === 0)
						? <div>Label list is empty</div>
						: labels.map((label) => <SubCatItem key={label.lid} currentItem={label} />)
				}
			</SettingsContentDetails>
		</>
	)
}

PageLabels.propTypes = {
	backBtnClick: PropTypes.func,
}

export default PageLabels