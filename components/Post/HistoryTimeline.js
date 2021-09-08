/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React, { useEffect, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core"
import Timeline from "@material-ui/lab/Timeline"
import TimelineItem from "@material-ui/lab/TimelineItem"
import TimelineSeparator from "@material-ui/lab/TimelineSeparator"
import TimelineConnector from "@material-ui/lab/TimelineConnector"
import TimelineContent from "@material-ui/lab/TimelineContent"
import TimelineDot from "@material-ui/lab/TimelineDot"
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent"
import Typography from "@material-ui/core/Typography"
import UserInfo from "./../../components/common/UserInfo"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "4rem",
		marginLeft: "3rem"
	},
	datetime: {
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
			color: theme.palette.primary.main
		}
	},
	userInfo: {

	},
	leftAvatar: {

	},
	rightContent: {
		top: "-0.8rem",
		position: "relative"
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const HistoryTimeline = () => {
	const classes = useStyles()
	const [fixed, setFixed] = useState(false)
	const listRef = useRef(null)

	const fixedPosition = () => {
		setFixed(((listRef.current.clientHeight + 110) < window.innerHeight) ? true : false)
	}

	useEffect(() => {
		fixedPosition()
		window.addEventListener("resize", fixedPosition)
		return () => window.removeEventListener("resize", fixedPosition)
	}, [])

	useEffect(() => {
		window.addEventListener("scroll", fixedPosition)
		return () => window.removeEventListener("scroll", fixedPosition)
	}, [])

	return (
		<div>
			<div ref={listRef} className={classes.root} style={{ position: fixed ? "fixed" : "static" }}>

				<Timeline>

					<TimelineItem>
						<TimelineOppositeContent>
							<div className={classes.datetime} onClick={() => { }}>
								<Typography color="textSecondary">
									28-06-21<br />
									09:30 AM
								</Typography>
							</div>
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot />
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent>
							<div className={classes.rightContent}>
								<UserInfo />
							</div>
						</TimelineContent>
					</TimelineItem>

					<TimelineItem>
						<TimelineOppositeContent>
							<div className={classes.datetime}>
								<Typography color="textSecondary">
									28-06-21<br />
									09:30 AM
								</Typography>
							</div>
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot />
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent>
							<div className={classes.rightContent}>
								<UserInfo />
							</div>
						</TimelineContent>
					</TimelineItem>

					<TimelineItem>
						<TimelineOppositeContent>
							<div className={classes.datetime}>
								<Typography color="textSecondary">
									28-06-21<br />
									09:30 AM
								</Typography>
							</div>
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot />
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent>
							<div className={classes.rightContent}>
								<UserInfo />
							</div>
						</TimelineContent>
					</TimelineItem>

				</Timeline>


			</div>
		</div>
	)
}

export default HistoryTimeline