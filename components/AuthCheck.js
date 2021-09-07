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
import React, { useEffect } from "react"
import { useRouter } from "next/router"
import PropTypes from "prop-types"

// MATERIAL-UI
import { CircularProgress } from "@material-ui/core"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth, getRedirect } from "./../redux/selectors"
import { REDIRECT_URL } from "../helpers/constants"
import { clearRedirect, setRedirect } from "../redux/slices/redirect"

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
 * Redirect based on Redux -> Selector -> redirect
 */
export function ReduxRedirect(props) {
	const router = useRouter()
	const dispatch = useDispatch()
	const { redirectURL } = useSelector(getRedirect)

	if (redirectURL === "") return props.children
	else {
		dispatch(clearRedirect())
		router.push(redirectURL)
	}
}

/**
 * Display `children` when logged in or display <SingleLoginForm />
 */
export default function AuthCheck(props) {
	const { loading, isAuthenticated } = useSelector(getAuth)
	const dispatch = useDispatch()

	useEffect(() => {
		if (isAuthenticated !== true)
			dispatch(setRedirect(REDIRECT_URL.LOGIN))
	}, [dispatch, isAuthenticated])

	if (loading) return < LoadingIndicator />

	return (
		isAuthenticated
			? props.children
			: <></>
	)
}
AuthCheck.propTypes = { children: PropTypes.node }

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