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

//CORE SYSTEM
import { useRouter } from "next/router"
import React, { useState } from "react"

// MATERIAL-UI
import { CircularProgress } from "@material-ui/core"

//THIRD-PARTY
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "./../redux/selectors"
import { REDIRECT_URL, USERGROUP } from "../helpers/constants"
import { regBackendURL, regLoginSignUpURL } from "../helpers/regex"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const LoadingIndicator = () => {
	return (
		<div style={{ margin: "100px 0 150px 0", display: "flex", flexDirection: "row", justifyContent: "center" }}>
			Workers are working hard... &nbsp; <CircularProgress size={20} />
		</div>
	)
}

/**
 * AuthCheck
 * Use this checker to validate the content to show
 * then, just use this for backend pages & login/logout process
 *
 * we take 2 entry points
 * 		1. you are at login/signup pages
 * 			1.1 you are logged in (authentication = `true`)
 * 				1.1.1 REDIRECT_URL === DONE
 * 					=> REDIRECT based on USERGROUP
 * 				1.1.2 has a redirect URL
 * 					  1.1.2.1 Already at redirect URL
 * 							  => PASSED
 * 					  1.1.2.2 Not yet at redirect URL
 * 							  => REDIRECT to redirect URL
 * 	>>		1.2 you are not logged in (`not true` aka `false` or `null` )
 * 	>>			=> PASSED
 *		2. you are at client/admin page
 *			2.1 you are logged in (authentication = `true`)
 *				2.1.1 REDIRECT_URL === DONE
 *					=> PASSED
 *				2.1.2 has a redirect URL
 *					=> REDIRECT to redirect URL
 *					   because redirect URL for now, not apply for any backend URL
 *	>>		2.2 you are not logged in (`not true` aka `false` or `null` )
 *	>>			=> REDIRECT to Login Page!
 */
export default function AuthCheck(props) {
	const { isAuthenticated, currentUser } = useSelector(getAuth)
	/*
		we use `display` variable with default is `false` at the beginning
		to ensure that... there is no flickering, just show the content
		when it is.
	*/
	const [display, setDisplay] = useState(false)
	const router = useRouter()

	if (regLoginSignUpURL.test(router.pathname)) {
		if (isAuthenticated !== true) {
			return props.children
		} else {
			if (currentUser.nextStep === REDIRECT_URL.DONE) {
				if (currentUser.group === USERGROUP.USER)
					router.push(REDIRECT_URL.CLIENT)
				else
					router.push(REDIRECT_URL.ADMIN)
			} else {
				if (router.pathname !== currentUser.nextStep)
					router.push(currentUser.nextStep)
				else
					setDisplay(true)
			}
		}
	}

	if (regBackendURL.test(router.pathname)) {
		if (isAuthenticated !== true) {
			router.push(REDIRECT_URL.LOGIN)
		} else {

			if (currentUser.nextStep === REDIRECT_URL.DONE) {
				setDisplay(true)
			} else {
				router.push(currentUser.nextStep)
			}

		}
	}

	if (display === false) return <LoadingIndicator />

	return props.children
}

/**
 * Only display `children` when LOGGED IN or nothing would be showed up
 */
export function AuthTrue(props) {
	const { isAuthenticated } = useSelector(getAuth)
	return isAuthenticated ? props.children : null
}

/**
 * Display `children` for guest only
 */
export function AuthFalse(props) {
	const { isAuthenticated } = useSelector(getAuth)
	return isAuthenticated ? null : props.children
}

/**
 * Display `children` when SuperAdmin logged in or display <SingleLoginForm />
 */
export function AuthSuperAdminCheck(props) {
	const { loading, currentUser } = useSelector(getAuth)

	if (loading) return <LoadingIndicator />
	return currentUser.isSuperAdmin ? props.children : props.fallback || <p>SingleLoginForm</p>
}

/**
 * Display `children` when SuperAdmin LOGGED IN or nothing
 */
export function AuthSuperAdminTrue(props) {
	const { currentUser } = useSelector(getAuth)
	return currentUser.isSuperAdmin ? props.children : null
}

/**
 * Display `children` when Admin logged in or display <SingleLoginForm />
 */
export function AuthAdminCheck(props) {
	const { loading, currentUser } = useSelector(getAuth)

	if (loading) return <LoadingIndicator />
	return (currentUser.isAdmin || currentUser.isSuperAdmin) ? props.children : props.fallback || <p>SingleLoginForm</p>
}

/**
 * Display `children` when Admin LOGGED IN or nothing
 */
export function AuthAdminTrue(props) {
	const { currentUser } = useSelector(getAuth)
	return (currentUser.isAdmin || currentUser.isSuperAdmin) ? props.children : null
}

/**
 * Please note that SuperAdmin is also Admin, but Admin could be SuperAdmin or not!
 * to set a user to be a superAdmin, please add `{ isSuperAdmin: true }` to `/adminUsers/uid`
 * manually.
 */