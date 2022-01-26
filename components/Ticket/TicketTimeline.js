/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Avatar, Box, Tooltip, Typography } from "@mui/material"
import Timeline from "@mui/lab/Timeline"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"
import { styled } from "@mui/material/styles"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function TimeBlock({ date, time }) {
	return (
		<TimelineOppositeContent>
			<Box
				onClick={() => { }}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					cursor: "pointer",
					"&>p": { whiteSpace: "nowrap" },
					"&:hover>p": { color: "primary.main" }
				}}
			>
				<Typography color="textSecondary">
					{date}
				</Typography>
				<Typography color="textSecondary">
					{time}
				</Typography>
			</Box>
		</TimelineOppositeContent>
	)
}
TimeBlock.propTypes = {
	date: PropTypes.any,
	time: PropTypes.any
}

function TimeConnector() {
	return (
		<TimelineSeparator>
			<TimelineDot />
			<TimelineConnector />
		</TimelineSeparator>
	)
}

function TimeAuthor({ photoURL = "/avatar/1.png", userInfo }) {
	return (

		<TimelineContent
			sx={{
				top: "-0.8rem",
				position: "relative",
				display: "flex",
				alignItems: "center"
			}}
		>

			<Tooltip
				title={<span>{userInfo.name} <br /> {userInfo.role}</span>}
				placement="top"
			>
				<Avatar
					alt="Remy Sharp" src={photoURL}
					sx={{ mr: 1 }} />
			</Tooltip>

			<Box sx={{
				flexDirection: "column",
				display: { xs: "none", xl: "flex" }
			}}>
				<Typography style={{ whiteSpace: "nowrap" }} variant="caption">
					{userInfo.name}
				</Typography>
				<Typography style={{ whiteSpace: "nowrap" }}>
					{userInfo.role}
				</Typography>
			</Box>


		</TimelineContent>
	)
}
TimeAuthor.propTypes = {
	photoURL: PropTypes.string,
	userInfo: PropTypes.object
}

const TimelineItemStyled = styled(TimelineItem)({
	"&::before": {
		padding: 0
	},
})

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketTimeline() {
	return (
		<Timeline>

			<TimelineItemStyled>
				<TimeBlock date="2021-09-26" time="09:15 AM" />
				<TimeConnector />
				<TimeAuthor
					photoURL="/avatar/9.png"
					userInfo={{
						name: "Camille V.",
						role: "Techical Supporter"
					}} />
			</TimelineItemStyled>

			<TimelineItemStyled>
				<TimeBlock date="2021-09-26" time="09:15 AM" />
				<TimeConnector />
				<TimeAuthor userInfo={{
					name: "Camille V.",
					role: "Techical Supporter"
				}} />
			</TimelineItemStyled>

			<TimelineItemStyled>
				<TimeBlock date="2021-09-26" time="09:15 AM" />
				<TimeConnector />
				<TimeAuthor userInfo={{
					name: "Camille V.",
					role: "Techical Supporter"
				}} />
			</TimelineItemStyled>

		</Timeline>
	)
}

export default TicketTimeline