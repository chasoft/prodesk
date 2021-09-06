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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React from "react"
import Head from "next/head"
import Router from "next/router"
import PropTypes from "prop-types"
import NProgress from "nprogress"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { SnackbarProvider } from "notistack"


/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import rootReducer from "./../redux/slices"
import { theme } from "./../components/theme"

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

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page)

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side")
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<>
			<Head>
				<title>ProDesk - Your Elegant &amp; Powerful Ticket System</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<SnackbarProvider maxSnack={3}>
						{getLayout(<Component {...pageProps} />)}
					</SnackbarProvider>
				</ThemeProvider>
			</Provider>
		</>
	)
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired
}

export default MyApp