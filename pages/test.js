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


//ASSETS
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(10),
	}
}))

const validationSchema = yup.object({
	name: yup
		.string("Enter your name, you can change later")
		.min(5, "min 5 characters")
		.required("Name is required"),
})

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const Test = () => {
	const classes = useStyles()

	const formik = useFormik({
		initialValues: {
			name: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2))
		},
	})

	return (
		<Container maxWidth="xs" className={classes.root}>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="name"
					name="name"
					label="Name"
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					variant="outlined"
					autoFocus
					required
				/>
				<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
					Create Account
				</Button>
			</form>
		</Container>
	)
}

export default Test