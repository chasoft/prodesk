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


import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import TextEditor from "./../../common/TextEditor"
import { SettingsContentActionBar, SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesAddNew = ({ backBtnClick }) => {
	const [textEditorData, setTextEditorData] = useState("")
	return (
		<>

			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				New canned reply
			</SettingsContentHeader>

			<SettingsContentDetails
				sx={{
					display: "flex", flexDirection: "column", pt: { xs: 3, sm: 0 }
				}}
			>
				<FormControl variant="standard" fullWidth>
					<InputLabel id="demo-simple-select-label">Group</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={20}
						label="Age"
						onChange={() => { }}
					>
						<MenuItem value={10}>Group 1</MenuItem>
						<MenuItem value={20}>Group 2</MenuItem>
						<MenuItem value={30}>Group 3</MenuItem>
						<MenuItem value={40}>Group 4</MenuItem>
					</Select>
				</FormControl>

				<Box sx={{ py: 2 }}>
					<TextField
						id="lableName" label="Canned reply description" variant="standard"
						fullWidth
					/>
				</Box>

				<Box sx={{ pl: 4, py: 1, mb: 3, border: "1px solid #FAFAFA" }}>
					<TextEditor
						defaultValue=""
						pullEditorData={setTextEditorData}
					/>
				</Box>

			</SettingsContentDetails>

			<SettingsContentActionBar>

				<Button
					variant="outlined"
					onClick={() => { backBtnClick(false) }}
				>
					Cancel
				</Button>

				<Button
					variant="contained" color="primary"
					onClick={() => {
						console.log("Add new canned replied:", textEditorData)
						// Go to the group of new canned 
						// dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.OVERVIEW))
					}}
				>
					Add
				</Button>

			</SettingsContentActionBar>
		</>
	)
}

CannedRepliesAddNew.propTypes = {
	backBtnClick: PropTypes.func,
}

export default CannedRepliesAddNew