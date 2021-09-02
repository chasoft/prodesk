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

import React from "react"
import PropTypes from "prop-types"
import { Container, makeStyles } from "@material-ui/core"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import Footer from "../Footer"
import { useDispatch, useSelector } from "react-redux"
import { getUiSettings } from "../../redux/selectors"
import { useEffect } from "react"
import { setflexDirection } from "../../redux/slices/uiSettings"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	content: {
	},
	centerAlignAtSmallScreen: {
		[theme.breakpoints.down("sm")]: { textAlign: "center", },
	},
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function AdminLayout({ children }) {
	const classes = useStyles()
	const { flexDirection } = useSelector(getUiSettings)
	return (
		<div style={{ display: "flex", flexDirection: flexDirection, minHeight: "100vh" }}>

			{children}
		</div>
	)
}
AdminLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => <AdminLayout>{page}</AdminLayout>

export default AdminLayout