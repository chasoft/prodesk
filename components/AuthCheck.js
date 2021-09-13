/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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
import DefaultErrorPage from "next/error"

// MATERIAL-UI
import { CircularProgress } from "@material-ui/core"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth, getRedirect } from "./../redux/selectors"
import { REDIRECT_URL, USERGROUP } from "../helpers/constants"
import { clearRedirect, setRedirect } from "../redux/slices/redirect"
import { regAdminURL } from "../helpers/regex"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const LoadingIndicator = () => {
	return (
		<div style={{ margin: "100px 0 150px 0", display: "flex", flexDirection: "row", justifyContent: "center" }}>
			Loading... &nbsp; <CircularProgress size={20} />
		</div>
	)
}

/**
 * Redirect based on Redux
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
 * AuthCheck is used to protect restricted area! (loggedin)
 * so, if you are not loggedin, you will be redirected to `login page`
 */
export default function AuthCheck(props) {
	const { loading, isAuthenticated, currentUser } = useSelector(getAuth)
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		//just do redirection Only if both these conditions are matched
		// 1. finished get loggin data and
		// 2. user not loggin
		// that means that... user truly not Login!
		if (isAuthenticated !== true && loading === false)
			dispatch(setRedirect(REDIRECT_URL.LOGIN))
	}, [isAuthenticated, loading])

	if (loading) return < LoadingIndicator />

	//A logged-in user but try to access `/admin`
	if (currentUser.group === USERGROUP.USER
		&& regAdminURL.test(router.pathname)) return <DefaultErrorPage statusCode={404} />

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
	return (isAuthenticated)
		? props.children
		: null
}

/**
 * Staffs only = SuperAdmin, Admin, Members
 */
export function AuthStaffTrue(props) {
	const { currentUser } = useSelector(getAuth)
	return (currentUser.group !== USERGROUP.USER) ? props.children : null
}

/**
 * Users only
 */
export function AuthUserTrue(props) {
	const { currentUser } = useSelector(getAuth)
	return (currentUser.group === USERGROUP.USER)
		? props.children
		: null
}

/**
 * Display `children` when Admin LOGGED IN or nothing
 */
export function AuthAdminTrue(props) {
	const { currentUser } = useSelector(getAuth)
	return (currentUser.group === USERGROUP.ADMIN || currentUser.group === USERGROUP.SUPERADMIN)
		? props.children
		: null
}

/**
 * GuestOnly
 * so, if you are Already loggedin, you will be redirected to dashboard
 */
export function GuestOnly(props) {
	const { isAuthenticated, currentUser } = useSelector(getAuth)
	const dispatch = useDispatch()

	if (isAuthenticated) {
		//Only redirect when there is no required step ahead
		if (currentUser.nextStep === REDIRECT_URL.DONE) {
			if (currentUser.group === USERGROUP.USER)
				dispatch(setRedirect(REDIRECT_URL.CLIENT))
			else
				dispatch(setRedirect(REDIRECT_URL.ADMIN))
		}
	}

	return (
		!isAuthenticated
			? props.children
			: <></>
	)
}
GuestOnly.propTypes = { children: PropTypes.node }




























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
 * Please note that SuperAdmin is also Admin, but Admin could be SuperAdmin or not!
 * to set a user to be a superAdmin, please add `{ isSuperAdmin: true }` to `/adminUsers/uid`
 * manually.
 */