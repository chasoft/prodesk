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
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
// import { useDispatch } from "react-redux"

//PROJECT IMPORT
// import { getUiSettings } from "../../../../redux/selectors"
import updateUiSettings from "../../../../helpers/updateUiSettings"
import { getLayout, TICKET_SETTINGS_NAMES } from "../../../../components/Settings/InnerLayoutTickets"
import { SettingsContainer, SettingsContent, SettingsContentHeader, SettingsContentHelper, SettingsContentHelperLearnMore, SettingsContentHelperText, SettingsHeader } from "../../../../components/common/SettingsPanel"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import LabelPopupAddOrModify, { LabelPopupModifyColor } from "../../../../components/common/SettingsPanel/LabelPopup"

/*****************************************************************
 * DUMMY DATA                                                    *
 *****************************************************************/

const DUMMY_LABELS = [
	{
		id: 1,
		labelName: "Label 1",
		labelColor: "#EAF",
	},
	{
		id: 2,
		labelName: "Label 2",
		labelColor: "#000",
	},
	{
		id: 3,
		labelName: "Label 3",
		labelColor: "#F1F",
	},
	{
		id: 4,
		labelName: "Label 4",
		labelColor: "#AAF",
	},
	{
		id: 5,
		labelName: "Label 5",
		labelColor: "#BBB",
	},
]

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const TAG_PAGES = {

}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketSettingsLabel() {

	updateUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.LABEL,
		background: {
			height: "132px",
			backgroundImage: ""
		}
	})

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>Label</Typography>
				<Button
					variant="contained" color="primary" size="small" startIcon={<AddIcon />}
					onClick={() => { }}
				>
					Add New
				</Button>
			</SettingsHeader>

			<SettingsContainer>

				<SettingsContent>

					<SettingsContentHeader hasBackBtn={false}>
						Labels
					</SettingsContentHeader>

					<SettingsContentHelper>

						<SettingsContentHelperText>
							Department Overview Department Overview Department Overview Department Overview Department Overview
							Department Overview Department Overview Department Overview Department
							<SettingsContentHelperLearnMore target="/admin" />
						</SettingsContentHelperText>

					</SettingsContentHelper>


					{DUMMY_LABELS.map((item) => (
						<Box
							key={item.id}
							sx={{
								display: "flex",
								py: 2, px: 3,
								"&:hover": { bgcolor: "action.hover" },
								"&:last-child:hover": {
									borderBottomLeftRadius: "0.5rem",
									borderBottomRightRadius: "0.5rem",
								},
							}}
						>
							<Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
								<LabelPopupModifyColor
									labelColor={item.labelColor}
									btnAction={() => { }}
								>
									<Box
										sx={{
											borderRadius: "50%",
											bgcolor: item.labelColor,
											width: 40, height: 40,
											mr: 2,
											"&:hover": {
												cursor: "pointer"
											}
										}}
									/>
								</LabelPopupModifyColor>
								<Typography variant="caption" style={{ margin: 0 }}>
									{item.labelName}
								</Typography>
							</Box>

							<Box sx={{ display: "flex", alignItems: "center" }}>
								<LabelPopupAddOrModify
									labelName={item.labelName}
									labelColor={item.labelColor}
									btnCaption="Edit"
									btnAction={(label, color) => { console.log("Update label with value", label, color) }}
								>
									<Tooltip title="Edit label" placement="bottom">
										<IconButton>
											<EditIcon />
										</IconButton>
									</Tooltip>
								</LabelPopupAddOrModify>
							</Box>

						</Box>
					))}


				</SettingsContent>
			</SettingsContainer>
		</>
	)
}

TicketSettingsLabel.getLayout = getLayout

export default TicketSettingsLabel