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

import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Chip, Paper, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

//PROJECT IMPORT

//ASSETS

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TicketMetaBox = ({ format, title, content }) => {
	const middleLine = useRef(null)
	const [middleWidth, setMiddleWidth] = useState(100)
	dayjs.extend(relativeTime)

	useEffect(() => { setMiddleWidth(middleLine?.current.offsetWidth) }, [])

	return (
		<Box
			sx={{
				display: "flex", justifyContent: "space-between",
				alignItems: "center",
				m: 0, p: 1,
				borderRadius: "0.5rem"
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
				{title}
			</Box>

			<Box ref={middleLine} sx={{ flexGrow: 1, overflow: "hidden", whiteSpace: "nowrap" }}>
				. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
			</Box>

			{(format === MetaContentFormat.TEXT_NORMAL) &&
				<Typography sx={{ textAlign: "right", whiteSpace: "nowrap" }}>
					{content}
				</Typography>}

			{(format === MetaContentFormat.CHIP) &&
				<Chip
					size="small"
					label={content}

				/>}

			{(format === MetaContentFormat.DATE) &&
				<Typography sx={{ textAlign: "right" }}>
					<span style={{
						whiteSpace: "nowrap", fontStyle: "italic",
						display: middleWidth < 10 ? "none" : "initial"
					}}>
						({dayjs(content).fromNow()}) &nbsp;
					</span>
					<span style={{ whiteSpace: "nowrap" }}>
						{content}
					</span>
				</Typography>}

		</Box >
	)
}
TicketMetaBox.propTypes = {
	format: PropTypes.node,
	title: PropTypes.string,
	content: PropTypes.node	//it could be tag, string, badge...
}

const META_CODE = {
	CREATOR: { CODE: "creator", POSITION: 0 },
	STATUS: { CODE: "status", POSITION: 1 },
	PRIORITY: { CODE: "priority", POSITION: 2 },
	UPDATED_AT: { CODE: "updatedAt", POSITION: 3 },
	CREATED_AT: { CODE: "createdAt", POSITION: 4 },
	DEPARTMENT: { CODE: "department", POSITION: 5 },
	CATEGORY: { CODE: "category", POSITION: 6 },
	LABEL: { CODE: "label", POSITION: 7 }
}

const MetaContentFormat = {
	TEXT_NORMAL: "text",
	TEXT_EMPHASIS: "text-emphasis",
	CHIP: "chip",
	DATE: "date"
}

const MetaProperties = {
	[META_CODE.DEPARTMENT.CODE]: { name: "Department", type: MetaContentFormat.TEXT_NORMAL },
	[META_CODE.STATUS.CODE]: { name: "Status", type: MetaContentFormat.CHIP },
	[META_CODE.CREATOR.CODE]: { name: "Creator", type: MetaContentFormat.TEXT_NORMAL },
	[META_CODE.PRIORITY.CODE]: { name: "Priority", type: MetaContentFormat.CHIP },
	[META_CODE.UPDATED_AT.CODE]: { name: "Updated at", type: MetaContentFormat.DATE },
	[META_CODE.CREATED_AT.CODE]: { name: "Created at", type: MetaContentFormat.DATE },
	[META_CODE.CATEGORY.CODE]: { name: "Category", type: MetaContentFormat.TEXT_NORMAL },
	[META_CODE.LABEL.CODE]: { name: "Label", type: MetaContentFormat.CHIP },
}

const DUMMY_META = {
	department: "Sales",
	status: "Pending",
	creator: "Brian",
	priority: "Normal",
	updatedAt: "2021-09-20",
	createdAt: "2021-09-21",
	category: "Hosting/Wordpress",
	label: "bug"
}


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const PostMeta = () => {

	return (
		<Paper
			sx={{
				display: { xs: "none", md: "flex" },
				flexDirection: "column",
				borderRadius: "0.5rem",
				mt: 2, ml: 3,
				p: { xs: 1, lg: 3 },
			}}
		>

			{Object.entries(MetaProperties).map((item, idx) => {

				if ((META_CODE.DEPARTMENT.CODE in DUMMY_META) && idx === META_CODE.DEPARTMENT.POSITION) {
					return <TicketMetaBox
						key={META_CODE.DEPARTMENT.CODE}
						title={MetaProperties[META_CODE.DEPARTMENT.CODE].name}
						format={MetaProperties[META_CODE.DEPARTMENT.CODE].type}
						content={DUMMY_META[META_CODE.DEPARTMENT.CODE]}
					/>
				}

				if ((META_CODE.STATUS.CODE in DUMMY_META) && idx === META_CODE.STATUS.POSITION) {
					return <TicketMetaBox
						key={META_CODE.STATUS.CODE}
						title={MetaProperties[META_CODE.STATUS.CODE].name}
						format={MetaProperties[META_CODE.STATUS.CODE].type}
						content={DUMMY_META[META_CODE.STATUS.CODE]}
					/>
				}

				if ((META_CODE.CREATOR.CODE in DUMMY_META) && idx === META_CODE.CREATOR.POSITION) {
					return <TicketMetaBox
						key={META_CODE.CREATOR.CODE}
						title={MetaProperties[META_CODE.CREATOR.CODE].name}
						format={MetaProperties[META_CODE.CREATOR.CODE].type}
						content={DUMMY_META[META_CODE.CREATOR.CODE]}
					/>
				}

				if ((META_CODE.PRIORITY.CODE in DUMMY_META) && idx === META_CODE.PRIORITY.POSITION) {
					return <TicketMetaBox
						key={META_CODE.PRIORITY.CODE}
						title={MetaProperties[META_CODE.PRIORITY.CODE].name}
						format={MetaProperties[META_CODE.PRIORITY.CODE].type}
						content={DUMMY_META[META_CODE.PRIORITY.CODE]}
					/>
				}

				if ((META_CODE.UPDATED_AT.CODE in DUMMY_META) && idx === META_CODE.UPDATED_AT.POSITION) {
					return <TicketMetaBox
						key={META_CODE.UPDATED_AT.CODE}
						title={MetaProperties[META_CODE.UPDATED_AT.CODE].name}
						format={MetaProperties[META_CODE.UPDATED_AT.CODE].type}
						content={DUMMY_META[META_CODE.UPDATED_AT.CODE]}
					/>
				}

				if ((META_CODE.CREATED_AT.CODE in DUMMY_META) && idx === META_CODE.CREATED_AT.POSITION) {
					return <TicketMetaBox
						key={META_CODE.CREATED_AT.CODE}
						title={MetaProperties[META_CODE.CREATED_AT.CODE].name}
						format={MetaProperties[META_CODE.CREATED_AT.CODE].type}
						content={DUMMY_META[META_CODE.CREATED_AT.CODE]}
					/>
				}

				if ((META_CODE.CATEGORY.CODE in DUMMY_META) && idx === META_CODE.CATEGORY.POSITION) {
					return <TicketMetaBox
						key={META_CODE.CATEGORY.CODE}
						title={MetaProperties[META_CODE.CATEGORY.CODE].name}
						format={MetaProperties[META_CODE.CATEGORY.CODE].type}
						content={DUMMY_META[META_CODE.CATEGORY.CODE]}
					/>
				}

				if ((META_CODE.LABEL.CODE in DUMMY_META) && idx === META_CODE.LABEL.POSITION) {
					return <TicketMetaBox
						key={META_CODE.LABEL.CODE}
						title={MetaProperties[META_CODE.LABEL.CODE].name}
						format={MetaProperties[META_CODE.LABEL.CODE].type}
						content={DUMMY_META[META_CODE.LABEL.CODE]}
					/>
				}

			})}

		</Paper>
	)
}

export default PostMeta