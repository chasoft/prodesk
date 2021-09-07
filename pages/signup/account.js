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

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { LoginLink, Logo } from "../../components/common"
import { getLayout, TopLine } from "../../layout/RegLayout"
import SocialLoginForm from "../../components/Signup/SocialLoginForm"
import AuthCheck from "../../components/AuthCheck"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function SocialSignup() {
	return (
		<AuthCheck>
			<TopLine
				left={<Logo />}
				center={<Logo />}
				right={<LoginLink />}
			/>

			<SocialLoginForm />
		</AuthCheck>
	)
}

SocialSignup.getLayout = getLayout

export default SocialSignup