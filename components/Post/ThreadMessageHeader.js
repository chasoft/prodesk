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

import React from "react"

// MATERIAL-UI
import { Avatar, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import FingerprintIcon from "@mui/icons-material/Fingerprint"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import LinkIcon from "@mui/icons-material/Link"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ThreadMessageHeader = () => {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}


	return (
		<Grid container
			sx={{
				m: 1, mb: 2,
				display: "flex",
				flexDirection: "row",
				alignItems: "center"
			}}
		>
			<Grid item>
				{/* <div className={classes.logoContainer}> */}
				<Avatar alt="Remy Sharp" src="/avatar/1.png" />
				{/* </div> */}
			</Grid>
			<Grid item
				sx={{
					display: "flex",
					alignItems: "center",
					flexGrow: 1,
					pl: 3,
					"& > *": {
						mr: 1
					}
				}}
			>
				<Typography variant="caption">Camille V.</Typography>
				<div style={{ marginTop: "0.3rem" }}><FingerprintIcon style={{ fontSize: "1.2rem" }} /></div>
				<Typography variant="caption">Community Manager</Typography>
			</Grid>
			<Grid item
				sx={{
					display: "flex",
					alignItems: "center"
				}}
			>
				<Typography variant="caption">28/08/2021</Typography>
				<IconButton
					aria-label="more"
					aria-controls="long-menu"
					aria-haspopup="true"
					onClick={handleClick}
					size="large">
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="long-menu"
					anchorEl={anchorEl}
					// keepMounted
					open={open}
					onClose={handleClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					transformOrigin={{ horizontal: "right" }}
				>
					<MenuItem onClick={handleClose}>
						<LinkIcon fontSize="small" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
						<Typography variant="inherit" style={{ marginLeft: "0.5rem", marginRight: "3rem" }}>Get Link</Typography>
					</MenuItem>
				</Menu>
			</Grid>
		</Grid >
	)
}

export default ThreadMessageHeader