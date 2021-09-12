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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Collapse, makeStyles, Typography } from "@material-ui/core"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

//THIRD-PARTY
import clsx from "clsx"

//PROJECT IMPORT


//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		borderBottom: "1px solid #2A4257",
	},
	rootExpanded: {
		backgroundColor: "#47628233"
	},
	heading: {
		fontFamily: "\"Google Sans\", Roboto, sans-serif",
		fontSize: "1rem"
	},
	headingExpanded: {
		// paddingTop: theme.spacing(3),
		// paddingBottom: theme.spacing(3),
	},
	headingDescription: {
		fontSize: "0.75rem",
		color: "#ffffff80",
		width: "90%"
	},
	groupHeader: {
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		padding: theme.spacing(3, 1, 3, 3),
		"&:hover": {
			backgroundColor: theme.navbar.hoverColor
		},
		"& .rightIcon .MuiSvgIcon-root": {
			visibility: "hidden"
		},
		"&:hover .rightIcon .MuiSvgIcon-root": {
			visibility: "visible",
			color: "#669df6"
		},
		width: "256px",
	},
	header: {

	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const NavCollapse = ({ title, description, children, isExpanded = false }) => {
	const classes = useStyles()
	const [expanded, setExpanded] = useState(isExpanded)
	return (
		<div className={clsx({ [classes.root]: true, [classes.rootExpanded]: expanded })}>
			<div
				className={classes.groupHeader}
				onClick={() => setExpanded(p => !p)}
			>
				<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Typography
							className={clsx({ [classes.headingExpanded]: expanded, [classes.heading]: true })}
							style={{ color: "#fff", flexGrow: 1 }}
						>
							{title}
						</Typography>
						<div className="rightIcon">
							{expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
						</div>
					</div>
					<Typography
						className={classes.headingDescription}
						variant="caption"
						style={{ display: expanded ? "none" : "block" }}
						noWrap
					>{description}</Typography>
				</div>

			</div>
			<Collapse in={expanded} timeout="auto" style={{ color: "#ffffffcc" }} unmountOnExit>
				{children}
			</Collapse>
		</div>
	)
}
NavCollapse.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	isExpanded: PropTypes.bool,
	children: PropTypes.any,
}

export default NavCollapse