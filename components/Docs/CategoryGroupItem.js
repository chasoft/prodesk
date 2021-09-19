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
import { Paper, Typography } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import { PropTypes } from "prop-types"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		[theme.breakpoints.down("md")]: {
			marginLeft: theme.spacing(0),
			marginRight: theme.spacing(0),
		},
	},
	docHeading: {
		padding: theme.spacing(2, 3),
		fontFamily: "\"Google Sans\", Roboto, sans-serif",
		fontSize: "1rem",
		fontWeight: 500,
		lineHeight: "1.25rem"
	},
	docFooter: {
		padding: theme.spacing(2, 3)
	},
	viewAll: {
		display: "flex",
		alignItems: "center",
		"& > :first-child": {
			marginRight: theme.spacing(1)
		},
		"& > *": {
			color: theme.palette.primary.main
		},
		borderTop: "1px solid",
		borderColor: theme.palette.divider,
	},
	link: {
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		"&:hover": {
			textDecoration: "underline",
		}
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const CategoryGroupItem = ({ header, viewAllText, viewAllLink, children }) => {
	const classes = useStyles()
	return (
		<Paper elevation={1}>
			<div className={classes.docHeading}>{header}</div>

			{children}

			<div className={`${classes.viewAll} ${classes.docFooter}`}>
				<Link href={viewAllLink}>
					<a className={classes.link}>
						<Typography>{viewAllText}</Typography>
						<ArrowForwardIcon fontSize="small" />
					</a>
				</Link>
			</div>
		</Paper>
	)
}
CategoryGroupItem.propTypes = {
	header: PropTypes.string,
	viewAllText: PropTypes.string,
	viewAllLink: PropTypes.string,
	children: PropTypes.node
}

export default CategoryGroupItem