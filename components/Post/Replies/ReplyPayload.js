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
import { Typography } from "@mui/material"

import makeStyles from "@mui/styles/makeStyles"

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1, 1, 1, 8),
		[theme.breakpoints.down("md")]: {
			marginLeft: theme.spacing(0),
		},
	}
}))

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ReplyPayload = () => {
	const classes = useStyles()
	return (
		<Typography variant="body1" className={classes.root}>
			The 5a is the first Pixel that does not use CDMA service at all, so for Verizon the line needs to be configured as a CDMAless device. This is a fairly known issue with Verizon Tech support so you should be able to get it resolved quickly. They may not have known that regarding the Pixel 5A since there really isnt a ton of information ahead of the full release.
		</Typography>
	)
}

export default ReplyPayload