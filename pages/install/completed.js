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

//CORE SYSTEM
import React from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

// MATERIAL-UI
import { Button, Typography } from "@material-ui/core"

//PROJECT IMPORT
import { Logo } from "./../../components/common"
import { getInstallLayout } from "./InstallLayout"

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function InstallCompleted() {
	const router = useRouter()
	return (
		<>
			<div style={{ padding: "3rem" }}>
				<Logo />
			</div>
			<Typography variant="h1">
				Welcome to ProDesk
			</Typography>
			<Typography variant="button">
				Your Elegant &amp; Powerful Blog / Documentation / Ticket System
			</Typography>

			<div style={{ padding: "3rem" }}>
				<Typography variant="body1">
					Your Superadmin account has been created successfully.<br />
					Go to the admin dashboard to start setting up your great site!
				</Typography>
				<Button
					variant="contained" color="primary"
					style={{ paddingTop: "3rem", paddingLeft: "3rem", paddingRight: "3rem" }}
					onClick={() => {
						router.push("/admin")
					}}
				>
					Admin Dashboard
				</Button>
			</div>
		</>
	)
}
InstallCompleted.propTypes = { children: PropTypes.any }

InstallCompleted.getLayout = getInstallLayout

export default InstallCompleted