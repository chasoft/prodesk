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

import React from "react"

// MATERIAL-UI
import { Box, Typography } from "@mui/material"
import Timeline from "@mui/lab/Timeline"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"

//THIRD-PARTY

//PROJECT IMPORT
import UserInfo from "./../../components/common/UserInfo"
import useSticky from "../../helpers/useSticky"

//ASSETS

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const HistoryTimeline = () => {
	const [ref, isSticky] = useSticky({ offsetTop: 100, scrollY: 20 })

	return (
		<Box
			ref={ref}
			sx={{
				mt: 15,
				position: isSticky ? "sticky" : "static",
				top: isSticky ? "100px" : "initial"
			}}
		>

			<Timeline>

				<TimelineItem>
					<TimelineOppositeContent>
						<Box
							onClick={() => { }}
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								top: "-0.8rem",
								position: "relative",
								cursor: "pointer",
								"& > p": {
									whiteSpace: "nowrap"
								},
								"& > :hover": {
									color: "primary.main"
								}
							}}
						>
							<Typography color="textSecondary">
								28-06-21<br />
								09:30 AM
							</Typography>
						</Box>
					</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineDot />
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>
						<Box
							sx={{
								top: "-0.8rem",
								position: "relative"
							}}
						>
							<UserInfo />
						</Box>
					</TimelineContent>
				</TimelineItem>

				<TimelineItem>
					<TimelineOppositeContent>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								top: "-0.8rem",
								position: "relative",
								cursor: "pointer",
								"& > p": {
									whiteSpace: "nowrap"
								},
								"& > :hover": {
									color: "primary.main"
								}
							}}
						>
							<Typography color="textSecondary">
								28-06-21<br />
								09:30 AM
							</Typography>
						</Box>
					</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineDot />
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>
						<Box
							sx={{
								top: "-0.8rem",
								position: "relative"
							}}
						>
							<UserInfo />
						</Box>
					</TimelineContent>
				</TimelineItem>

				<TimelineItem>
					<TimelineOppositeContent>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								top: "-0.8rem",
								position: "relative",
								cursor: "pointer",
								"& > p": {
									whiteSpace: "nowrap"
								},
								"& > :hover": {
									color: "primary.main"
								}
							}}
						>
							<Typography color="textSecondary">
								28-06-21<br />
								09:30 AM
							</Typography>
						</Box>
					</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineDot />
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>
						<Box
							sx={{
								top: "-0.8rem",
								position: "relative"
							}}
						>
							<UserInfo />
						</Box>
					</TimelineContent>
				</TimelineItem>

			</Timeline>


		</Box>
	)
}

export default HistoryTimeline