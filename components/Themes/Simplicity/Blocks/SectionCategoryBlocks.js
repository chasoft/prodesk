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

import React from "react"
import Link from "next/link"

//THIRD-PARTY
import { orderBy } from "lodash"

//MATERIAL-UI
import { Box, Typography } from "@mui/material"
import { CustomContainer } from "@components/Themes/Simplicity/Blocks/CustomContainer"
import { CircularProgressBox } from "@components/common"
import { useGetDocsCategoriesList } from "@helpers/useGetDocs"
import { DOC_STATUS } from "@helpers/constants"

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const SectionCategoryBlocks = () => {

	const {
		data: list,
		isLoading
	} = useGetDocsCategoriesList()

	if (isLoading) return <CircularProgressBox minHeight="70vh" />

	const sortedList = orderBy(list, ["position"])

	return (
		<Box component="section" sx={{
			margin: "24px 0 40px 0"
		}}>
			<CustomContainer>
				<Box
					display="grid"
					gridTemplateColumns={{ xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
					gap={6}
					padding={{ xs: "0 20px", sm: "0 40px", md: "0" }}
				>
					{sortedList.map(category => {
						if (category.status === DOC_STATUS.DRAFT) return null
						return (
							<Box key={category.docId} sx={{
								backgroundImage: `url(${category.photo ? category.photo : ""})`,
								backgroundColor: category.photoColor ? category.photoColor : "#cca3ff",
								color: "rgba(0, 0, 0, 1)",
								height: { xs: "350px", sm: "400px", md: "450px", lg: "500px" },
								borderRadius: "8px",
								display: "flex",
								backgroundPosition: "center",
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat"
							}}>
								<Box sx={{
									marginTop: "auto",
									textAlign: "center",
									width: "100%"
								}}>
									<Link href={"/categories/" + category.docId + "-" + category.slug} passHref>
										<a href="just-a-placeholder">
											<Typography variant="h3" sx={{
												fontSize: { xs: "1.4em", sm: "1.6em", md: "1.8em" },
												marginBottom: "0",
												lineHeight: "initial",
												wordBreak: "break-word",
												padding: "24px 0",
												color: "inherit"
											}}>
												{category.category}
											</Typography>
										</a>
									</Link>
								</Box>
							</Box>
						)
					})}
				</Box>

			</CustomContainer >
		</Box >
	)
}