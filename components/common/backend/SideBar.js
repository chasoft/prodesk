/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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
import Link from "next/link"

// MATERIAL-UI
import { IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core"
import { Logo } from ".."
import NavCollapse from "./NavCollapse"
import clsx from "clsx"

//THIRD-PARTY
import PerfectScrollbar from "react-perfect-scrollbar"

//PROJECT IMPORT


//ASSETS
import AssessmentIcon from "@material-ui/icons/Assessment"
import "react-perfect-scrollbar/dist/css/styles.css"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import BarChartIcon from "@material-ui/icons/BarChart"
import CategoryIcon from "@material-ui/icons/Category"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import HomeButton from "./HomeButton"
import { MENU_ITEM_TYPE } from "../../../helpers/constants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		width: "68px",
		height: "100vh",
		// position: "fixed"
	},
	sideBarExpanded: {
		width: "256px",
	},
	logo: {
		height: "59px",
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(1, 1, 0.5, 3)
	},
	miniLogo: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "56px",
		padding: theme.spacing(1, 0, 0.5, 0)
	},
	nav_bg: {
		backgroundAttachment: "fixed",
		backgroundColor: "#051e34",
		backgroundImage: "url(\"/img/nav_admin_bg.png\")",
		backgroundRepeat: "no-repeat",
		backgroundSize: "256px 556px",
		height: "100vh",
		transition: "width .3s cubic-bezier(0.4, 0, 0.2, 1)"
	},
	list: {
		margin: 0,
		padding: 0,
		width: "100%",
		listStyle: "none",
		"& > li > a": {
			display: "flex",
			alignItems: "center",
			fontSize: "0.875rem",
			padding: theme.spacing(1, 2, 1, 0),
			paddingLeft: theme.spacing(3) - 4,

			"& >:first-child": {
				marginRight: theme.spacing(1),
				height: "20px",
				weight: "20px",
			}
		},
		"& > li:hover": {
			backgroundColor: "#ffffff14",
			cursor: "pointer",
		},
		"& > li:last-child": {
			paddingBottom: theme.spacing(2)
		}
	},
	miniList: {
		margin: 0,
		padding: 0,
		width: "100%",
		listStyle: "none",
		textAlign: "center",
		backgroundColor: "#ffffff14",
		"&>li": {
			display: "flex",
			justifyContent: "center",
			padding: theme.spacing(1, 2, 1),
			color: "#ffffffcc",
			"& > a > :first-child": {
				height: "20px",
				weight: "20px",
			}
		},
		"&>li:hover": {
			backgroundColor: "#ffffff14",
			cursor: "pointer",
		},
		borderTop: "1px solid #2A4257",
	},
	ScrollHeight: {
		height: "calc(100vh - 88px)",
	},
	minimizer: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: "auto",
		padding: theme.spacing(2),
		borderTop: "1px solid #2A4257",
	},
	singleItem: {
		display: "flex",
		alignItems: "center",
		color: "#fff",
		padding: theme.spacing(1.5, 0.5, 1.5, 3),
		"&:hover": {
			backgroundColor: "#ffffff14",
			cursor: "pointer",
		},
		borderBottom: "1px solid #2A4257",
		"& > :first-child": {
			height: "20px",
			width: "20px",
			marginRight: theme.spacing(1),
		}
	},
	heading: {
		fontFamily: "\"Google Sans\", Roboto, sans-serif",
		fontSize: "1rem"
	},
	headingDescription: {
		fontSize: "0.75rem",
		color: "#ffffff80",
		width: "90%"
	},
	itemHeader: {
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		padding: theme.spacing(3, 1, 3, 3),
		"&:hover": {
			backgroundColor: "#ffffff14"
		},
		width: "256px",
		borderBottom: "1px solid #2A4257",
	},
	miniItemHeader: {
		display: "flex",
		justifyContent: "center",
		textAlign: "center",
		padding: theme.spacing(1, 2, 1),
		"&:hover": {
			backgroundColor: "#ffffff14"
		},
		borderTop: "1px solid #2A4257",
		color: "#ffffffcc",
		cursor: "pointer",
		"& >:first-child": {
			height: "20px",
			weight: "20px",
		},
		margin: theme.spacing(0.5, 0, 0.5)
	}
}))

const IconLib = {
	"0": <AssessmentIcon />,
	"1": <AssessmentIcon />,
	"2": <CreditCardIcon />,
	"3": <AccountTreeIcon />,
	"4": <BarChartIcon />,
	"5": <CategoryIcon />,
	"6": <AssessmentIcon />
}

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const SideBar = ({ isExpanded = true, toggle, homeUrl, settingsUrl, data = [] }) => {
	const classes = useStyles()
	return (
		<div className={clsx([classes.root, classes.nav_bg, { [classes.sideBarExpanded]: isExpanded }])}>

			<div className={isExpanded ? classes.logo : classes.miniLogo}>
				<Logo theme="dark" isSmall={!isExpanded} />
			</div>

			<HomeButton homeUrl={homeUrl} settingsUrl={settingsUrl} isExpanded={isExpanded} />

			{
				isExpanded ?
					<PerfectScrollbar component="div" className={classes.ScrollHeight}>
						{
							data.map((group) => {
								if (group.type === MENU_ITEM_TYPE.ITEM)
									return (
										<Link key={group.url} href={group.url} >
											<a>
												<div className={classes.itemHeader}>
													<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
														<div style={{ display: "flex", alignItems: "center" }}>
															<Typography
																className={classes.heading}
																style={{ color: "#fff", flexGrow: 1 }}
															>
																{group.title}
															</Typography>
														</div>
														<Typography
															className={classes.headingDescription}
															variant="caption"
															noWrap
														>{group.description}</Typography>
													</div>
												</div>
											</a>
										</Link>
									)
								else if (group.type === MENU_ITEM_TYPE.GROUP)
									return (
										<NavCollapse
											key={group.id}
											title={group.title}
											isExpanded={group.expanded}
											description={group.description}
											isLongDisplay={isExpanded}
										>
											<ul className={classes.list}>
												{
													group.items.map((item) => {
														return (
															<li key={item.id}>
																<Link href={item.url}>
																	<a>
																		{IconLib[item.icon]}{item.text}
																	</a>
																</Link>
															</li>
														)
													})
												}
											</ul>
										</NavCollapse>
									)
								else
									throw new Error("Wrong-Menu-DataType")
							})
						}
					</PerfectScrollbar >

					:
					<PerfectScrollbar component="div" className={classes.ScrollHeight}>
						{
							data.map((group) => {
								if (group.type === MENU_ITEM_TYPE.ITEM)
									return (
										<Link key={group.url} href={group.url} >
											<Tooltip title={group.description} placement="right">
												<div className={classes.miniItemHeader}>
													{IconLib[group.icon]}
												</div>
											</Tooltip>
										</Link>
									)
								else if (group.type === MENU_ITEM_TYPE.GROUP)
									return (
										<ul key={group.id} className={classes.miniList}>
											{
												group.items.map((item) => {
													return (
														<Tooltip key={item.id} title={item.text} placement="right">
															<li>
																<Link href={item.url}>
																	<a>
																		{IconLib[item.icon]}
																	</a>
																</Link>
															</li>
														</Tooltip>
													)
												})
											}
										</ul>
									)
								else
									throw new Error("Wrong-Menu-DataType")
							})
						}
					</PerfectScrollbar>
			}

			<div className={classes.minimizer}>
				<IconButton
					color="secondary" aria-label="Settings" style={{ padding: "5px" }}
					onClick={() => toggle(p => !p)}
				>
					{
						isExpanded ? <ArrowBackIosIcon style={{ color: "#fff", height: "20px", width: "20px" }} />
							: <ArrowForwardIosIcon style={{ color: "#fff", height: "20px", width: "20px" }} />
					}
				</IconButton>
			</div>

		</div >
	)
}
SideBar.propTypes = {
	isExpanded: PropTypes.bool,
	toggle: PropTypes.func,
	homeUrl: PropTypes.string,
	settingsUrl: PropTypes.string,
	data: PropTypes.array
}

export default SideBar