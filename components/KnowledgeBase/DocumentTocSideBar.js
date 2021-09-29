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
import { Box, Typography } from "@mui/material"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PostAddIcon from "@mui/icons-material/PostAdd"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TocItem = ({ children }) => {
	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			px: 2, py: 0.5,
			cursor: "pointer",
			":hover": {
				color: "primary.main",
				"&>svg": {
					fill: (theme) => theme.palette.primary.main
				}
			}
		}}>
			<Typography sx={{ fontSize: "0.80rem" }} noWrap>{children}</Typography>
		</Box>
	)
}
TocItem.propTypes = { children: PropTypes.node }

const ListItem = ({ sx, Icon, children }) => {
	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			px: 2, py: 1,
			cursor: "pointer",
			":hover": {
				backgroundColor: "action.hover",
				color: "primary.main",
				"&>svg": {
					fill: (theme) => theme.palette.primary.main
				}
			},
			...sx
		}}>
			{Icon && <Icon
				fontSize="small"
				sx={{
					mr: 1,
					fill: (theme) => theme.palette.grey[500]
				}} />}

			<Typography noWrap>{children}</Typography>
		</Box>
	)
}
ListItem.propTypes = {
	sx: PropTypes.object,
	Icon: PropTypes.object,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DocumentTocSideBar = () => {
	return (
		<Box sx={{
			position: "sticky",
			display: { xs: "none", lg: "flex" },
			flexDirection: "column",
			width: "224px",
			pt: 4
		}}>

			<Box sx={{
				borderLeft: "1px solid transparent",
				borderColor: "divider",
			}}>

				<ListItem Icon={PostAddIcon}>New Article</ListItem>
				<ListItem Icon={MoreHorizIcon}>More...</ListItem>

			</Box>

			<Box sx={{
				borderLeft: "1px solid transparent",
				borderColor: "divider",
				color: "grey.500",
				mt: 5
			}}>
				<Typography sx={{
					px: 2, pb: 1,
					textTransform: "uppercase",
					fontWeight: "bold",
					fontSize: "0.70rem"
				}}>
					Contents
				</Typography>

				<TocItem sx={{ py: 0.5 }}>New Article</TocItem>
				<TocItem sx={{ py: 0.5 }}>Title 2 dkdie veyr long titlekekd</TocItem>

			</Box>

		</Box>
	)
}
DocumentTocSideBar.propTypes = { children: PropTypes.node }

export default DocumentTocSideBar