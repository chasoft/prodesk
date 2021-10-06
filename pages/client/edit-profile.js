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

import { Container, Typography } from "@mui/material"
import React from "react"
import useUiSettings from "./../../helpers/useUiSettings"

// MATERIAL-UI

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { getLayout } from "./../../layout/ClientLayout"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/



/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function EditProfile() {
	const dispatch = useDispatch()
	useUiSettings({
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>
			<Typography variant="h1">Edit Profile</Typography>


		</Container>
	)
}

EditProfile.getLayout = getLayout

export default EditProfile