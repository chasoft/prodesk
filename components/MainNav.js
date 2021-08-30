import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
// import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	tabs: {
		marginLeft: theme.spacing(2),
		// marginRight: theme.spacing(2)
		[theme.breakpoints.down("xs")]: {
			marginLeft: theme.spacing(1),
		},
	},
	tab: {
		[theme.breakpoints.down("xs")]: {
			paddingRight: theme.spacing(1),
			paddingLeft: theme.spacing(1)
		},
	}
}))

const NavTab = withStyles((theme) => ({
	root: {
		textTransform: "none",
		minWidth: 72,
		fontWeight: theme.typography.fontWeightBold,
		marginRight: theme.spacing(1),
		"&:hover": {
			color: "#40a9ff",
			opacity: 1,
		},
		"&$selected": {
			color: "#1890ff",
			fontWeight: theme.typography.fontWeightBold,
		},
		"&:focus": {
			color: "#40a9ff",
		},
	},
	selected: {},
}))((props) => <Tab disableRipple {...props} />)

const MainNav = () => {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	return (
		<Tabs
			value={value}
			onChange={handleChange}
			indicatorColor="primary"
			textColor="primary"
			className={classes.tabs}
		>
			<NavTab className={classes.tab} label="Documentation" disableRipple={true} />
			<NavTab className={classes.tab} label="Community" disableRipple={true} />
			<NavTab className={classes.tab} label="Dashboard" disableRipple={true} />
		</Tabs>
	)
}

export default MainNav