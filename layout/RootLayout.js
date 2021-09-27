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
import Head from "next/head"
import PropTypes from "prop-types"
import React, { useEffect } from "react"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { REDIRECT_URL, USERGROUP } from "./../helpers/constants"
import { loginSuccess, logoutSuccess, loginTemp } from "./../redux/slices/auth"
import { auth, getUserDocByUid, getUsernameDocByUsername } from "./../helpers/firebase"
import { ReduxRedirect } from "../components/AuthCheck"
import { setRedirect } from "./../redux/slices/redirect"
import { regAdminURL } from "../helpers/regex"
import { useRouter } from "next/router"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function RootLayout({ children }) {
	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				//Load settings to Redux
				const userDoc = await getUserDocByUid(user.uid)
				const userProperties = await getUsernameDocByUsername(userDoc.username)

				dispatch(loginSuccess({
					emailVerified: user.emailVerified,
					creationTime: user.metadata.creationTime,
					lastSignInTime: user.metadata.lastSignInTime,
					providerId: user.providerData[0].providerId,
					...userProperties
				}))

				//Make a copy of username to localStorage
				//TODO: secure this information later
				// localStorage.setItem("username", userProperties.username)

				//Whether a social user, redirect if not yet created in db
				if (user.providerData[0].providerId !== "password") {
					//these information will be loaded in next step @ /signup/account
					dispatch(loginTemp({
						uid: user.uid,
						displayName: user.displayName,
						email: user.email,
						photoURL: user.providerData[0].photoURL ?? "/img/default-avatar.png",
					}))

					const res = await getUserDocByUid(user.uid)
					if (res === undefined) {
						// router.push(REDIRECT_URL.SOCIAL_CREATE_ACCOUNT)
						dispatch(setRedirect(REDIRECT_URL.SOCIAL_CREATE_ACCOUNT))
						return
					}
				}

				//redirect to any uncompleted steps
				if (userProperties.nextStep !== REDIRECT_URL.DONE) {
					dispatch(setRedirect(userProperties.nextStep))
					// 	return
				} else {
					// if user is not admin but loggin at / admin, then redirect to / client
					if (regAdminURL.test(router.pathname) && (userProperties.group === USERGROUP.USER))
						dispatch(setRedirect(REDIRECT_URL.CLIENT))
				}
			} else {
				//Clear loggedin data
				// localStorage.removeItem("username")
				dispatch(logoutSuccess())
			}
		})
		//Close connection with Firebase!
		return unsubscribe
	}, [dispatch])

	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>ProDesk - Your Elegant &amp; Powerful Ticket System</title>
				<meta name="description" content="Elegant &amp; Powerful Ticket System, Documentation, Blog" />
				<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
			</Head>

			<ReduxRedirect>
				{children}
			</ReduxRedirect>
		</>
	)
}

RootLayout.propTypes = { children: PropTypes.node }

export const getRootLayout = page => <RootLayout>{page}</RootLayout>

export default RootLayout