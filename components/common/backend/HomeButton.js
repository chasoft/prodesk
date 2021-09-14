/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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
import { IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core"

//THIRD-PARTY



//PROJECT IMPORT


//ASSETS
import SettingsIcon from "@material-ui/icons/Settings"
import HomeIcon from "@material-ui/icons/Home"
import { useSnackbar } from "notistack"
import { signOut } from "../../../helpers/userAuthentication"
import { useDispatch, useSelector } from "react-redux"
import { getAuth } from "../../../redux/selectors"

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
	miniDashboard: {
		display: "flex",
		justifyContent: "center",
		textAlign: "center",
		color: "#669df6",
		padding: theme.spacing(1, 0, 1, 0),
		"&:hover": {
			backgroundColor: "#ffffff14",
			cursor: "pointer",
		},
		borderTop: "1px solid #2A4257",
	},
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const HomeButton = ({ homeUrl, settingsUrl, isExpanded }) => {
	const classes = useStyles()
	return (
		<>
			{
				isExpanded ?
					<div className={classes.dashboard}>
						<HomeIcon style={{ height: "20px", width: "20px", marginRight: "8px" }} />
						<Link href={homeUrl}><a style={{ flexGrow: 1 }}><Typography>Dashboard</Typography></a></Link>
						<div style={{ borderRight: "1px solid #ffffff80", margin: "5px 0 5px", }}>&nbsp;</div>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Link href={settingsUrl}>
								<a>
									<IconButton color="secondary" aria-label="Settings" style={{ padding: "5px" }}>
										<SettingsIcon style={{ color: "#fff", height: "20px", width: "20px" }} />
									</IconButton>
								</a>
							</Link>
						</div>
					</div>
					:
					<Link href={homeUrl}>
						<Tooltip title="Dashboard" placement="right">
							<div className={classes.miniDashboard}>
								<HomeIcon style={{ height: "20px", width: "20px" }} />
							</div>
						</Tooltip>
					</Link>
			}
		</>
	)
}
HomeButton.propTypes = { homeUrl: PropTypes.string, settingsUrl: PropTypes.string, isExpanded: PropTypes.bool }

export default HomeButton