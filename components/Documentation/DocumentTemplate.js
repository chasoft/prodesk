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
import { Box, Grid, Paper, Typography } from "@mui/material"

//THIRD-PARTY
import { random } from "lodash"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT

//ASSETS
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined"
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"
import { useUpdateDocContentMutation } from "../../redux/slices/firestoreApi"
import { getAuth, getDocsCenter } from "../../redux/selectors"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DOC_TEMPLATES = [
	{
		icon: MenuBookOutlinedIcon,
		name: "Guide",
		description: "Provide step by step instructions.",
		content:
			`
# Getting Super Powers
Becoming a superhero is a fairly straightforward process
\\
\`\`\`powershell
$ give me super-powers
\`\`\`
\\
:::info
Super-powers are granted randomly so please submit an issue if you're not happy with yours.
:::
Once you're strong enough, save the world
\\
\`\`\`bash
# Ain't no code for that yet, sorry
echo 'You got to trust me on this, I saved the world'
\`\`\`
`,
	},
	{
		icon: HelpOutlineOutlinedIcon,
		name: "FAQ",
		description: "Answer frequently asked questions.",
		content:
			`
# Can I become who I want to be?

‌That's a tough question but thankfully, our team is on it. Please bear with us while we're investigating.

# Have you had a chance to answer the previous question?

Yes, after a few months we finally found the answer. Sadly, Mike is on vacation right now so I'm afraid we are not able to provide the answer at this point.
`,
	},
	{
		icon: AssignmentOutlinedIcon,
		name: "Changelog",
		description: "List product releases and changes",
		content:
			`
# 15.0.0 - 2042-12-03

## Fixed

* Removed humans, they weren't doing fine with animals.

## Changed

* Animals are now super cute, all of them.

# 14.0.0 - 2042-10-06

## Added

* Introduced animals into the world, we believe they're going to be a neat addition.

\
`
	},
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DocumentTemplate = () => {
	const [updateDocContent] = useUpdateDocContentMutation()
	const { currentUser } = useSelector(getAuth)
	const { activeDocId } = useSelector(getDocsCenter)
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
							onClick={async () => {
								console.log("before update:", template.content)
								const res = await updateDocContent({
									docItem: {
										docId: activeDocId,
										updatedBy: currentUser.username
									},
									content: { text: template.content }
								}).unwrap()
								console.log(res.data)
							}}
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
								<Typography sx={{ fontWeight: 500 }}>{template.name}</Typography>
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

export default DocumentTemplate