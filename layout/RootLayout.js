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
import Head from "next/head"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { REDIRECT_URL, USERGROUP } from "./../helpers/constants"
import { loginSuccess, logoutSuccess, loginTemp } from "./../redux/slices/auth"
import { auth, getUserDocByUid, getUsernameDocByUsername } from "./../helpers/firebase"
import AuthCheck from "../components/AuthCheck"

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function RootLayout({ children }) {
	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
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
						router.push(REDIRECT_URL.SOCIAL_CREATE_ACCOUNT)
						return
					}
				}

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

				//redirect to any uncompleted steps
				// if (userProperties.nextStep !== REDIRECT_URL.DONE) {
				// 	router.push(userProperties.nextStep)
				// 	return
				// }

				//if user is not admin but loggin at /admin, then redirect to /client
				// if ((router.pathname.slice(0, 6) === "/admin") && (userProperties.group === USERGROUP.USER))
				// 	router.push("/client")
			} else {
				//Clear loggedin data
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

			<AuthCheck>
				{children}
			</AuthCheck>
		</>
	)
}

RootLayout.propTypes = { children: PropTypes.node }

export const getRootLayout = page => <RootLayout>{page}</RootLayout>

export default RootLayout