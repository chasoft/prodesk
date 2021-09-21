/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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

import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/system"

// MATERIAL-UI
import {
	red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey
} from "@mui/material/colors"
import { Typography } from "@mui/material"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const SHADE = [500, 300, 400, 600, 700, 800, 900]
const HUE = { red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey }

const ListColors = ({ colorFamily, selectedColor, setSelectedColor, size = 30 }) => (
	<>
		{
			SHADE.map((item, idx) => (
				<Box
					key={idx} sx={{
						width: size, height: size,
						bgcolor: colorFamily[item],
						borderRadius: (selectedColor === colorFamily[item]) ? "50%" : 0,
						":hover": {
							borderRadius: (selectedColor === colorFamily[item]) ? "50%" : 8,
						}
					}}
					onClick={() => { setSelectedColor(colorFamily[item]) }}
				/>
			))
		}
	</>
)
ListColors.propTypes = {
	colorFamily: PropTypes.any,
	selectedColor: PropTypes.string,
	setSelectedColor: PropTypes.func,
	size: PropTypes.number
}

export function ColorPickerBase({ position, getSelectedColor, children }) {
	const [selectedColor, setSelectedColor] = useState("")

	const handleSelectedColor = useCallback(
		(color) => {
			setSelectedColor(color)
			getSelectedColor(color)
		}
	)

	return (
		<Box sx={{ p: 1 }}>

			{position === "top" ? children : null}

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(11, 0fr)",
					width: 332,
					border: "1px solid silver"
				}}
			>
				{Object.entries(HUE).map(([key, value]) => (
					<ListColors
						key={key}
						selectedColor={selectedColor}
						setSelectedColor={handleSelectedColor}
						colorFamily={value}
					/>
				))}
			</Box>

			{position === "bottom" ? children : null}

		</Box>
	)
}
ColorPickerBase.propTypes = {
	position: PropTypes.oneOf(["top", "bottom"]),
	getSelectedColor: PropTypes.func,
	children: PropTypes.node,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function ColorPicker({ getSelectedColor }) {
	const [selectedColor, setSelectedColor] = useState("")

	const handleSelectedColor = useCallback(
		(color) => {
			setSelectedColor(color)
			getSelectedColor(color)
		}, [selectedColor]
	)

	return (
		<ColorPickerBase position="bottom" getSelectedColor={handleSelectedColor}>
			<Box sx={{ display: "flex", mt: 1 }}>
				<Box
					sx={{
						display: "flex",
						flexGrow: 1,
						alignItems: "center",
						justifyContent: "center",
						height: 70,
						bgcolor: selectedColor,
						border: "1px solid silver"
					}}
				>
					<Typography sx={{ color: selectedColor ? "#FFF" : "#000" }}>Current selected color</Typography>
				</Box>
			</Box>
		</ColorPickerBase>
	)
}
ColorPicker.propTypes = { getSelectedColor: PropTypes.func }

