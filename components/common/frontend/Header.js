import React, { useEffect, useState } from "react"
import Link from "next/link"
import { alpha } from "@mui/material/styles"
import makeStyles from "@mui/styles/makeStyles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"

import Button from "@mui/material/Button"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import MoreIcon from "@mui/icons-material/MoreVert"
import AppsIcon from "@mui/icons-material/Apps"
import { Logo } from ".."
import { AuthFalse, AuthTrue } from "../../AuthCheck"
import UserIcon from "../backend/UserIcon"

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
		[theme.breakpoints.down("md")]: {
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
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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
					size="large">
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
					<IconButton aria-label="show 17 new notifications" color="inherit" size="large">
						<AppsIcon />
					</IconButton>

					<AuthFalse>
						<Link href="/login">
							<Button variant="contained" color="primary">
								Sign in
							</Button>
						</Link>
					</AuthFalse>

					<AuthTrue>
						<UserIcon />
					</AuthTrue>

				</div>



				<div className={classes.sectionMobile}>
					<IconButton
						aria-label="show more"
						// aria-controls={mobileMenuId}
						aria-haspopup="true"
						// onClick={handleMobileMenuOpen}
						color="inherit"
						size="large">
						<MoreIcon />
					</IconButton>
				</div>

			</Toolbar>
		</AppBar>
	)
}

export default Header