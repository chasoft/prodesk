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
import PropTypes from "prop-types"

import makeStyles from "@mui/styles/makeStyles"

//THIRD-PARTY


//PROJECT IMPORT


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	paper: {
		width: "100%",
		"& > *:last-child": {
			borderBottomRightRadius: "0.5rem",
		},
		[theme.breakpoints.down("md")]: {
			"& > *:last-child": {
				borderBottomLeftRadius: "0.5rem",
			}
		}
	}
}))

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SimpleList({ children }) {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<div className={classes.paper}>

				{children}

			</div>
		</div>
	)
}
SimpleList.propTypes = { children: PropTypes.node }

export default SimpleList