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
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

//MATERIAL-UI
import { IconButton, makeStyles, Typography } from "@material-ui/core"

//THIRD-PARTY



//PROJECT IMPORT


//ASSETS
import SettingsIcon from "@material-ui/icons/Settings"
import HomeIcon from "@material-ui/icons/Home"
import { useSnackbar } from "notistack"
import { signOut } from "../../../helpers/userAuthentication"
import { useDispatch } from "react-redux"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	dashboard: {
		display: "flex",
		alignItems: "center",
		color: "#669df6",
		padding: theme.spacing(1, 0.5, 1, 3),
		"&:hover": {
			backgroundColor: "#ffffff14",
			cursor: "pointer",
		},
		borderTop: "1px solid #2A4257",
		borderBottom: "1px solid #2A4257",
	},
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const HomeButton = ({ homeUrl, settingsUrl }) => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()
	return (
		<>
			<div className={classes.dashboard}>
				<HomeIcon style={{ height: "20px", width: "20px", marginRight: "8px" }} />
				<Link href={homeUrl}><Typography style={{ flexGrow: 1 }}>Dashboard</Typography></Link>
				<div style={{ borderRight: "1px solid #ffffff80", margin: "5px 0 5px", }}>&nbsp;</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Link href={settingsUrl}>
						<IconButton color="secondary" aria-label="Settings" style={{ padding: "5px" }}>
							<SettingsIcon style={{ color: "#fff", height: "20px", width: "20px" }} />
						</IconButton>
					</Link>
				</div>
			</div>

			<div className={classes.dashboard}>
				<Typography
					style={{ flexGrow: 1 }}
					onClick={() => { signOut({ enqueueSnackbar, dispatch }) }}
				>Logout</Typography>
			</div>
		</>
	)
}
HomeButton.propTypes = { homeUrl: PropTypes.string, settingsUrl: PropTypes.string }

export default HomeButton