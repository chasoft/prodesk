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
// import { makeStyles } from "@material-ui/core"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { SignInLink } from "../../components/common"
import SideImage from "../../components/Layout/SideImage"
import { getLayout } from "../../components/Layout/BlankLayout"
import SignupForm from "../../components/Signup/SignupForm"
import SideContent from "../../components/Layout/SideContent"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// const useStyles = makeStyles((theme) => ({}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function Signup() {
	// const classes = useStyles()
	return (
		<>
			<SideImage />
			<SideContent topRightContent={<SignInLink />} >
				<SignupForm />
			</SideContent>
		</>
	)
}

Signup.getLayout = getLayout

export default Signup