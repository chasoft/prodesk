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
import { Avatar, makeStyles, Typography } from "@material-ui/core"
import FingerprintIcon from "@material-ui/icons/Fingerprint"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		alignItems: "center"
	},
	leftAvatar: {
		marginRight: theme.spacing(1)
	},
	rightContent: {
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down("md")]: {
			display: "none",
		},
	},
	MuiTypography: {
		caption: {
			whiteSpace: "nowrap"
		}
	},
	MuiAvatar: {
		root: {
			width: theme.spacing(3),
			height: theme.spacing(3),
		}
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const UserInfo = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<div item className={classes.leftAvatar}>
				<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} />
			</div>
			<div item className={classes.rightContent}>
				<Typography style={{ whiteSpace: "nowrap" }} variant="caption">Camille V.</Typography>
				<Typography style={{ whiteSpace: "nowrap" }} variant="caption">Techical Supporter</Typography>
			</div>
		</div>
	)
}

export default UserInfo