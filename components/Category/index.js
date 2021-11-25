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
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, ButtonBase, Grid, Typography } from "@mui/material"

//THIRD-PARTY
import { findKey } from "lodash"

//PROJECT IMPORT
import { CircularProgressBox } from "@components/common"
import useGroupedDocs from "@helpers/useGroupedDocs"
import { DOC_TYPE, RESERVED_KEYWORDS } from "@helpers/constants"

//ASSETS
import LaunchIcon from "@mui/icons-material/Launch"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const UiDocList = ({ sx, children }) => (
	<Box
		component="ul"
		sx={{
			padding: 0,
			cursor: "pointer",
			listStyle: "none",
			color: "primary.main",
			"& > li": { display: "flex", px: 2, py: 1 },
			"& > li:hover": {
				backgroundColor: "#E8F0FE"
			},
			...sx
		}}
	>
		{children}
	</Box>
)
UiDocList.propTypes = { sx: PropTypes.object, children: PropTypes.node }

const UiDocItem = ({ item }) => (
	<li>
		<Link href={item.url ?? `/${item.slug}`} passHref>
			<ButtonBase sx={{ textAlign: "left" }}>
				{item.title}

				{(item.type === DOC_TYPE.EXTERNAL)
					? <LaunchIcon sx={{
						fontSize: "1.2rem", mx: 0.5
					}} />
					: null}
			</ButtonBase>
		</Link>
	</li>
)
UiDocItem.propTypes = { item: PropTypes.object }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Category() {
	const { data: docsList, isLoading } = useGroupedDocs()
	console.log("docsList", docsList)

	return (
		<Box component="main"
			sx={{
				border: "1px solid",
				borderRadius: "0.5rem",
				borderColor: "divider",
				margin: { xs: "2rem 0 0", sm: "2.625rem 0 0" }
			}}
		>
			<Box sx={{ padding: { xs: 3, md: 8 } }}>

				{isLoading
					? <CircularProgressBox />
					: docsList.map((cat, idx) => (
						<Box key={cat[0]} sx={{ mt: idx > 1 ? 3 : 0 }}>
							<Typography
								variant="h1"
								sx={{ marginBottom: "1rem", fontSize: { xs: "1.5rem", sm: "1.75rem" } }}
							>
								{cat[0]}
							</Typography>
							<Box sx={{ mb: 2 }}>
								{cat[1]["undefined"][0].description}
							</Box>
							{Object.entries(cat[1]).map((subcat) => {
								if (subcat[0] === RESERVED_KEYWORDS.CAT_CHILDREN) {
									return (
										<UiDocList key={RESERVED_KEYWORDS.CAT_CHILDREN} sx={{
											"& > li": { display: "flex", px: 2, py: 1, ml: -2 },
										}}>
											{subcat[1].map(item => <UiDocItem key={item.docId} item={item} />)}
										</UiDocList>
									)
								}

								if (subcat[0] === RESERVED_KEYWORDS.CAT) return null

								//position of Sub-Category in the list
								const subCatIndex = findKey(subcat[1], { type: DOC_TYPE.SUBCATEGORY })

								return (
									<Grid container key={subcat[1][subCatIndex].docId}>
										<Grid item sm={12} md={6}>

											<Typography variant="h2" sx={{ pl: 2 }}>{subcat[1][subCatIndex].subcategory}</Typography>

											<Box sx={{ pl: 2 }}>
												{subcat[1][subCatIndex].description}
											</Box>
											<UiDocList>
												{subcat[1].map((item, idx) => {
													//bypass position of the sub-category
													if (idx == subCatIndex) return null

													return <UiDocItem key={item.docId} item={item} />
												})}
											</UiDocList>
										</Grid>
									</Grid>
								)
							})}

						</Box>
					))}
			</Box>
		</Box>
	)
}

export default Category