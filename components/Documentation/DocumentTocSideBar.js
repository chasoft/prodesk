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

import React, { createRef, forwardRef } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import { useSelector } from "react-redux"
import PostAddIcon from "@mui/icons-material/PostAdd"
import { getTextEditor } from "./../../redux/selectors"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { ExportPdfIcon } from "./../common/SvgIcons"
import { Import as BiImport } from "@styled-icons/boxicons-regular/Import"


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TocItem = forwardRef(({ sx, anchor, active, children }, ref) => {
	return (
		<a ref={ref} href={`#${anchor}`}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					px: 2, py: 0.5,
					cursor: "pointer",
					":hover": {
						color: "primary.main",
						"&>svg": {
							fill: (theme) => theme.palette.primary.main
						}
					},
					color: active ? "primary.main" : "grey.500",
					...sx
				}}
			>
				<Typography sx={{ fontSize: "0.80rem" }} noWrap>
					{children}
				</Typography>
			</Box>
		</a>
	)
})

TocItem.displayName = "TocItem"

TocItem.propTypes = {
	sx: PropTypes.object,
	anchor: PropTypes.string,
	active: PropTypes.bool,
	children: PropTypes.node
}

const RightMenuItem = ({ sx, Icon, children }) => {
	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			px: 2, py: 1,
			cursor: "pointer",
			"&>svg": {
				width: "1.25rem",
				height: "1.25rem",
				marginRight: "8px",
				fill: "#9e9e9e",
			},
			":hover": {
				backgroundColor: "action.hover",
				"&>p": { color: "primary.main" },
				"&>svg": { fill: (theme) => theme.palette.primary.main }
			},
			...sx
		}}>
			{Icon && <Icon />}
			<Typography sx={{ fontSize: "0.80rem", fontWeight: "bold", color: "grey.700" }} noWrap>{children}</Typography>
		</Box>
	)
}
RightMenuItem.propTypes = {
	sx: PropTypes.object,
	Icon: PropTypes.any,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//@Note: TOC based on https://medium.com/the-coders-guide-to-javascript/smooth-scrolling-anchor-menu-in-reactjs-175030d0bce2

const DocumentTocSideBar = () => {
	const { editorDataHeadings } = useSelector(getTextEditor)

	return (
		<Box sx={{
			position: "sticky",
			display: { xs: "none", lg: "flex" },
			flexDirection: "column",
			width: "224px",
			backgroundColor: "#FFF",
		}}>
			<div style={{ position: "sticky", top: "80px" }}>

				<Box sx={{
					borderLeft: "1px solid transparent",
					borderColor: "divider",
				}}>

					<RightMenuItem Icon={PostAddIcon}>New Article</RightMenuItem>
					<RightMenuItem Icon={BiImport}>Import</RightMenuItem>
					<RightMenuItem Icon={ExportPdfIcon} fontSize="small">Export as PDF</RightMenuItem>
					<RightMenuItem Icon={MoreHorizIcon}>More</RightMenuItem>

				</Box>

				<Box sx={{
					borderLeft: "1px solid transparent",
					borderColor: "divider",
					color: "grey.500",
					mt: 5, mb: 3
				}}>
					<Typography sx={{
						px: 2, pb: 1,
						textTransform: "uppercase",
						fontWeight: "bold",
						fontSize: "0.70rem"
					}}>
						Contents
					</Typography>

					<nav>
						{editorDataHeadings.map((item) => {
							if (item.level > 2) return null
							return (
								<TocItem
									ref={createRef()}
									key={item.id}
									anchor={item.id}
									sx={{
										py: 0.5,
										ml: (item.level === 2) ? 2 : 0
									}}
								>
									{item.title}
								</TocItem>
							)
						})}
					</nav>

				</Box>

			</div>
		</Box>
	)
}
DocumentTocSideBar.propTypes = { children: PropTypes.node }

export default DocumentTocSideBar