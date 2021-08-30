/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React from "react"
import { Avatar, Grid, IconButton, ListItemIcon, makeStyles, Menu, MenuItem, Typography } from "@material-ui/core"
import { Icon } from "@material-ui/core"

import FingerprintIcon from "@material-ui/icons/Fingerprint"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import LinkIcon from "@material-ui/icons/Link"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		marginBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	leftAvatar: {

	},
	middleContent: {
		display: "flex",
		alignItems: "center",
		flexGrow: 1,
		paddingLeft: theme.spacing(3),
		"& > *": {
			marginRight: theme.spacing(1)
		}
	},
	rightMenu: {
		display: "flex",
		alignItems: "center"
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const ThreadMessageHeader = () => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}


	return (
		<Grid container className={classes.root}>
			<Grid item className={classes.leftAvatar}>
				{/* <div className={classes.logoContainer}> */}
				<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
				{/* </div> */}
			</Grid>
			<Grid item className={classes.middleContent}>
				<Typography variant="caption">Camille V.</Typography>
				<div style={{ marginTop: "0.3rem" }}><FingerprintIcon style={{ fontSize: "1.2rem" }} /></div>
				<Typography variant="caption">Community Manager</Typography>
			</Grid>
			<Grid item className={classes.rightMenu}>
				<Typography variant="caption">28/08/2021</Typography>
				<IconButton
					aria-label="more"
					aria-controls="long-menu"
					aria-haspopup="true"
					onClick={handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="long-menu"
					anchorEl={anchorEl}
					// keepMounted
					open={open}
					onClose={handleClose}
					getContentAnchorEl={null}
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