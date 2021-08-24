/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegent & Powerful Ticket System          ║ *
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
import Router from "next/router"
import PropTypes from "prop-types"
import NProgress from "nprogress"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import rootReducer from "./../redux/slices"

/*****************************************************************
 * STYLES                                                        *
 *****************************************************************/

import "../styles/globals.css"
import "../public/css/nprogress.css"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const store = configureStore({ reducer: rootReducer })

/* Implement nprogress */
Router.events.on("routeChangeStart", () => { NProgress.start() })
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

/* */
const toastOptions = {
	duration: 13000,
	className: "bp3-toast bp3-intent-primary",
	success: {
		className: "bp3-toast bp3-intent-success",
		duration: 3000,
		position: "bottom right"
	},
	error: {
		className: "bp3-toast bp3-intent-danger",
		duration: 4000,
		position: "top right"
	},
}

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page)
	return (
		<Provider store={store}>
			{getLayout(<Component {...pageProps} />)}
			<Toaster position="bottom-right" toastOptions={toastOptions} />
		</Provider>
	)
}

MyApp.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any
}

export default MyApp