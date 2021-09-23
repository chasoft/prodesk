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
				"&:hover": {
					background: "action.hover"
				},
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: { xs: "flex-start", md: "center" },
					flexDirection: { xs: "column", md: "row" },
				}}
			>
				<Box
					sx={{
						textAlign: "center",
						p: {
							xs: (theme) => theme.spacing(1, 2, 1),
							md: 3
						},
						minWidth: {
							xs: "none",
							md: 0 /*this property is important*/
						},
					}}
				>
					<Typography>{message}</Typography>
				</Box>
			</Box>
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
							"&:hover": {
								background: "action.hover"
							},
							padding: {
								xs: (theme) => theme.spacing(2, 2),
								md: (theme) => theme.spacing(2, 3),
							}

						}}
					>

						<Box
							sx={{
								display: "flex",
								flexDirection: { xs: "column", md: "row" },
								alignItems: { xs: "flex-start", md: "center" },
							}}
						>
							<Box
								sx={{
									minWidth: 0, /*this property is important*/
									maxWidth: { xs: "100%", md: "none" },
									p: {
										xs: (theme) => theme.spacing(1, 2, 1),
										md: "inherit "
									}
								}}
							>
								<Typography noWrap>{subject}</Typography>
							</Box>
						</Box>

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
				borderColor: "divider",
				borderTop: isFirst ? "0" : "1px solid",
			}}
		>
			<Link href={link}>
				<a>
					<Box
						sx={{
							cursor: "pointer",
							"&:hover": {
								background: "action.hover"
							},
							borderTopLeftRadius: isFirst ? "0.5rem" : 0,
							borderTopRightRadius: isFirst ? "0.5rem" : 0,
							borderBottomLeftRadius: isLast ? "0.5rem" : 0,
							borderBottomRightRadius: isLast ? "0.5rem" : 0,
						}}
					>

						<div>

							<Box
								id="content"
								sx={{ padding: 3 }}
							>
								<Typography variant="h5" noWrap>
									{subject}
								</Typography>

								{(isShort === false) &&
									<Typography noWrap sx={{ display: { xs: "none", md: "initial" } }}>
										{excerpt}
									</Typography>}

							</Box>

							{
								isShort ?
									null
									: <Box id="moreInfo"
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											flexDirection: { xs: "row", md: "column" },
											padding: {
												xs: (theme) => theme.spacing(0, 2, 1),
												md: (theme) => theme.spacing(1, 2, 1, 0)
											}
										}}>

										{
											metaData.length > 0 ?
												metaData.map(() => {
													return (
														<>
															<Box
																sx={{
																	textAlign: "center",
																	paddingLeft: "0.5rem",
																	paddingRight: "0.5rem",
																}}
															>

																<PriorityHighIcon
																	style={{
																		color: "#f44336",
																		width: "1.25rem",
																		height: "1.25rem",
																		border: "1px solid",
																		borderRadius: "50%"
																	}}
																/>

															</Box>

															<Box id="extraInfo"
																sx={{
																	textAlign: "center"
																}}
															>
																<Typography variant="caption" noWrap>
																	0 replies
																</Typography>
															</Box>
														</>
													)
												})
												: null
										}
									</Box>
							}

						</div>

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