import React from "react"
import { Container, Grid } from "@material-ui/core"
import TicketStepper from "./TicketStepper"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Button, Typography, IconButton } from "@material-ui/core"
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined"
import useMediaQuery from "@material-ui/core/useMediaQuery"


const useStyles = makeStyles((theme) => ({
	nav: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		"& > button": {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
		},
	},
	main: {
		border: "1px solid",
		borderRadius: "0.5rem",
		borderColor: theme.palette.divider,
		[theme.breakpoints.down("xs")]: {
			borderRadius: 0,
			border: 0,
		},
	},
	title: {
		padding: theme.spacing(4),
		paddingBottom: theme.spacing(1),
	},
	description: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	content: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			paddingLeft: theme.spacing(0),
			paddingRight: theme.spacing(0),
		},
	},
	spacer: {
		borderTop: "1px solid",
		borderColor: theme.palette.divider
	},
	bigScreen: {
		[theme.breakpoints.down("xs")]: {
			display: "none"
		},
	},
	smallScreen: {
		display: "none",
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		marginBottom: 0,
		marginTop: 0,
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		[theme.breakpoints.down("xs")]: {
			display: "flex"
		},
		"& > button": {
			padding: theme.spacing(1),
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			color: theme.palette.primary.contrastText,
		},
		"& > h1": {
			fontSize: "1.125rem",
			marginBottom: 0
		}
	}
}))

function CreateNewTicket() {
	const classes = useStyles()
	const theme = useTheme()
	const smallScreen = useMediaQuery(theme.breakpoints.down("xs"))

	return (
		<Container disableGutters={smallScreen}>
			<Grid container>
				<Grid item xs={12} sm={12} md={10}>
					<nav className={`${classes.nav} ${classes.bigScreen}`}>
						<Button color="primary" startIcon={<ArrowBackOutlinedIcon />}>Back</Button>
					</nav>

					<nav className={`${classes.nav} ${classes.smallScreen}`}>
						<IconButton aria-label="back" size="small">
							<ArrowBackOutlinedIcon />
						</IconButton>
						<Typography variant="h1">Ask the Community</Typography>
					</nav>

					<div className={classes.main}>
						<div className={`${classes.title} ${classes.bigScreen}`}>
							<Typography variant="h1">
								Ask the Community
							</Typography>
						</div>
						<div className={`${classes.description} ${classes.bigScreen}`}>
							<Typography variant="body2">
								Post your question and get answers from other users like you
							</Typography>
						</div>
						<div className={classes.content}>
							<TicketStepper />
						</div>
					</div>
				</Grid>
			</Grid>
		</Container>
	)
}

export default CreateNewTicket