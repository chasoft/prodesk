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
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Avatar, Box, Chip, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const PostListEmpty = ({ message }) => {
	return (
		<Box
			sx={{
				borderRadius: "0.5rem",
				"&:hover": { backgroundColor: "action.hover" },
			}}
		>
			<Typography
				sx={{
					p: 3,
					minWidth: { xs: "none", md: 0 /*this property is important*/ },
				}}
			>
				{message}
			</Typography>
		</Box>
	)
}
PostListEmpty.propTypes = { message: PropTypes.string }

export const PostListItemShorten = ({ subject, link }) => {
	return (
		<Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
			<Link href={link} passHref>
				<a href="just-a-placeholder">
					<Box
						sx={{
							cursor: "pointer",
							"&:hover": { backgroundColor: "action.hover" },
							px: { xs: 2, md: 3 },
							py: 2,
							// minWidth: 0, /*this property is important*/
						}}
					>
						<Typography noWrap>{subject}</Typography>
					</Box>
				</a>
			</Link>
		</Box >
	)
}
PostListItemShorten.propTypes = { subject: PropTypes.string, link: PropTypes.string }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function PostListItem({ subject, excerpt, link, metaData, isFirst = false, isLast = false, isShort = false }) {
	return (
		<Box
			sx={{
				borderTop: isFirst ? 0 : "1px solid",
				borderColor: "divider",
			}}
		>
			<Link href={link} passHref>
				<a href="just-a-placeholder">
					<Box
						sx={{
							display: "flex", flexDirection: "column",
							"&:hover": { backgroundColor: "action.hover", cursor: "pointer" },
							borderTopLeftRadius: isFirst ? "0.5rem" : 0,
							borderTopRightRadius: isFirst ? "0.5rem" : 0,
							borderBottomLeftRadius: isLast ? "0.5rem" : 0,
							borderBottomRightRadius: isLast ? "0.5rem" : 0,
						}}
					>

						<Typography variant="h5" sx={{
							pt: 3, px: 3,
							...(isShort ? { pb: 3 } : {})
						}}>
							{subject}
						</Typography>

						{(isShort === false) &&
							<Typography sx={{
								display: { xs: "none", md: "block" },
								px: 3
							}}>
								{excerpt}
							</Typography>}

						{((isShort === false) && (metaData.length > 0)) &&
							metaData.map((item, idx) => (
								<Box key={idx} sx={{
									display: "flex",
									alignItems: "center",
									borderBottomLeftRadius: "0.5rem",
									borderBottomRightRadius: "0.5rem",
									pt: 1, px: 3, pb: 3,
									"& > *": { mr: 0.5 }
								}}>

									<Tooltip title="Department" placement="top">
										<Chip
											size="small"
											label="Sales"
											variant="outlined"
										/>
									</Tooltip>

									<Tooltip title="Category" placement="top">
										<Chip
											size="small"
											label="Hosting/Wordpress"
											variant="outlined"
										/>
									</Tooltip>

									<Chip
										size="small"
										avatar={<Avatar>2</Avatar>}
										label="replies"
										variant="outlined"
										sx={{ ".MuiChip-avatar": { color: "#FFF", fontWeight: 700 } }}
									/>

									<Tooltip title="Priority" placement="top">
										<Chip
											size="small"
											label="Low"
											variant="outlined"
											color="info"
										/>
									</Tooltip>


									<Tooltip title="Priority" placement="top">
										<Chip
											size="small"
											label="Important"
											variant="outlined"
											color="warning"
										/>
									</Tooltip>

								</Box>
							))}
					</Box>
				</a>
			</Link>
		</Box>
	)
}
PostListItem.propTypes = {
	subject: PropTypes.string,
	excerpt: PropTypes.string,
	link: PropTypes.string,
	metaData: PropTypes.array, //array of Objects
	isFirst: PropTypes.bool, isLast: PropTypes.bool,
	isShort: PropTypes.bool
}

export default PostListItem