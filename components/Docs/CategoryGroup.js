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
import Link from "next/link"
import { Container, Grid, makeStyles, Typography } from "@material-ui/core"
import CategoryGroupItem from "./CategoryGroupItem"
import CategoryGroupLatestFAQs from "./CategoryGroupLatestFAQs"
import LatestFAQs from "../common/backend/client/LatestFAQs"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		// marginTop: theme.spacing(0),
		// [theme.breakpoints.down("xs")]: {
		// marginTop: theme.spacing(3),
		// },
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	viewAll: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: theme.spacing(6, 1, 3)
	},
	link: {
		color: theme.palette.primary.main,
		"&:hover": {
			textDecoration: "underline",
			cursor: "pointer",
		}
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const CategoryGroup = () => {
	const classes = useStyles()
	return (
		<Container maxWidth="md">
			<div className={classes.paper}>
				<div className={classes.root} >


					<div className={classes.viewAll}>

						<Typography variant="h2">Categories</Typography>
						<Link href="/docs/categories">
							<a>
								<Typography className={classes.link}>View all Categories</Typography>
							</a>
						</Link>

					</div>


					<Grid container spacing={4}>

						<Grid item xs={12} sm={6}>
							<CategoryGroupLatestFAQs />
						</Grid>

						<Grid item xs={12} sm={6}>
							<CategoryGroupLatestFAQs />
						</Grid>



					</Grid>

				</div>
			</div>
		</Container >
	)
}

export default CategoryGroup