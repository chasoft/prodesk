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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, Popover, TextField } from "@mui/material"
import { ColorPickerBase } from "../../common/ColorPicker"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS


/*****************************************************************
 * EXPORT                                                        *
 *****************************************************************/

export function LabelPopupModifyColor({ labelColor, btnAction, children }) {
	const [color, setColor] = useState(labelColor)
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (e) => { setAnchorEl(e.currentTarget) }
	const handleClose = () => { setAnchorEl(null) }

	const open = Boolean(anchorEl)
	const id = open ? "LabelPopupModifyColor" : undefined

	return (
		<>
			<span onClick={handleClick}>{children}</span>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "left" }}
			>
				<ColorPickerBase position="top" getSelectedColor={setColor}>
					<Box
						sx={{
							mb: 1,
							display: "flex",
							alignItems: "center"
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexGrow: 1,
								mr: 1,
								height: 40,
								bgcolor: color,
								color: "#FFF",
								border: "1px solid silver"
							}}
						>
							{color}
						</Box>
						<Button
							color="primary"
							variant="contained"
							onClick={() => {
								btnAction(color)
								handleClose()
							}}
						>
							OK
						</Button>
					</Box>
				</ColorPickerBase>
			</Popover>
		</>
	)
}
LabelPopupModifyColor.propTypes = {
	labelColor: PropTypes.string,
	btnAction: PropTypes.func,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function LabelPopupAddOrModify({ labelName, labelColor, btnCaption, btnAction, children }) {
	const [color, setColor] = useState(labelColor)
	const [name, setName] = useState(labelName)
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (e) => { setAnchorEl(e.currentTarget) }
	const handleClose = () => { setAnchorEl(null) }

	const open = Boolean(anchorEl)
	const id = open ? "LabelPopupAddOrRemove" : undefined

	return (
		<>
			<span onClick={handleClick}>{children}</span>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "left" }}
			>
				<ColorPickerBase position="top" getSelectedColor={setColor}>
					<Box
						sx={{
							mb: 1,
							display: "flex",
							alignItems: "center"
						}}
					>
						<Box
							sx={{
								height: 70, width: 70,
								bgcolor: color,
								color: "#FFF",
								border: "1px solid silver",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							}}
						>{color}</Box>

						<TextField
							sx={{ flexGrow: 1, mx: 1 }}
							id="lableName" label="Label name" variant="standard"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Button
							color="primary"
							variant="contained"
							onClick={() => {
								btnAction(name, color)
								handleClose()
							}}
						>
							{btnCaption}
						</Button>
					</Box>
				</ColorPickerBase>
			</Popover>
		</>
	)
}
LabelPopupAddOrModify.propTypes = {
	labelName: PropTypes.string,
	labelColor: PropTypes.string,
	btnCaption: PropTypes.string,
	btnAction: PropTypes.func,
	children: PropTypes.node
}