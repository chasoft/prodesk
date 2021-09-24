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
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"

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
			<Link href={link}>
				<a>
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
			<Link href={link}>
				<a>
					<Box
						sx={{
							display: "flex",
							cursor: "pointer",
							flexDirection: { xs: "column", sm: "row" },
							"&:hover": { backgroundColor: "action.hover" },
							borderTopLeftRadius: isFirst ? "0.5rem" : 0,
							borderTopRightRadius: isFirst ? "0.5rem" : 0,
							borderBottomLeftRadius: isLast ? "0.5rem" : 0,
							borderBottomRightRadius: isLast ? "0.5rem" : 0,
						}}
					>

						<Box id="content"
							sx={{
								flexGrow: 1,
								minWidth: 0, /*this property is important*/
								p: 3,
							}}
						>
							<Typography variant="h5" noWrap>
								{subject}
							</Typography>

							{(isShort === false) &&
								<Typography sx={{ display: { xs: "none", md: "block" } }} noWrap>
									{excerpt}
								</Typography>}
						</Box>

						{(isShort === false) &&
							<Box id="moreInfo"
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: { xs: "row", md: "column" },
									mt: { xs: -2.5, sm: 2 },
									pt: { xs: 0, md: 1 },
									pr: 2,
									pb: 2.5,
									pl: { xs: 2, md: 0 },
								}}>

								{(metaData.length > 0) &&
									metaData.map(() => (
										<>
											<Box sx={{ textAlign: "center", px: "0.5rem" }}>
												<PriorityHighIcon
													style={{
														color: "#f44336",
														width: "1.25rem", height: "1.25rem",
														border: "1px solid",
														borderRadius: "50%"
													}}
												/>
											</Box>

											<Box id="extraInfo" sx={{ textAlign: "center" }}>
												<Typography variant="caption" noWrap>
													0 replies
												</Typography>
											</Box>
										</>
									))}
							</Box>}

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