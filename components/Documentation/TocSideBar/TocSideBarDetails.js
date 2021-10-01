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
import { styled } from "@mui/material/styles"
import { Box, Button, IconButton, Typography, InputBase } from "@mui/material"

//THIRD-PARTY
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { RightMenuItem } from "./../DocumentTocSideBar"
import { getUiSettings } from "./../../../redux/selectors"

//ASSETS
import PostAddIcon from "@mui/icons-material/PostAdd"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { ExportPdfIcon } from "./../../../components/common/SvgIcons"
import { Import as BiImport } from "@styled-icons/boxicons-regular/Import"

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
	return (
		<>
			<Box sx={{
				position: "fixed",
				zIndex: 150,
				display: open ? "flex" : "none",
				// flexDirection: { flexDirection: "column" },
				flexDirection: "column",
				alignItems: "stretch",
				left: `${sideBarLeft + 556}px`,
				minWidth: "385px",
				height: "100%",
				backgroundColor: "#FFF",
				borderRight: "1px solid",
				borderColor: "divider",
			}}>
				<Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					px: 3, py: 1,
					borderBottom: "1px solid transparent",
					borderColor: "divider",
				}}>
					<TypographyHeader>{"Page"}</TypographyHeader>
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
							{"Title"}
						</TypographyHeader>
						<InputBase
							id="doc-title" variant="outlined" fullWidth
							sx={{
								px: 1, py: 0.5,
								color: "grey.800",
								border: "1px solid transparent",
								borderColor: "divider",
							}}
						/>

						<TypographyHeader sx={{ mt: 3, mb: 1 }}>
							{"Slug"}
						</TypographyHeader>
						<InputBase
							id="doc-slug" variant="outlined" fullWidth
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
								variant="outlined"
								color="primary"
								sx={{ px: 3 }}
							>
								Cancel
							</Button>
							<Button
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

					<RightMenuItem Icon={PostAddIcon} sx={{ px: 3 }}>
						New Article
					</RightMenuItem>
					<RightMenuItem Icon={BiImport} sx={{ px: 3 }}>
						Import
					</RightMenuItem>
					<RightMenuItem Icon={ExportPdfIcon} fontSize="small" sx={{ px: 3 }}>
						Export as PDF
					</RightMenuItem>
					<RightMenuItem Icon={DeleteOutlinedIcon} sx={{ px: 3 }}>
						Delete
					</RightMenuItem>

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