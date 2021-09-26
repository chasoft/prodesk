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
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Paper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import UserInfo from "./../../components/common/UserInfo"

//ASSETS

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const PostMetaItem = ({ format, title, content }) => {
	return (
		<Box
			sx={{
				display: "flex", justifyContent: "space-between",
				m: 0, p: 1,
				borderRadius: "0.5rem"

			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				{title}
			</Box>

			{(format === MetaContentFormat.TEXT_NORMAL) &&
				<Typography sx={{ textAlign: "right" }}>
					{content}
				</Typography>}

			{(format === MetaContentFormat.TEXT_EMPHASIS) &&
				<Typography sx={{ textAlign: "right" }}>
					{content}
				</Typography>}

			{(format === MetaContentFormat.CHIP) &&
				<Typography sx={{ textAlign: "right" }}>
					{content}
				</Typography>}

		</Box>
	)
}
PostMetaItem.propTypes = {
	format: PropTypes.node,
	title: PropTypes.string,
	content: PropTypes.node	//it could be tag, string, badge...
}

const META_CODE = {
	DEPARTMENT: "department",
	STATUS: "status",
	CREATOR: "creator",
	PRIORITY: "priority",
	UPDATED_AT: "updatedAt",
	CREATED_AT: "createdAt",
	CATEGORY: "category",
	LABEL: "label"
}

const MetaContentFormat = {
	TEXT_NORMAL: "text",
	TEXT_EMPHASIS: "text-emphasis",
	CHIP: "chip"
}

const MetaProperties = [
	{ code: META_CODE.DEPARTMENT, name: "Department", type: MetaContentFormat.TEXT_NORMAL },
	{ code: META_CODE.STATUS, name: "Status", type: MetaContentFormat.TEXT_NORMAL },
	{ code: META_CODE.CREATOR, name: "Creator", type: MetaContentFormat.TEXT_NORMAL },
	{ code: META_CODE.PRIORITY, name: "Priority", type: MetaContentFormat.TEXT_NORMAL },
	{ code: META_CODE.UPDATED_AT, name: "Updated at", type: MetaContentFormat.TEXT_NORMAL },
	{ code: META_CODE.CREATED_AT, name: "Created at", type: MetaContentFormat.TEXT_NORMAL },
	{ code: META_CODE.CATEGORY, name: "Category", type: MetaContentFormat.TEXT_NORMAL },
	{ code: META_CODE.LABEL, name: "Label", type: MetaContentFormat.TEXT_NORMAL },
]

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

			{MetaProperties.map((item) => {

				if (META_CODE.DEPARTMENT in DUMMY_META) {
					return <PostMetaItem
						key={item.code}
						title={item.name}
						format={item.type}
						content={DUMMY_META[META_CODE.DEPARTMENT]}
					/>
				}

				if (META_CODE.STATUS in DUMMY_META) {
					return <PostMetaItem
						key={item.code}
						title={item.name}
						format={item.type}
						content={DUMMY_META[META_CODE.STATUS]}
					/>
				}

				if (META_CODE.CREATOR in DUMMY_META) {
					return <PostMetaItem
						key={item.code}
						title={item.name}
						format={item.type}
						content={DUMMY_META[META_CODE.CREATOR]}
					/>
				}

				if (META_CODE.PRIORITY in DUMMY_META) {
					return <PostMetaItem
						key={item.code}
						title={item.name}
						format={item.type}
						content={DUMMY_META[META_CODE.PRIORITY]}
					/>
				}

				if (META_CODE.UPDATED_AT in DUMMY_META) {
					return <PostMetaItem
						key={item.code}
						title={item.name}
						format={item.type}
						content={DUMMY_META[META_CODE.UPDATED_AT]}
					/>
				}

				if (META_CODE.CREATED_AT in DUMMY_META) {
					return <PostMetaItem
						key={item.code}
						title={item.name}
						format={item.type}
						content={DUMMY_META[META_CODE.CREATED_AT]}
					/>
				}

				if (META_CODE.CATEGORY in DUMMY_META) {
					return <PostMetaItem
						key={item.code}
						title={item.name}
						format={item.type}
						content={DUMMY_META[META_CODE.CATEGORY]}
					/>
				}

				if (META_CODE.LABEL in DUMMY_META) {
					return <PostMetaItem
						key={item.code}
						title={item.name}
						format={item.type}
						content={DUMMY_META[META_CODE.LABEL]}
					/>
				}

			})}

		</Paper>
	)
}

export default PostMeta