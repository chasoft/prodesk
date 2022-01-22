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

import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

//MATERIAL-UI
import { Box, IconButton, ButtonBase, Tooltip, Typography, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import SettingsIcon from "@mui/icons-material/Settings"
import HomeIcon from "@mui/icons-material/Home"
import ArrowRight from "@mui/icons-material/ArrowRight"
import { useRouter } from "next/router"


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const HomeButton = React.memo(function _HomeButton({ homeUrl, settingsUrl, settingsTooltip, isExpanded }) {
	const router = useRouter()
	const anchorRef = useRef(null)
	const [open, setOpen] = useState(false)
	const prevOpen = useRef(open)

	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus()
		}
		prevOpen.current = open
	}, [open])

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
	}

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}
		setOpen(false)
	}

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault()
			setOpen(false)
		} else if (event.key === "Escape") {
			setOpen(false)
		}
	}

	if (isExpanded) {
		return (
			<Box sx={{ display: "block", width: "100%", textAlign: "left" }}>
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
					<Link href={homeUrl} passHref>
						<a href="just-a-placeholder" style={{ flexGrow: 1 }}>
							<Typography>Dashboard</Typography>
						</a>
					</Link>

					<div style={{ borderRight: "1px solid #ffffff80", margin: "5px 0 5px", }}>&nbsp;</div>

					<Tooltip arrow title={settingsTooltip} placement="right">
						<IconButton
							ref={anchorRef}
							id="composition-button"
							aria-controls={open ? "composition-menu" : undefined}
							aria-expanded={open ? "true" : undefined}
							aria-haspopup="true"
							size="large"
							sx={{
								"& svg": {
									color: "rgba(255,255,255,0.8)",
									transition: "0.2s",
									transform: "translateX(0) rotate(0)",
								},
								"&:hover, &:focus": {
									bgcolor: "unset",
									"& svg:first-of-type": {
										transform: "translateX(-4px) rotate(-20deg)",
									},
									"& svg:last-of-type": {
										right: 0,
										opacity: 1,
									},
								},
								"&:after": {
									content: "\"\"",
									position: "absolute",
									height: "80%",
									display: "block",
									left: 0,
									width: "1px",
									bgcolor: "divider",
								},
							}}
							onClick={() => {
								if (settingsUrl) {
									router.push(settingsUrl)
								} else {
									handleToggle()
								}
							}}
						>
							<SettingsIcon style={{ color: "#fff", height: "20px", width: "20px" }} />
							<ArrowRight sx={{ position: "absolute", right: 4, opacity: 0 }} />
						</IconButton>
					</Tooltip>

					<Popper
						open={open}
						anchorEl={anchorRef.current}
						role={undefined}
						placement="right-start"
						transition
						disablePortal
					>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
									transformOrigin: placement === "bottom-start" ? "left top" : "left top",
								}}
							>
								<Paper>
									<ClickAwayListener onClickAway={handleClose}>
										<MenuList
											autoFocusItem={open}
											id="composition-menu"
											aria-labelledby="composition-button"
											onKeyDown={handleListKeyDown}
										>
											<MenuItem onClick={handleClose}>App Settings</MenuItem>
											<MenuItem onClick={handleClose}>User Settings</MenuItem>
											<MenuItem onClick={handleClose}>Tickets Settings</MenuItem>
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>

				</Box>
			</Box>
		)
	}

	return (
		<Tooltip arrow title="Dashboard" placement="right">
			<ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }}>
				<Link href={homeUrl} passHref>
					<a href="just-a-placeholder">
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
					</a>
				</Link>
			</ButtonBase>
		</Tooltip>
	)
})

HomeButton.propTypes = {
	homeUrl: PropTypes.string,
	settingsUrl: PropTypes.string,
	settingsTooltip: PropTypes.string,
	isExpanded: PropTypes.bool
}

export default HomeButton