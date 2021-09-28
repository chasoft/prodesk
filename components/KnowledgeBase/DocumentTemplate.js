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
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Grid, Paper, Typography } from "@mui/material"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined"
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DOC_TEMPLATES = [
	{
		icon: MenuBookOutlinedIcon,
		name: "Guide",
		description: "Provide step by step instructions.",
		content: "conettdfsdfdsf",
	},
	{
		icon: HelpOutlineOutlinedIcon,
		name: "FAQ",
		description: "Answer frequently asked questions.",
		content: "Answer frequently asked questions.",
	},
	{
		icon: AssignmentOutlinedIcon,
		name: "Changelog",
		description: "List product releases and changes",
		content: "List product releases and changes"
	},
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DocumentTemplate = ({ setTextEditorData }) => {
	return (
		<Box sx={{ mt: 5 }}>
			<Typography sx={{
				textTransform: "uppercase",
				color: "grey.500",
				fontWeight: "bold",
				mb: 3
			}}>
				OR GET STARTED WITH A TEMPLATE
			</Typography>

			<Grid container spacing={4}>
				{DOC_TEMPLATES.map((template) => (
					<Grid item sx={12} sm={6} key={template.name}>
						<Paper
							elevation={4}
							onClick={() => { setTextEditorData(template.content); console.log("Clicked") }}
							sx={{
								p: 3,
								border: "1px solid transparent",
								cursor: "pointer",
								"&:hover": {
									border: "1px solid",
									borderColor: "primary.main"
								}
							}}
						>

							<Box sx={{
								display: "flex",
								alignItems: "center",
								mb: 1,
								"&>svg": {
									mr: 1
								}
							}}>
								{<template.icon fontSize="small" />}
								<Typography>{template.name}</Typography>
							</Box>

							<Typography sx={{
								color: "grey.500",
								fontSize: "0.75rem"
							}}>
								{template.description}
							</Typography>

						</Paper>
					</Grid>
				))}
			</Grid>

		</Box>
	)
}
DocumentTemplate.propTypes = { setTextEditorData: PropTypes.func }

export default DocumentTemplate