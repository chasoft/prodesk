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
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

// MATERIAL-UI
import { IconButton, makeStyles, Typography } from "@material-ui/core"
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
		padding: theme.spacing(1, 1, 0.5, 3)
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
		listStyle: "none",
		padding: 0,
		margin: 0,
		// marginTop: theme.spacing(2),
		width: "100%",
		"&>li": {
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
		"&>li:hover": {
			backgroundColor: "#ffffff14",
			cursor: "pointer",
		},
		"& > li:last-child": {
			paddingBottom: theme.spacing(2)
		}
	},
	ScrollHeight: {
		height: "calc(100vh - 88px)",
		//paddingRight: "8px",
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
			backgroundColor: theme.navbar.hoverColor
		},
		width: "256px",
		borderBottom: "1px solid #2A4257",
	},
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

			<div className={classes.logo}>
				<Logo theme="dark" />
			</div>

			<HomeButton homeUrl={homeUrl} settingsUrl={settingsUrl} />

			<PerfectScrollbar component="div" className={classes.ScrollHeight}>
				{
					data.map((group) => {
						if (group.type === MENU_ITEM_TYPE.ITEM)
							return (
								<Link href={group.url} >
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
													<Link key={item.id} href={item.url}><li>{IconLib[item.icon]}{item.text}</li></Link>
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