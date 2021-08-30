import React, { useEffect, useRef, useState } from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Accordion, AccordionDetails, AccordionSummary, Button, CssBaseline, FormControl, FormGroup, FormLabel, MenuItem, Paper, Select, Typography } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { checkPropTypes } from "prop-types"


const useStyles = makeStyles((theme) => ({
	root: {
		margin: "2.625rem 0 0",
		width: "12rem",
	},
	nav: {
		display: "flex",
		flexDirection: "column",
		marginLeft: "3.125rem",
		[theme.breakpoints.down("xs")]: {
			marginLeft: "1.125rem"
		},
		width: "100%",
	},
	list: {
		display: "flex",
		flexDirection: "column",
		listStyle: "none",
		paddingLeft: 0,
		"& > li": {
			display: "flex",
			flexDirection: "row",
			"& > :first-child": {
				marginTop: ".7rem",
				height: "1.25rem",
				width: "1.25rem",
				minWidth: "1.25rem"
			},
			"& > :last-child": {
				padding: ".625rem 0 .625rem .875rem"
			}

		}
	},
	margin: {
		border: "1px solid #ced4da",
		borderRadius: "0.25rem"
	},

}))


const ItemIcon = (props) => {
	return <svg {...props} viewBox="0 0 24 24">
		<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path>
	</svg>

}

const FilterCategory = withStyles((theme) => ({
	root: {
		// border: "1px solid rgba(0, 0, 0, .125)",
		borderTop: "2px solid rgba(0, 0, 0, .125)",
		margin: 0,
		padding: 0,
		boxShadow: "none",
		"&:not(:last-child)": {
			borderBottom: 0,
		},
		"&:before": {
			display: "none",
		},
		"&&": {
			marginBottom: "1rem"
		}
	}
}))(Accordion)

const FilterSummary = withStyles((theme) => ({
	root: {
		padding: 0,
		minHeight: 0,
		[theme.breakpoints.down("xs")]: {
			// paddingLeft: theme.spacing(3),
		},
	},
	content: {
		"&&": {
			margin: 0
		},
	},
	expandIcon: {
		padding: "4px",
		marginRight: 0,
		color: theme.palette.primary.main
	}
}))(AccordionSummary)

const FilterDetails = withStyles((theme) => ({
	root: {
		padding: 0,
	}
}))(AccordionDetails)

const FilterSelect = withStyles((theme) => ({
	root: {
		"&&": {
			paddingLeft: "10px",
			color: theme.palette.primary.main
		}
	},
}))(Select)

const FilterFrame = ({ title, children }) => {
	const [open, setOpen] = useState(true)

	const handleOpen = () => { setOpen(p => !p) }

	return (
		<FilterCategory expanded={open} onChange={handleOpen}>
			<FilterSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="a-collapsible-panel"
				id="a-collapsible-panel"
			>
				<Typography>{title}</Typography>
			</FilterSummary>
			<FilterDetails>
				{children}
			</FilterDetails>
		</FilterCategory >
	)
}
FilterFrame.propTypes = { title: checkPropTypes.string, children: checkPropTypes.any }



function Filters() {
	const classes = useStyles()
	const [fixed, setFixed] = useState(false)
	const listRef = useRef(null)

	const [open, setOpen] = useState(true)

	const handleChange = () => {
		setOpen((p) => !p)
	}

	const fixedPosition = () => {
		// setFixed(((listRef.current.clientHeight + 110) < window.innerHeight) ? true : false)
	}

	/* Activate resize listener */
	useEffect(() => {
		fixedPosition()
		window.addEventListener("resize", fixedPosition)
		return () => window.removeEventListener("resize", fixedPosition)
	}, [])

	/* Activate resize listener */
	useEffect(() => {
		window.addEventListener("scroll", fixedPosition)
		return () => window.removeEventListener("scroll", fixedPosition)
	}, [])

	return (
		<div ref={listRef} className={classes.root} style={{ position: fixed ? "fixed" : "static" }}>
			<form className={classes.nav}>
				<div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }} >
					<Typography style={{ flexGrow: 1, fontWeight: 500 }}>Filter</Typography>
					<Button color="primary" style={{ fontSize: "0.9rem" }}>Clear</Button>
				</div>


				<FilterFrame title="Priority">
					<FormControl className={classes.margin} fullWidth>
						<FilterSelect
							labelId="demo-customized-select-label"
							id="demo-customized-select"
							// value={age}
							// onChange={handleChange}
							// input={<BootstrapInput />}
							MenuProps={{
								anchorOrigin: {
									vertical: "bottom",
									horizontal: "left"
								},
								getContentAnchorEl: null
							}}
							className={classes.select}
						>
							<MenuItem value="">
								<em>All</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</FilterSelect>
					</FormControl>
				</FilterFrame>


				<FilterFrame title="Priority">
					<FormControl className={classes.margin} fullWidth>
						<FilterSelect
							labelId="demo-customized-select-label"
							id="demo-customized-select"
							// value={age}
							// onChange={handleChange}
							// input={<BootstrapInput />}
							MenuProps={{
								anchorOrigin: {
									vertical: "bottom",
									horizontal: "left"
								},
								getContentAnchorEl: null
							}}
							className={classes.select}
						>
							<MenuItem value="">
								<em>All</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</FilterSelect>
					</FormControl>
				</FilterFrame>

				<FilterFrame title="something">
					<FormControl component="fieldset" className={classes.formControl}>
						<FormLabel component="legend">Assign responsibility</FormLabel>
						<FormGroup>
							<FormControlLabel
								control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
								label="Gilad Gray"
							/>
							<FormControlLabel
								control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
								label="Jason Killian"
							/>
							<FormControlLabel
								control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
								label="Antoine Llorca"
							/>
						</FormGroup>
						<FormHelperText>Be careful</FormHelperText>
					</FormControl>
				</FilterFrame>

				<Typography>sssss</Typography>

			</form>
		</div >
	)
}

export default Filters