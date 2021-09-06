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

import React, { useState } from "react"

// MATERIAL-UI
import { Button, Container, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, TextField } from "@material-ui/core"

//THIRD-PARTY
import { useFormik } from "formik"
import * as yup from "yup"

//PROJECT IMPORT
import { useSnackbar } from "notistack"

//ASSETS
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"

import { getUserDocByUid } from "./../helpers/firebase"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { logout } from "../redux/slices/auth"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function aFunc() {

}

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const Test = () => {


	return (
		<Container maxWidth="xs">
			<Button>Clickme</Button>
		</Container >
	)
}

export default Test