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
import Link from "next/link"

//MATERIAL-UI
import { Box, ButtonBase, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import SettingsIcon from "@mui/icons-material/Settings"
import HomeIcon from "@mui/icons-material/Home"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const HomeButton = ({ homeUrl, settingsUrl, isExpanded }) => {

	if (isExpanded) {
		return (
			<ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						color: "#669df6",
						padding: (theme) => theme.spacing(1, 0.5, 1, 3),
						"&:hover": {
							backgroundColor: "#ffffff14",
							cursor: "pointer",
						},
						borderTop: "1px solid #2A4257",
						borderBottom: "1px solid #2A4257",
					}}
				>
					<HomeIcon style={{ height: "20px", width: "20px", marginRight: "8px" }} />
					<Link href={homeUrl}><a style={{ flexGrow: 1 }}><Typography>Dashboard</Typography></a></Link>
					<div style={{ borderRight: "1px solid #ffffff80", margin: "5px 0 5px", }}>&nbsp;</div>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Link href={settingsUrl}>
							<a>
								<Box
									color="secondary"
									aria-label="Settings"
									style={{ padding: "5px" }}
									size="large">
									<SettingsIcon style={{ color: "#fff", height: "20px", width: "20px" }} />
								</Box>
							</a>
						</Link>
					</div>
				</Box>
			</ButtonBase>
		)
	}

	return (
		<ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }}>
			<Link href={homeUrl}>
				<Tooltip title="Dashboard" placement="right">
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							textAlign: "center",
							color: "#669df6",
							padding: (theme) => theme.spacing(1, 0, 1, 0),
							"&:hover": {
								cursor: "pointer",
								backgroundColor: "#ffffff14",
							},
							borderTop: "1px solid #2A4257",
						}}
					>
						<HomeIcon style={{ height: "20px", width: "20px" }} />
					</Box>
				</Tooltip>
			</Link>
		</ButtonBase>
	)
}

HomeButton.propTypes = { homeUrl: PropTypes.string, settingsUrl: PropTypes.string, isExpanded: PropTypes.bool }

export default HomeButton