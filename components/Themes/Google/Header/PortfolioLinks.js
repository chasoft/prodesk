/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

import Link from "next/link"
import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Box, Button, IconButton, Typography, Tooltip, Popover, ButtonBase, Grid } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import AppsIcon from "@mui/icons-material/Apps"
import { DUMMY_PORTFOLIO_LINK } from "./DUMMY_DATA"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function PortfolioLinks({ moreBtn }) {
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (e) => { setAnchorEl(e.currentTarget) }
	const handleClose = () => { setAnchorEl(null) }
	const open = Boolean(anchorEl)
	const id = open ? "PortfolioLinks" : undefined

	return (
		<Box sx={{ display: { xs: "none", sm: "initial" } }}>
			<Tooltip title="User Menu" placement="bottom">
				<IconButton size="large" onClick={handleClick}>
					<AppsIcon sx={{ fontSize: 24 }} />
				</IconButton>
			</Tooltip>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				elevation={4}
			>
				<Grid container spacing={1} sx={{ m: 1, pr: 1, maxWidth: "310px" }}>
					{DUMMY_PORTFOLIO_LINK.map((item, idx) => (
						<Grid item key={idx}>
							<Link href={item.url} passHref>
								<a href="just-a-placeholder">
									<ButtonBase>
										<Box button
											sx={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
												height: "92px", width: "92px",
												":hover": {
													bgcolor: "#E8F0FE",
													borderRadius: "8px",
													overflow: "visible",
													textOverflow: "initial",
												},
												overflow: "hidden",
												textOverflow: "ellipsis",
												"& > p": {
													lineHeight: 1.5,
												}
											}}
										>
											<div style={{
												flexGrow: 1,
												display: "flex",
												justifyContent: "center",
												alignItems: "center"
											}}>
												<Box
													sx={{
														backgroundImage: "url(\"/avatar/default.png\")",
														backgroundPosition: `0 -${idx * 64}px`,
														height: "64px",
														width: "64px"
													}} />
											</div>
											<Typography sx={{ px: 1, py: 0.5 }}>{item.title}</Typography>
										</Box>
									</ButtonBase>
								</a>
							</Link>
						</Grid>
					))}

					{moreBtn &&
						<Box sx={{ display: "flex", justifyContent: "center", m: 2, mt: 3, flexGrow: 1, textAlign: "center" }}>
							<Link href={moreBtn.url} passHref>
								<a href="just-a-placeholder">
									<Button variant="outlined" color="primary" size="small" sx={{ fontWeight: 400 }}>
										{moreBtn.title}
									</Button>
								</a>
							</Link>
						</Box>}

				</Grid>

			</Popover>
		</Box>
	)
}
PortfolioLinks.propTypes = { moreBtn: PropTypes.object }

export default PortfolioLinks