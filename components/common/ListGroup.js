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
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import makeStyles from "@mui/styles/makeStyles"
import { Paper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

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
	},
	link: {
		display: "flex",
		alignItems: "center",
		color: theme.palette.primary.main,
		cursor: "pointer",
		"&:hover": {
			textDecoration: "underline"
		}
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const ListGroup = ({ title, viewAllText, viewAllLink, children }) => {
	const classes = useStyles()
	return (
		<div className={classes.paper}>
			<div className={classes.root}>

				<Typography variant="h2">{title}</Typography>
				{
					viewAllLink ?
						<Link href={viewAllLink} className={classes.viewAll}>
							<a className={classes.link}>
								<Typography variant="button">{viewAllText}</Typography>
							</a>
						</Link>
						: null
				}

				<Paper elevation={2} className={classes.group}>
					{children}
				</Paper>

			</div>
		</div>
	)
}
ListGroup.propTypes = {
	title: PropTypes.string,
	viewAllText: PropTypes.string,
	viewAllLink: PropTypes.string,
	children: PropTypes.node,
}

export default ListGroup