/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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
import makeStyles from "@mui/styles/makeStyles"
import { Box } from "@mui/material"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	main: {
		"&:hover": {
			backgroundColor: theme.palette.action.hover
		},
	},
	main_shorten: {
		cursor: "pointer",
		"&:hover": {
			backgroundColor: theme.palette.action.hover
		},
		padding: theme.spacing(2, 3),
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(2, 2)
		},
	},
	paper: {
		display: "flex",
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
			alignItems: "flex-start",
		},
	},
	subject: {

	},
	content: {
		minWidth: 0, //this property is important
		flexGrow: 1,
		[theme.breakpoints.down("md")]: {
			maxWidth: "100%",
			padding: theme.spacing(1),
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
		},
	},
	content_addon: {
		cursor: "pointer",
		padding: theme.spacing(3),
	},
	excerpt: {
		[theme.breakpoints.down("md")]: {
			display: "none"
		},
	},
	state: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		padding: theme.spacing(1, 2, 1, 0),
		[theme.breakpoints.down("md")]: {
			flexDirection: "row",
			padding: theme.spacing(0, 2, 1)
		}
	},
	state1: {
		textAlign: "center",
		paddingLeft: "0.5rem",
		paddingRight: "0.5rem",
	},
	extraInfo: {
		textAlign: "center"
	},

}))

export function SimpleListItemEmpty({ message }) {
	const classes = useStyles()
	return (
		<div className={classes.main}>
			<div className={classes.paper}>
				<div className={`${classes.content} ${classes.content_addon}`} style={{ textAlign: "center" }}>
					{message}
				</div>
			</div>
		</div>
	)
}
SimpleListItemEmpty.propTypes = { message: PropTypes.string }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SimpleListItem({ link, onClick = () => { }, content, extraContent }) {
	const classes = useStyles()
	return (

		<div className={classes.main}>

			<div className={classes.paper}>

				{
					link
						?
						<Link href={link} passHref>
							<Box id="content" className={`${classes.content} ${classes.content_addon}`} onClick={onClick}>
								{content}
							</Box>
						</Link>
						:
						<Box id="content" className={`${classes.content} ${classes.content_addon}`} onClick={onClick}>
							{content}
						</Box>
				}



				{
					extraContent ?
						<div id="moreInfo" className={classes.state}>

							{extraContent}

						</div>
						: null

				}

			</div>

		</div>
	)
}

SimpleListItem.propTypes = {
	link: PropTypes.string,
	onClick: PropTypes.func,
	content: PropTypes.node,
	extraContent: PropTypes.node,
}

export default SimpleListItem