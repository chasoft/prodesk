/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.0     ║ *
 * ╠═══════════════════════════════════════════════════════════════════╣ *
 * ║                                                                   ║ *
 * ║   @author     A. Cao <cao@anh.pw>                                 ║ *
 * ║   @copyright  Chasoft Labs © 2021                                 ║ *
 * ║   @link       https://chasoft.net                                 ║ *
 * ║                                                                   ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║ @license This product is licensed and sold at CodeCanyon.net      ║ *
 * ║ If you have downloaded this from another site or received it from ║ *
 * ║ someone else than me, then you are engaged in an illegal activity.║ *
 * ║ You must delete this software immediately or buy a proper license ║ *
 * ║ from http://codecanyon.net/user/chasoft/portfolio?ref=chasoft.    ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║      THANK YOU AND DON'T HESITATE TO CONTACT ME FOR ANYTHING      ║ *
 * ╚═══════════════════════════════════════════════════════════════════╝ *
 ************************************************************************/

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useState } from "react"
import Link from "next/link"

// MATERIAL-UI
import { styled } from "@mui/material/styles"
import { Container, Typography } from "@mui/material"
import MuiAccordion from "@mui/material/Accordion"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	boxShadow: "none",
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&:before": {
		display: "none",
	},
}))

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
		{...props}
	/>
))(({ theme }) => ({
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
	},
	"& .MuiAccordionSummary-expandIconWrapper": { color: theme.palette.primary.main },
	"& .MuiAccordionSummary-expandIconWrapper > svg": { width: "0.8em", height: "0.8em" },
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
	padding: 0,
	paddingBottom: 1,
	backgroundColor: "#E8F0FE",
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

const AccordionList = styled("ul")(({ theme }) => ({
	listStyle: "none",
	padding: 0,
	marginTop: theme.spacing(2),
	width: "100%",
	"&>a>li": {
		padding: theme.spacing(1, 4, 1, 8),
		[theme.breakpoints.down("md")]: {
			paddingLeft: theme.spacing(3),
		},
	},
	"&>a>li:hover": {
		backgroundColor: "#D2E3FC"
	}
}))

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function FrontAccordions() {
	const [expanded, setExpanded] = useState("panel1")

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<Container maxWidth="md"
			sx={{
				mt: { xs: 3, md: 8 },
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				"& > *": { width: "100%" }
			}}
		>

			{[1, 2, 3, 4].map((item, idx) => (
				<Accordion
					key={item}
					expanded={expanded === `panel${idx + 1}`}
					onChange={handleChange(`panel${idx + 1}`)}
					sx={{
						borderTopLeftRadius: (idx === 0) ? "0.625rem" : 0,
						borderTopRightRadius: (idx === 0) ? "0.625rem" : 0,
						borderBottomLeftRadius: (idx === 3) ? "0.625rem" : 0,
						borderBottomRightRadius: (idx === 3) ? "0.625rem" : 0
					}}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`panel${idx + 1}bh-content`}
						id={`panel${idx + 1}bh-header`}
						sx={{
							borderBottomLeftRadius: (idx === 3 && expanded !== `panel${idx + 1}`) ? "0.625rem" : 0,
							borderBottomRightRadius: (idx === 3 && expanded !== `panel${idx + 1}`) ? "0.625rem" : 0
						}}
					>
						<Typography
							sx={{
								fontSize: "0.9rem",
								flexShrink: 1,
								lineHeight: "2rem"
							}}
							variant="button"
						>
							General settings - tiếng Việt thì như thế nào?
						</Typography>
					</AccordionSummary>
					<AccordionDetails
						sx={{
							borderBottomLeftRadius: (idx === 3 && expanded === `panel${idx + 1}`) ? "0.625rem" : 0,
							borderBottomRightRadius: (idx === 3 && expanded === `panel${idx + 1}`) ? "0.625rem" : 0
						}}
					>
						<AccordionList>
							{[1, 2, 3].map((item, idx) => (
								<Link key={idx} href="/docs" passHref>
									<a href="/just-a-placeholder">
										<li>
											<Typography>
												Profile
											</Typography>
										</li>
									</a>
								</Link>
							))}
						</AccordionList>
					</AccordionDetails>
				</Accordion>
			))}
		</Container >
	)
}

export default FrontAccordions