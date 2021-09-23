import { red } from "@mui/material/colors"
import { createTheme } from "@mui/material"

export const theme = createTheme({
	palette: {
		primary: {
			main: "#1a73e8",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
	},
	navbar: {
		hoverColor: "#ffffff14",
	},
	typography: {
		htmlFontSize: 14,
		h1: {
			fontFamily: ["\"Google Sans\"", "Roboto", "sans-serif"].join(","),
			fontSize: "1.75rem",
			fontWeight: 400,
			lineHeight: "2rem",
			margin: "0 0 .5rem",
		},
		h2: {
			fontFamily: ["\"Google Sans\"", "Roboto", "sans-serif"].join(","),
			fontSize: "1.25rem",
			fontWeight: 400,
			lineHeight: "2rem",
			margin: "0 0 .25rem",
		},
		h3: {
			fontFamily: ["\"Google Sans\"", "Roboto", "sans-serif"].join(","),
			fontSize: "1.25rem",
			lineHeight: "2rem",
			margin: "1.5rem 0 .5rem",
		},
		h4: {
			fontFamily: ["\"Google Sans\"", "Roboto", "sans-serif"].join(","),
			fontSize: "1rem",
			fontWeight: 500,
			lineHeight: "1.5rem",
			margin: ".5rem 0",
		},
		h5: {
			fontFamily: ["\"Google Sans\"", "Roboto", "sans-serif"].join(","),
			fontSize: ".875rem",
			fontWeight: 700,
			lineHeight: "1.5rem",
			margin: ".25rem 0",
		},
		h6: {
			fontSize: "inherit",
			fontWeight: "inherit",
			margin: "0",
		},
		body1: {
			fontSize: "0.9rem",
			lineHeight: "1.25rem"
		},
		body2: {
			lineHeight: "1.25rem"
		},
		button: {
			textTransform: "none",
			fontFamily: ["\"Google Sans\"", "Roboto", "sans-serif"].join(","),
			borderRadius: "0.5rem",
		}
	},
	overrides: {
		MuiButton: {
			root: {
				"&:hover": {
					backgroundColor: "#EDF4FD"
				},
				color: "#1a73e8",
				borderRadius: "0.5rem",
			},
			contained: {
				"&$disabled": {
					backgroundColor: "transparent",
					border: ".0625rem solid #dadce0"
				}
			},
			containedPrimary: {
				color: "#fff",
				backgroundColor: "#1a73e8",
				"&:hover": {
					// backgroundColor: "-webkit-linear-gradient(top,#4387fd,#4683ea)",
					// "-webkit-box-shadow": "0 1px 2px 0 rgb(66 133 244 / 30%), 0 1px 3px 1px rgb(66 133 244 / 15%)",
					// boxShadow: "0 1px 2px 0 rgb(66 133 244 / 30%), 0 1px 3px 1px rgb(66 133 244 / 15%)"
				},
			},
		},
		MuiOutlinedInput: {
			root: {
				borderRadius: "0.5rem",
			},
		},
		MuiAccordion: {
			root: {
				"&$expanded": {
					marginTop: 0,
					marginBottom: 0,
				}
			}
		},
		MuiAccordionSummary: {
			root: {
				"&$expanded": {
					minHeight: 0
				}
			}
		},
		MuiInput: {
			underline: {
				"&:hover:not(.Mui-disabled):before": {
					borderBottom: "2px solid rgba(0, 0, 0, 0.5)"
				},
			}
		},

	},
	shape: {
		// borderRadius: 1
	}
})