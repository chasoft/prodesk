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

import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import Router, { useRouter } from "next/router"

// MATERIAL-UI
import { CssBaseline, ThemeProvider } from "@mui/material"

//THIRD-PARTY
import NProgress from "nprogress"
import { Provider } from "react-redux"
import { SnackbarProvider } from "notistack"
import { configureStore } from "@reduxjs/toolkit"
// import { setupListeners } from "@reduxjs/toolkit/query"
import createEmotionCache from "./../helpers/createEmotionCache"
import { CacheProvider } from "@emotion/react"

//PROJECT IMPORT
import rootReducer from "./../redux/slices"
import { theme } from "./../components/theme"

/*****************************************************************
 * STYLES                                                        *
 *****************************************************************/

import "./../styles/globals.css"
import "./../public/css/nprogress.css"
import PageTransition from "./../components/PageTransition"
import { firestoreApi } from "../redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

/* Redux Toolkit  */
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firestoreApi.middleware)
})
// setupListeners(store.dispatch)

/* Implement nprogress */
Router.events.on("routeChangeStart", () => { NProgress.start() })
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page)
	const router = useRouter()

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side")
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return <>
		<CacheProvider value={emotionCache}>
			<Head>
				<title>ProDesk - Your Elegant &amp; Powerful Ticket System</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<SnackbarProvider maxSnack={3}>
						{getLayout(
							<PageTransition location={router.pathname}>
								<CssBaseline />
								<Component {...pageProps} />
							</PageTransition>
						)}
					</SnackbarProvider>
				</ThemeProvider>
			</Provider>
		</CacheProvider>
	</>
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired
}

export default MyApp