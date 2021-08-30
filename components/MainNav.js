import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
// import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { Grid, IconButton, Typography } from "@material-ui/core"
import NavLink from "./NavLink"

const useStyles = makeStyles((theme) => ({
	root: {
		// margin: theme.spacing(1),
		// marginBottom: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		borderBottom: ".0625rem solid #dadce0",
		padding: "0 1rem",
		"a[aria-current]": {
			backgroundColor: "#E4E9ED"
		}
	},
	middleContent: {
		flexGrow: 1,
	},
	tabs: {
		marginLeft: theme.spacing(2),
		[theme.breakpoints.down("xs")]: {
			marginLeft: theme.spacing(1),
		},
	},
	link: {
		color: "#5f6368",
		lineHeight: "3rem",
		fontSize: ".875rem",
		fontWeight: 500,
		padding: theme.spacing(2) - 3,
		marginRight: theme.spacing(1),
		[theme.breakpoints.down("xs")]: {
			paddingRight: theme.spacing(1),
			paddingLeft: theme.spacing(1)
		},
	},
	linkCurrent: {
		color: "#1a73e8",
		lineHeight: "3rem",
		fontSize: ".875rem",
		fontWeight: 500,
		borderBottom: "2px solid #1a73e8",
		padding: theme.spacing(2) - 1,
		paddingLeft: 1,
		paddingRight: 1,
		marginRight: theme.spacing(1),
		[theme.breakpoints.down("xs")]: {
			paddingRight: theme.spacing(1),
			paddingLeft: theme.spacing(1)
		},
	},
	iii: {
		borderBottom: "2px solid #1a73e8",
		padding: theme.spacing(2) - 2,

	}
}))

const MainNav = () => {
	const classes = useStyles()

	return (
		<Grid container className={classes.root}>
			<Grid item className={classes.leftAvatar}>
				<NavLink href="" passHref ><span className={classes.linkCurrent}><span className={classes.iii}>Help Center</span></span></NavLink>
				<NavLink href="/community" passHref ><span className={classes.link}>Community</span></NavLink>
				<NavLink href="/troubleshoot" passHref ><span className={classes.link}>Troubleshoot</span></NavLink>
			</Grid>
			<Grid item className={classes.middleContent}>

			</Grid>
			<Grid item className={classes.rightMenu}>


			</Grid>
		</Grid >



	)
}

export default MainNav