import React, { useEffect, useState } from "react"
import { alpha, makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"

import Button from "@material-ui/core/Button"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import MoreIcon from "@material-ui/icons/MoreVert"
import AppsIcon from "@material-ui/icons/Apps"
import { Logo } from ".."

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none"
		}
	},
	logo: {
		[theme.breakpoints.down("xs")]: {
			display: "none"
		}
	},
	title: {
		fontWeight: 400,
		fontSize: "1.25rem"
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	sectionDesktop: {
		display: "none",
		alignItems: "center",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}))

function Header() {
	const classes = useStyles()
	const [scrolled, setScrolled] = useState(false)

	const animateHeader = () => {
		setScrolled(window.scrollY > 50 ? true : false)
	}

	useEffect(() => {
		window.addEventListener("scroll", animateHeader)
		return () => window.removeEventListener("scroll", animateHeader)
	}, [])

	return (
		<AppBar position="sticky" color="inherit" elevation={scrolled ? 4 : 0}>
			<Toolbar>

				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="open drawer"
				>
					<MenuIcon />
				</IconButton>

				<div className={classes.logo}>
					<Logo />
				</div>

				<Typography className={classes.title} noWrap>
					Your Elegant &amp; Powerful Ticket System
				</Typography>

				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ "aria-label": "search" }}
					/>
				</div>

				<div className={classes.grow} />

				<div className={classes.sectionDesktop}>
					<IconButton aria-label="show 17 new notifications" color="inherit">
						<AppsIcon />
					</IconButton>
					<Button variant="contained" color="primary">
						Sign in
					</Button>
				</div>

				<div className={classes.sectionMobile}>
					<IconButton
						aria-label="show more"
						// aria-controls={mobileMenuId}
						aria-haspopup="true"
						// onClick={handleMobileMenuOpen}
						color="inherit"
					>
						<MoreIcon />
					</IconButton>
				</div>

			</Toolbar>
		</AppBar>
	)
}

export default Header