import React from "react"
import Link from "next/link"
import { Container, Grid } from "@mui/material"
import TicketStepper from "./TicketStepper"
import { useTheme } from "@mui/material/styles"
import makeStyles from "@mui/styles/makeStyles"
import { Button, Typography, IconButton } from "@mui/material"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import useMediaQuery from "@mui/material/useMediaQuery"


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
		[theme.breakpoints.down("md")]: {
			borderRadius: 0,
			border: 0,
		},
		paddingTop: theme.spacing(2)
	},
	title: {
		padding: theme.spacing(4, 4, 1, 4),
		color: "white"
	},
	description: {
		padding: theme.spacing(1, 4)
	},
	content: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		[theme.breakpoints.down("md")]: {
			paddingLeft: theme.spacing(0),
			paddingRight: theme.spacing(0),
		},
	},
	spacer: {
		borderTop: "1px solid",
		borderColor: theme.palette.divider
	},
	bigScreen: {
		[theme.breakpoints.down("md")]: {
			display: "none"
		},
	},
	smallScreen: {
		display: "none",
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		marginTop: 0,
		marginBottom: 0,
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		[theme.breakpoints.down("md")]: {
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
	const smallScreen = useMediaQuery(theme.breakpoints.down("md"))

	return (
		<Container disableGutters={smallScreen}>
			<Grid container>
				<Grid item xs={12} sm={12} md={10} >
					<div className={`${classes.title} ${classes.bigScreen}`}>
						<Typography variant="h1">
							Open New Ticket
						</Typography>
					</div>
					<div style={{ backgroundColor: "white", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} >
						<Link href="/client/tickets">
							<nav className={`${classes.nav} ${classes.smallScreen}`}>
								<IconButton aria-label="back" size="small">
									<ArrowBackOutlinedIcon />
								</IconButton>
								<Typography variant="h1">Tickets</Typography>
							</nav>
						</Link>

						<div className={classes.main}>
							<div className={`${classes.description} ${classes.bigScreen}`}>
								<Typography variant="body2">
									Post your question and get answer from our dedicated staffs
								</Typography>
							</div>
							<div className={classes.content}>
								<TicketStepper />
							</div>
						</div>
					</div>
				</Grid>
			</Grid>
		</Container>
	)
}

export default CreateNewTicket