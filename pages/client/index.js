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

//import { Breadcrumbs } from "@blueprintjs/core"
import Head from "next/head"
import React from "react"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { getLayout } from "./../../components/RootLayout"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

/* TODO: thêm file [id] => tự động redirect các URL sai... ví dụ: client/service => client/services
*/


// import { useDispatch } from 'react-redux'
// import { setTitle, setSubTitle } from './../../slices/pageMeta'
// import { useEffect } from "react";

function Client() {
	// const smallScreen = useMediaQuery({ query: "(max-width: 959px)" })
	//const queryClient = useQueryClient()

	// updatePageMeta({
	// 	title: "Client Dashboard",
	// 	subTitle: "Your place for quick look and actions"
	// })

	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>Dashboard - ClientArea - ProDesk</title>
			</Head>

			<div className="children-mb-15">

			</div>
		</>
	)
}

Client.getLayout = getLayout
export default Client