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

import React, { useCallback, useMemo } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { styled } from "@mui/material/styles"
import { Box, Button, IconButton, Typography, InputBase } from "@mui/material"

//THIRD-PARTY
import { filter } from "lodash"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { RightMenuItemAddNewDoc, RightMenuItemDelete, RightMenuItemExportPDF, RightMenuItemImport } from "./../DocumentTocSideBar"
import { getUiSettings, getDocsCenter } from "./../../../redux/selectors"

//ASSETS
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { DOC_TYPE } from "../../../helpers/constants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TypographyHeader = styled(Typography)(({ theme }) => ({
	fontWeight: 700,
	textTransform: "uppercase",
	color: theme.palette.grey[500]
}))


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarDetails = ({ open, handleClose }) => {
	const { sideBarLeft } = useSelector(getUiSettings)
	const { docsList, activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)

	//Usage: access properties from `DocItem[0].`
	const DocItem = useMemo(() => filter(docsList, (i) => i.docId === activeDocIdOfTocSideBarDetails),
		[activeDocIdOfTocSideBarDetails, docsList])

	const handleSaveDetails = useCallback(() => {
		//Update doc's properties
	}, [])

	if (DocItem.length === 0) return null

	return (
		<>
			<Box sx={{
				position: "fixed",
				zIndex: 150,
				display: "flex",
				flexDirection: "column",
				alignItems: "stretch",
				left: `${sideBarLeft + 556}px`,
				minWidth: "385px",
				height: "100%",
				backgroundColor: "#FFF",
				borderRight: "1px solid",
				borderColor: "divider",
				...(open ?
					{
						opacity: 1,
						visibility: "visible",
						transition: "0.5s opacity, 0 0.5s visibility"
					} : {
						opacity: 0,
						visibility: "hidden",
						transition: "0.5s opacity, 0.5s visibility"
					}
				)
			}}>
				<Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					px: 3, py: 1,
					borderBottom: "1px solid transparent",
					borderColor: "divider",
				}}>
					<TypographyHeader>{DocItem[0].Type}</TypographyHeader>
					<IconButton onClick={() => { handleClose() }}>
						<ArrowBackIcon />
					</IconButton>
				</Box>

				<Box sx={{
					mx: 3, pt: 3, pb: 3,
					borderBottom: "1px solid transparent",
					borderColor: "divider",
				}}>
					<form onSubmit={(e) => { e.preventDefault() }}>


						<TypographyHeader sx={{ mb: 1 }}>
							Title
						</TypographyHeader>
						<InputBase
							value={DocItem[0].title}
							id="doc-title" variant="outlined" fullWidth
							sx={{
								px: 1, py: 0.5,
								color: "grey.800",
								border: "1px solid transparent",
								borderColor: "divider",
							}}
						/>

						<TypographyHeader sx={{ mt: 3, mb: 1 }}>
							{(DocItem[0].type === DOC_TYPE.EXTERNAL) ? "URL" : "SLUG"}
						</TypographyHeader>
						<InputBase
							value={(DocItem[0].type === DOC_TYPE.EXTERNAL) ? DocItem[0].url : DocItem[0].slug}
							id="doc-slug-or-url" variant="outlined" fullWidth
							sx={{
								px: 1, py: 0.5,
								color: "grey.800",
								border: "1px solid transparent",
								borderColor: "divider",
							}}
						/>

						<Box sx={{
							display: "flex",
							justifyContent: "space-between",
							mt: 3, pt: 3,
							borderTop: "1px solid transparent",
							borderColor: "divider",
						}}>
							<Button
								onClick={() => { handleClose() }}
								variant="outlined"
								color="primary"
								sx={{ px: 3 }}
							>
								Cancel
							</Button>
							<Button
								onClick={() => { handleSaveDetails() }}
								type="submit"
								variant="contained"
								color="primary"
								sx={{ px: 3 }}
							>
								Save
							</Button>
						</Box>

					</form>
				</Box>

				<Box sx={{ mt: 3 }}>

					<RightMenuItemAddNewDoc sx={{ px: 3 }} />
					<RightMenuItemImport sx={{ px: 3 }} />

					{(DocItem[0].type === DOC_TYPE.CATEGORY) &&
						<RightMenuItemDelete title="Delete this category" sx={{ px: 3 }} />}

					{(DocItem[0].type === DOC_TYPE.SUBCATEGORY) &&
						<RightMenuItemDelete title="Delete this sub-category" sx={{ px: 3 }} />}

					{(DocItem[0].type === DOC_TYPE.DOC) &&
						<RightMenuItemExportPDF sx={{ px: 3 }} />}

					{(DocItem[0].type === DOC_TYPE.DOC || DocItem[0].type === DOC_TYPE.EXTERNAL) &&
						<RightMenuItemDelete sx={{ px: 3 }} />}

				</Box>
			</Box >

			<Box
				onClick={() => { handleClose() }}
				sx={{
					position: "fixed",
					zIndex: 149,
					display: open ? "block" : "none",
					left: `${sideBarLeft + 556}px`,
					minWidth: "100%",
					height: "100%",
					backgroundColor: "action.disabled",
				}}
			/>
		</>
	)
}
TocSideBarDetails.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
}

export default TocSideBarDetails