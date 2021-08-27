import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Container, Grid } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}))

export default function FrontAccordions() {
	const classes = useStyles()
	const [expanded, setExpanded] = React.useState(false)

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<Container>
			<Grid container alignItems="center" className={classes.paper}>
				<Grid item xs={12} sm={11} md={10} lg={9}>


					<div className={classes.root}>
						<Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								<Typography className={classes.heading}>General settings</Typography>
								<Typography className={classes.secondaryHeading}>I am an accordion</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
									maximus est, id dignissim quam.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel2bh-content"
								id="panel2bh-header"
							>
								<Typography className={classes.heading}>Users</Typography>
								<Typography className={classes.secondaryHeading}>
									You are currently not an owner
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
									diam eros in elit. Pellentesque convallis laoreet laoreet.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel3bh-content"
								id="panel3bh-header"
							>
								<Typography className={classes.heading}>Advanced settings</Typography>
								<Typography className={classes.secondaryHeading}>
									Filtering has been entirely disabled for whole web server
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
									vitae egestas augue. Duis vel est augue.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel4bh-content"
								id="panel4bh-header"
							>
								<Typography className={classes.heading}>Personal data</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
									vitae egestas augue. Duis vel est augue.
								</Typography>
							</AccordionDetails>
						</Accordion>
					</div>
				</Grid>
			</Grid>
		</Container>
	)
}
