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
import { Box, Button, IconButton, InputBase, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { uniqueId, random } from "lodash"
import { nanoid } from "nanoid"

//PROJECT IMPORT
import { useAddLabelMutation, useDeleteLabelMutation, useGetLabelsQuery, useUpdateLabelMutation } from "./../../../redux/slices/firestoreApi"
import { SettingsContentDetails, SettingsContentHeader, SettingsContentHelper, SettingsContentHelperLearnMore, SettingsContentHelperText } from "./../../Settings/SettingsPanel"

//ASSETS
import LabelIcon from "@mui/icons-material/Label"
import { ColorTable, HUE, SHADE } from "../../common/ColorPicker"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import SaveIcon from "@mui/icons-material/Save"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


export const SubCatItem = ({ currentItem }) => {

	const [updateLabel] = useUpdateLabelMutation()
	const [deleteLabel] = useDeleteLabelMutation()

	//local memory
	const [color, setColor] = useState(currentItem.color)
	const [name, setName] = useState(currentItem.name)
	//
	const [showColorTable, setShowColorTable] = useState(false)

	const isModified = currentItem.color !== color || currentItem.name !== name

	return (
		<Box sx={{
			display: "flex",
			px: 2,
			":hover": {
				backgroundColor: "action.hover",
			},
		}}>

			<Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>

				<Box sx={{ display: "flex", alignItems: "center" }}>

					{!showColorTable &&
						<>
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
						</>
					}

					{showColorTable &&
						<Box sx={{ py: 2, justifyItems: "center" }}>
							<Typography sx={{ pb: 1 }}>Select color for label <b>&quot;{name}&quot;</b></Typography>
							<ColorTable getSelectedColor={(color) => {
								setColor(color)
								setShowColorTable(false)
							}} />
						</Box>
					}
				</Box>

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
								onClick={async () => {
									await updateLabel({
										lid: currentItem.lid,
										name,
										color
									})
								}}
							>
								<SaveIcon fontSize="small" color="warning" />
							</IconButton>
						</Tooltip>}

					<Tooltip title="Delete" placement="right">
						<IconButton
							sx={{ ":hover": { color: "warning.main" } }}
							onClick={async () => { await deleteLabel({ lid: currentItem.lid }) }}
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
	const { data: labels, isLoading } = useGetLabelsQuery()
	// const [color, setColor] = useState("#FFFFFF")

	const [addLabel] = useAddLabelMutation()

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
							const lid = nanoid(7)
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
					<SettingsContentHelperLearnMore target="/docs" />
				</SettingsContentHelperText>

			</SettingsContentHelper>

			<SettingsContentDetails>
				{isLoading
					? <div>Loading..</div>
					: labels.map((label) => <SubCatItem key={label.lid} currentItem={label} />)}

				{/* <Box sx={{
					display: "flex",
				}}>
					<Box
						sx={{
							width: 8, height: 8, backgroundColor: color
						}}
					>
						{color}
					</Box>
					<ColorTable
						getSelectedColor={setColor}
					/>

				</Box> */}

			</SettingsContentDetails>
		</>
	)
}

PageLabels.propTypes = {
	backBtnClick: PropTypes.func,
}

export default PageLabels