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

//CORE SYSTEM
import React, { useEffect } from "react"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import DefaultErrorPage from "next/error"

// MATERIAL-UI
import { CircularProgress } from "@mui/material"

//THIRD-PARTY
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { regAdminURL } from "@helpers/regex"
import { getAuth, getRedirect } from "@redux/selectors"

import {
	PRIORITY_URLS,
	REDIRECT_URL,
	USERGROUP
} from "@helpers/constants"

import {
	clearRedirect,
	clearRedirectAfterLoginURL,
	setRedirect,
	setRedirectAfterLoginURL
} from "@redux/slices/redirect"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function LoadingIndicator() {
	return (
		<div style={{
			height: "80vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}>
			<CircularProgress />
		</div>
	)
}

/**
 * Redirect based on Redux
 * @note redirectURL is under format as describe below:
 * 		 URL = `"/a-valid/nice-url@note:this is a note only"`
 * 		 URL.split("@note:") => ["/a-valid/nice-url", "this is a note only"]
 * 		 redirect item[0]
 */
export function ReduxRedirect(props) {
	const router = useRouter()
	const dispatch = useDispatch()
	const { currentUser, isAuthenticated } = useSelector(getAuth)
	const { redirectURL, redirectAfterLoginURL } = useSelector(getRedirect)

	console.log("ReduxRedirect", { redirectURL })

	if (redirectURL === "" || (redirectURL === "" && currentUser.justInstalled === true)) {
		return props.children
	}

	//More priority
	if (PRIORITY_URLS.includes(redirectURL)) {
		dispatch(clearRedirect())
		router.push(redirectURL)
		return null
	}

	//Other cases, just follow if there is no "redirectAfterLoginURL"
	if (redirectAfterLoginURL === "") {
		dispatch(clearRedirect())
		router.push(redirectURL.split("@note:")[0])
		return null
	}

	//Clear redirectURL & redirectAfterLogin before redirect to redirectAfterLoginURL
	reduxBatch(() => {
		dispatch(clearRedirect())
		if (isAuthenticated) dispatch(clearRedirectAfterLoginURL())
	})

	router.push(redirectAfterLoginURL)
	return null
}

/**
 * AuthCheck is used to protect restricted area! (loggedin)
 * so, if you are not loggedin, you will be redirected to `login page`
 */
export default function AuthCheck(props) {
	const router = useRouter()
	const dispatch = useDispatch()
	const { loading, isAuthenticated, currentUser } = useSelector(getAuth)

	useEffect(() => {
		//just do redirection Only if both these conditions are matched
		// 1. finished get loggin data and
		// 2. user not loggin
		// that means that... user truly not Login!
		if (isAuthenticated !== true && loading === false) {
			console.log("AuthCheck - useEffect")
			reduxBatch(() => {
				dispatch(setRedirectAfterLoginURL(router.pathname))
				dispatch(setRedirect(REDIRECT_URL.LOGIN))
			})
		}
	}, [dispatch, isAuthenticated, loading, router.pathname])

	if (loading) return <LoadingIndicator />

	//A logged-in user but try to access `/admin`
	if (currentUser.group === USERGROUP.USER.code
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

	const isStaffGroup = [
		USERGROUP.ADMIN.code,
		USERGROUP.SUPERADMIN.code,
		USERGROUP.STAFF.code,
		USERGROUP.AGENT.code
	].includes(currentUser.group)

	return isStaffGroup ? props.children : null
}

/**
 * Users only (Members & Users)
 */
export function AuthUserTrue(props) {
	const { currentUser } = useSelector(getAuth)

	const isUserGroup = [
		USERGROUP.USER.code,
		USERGROUP.MEMBER.code
	].includes(currentUser.group)

	return isUserGroup ? props.children : null
}

/**
 * Display `children` when Admin LOGGED IN or nothing
 */
export function AuthAdminTrue(props) {
	const { currentUser } = useSelector(getAuth)

	const isAdminGroup = [
		USERGROUP.ADMIN.code,
		USERGROUP.SUPERADMIN.code,
	].includes(currentUser.group)

	return isAdminGroup ? props.children : null
}

/**
 * GuestOnly
 * so, if you are Already loggedin, you will be redirected to dashboard
 */
export function GuestOnly(props) {
	const router = useRouter()
	const { isAuthenticated, currentUser } = useSelector(getAuth)

	if (isAuthenticated === true
		//the user logged-in and account created
		&& currentUser?.nextStep === REDIRECT_URL.SIGNUP.DONE) {
		if (currentUser.group === USERGROUP.USER.code) {
			router.push(REDIRECT_URL.CLIENT.INDEX)
			return null
		}

		router.push(REDIRECT_URL.ADMIN.INDEX)
		return null
	}

	if (isAuthenticated === false) return props.children

	//Else
	return (
		<div style={{
			display: "flex",
			width: "100%",
			height: "100%",
			alignItems: "center",
			justifyContent: "center",
		}}>
			<CircularProgress />
		</div>
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
AuthSuperAdminCheck.propTypes = {
	children: PropTypes.node,
	fallback: PropTypes.node
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
AuthAdminCheck.propTypes = {
	children: PropTypes.node,
	fallback: PropTypes.node
}







/**
 * Please note that SuperAdmin is also Admin, but Admin could be SuperAdmin or not!
 * to set a user to be a superAdmin, please add `{ isSuperAdmin: true }` to `/adminUsers/uid`
 * manually.
 */