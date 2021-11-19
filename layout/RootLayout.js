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

import Head from "next/head"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

//THIRD-PARTY
import { batch as reduxBatch, useDispatch } from "react-redux"

//PROJECT IMPORT
import { auth } from "@helpers/firebase"
import { regAdminURL } from "@helpers/regex"
import { ReduxRedirect } from "@components/AuthCheck"
import { getUserProfile } from "@helpers/firebase/user"
import { REDIRECT_URL, USERGROUP } from "@helpers/constants"
import { loginSuccess, logoutSuccess, loginTemp } from "@redux/slices/auth"
import { setRedirect, clearRedirectAfterLoginURL } from "@redux/slices/redirect"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function RootLayout({ children }) {
	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {

			if (user) {
				const userProfile = await getUserProfile(user.uid)

				dispatch(loginSuccess({
					emailVerified: user.emailVerified,
					creationTime: user.metadata.creationTime,
					lastSignInTime: user.metadata.lastSignInTime,
					providerId: user.providerData[0].providerId,
					//at this point, userProfile could be existed or not
					...(userProfile.data ?? {})
				}))

				//If it is a social user, created profile if not yet
				if (user.providerData[0].providerId !== "password") {
					//these information will be loaded in next step @ /signup/account
					dispatch(loginTemp({
						uid: user.uid,
						displayName: user.displayName,
						email: user.email,
						photoURL: user.providerData[0].photoURL ?? "/avatar/default.png",
					}))

					//go to setup new account
					if (userProfile?.error) {
						dispatch(setRedirect(REDIRECT_URL.SIGNUP.SOCIAL_CREATE_ACCOUNT))
						// router.push(REDIRECT_URL.SIGNUP.SOCIAL_CREATE_ACCOUNT)
						return
					}
				}

				//redirect to any uncompleted steps
				if (userProfile?.data?.nextStep)
					if (userProfile?.data?.nextStep !== REDIRECT_URL.SIGNUP.DONE) {
						if (router.pathname !== userProfile?.data?.nextStep) {

							console.log("RootLayout::nextStep", userProfile?.data?.nextStep)

							dispatch(setRedirect(userProfile?.data?.nextStep))
							// router.push(userProfile.data.nextStep)
							return
						}
					}

				// if user is not admin but loggin at / admin, then redirect to / client
				if (regAdminURL.test(router.pathname) &&
					([USERGROUP.USER.code, USERGROUP.MEMBER.code].includes(userProfile.data.group))) {
					// router.push(REDIRECT_URL.CLIENT.INDEX)
					dispatch(setRedirect(REDIRECT_URL.CLIENT.INDEX))
					return
				}

				return
			} //end-of-if

			//Clear loggedin data
			reduxBatch(() => {
				dispatch(logoutSuccess())
				dispatch(clearRedirectAfterLoginURL())
			})
		})
		//Close connection with Firebase!
		return unsubscribe
	}, [dispatch, router.pathname, router])

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