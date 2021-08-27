/*****************************************************************
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import { Spinner } from "@blueprintjs/core"
import React from "react"
import { useSelector } from "react-redux"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { getAuth } from "./../../../selectors"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const LoadingIndicator = () => {
	// updatePageMeta({
	// 	title: "Loading...",
	// 	subTitle: "Please hold your seat tight!"
	// })
	return (

		<div style={{ margin: "100px 0 150px 0", display: "flex", flexDirection: "row", justifyContent: "center" }}>
			Workers are working hard... &nbsp; <Spinner size={20} />
		</div>

	)
}

/**
 * Display `children` when logged in or display <SingleLoginForm />
 */
export default function AuthCheck(props) {
	const { loading, isAuthenticated } = useSelector(getAuth)
	if (loading) return <LoadingIndicator />
	return isAuthenticated ? props.children : props.fallback || <p>SingleLoginForm</p>
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