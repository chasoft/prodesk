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

//CORE SYSTEM
import React from "react"
import PropTypes from "prop-types"
// import { useRouter } from "next/router"

// MATERIAL-UI
import { Button, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { Logo } from "@components/common"
import { REDIRECT_URL } from "@helpers/constants"
import { getInstallLayout } from "./InstallLayout"
import { setRedirect } from "@redux/slices/redirect"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Install() {
	// const router = useRouter()
	const dispatch = useDispatch()
	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<div style={{ padding: "3rem" }}>
				<Logo style={{ backgroundColor: "white" }} />
			</div>
			<Typography variant="h1">
				Welcome to ProDesk
			</Typography>
			<Typography variant="button">
				Your Elegant &amp; Powerful Support System
			</Typography>

			<div style={{ padding: "3rem" }}>
				<Button
					variant="contained" color="primary" style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
					onClick={() => {
						dispatch(setRedirect(REDIRECT_URL.SIGNUP.INSTALL_CREATE))
						// router.push(REDIRECT_URL.SIGNUP.INSTALL_CREATE)
					}}
				>
					Start
				</Button>
			</div>
		</div>
	)
}
Install.propTypes = { children: PropTypes.any }

Install.getLayout = getInstallLayout

export default Install