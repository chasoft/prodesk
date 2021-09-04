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
import { Logo } from "../../components/common"
import NavCollapse from "./NavCollapse"
import clsx from "clsx"

//THIRD-PARTY

//PROJECT IMPORT


//ASSETS
import AssessmentIcon from "@material-ui/icons/Assessment"
import SettingsIcon from "@material-ui/icons/Settings"
import HomeIcon from "@material-ui/icons/Home"
import "react-perfect-scrollbar/dist/css/styles.css"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BarChartIcon from '@material-ui/icons/BarChart';
import CategoryIcon from '@material-ui/icons/Category';
import CreditCardIcon from '@material-ui/icons/CreditCard';

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		width: "68px",
		height: "100vh",
		position: "fixed"
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
		// height: "100%",
		// maxHeight: "calc(100vh - 205px)",
		overflowX: "hidden"
	},
	dashboard: {
		display: "flex",
		alignItems: "center",
		color: "#669df6",
		padding: theme.spacing(1, 0.5, 1, 3),
		"&:hover": {
			backgroundColor: "#ffffff14",
			cursor: "pointer",
		},
		borderTop: "1px solid #2A4257",
		borderBottom: "1px solid #2A4257",
	},
	minimizer: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: "auto",
		padding: theme.spacing(2),
	}
}))

const DUMMYDATA = [
	{
		id: "1",
		icon: "0",
		title: "Build",
		description: "Authentication, Firestore database, Realtime Database",
		items: [
			{ id: 1, icon: "1", text: "Authentication" },
			{ id: 2, icon: "2", text: "Firestore Database" },
			{ id: 3, icon: "3", text: "Realtime Database" },
			{ id: 4, icon: "4", text: "Storage" },
			{ id: 5, icon: "5", text: "Hosting" },
			{ id: 6, icon: "6", text: "Functions" },
		]
	}
]

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

const SideBar = ({ isExpanded = true, toggle }) => {
	const classes = useStyles()
	return (
		<div className={clsx([classes.root, classes.nav_bg, { [classes.sideBarExpanded]: isExpanded }])}>

			<div className={classes.logo}>
				<Logo theme="dark" />
			</div>

			<div className={classes.dashboard}>
				<HomeIcon style={{ height: "20px", width: "20px", marginRight: "8px" }} />
				<Link href="/admin"><Typography style={{ flexGrow: 1 }}>Dashboard</Typography></Link>
				<div style={{ borderRight: "1px solid #ffffff80", margin: "5px 0 5px", }}>&nbsp;</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<IconButton color="secondary" aria-label="Settings" style={{ padding: "5px" }}>
						<SettingsIcon style={{ color: "#fff", height: "20px", width: "20px" }} />
					</IconButton>
				</div>
			</div>

			{
				DUMMYDATA.map((group) => {
					return (
						<NavCollapse
							key={group.id}
							title={group.title}
							description={group.description}
							isLongDisplay={isExpanded}
						>
							<ul className={classes.list}>
								{
									group.items.map((item) => {
										return (
											<li key={item.id}>{IconLib[item.icon]}{item.text}</li>
										)
									})
								}
							</ul>
						</NavCollapse>
					)
				})
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
SideBar.propTypes = { isExpanded: PropTypes.bool, toggle: PropTypes.func }

export default SideBar