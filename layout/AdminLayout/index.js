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

import React, { useEffect, useState } from "react"

import PropTypes from "prop-types"

// MATERIAL-UI
import { Container, makeStyles } from "@material-ui/core"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import Header from "./Header"
import SideBar from "./SideBar"
import clsx from "clsx"
import Footer from "../../components/Footer"
import { getUiSettings } from "../../redux/selectors"
import { BACKGROUND_ID } from "./../../helpers/constants"

//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex"
	},
	content: {
		width: "100%",
		marginLeft: "68px",
		transition: "margin .3s cubic-bezier(0.4, 0, 0.2, 1)"
	},
	contentShift: {
		marginLeft: "256px"
	}
}))

const backgroundInfo = {
	"Empty": {
		backgroundImage: "",
		backgroundRepeat: "",
	},
	"AdminIndex": {
		backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2500 600'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23${"1a73e8"};%7D%3C/style%3E%3C/defs%3E%3Crect class='cls-1' x='0.5' y='0.5' width='2500' height='600'/%3E%3C/svg%3E")`,
		backgroundRepeat: "no-repeat",
	},
	"AdminProfile": {
		backgroundImage: "",
		backgroundRepeat: "",
	},
	"AdminTicket": {
		backgroundImage: "",
		backgroundRepeat: "",
	},
	"AdminUsers": {
		backgroundImage: "",
		backgroundRepeat: "",
	}
}

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function AdminLayout({ children }) {
	const classes = useStyles()
	const [isSideBarExpanded, setLeftDrawerExpanded] = useState(true)
	const { adminBackgroundId } = useSelector(getUiSettings)

	return (
		<div
			className={classes.root}
			style={{
				backgroundImage: backgroundInfo[adminBackgroundId].backgroundImage,
				backgroundRepeat: backgroundInfo[adminBackgroundId].backgroundRepeat
			}}
		>
			<SideBar isExpanded={isSideBarExpanded} toggle={setLeftDrawerExpanded} />
			<div className={clsx([classes.content, { [classes.contentShift]: isSideBarExpanded }])}>

				<Header isSideBarExpanded={isSideBarExpanded} />

				<Container maxWidth="md" style={{ minHeight: "calc(100vh - 200px)", marginTop: "100px" }}>

					{children}

				</Container>

				<Footer />
			</div>
		</div>
	)
}
AdminLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => <AdminLayout>{page}</AdminLayout>

export default AdminLayout