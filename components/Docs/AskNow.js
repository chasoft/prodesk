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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React from "react"
import { Button, makeStyles, Paper, Typography } from "@material-ui/core"

import ForumIcon from "@material-ui/icons/Forum"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		}
	},
	paper: {
		display: "flex",
		alignItems: "center",
		"& > *:not(:last-child)": {
			marginRight: theme.spacing(4)
		},
		padding: theme.spacing(3, 8),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(5, 4, 4, 4)
		}
	},
	ask: {
		display: "flex",
		alignItems: "center",
		flexGrow: 1,
		"& > *": {
			marginRight: theme.spacing(2)
		},
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
			alignItems: "flex-start"
		}
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const AskNow = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Paper elevation={2} className={classes.paper}>
				<div>
					<ForumIcon color="primary" />
				</div>
				<div className={classes.ask} >

					<Typography><span style={{ fontWeight: 500 }}>Need help?</span> Open a ticket and we will help you.</Typography>

					<Button
						color="primary"
						size="small"
						// className={classes.button}
						endIcon={<ArrowForwardIcon />}
						style={{ whiteSpace: "nowrap" }}
					>
						Ask now
					</Button>
				</div>
			</Paper>
		</div>
	)
}

export default AskNow