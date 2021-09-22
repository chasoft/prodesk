import React, { useEffect, useRef, useState } from "react"
import makeStyles from "@mui/styles/makeStyles"
import withStyles from "@mui/styles/withStyles"
import { Accordion, AccordionDetails, AccordionSummary, Button, CssBaseline, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Paper, Select, Typography, Checkbox, FormHelperText, OutlinedInput, InputAdornment, SvgIcon } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { PropTypes } from "prop-types"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp"
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp"
import SearchIcon from "@mui/icons-material/Search"

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "2.625rem 0 0",
		width: "12rem",
	},
	nav: {
		display: "flex",
		flexDirection: "column",
		marginLeft: "3.125rem",
		[theme.breakpoints.down("md")]: {
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
	outlinedInput: {
		root: {
			input: {
				padding: "8px 14px"
			}
		},
		"&.MuiInputAdornment-root .MuiSvgIcon-root": {
			color: theme.palette.text.secondary
		},
		"&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
			color: theme.palette.text.primary
		},
		"&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
			color: theme.palette.primary.main
		}
	}
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
		paddingLeft: "0.25rem",
		paddingRight: "0.25rem",
		boxShadow: "none",
		// "&:not(:last-child)": {
		// 	borderBottom: 0,
		// },
		"&:before": {
			display: "none",
		},
		"&&": {
			marginBottom: "1rem",
		}
	}
}))(Accordion)

const FilterSummary = withStyles((theme) => ({
	root: {
		padding: 0,
		paddingTop: "0.25rem",
		minHeight: 0,
		[theme.breakpoints.down("md")]: {
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
	}
}))(Select)


const FilterCheckbox0 = withStyles((theme) => ({
	root: {
		padding: "0.25rem",
		marginLeft: "0.25rem"
	},
}))(Checkbox)

function CheckBoxNewIcon(props) {
	return (
		<SvgIcon {...props}>
			<path d="M3,3V21H21V3ZM19,8V19H5V5H19Z" transform="translate(-3 -3)" />
			<polygon points="7 11.17 3.41 7.59 2 9 7 14 16 5 14.59 3.58 7 11.17" />
		</SvgIcon>
	)
}

const FilterCheckbox = (props) => (
	<FilterCheckbox0
		{...props}
		color="primary"
		icon={<CheckBoxOutlineBlankSharpIcon />}
		checkedIcon={<CheckBoxNewIcon />}
	/>
)

const FilterFrame = ({ title, children }) => {
	const [open, setOpen] = useState(true)

	const handleOpen = () => { setOpen(p => !p) }

	return (
		<FilterCategory expanded={open} onChange={handleOpen}>
			<FilterSummary
				expandIcon={<ExpandMoreIcon fontSize="small" />}
				aria-controls="a-collapsible-panel"
				id="a-collapsible-panel"
			>
				<Typography style={{ fontWeight: 500 }}>{title}</Typography>
			</FilterSummary>
			<FilterDetails>
				{children}
			</FilterDetails>
		</FilterCategory >
	)
}
FilterFrame.propTypes = { title: PropTypes.string, children: PropTypes.any }



function FiltersBackup() {
	const classes = useStyles()
	const [fixed, setFixed] = useState(false)
	const listRef = useRef(null)

	const [state, setState] = React.useState({
		gilad: true,
		jason: false,
		antoine: false,
	})

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked })
	}

	const { gilad, jason, antoine } = state
	const error = [gilad, jason, antoine].filter((v) => v).length !== 2

	const fixedPosition = () => {
		setFixed(((listRef.current.clientHeight + 110) < window.innerHeight) ? true : false)
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

				<FilterFrame title="Status">
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
							disableUnderline={true}
						>
							<MenuItem value={0}>All</MenuItem>
							<MenuItem value={10}>Open</MenuItem>
							<MenuItem value={20}>Pending</MenuItem>
							<MenuItem value={30}>Replied</MenuItem>
							<MenuItem value={40}>Closed</MenuItem>
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
							disableUnderline={true}
						>
							<MenuItem value={0}>All</MenuItem>
							<MenuItem value={10}>Normal</MenuItem>
							<MenuItem value={20}>Low</MenuItem>
							<MenuItem value={30}>High</MenuItem>
						</FilterSelect>
					</FormControl>
				</FilterFrame>

				<FilterFrame title="Article Type">
					<FormControl component="fieldset" className={classes.formControl}>
						<FormGroup>
							<FormControlLabel
								control={<FilterCheckbox checked={gilad} onChange={handleChange} name="gilad" />}
								label="Annoucement"
							/>
							<FormControlLabel
								control={<FilterCheckbox checked={jason} onChange={handleChange} name="jason" />}
								label="Your ticket"
							/>
							<FormControlLabel
								control={<FilterCheckbox checked={antoine} onChange={handleChange} name="antoine" />}
								label="FAQs"
							/>
						</FormGroup>
					</FormControl>
				</FilterFrame>

				<FilterFrame title="Has words">
					<FormControl variant="outlined">
						<OutlinedInput
							id="outlined-adornment-weight"
							// value={values.weight}
							// onChange={handleChange('weight')}
							placeholder="Type keywords"
							endAdornment={<InputAdornment position="end"><SearchIcon fontSize="small" /></InputAdornment>}
							aria-describedby="outlined-weight-helper-text"
							labelWidth={0}
							className={classes.outlinedInput}
							margin="dense"
						/>
					</FormControl>
				</FilterFrame>


			</form>
		</div >
	)
}

export default FiltersBackup