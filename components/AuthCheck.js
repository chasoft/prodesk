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
import React, { useEffect, useState } from "react"

// MATERIAL-UI
import { CircularProgress } from "@material-ui/core"

//THIRD-PARTY
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "./../redux/selectors"
import { USERGROUP } from "../helpers/constants"
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
 * AuthCheck does 2 things
 * 1. If not loggin and trying to access `/admin` or `/client` then,
 *    - Save current path
 *    - redirect to `/login`
 * 2. If logged and trying to access `/login` or `/signup` then,
 *    - redirect to `/admin` or `/client` based on UserGroup
 *    else, show `children`
 */
export default function AuthCheck(props) {
	const { loading, isAuthenticated, currentUser } = useSelector(getAuth)
	const [display, setDisplay] = useState(false)
	const router = useRouter()

	useEffect(() => {

		if (isAuthenticated === true) {
			if (regLoginSignUpURL.test(router.pathname)) {
				if (currentUser.group === USERGROUP.USER)
					router.push("/client")
				else
					router.push("/admin")
			} else {
				setDisplay(true)
			}
		} else {
			if (regBackendURL.test(router.pathname)) {
				router.push("/login")
			} else {
				setDisplay(true)
			}
		}

	}, [isAuthenticated])

	if (loading || (isAuthenticated === null) || (display === false)) return <LoadingIndicator />
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