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
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
// import { useRouter } from "next/router"

// MATERIAL-UI
import { Button } from "@mui/material"
import { getToken, onMessageListener, receiveMessage } from "../../helpers/firebase"

//THIRD-PARTY

//PROJECT IMPORT

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Notification() {
	const [isTokenFound, setTokenFound] = useState(false)

	useEffect(() => {
		receiveMessage()
	}, [])

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

			<Button variant="contained" onClick={() => {
				getToken(setTokenFound)
			}}>
				Ask for
			</Button>
			{isTokenFound && <h1> Notification permission enabled</h1>}
			{!isTokenFound && <h1> Need notification permission</h1>}
		</div >
	)
}
Notification.propTypes = { children: PropTypes.any }

export default Notification