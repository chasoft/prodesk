import React from "react"
import Grid from "@material-ui/core/Grid"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { makeStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"

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
	searchBg: {
		backgroundPosition: "50%",
		height: "19.0625rem",
		marginTop: "1.5rem",
		backgroundImage: "url('/img/homepage_header_background_v2.svg')",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		//backgroundPosition: "center",
		//height: "350px"
	}
}))

function SearchBox() {
	const classes = useStyles()
	return (

		<Paper className={classes.searchBg}>

			<Grid className={classes.paper}>
				<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
				<Typography variant="h4" align="center" noWrap={true}>
					How can we help you?
				</Typography>
				<Grid item xs={6}>

					<TextField
						className={classes.margin}
						id="input-with-icon-textfield"
						label="TextField"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							),
						}}
					/>


				</Grid>

			</Grid>

		</Paper>

	)
}

export default SearchBox