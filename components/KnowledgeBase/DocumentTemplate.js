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
		content: "guide template here",
	},
	{
		icon: HelpOutlineOutlinedIcon,
		name: "FAQ",
		description: "Answer frequently asked questions.",
		content: "FAQ template here",
	},
	{
		icon: AssignmentOutlinedIcon,
		name: "Changelog",
		description: "List product releases and changes",
		content: "Changelog template here"
	},
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DocumentTemplate = ({ setDefaultEditorData }) => {
	return (
		<Box sx={{ mt: 6 }}>
			<Typography sx={{
				textTransform: "uppercase",
				color: "grey.500",
				fontWeight: "bold",
				mb: 3
			}}>
				OR GET STARTED WITH A TEMPLATE
			</Typography>

			<Grid container spacing={4}>
				{DOC_TEMPLATES.map((template, idx) => (
					<Grid item xs={12} sm={6} key={idx}>
						<Paper
							elevation={0}
							onClick={() => { setDefaultEditorData(template.content) }}
							sx={{
								p: 3,
								border: "1px solid transparent",
								borderColor: "divider",
								cursor: "pointer",
								"&:hover": {
									border: "1px solid",
									borderColor: "primary.main",
									"& > p": {
										color: "grey.900"
									}
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
DocumentTemplate.propTypes = {
	setDefaultEditorData: PropTypes.func,
}

export default DocumentTemplate