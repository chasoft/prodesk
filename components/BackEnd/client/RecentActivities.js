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


import React from "react"
import { Grid, Typography } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import CategoryGroupLatestFAQs from "./../../Docs/CategoryGroupLatestFAQs"
import CategoryGroupLatestPublicTickets from "./../../Docs/CategoryGroupLatestPublicTickets"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		marginTop: theme.spacing(8),
		[theme.breakpoints.down("md")]: {
			marginTop: theme.spacing(3),
		},
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	group: {
		margin: "1.5rem 0",
		[theme.breakpoints.down("md")]: {
			margin: "1.625rem 0",
		},
		marginBottom: 0
	},
	viewAll: {
		display: "flex",
		alignItems: "center",
		"& > :first-child": {
			marginRight: theme.spacing(1)
		},
		"& > *": {
			color: theme.palette.primary.main
		}
	}
}))

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const RecentActivities = () => {
	const classes = useStyles()
	return (
		<div className={classes.paper}>
			<div className={classes.root}>
				<Typography variant="h2">Recent Activities</Typography>
				<div className={classes.group}>
					<Grid container spacing={4}>

						<Grid item xs={12} sm={6}>
							<CategoryGroupLatestPublicTickets />
						</Grid>

						<Grid item xs={12} sm={6}>
							<CategoryGroupLatestFAQs />
						</Grid>

					</Grid>
				</div>

			</div>
		</div>
	)
}

export default RecentActivities