import React from "react"
import Grid from "@mui/material/Grid"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import AccountCircle from "@mui/icons-material/AccountCircle"
import makeStyles from "@mui/styles/makeStyles"
import { InputBase, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	promotedSearchContainer: {
		backgroundPosition: "50%",
		height: "19.0625rem",
		marginTop: "1.5rem",
		[theme.breakpoints.up("sm")]: {
			backgroundImage: "url('/img/homepage_header_background_v2.svg')",
			backgroundRepeat: "no-repeat",
		},
		[theme.breakpoints.down("md")]: {
			height: "auto",
			// height: "10rem",
		},
	},
	greeting: {
		fontSize: "2rem",
		lineHeight: "2.5rem",
		marginBottom: "1.625rem",
		[theme.breakpoints.down("md")]: {
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1)
		},
	},
	logoContainer: {
		background: "#ffffff",
		// borderRadius: "1.75rem",
		boxShadow: "0 1px 2px 0 rgb(60 64 67 / 30 %), 0 1px 3px 1px rgb(60 64 67 / 15 %)",
		boxSizing: "border-box",
		display: "flex",
		alignItems: "center",
		height: "3.5rem",
		margin: "0 auto 1.125rem auto",
		padding: ".5rem",
		width: "3.5rem"
	},
	searchContainer: {
		display: "flex",
		alignItems: "center",
		borderRadius: "0.5rem",
		margin: "0 auto",
		maxWidth: "32.5rem",
		padding: theme.spacing(1, 3, 1, 4),

		[theme.breakpoints.down("md")]: {
			marginRight: theme.spacing(2),
			marginLeft: theme.spacing(2),
		},
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
}))

function PromotedSearch() {
	const classes = useStyles()
	return (

		<div className={classes.promotedSearchContainer}>
			<Typography variant="h4" align="center" className={classes.greeting}>
				<div className={classes.logoContainer}>
					<Avatar alt="Remy Sharp" src="/default-avatar/1.png" className={classes.large} />
				</div>
				<div>How can we help you?</div>
			</Typography>

			<Paper component="form" className={classes.searchContainer}>
				<SearchIcon />
				<InputBase
					className={classes.input}
					placeholder="Describe your issue"
					inputProps={{ "aria-label": "search documentation" }}
				/>
			</Paper>
		</div>

	)
}

export default PromotedSearch