import React from "react"
import makeStyles from "@mui/styles/makeStyles"
import withStyles from "@mui/styles/withStyles"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Container } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"


const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexShrink: 1,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	paper: {
		marginTop: theme.spacing(8),
		[theme.breakpoints.down("md")]: {
			marginTop: theme.spacing(3),
		},
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	list: {
		listStyle: "none",
		padding: 0,
		marginTop: theme.spacing(2),
		width: "100%",
		"&>li": {
			padding: theme.spacing(1, 4, 1, 8),
			[theme.breakpoints.down("md")]: {
				paddingLeft: theme.spacing(3),
			},
		},
		"&>li:hover": {
			backgroundColor: "#D2E3FC"
		}
	}
}))

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />
}

const ProAccordion = withStyles((theme) => ({
	root: {
		border: "1px solid rgba(0, 0, 0, .125)",
		boxShadow: "none",
		"&:not(:last-child)": {
			borderBottom: 0,
		},
		"&:before": {
			display: "none",
		},
		// "&$expanded": {
		// 	margin: "auto",
		// },
	}
}))(Accordion)

const ProAccordionSummary = withStyles((theme) => ({
	root: {
		borderBottom: "1px solid rgba(0, 0, 0, .125)",
		marginBottom: -1,
		minHeight: 56,
		"&$expanded": {
			minHeight: 56,
		},
		paddingLeft: theme.spacing(8),
		[theme.breakpoints.down("md")]: {
			paddingLeft: theme.spacing(3),
		},
		"&:hover": {
			backgroundColor: theme.palette.action.hover
		}
	},
	content: {
		"&$expanded": {
			margin: "12px 0",
		},
	},
	expanded: {},
}))(AccordionSummary)

const ProAccordionDetails = withStyles((theme) => ({
	root: {
		padding: 0,
		backgroundColor: "#E8F0FE",
	}
}))(AccordionDetails)

export default function FrontAccordions() {
	const classes = useStyles()
	const [expanded, setExpanded] = React.useState(false)

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<Container maxWidth="md">
			<div className={classes.paper}>
				<div className={classes.root}>
					<ProAccordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
						<ProAccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Typography className={classes.heading}>General settings</Typography>
						</ProAccordionSummary>
						<ProAccordionDetails>
							<ul className={classes.list}>
								<li>Profile</li>
								<li>My account</li>
								<li>Logout</li>
							</ul>
						</ProAccordionDetails>
					</ProAccordion>
					<ProAccordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
						<ProAccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2bh-content"
							id="panel2bh-header"
						>
							<Typography className={classes.heading}>Users</Typography>
						</ProAccordionSummary>
						<ProAccordionDetails>
							<ul className={classes.list}>
								<li>Profile</li>
								<li>My account</li>
								<li>Logout</li>
							</ul>
						</ProAccordionDetails>
					</ProAccordion>


					<ProAccordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
						<ProAccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel3bh-content"
							id="panel3bh-header"
						>
							<Typography className={classes.heading}>Advanced settings</Typography>
						</ProAccordionSummary>
						<ProAccordionDetails>
							<ul className={classes.list}>
								<li>Profile</li>
								<li>My account</li>
								<li>Logout</li>
							</ul>
						</ProAccordionDetails>
					</ProAccordion>


					<ProAccordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
						<ProAccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel4bh-content"
							id="panel4bh-header"
						>
							<Typography className={classes.heading}>Personal data</Typography>
						</ProAccordionSummary>
						<ProAccordionDetails>
							<ul className={classes.list}>
								<li>Profile</li>
								<li>My account</li>
								<li>Logout</li>
							</ul>
						</ProAccordionDetails>
					</ProAccordion>
				</div>
			</div>
		</Container>
	)
}
