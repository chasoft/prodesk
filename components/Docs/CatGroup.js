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
import Link from "next/link"
import { Container, Grid, makeStyles, Typography } from "@material-ui/core"
import DocItem from "./DocItem"

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
		padding: theme.spacing(6, 1, 3)
	}

}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const CatGroup = () => {
	const classes = useStyles()
	return (
		<Container maxWidth="md">
			<div className={classes.paper}>
				<div className={classes.root} >


					<div className={classes.viewAll}>

						<Typography variant="h2">Categories</Typography>
						<div style={{ flexGrow: 1 }}></div>
						<Link href="/">
							<Typography>View all post</Typography>
						</Link>

					</div>


					<Grid container spacing={4}>

						<Grid item xs={12} sm={6}>

							<DocItem />

						</Grid>

						<Grid item xs={12} sm={6}>
							<DocItem />
						</Grid>

						<Grid item xs={12} sm={6}>
							<DocItem />
						</Grid>

						<Grid item xs={12} sm={6}>
							<DocItem />
						</Grid>


					</Grid>

				</div>
			</div>
		</Container >
	)
}

export default CatGroup