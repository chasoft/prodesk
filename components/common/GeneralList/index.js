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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Paper, Typography } from "@mui/material"

import makeStyles from "@mui/styles/makeStyles"

//THIRD-PARTY


//PROJECT IMPORT


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		marginTop: theme.spacing(5),
		[theme.breakpoints.down("md")]: {
			marginTop: theme.spacing(3),
		},
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	group: {
		margin: "1.5rem 0",
		marginBottom: 0,
		[theme.breakpoints.down("md")]: {
			margin: "1.625rem 0",
		},
		"& >*": {
			cursor: "default",
			borderBottom: `1px solid ${theme.palette.divider}`,
		},
		"& > :first-child": {
			borderTopRightRadius: "0.5rem",
			borderTopLeftRadius: "0.5rem"
		},
		"& > :last-child": {
			borderBottomRightRadius: "0.5rem",
			borderBottomLeftRadius: "0.5rem",
			borderBottom: 0,
		}
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
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const GeneralList = (
	{
		/* A list should have a title */
		title,
		titleHeading = "h2",
		rightAction,

		/* If a link is provided, then show it */
		viewAllText,
		viewAllLink,

		/* A little decoration */
		elevation = 2,

		/* children are a list of GeneralListItem or GeneralListItemEmpty */
		children
	}
) => {
	const classes = useStyles()
	return (
		<div className={classes.paper}>
			<div className={classes.root}>

				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Typography variant={titleHeading}>{title}</Typography>
					<div>{rightAction ?? ""}</div>
				</div>

				{
					viewAllLink ?
						<Link href={viewAllLink} className={classes.viewAll} passHref>
							<a href="/just-a-placeholder" className={classes.link}>
								<Typography variant="button">{viewAllText}</Typography>
							</a>
						</Link>
						: null
				}

				<Paper elevation={elevation} className={classes.group}>

					{children}

				</Paper>

			</div>
		</div>
	)
}

GeneralList.propTypes = {
	title: PropTypes.string,
	titleHeading: PropTypes.string,
	rightAction: PropTypes.node,
	viewAllText: PropTypes.string,
	viewAllLink: PropTypes.string,
	elevation: PropTypes.number,
	children: PropTypes.node,
}

export default GeneralList