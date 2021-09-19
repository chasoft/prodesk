/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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

import React, { useEffect, useRef } from "react"
// import { makeStyles } from "@mui/material"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { Logo } from "../../components/common"
import { getLayout, TopLine, updateFlexDirection } from "../../layout/RegLayout"
import { LinearProgress, Paper, Typography } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import { REDIRECT_URL } from "../../helpers/constants"
import { setRedirect } from "../../redux/slices/redirect"
import { useDispatch } from "react-redux"
import AuthCheck from "../../components/AuthCheck"
import { once } from "../../helpers/utils"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		justifyContent: "center",
		marginBottom: theme.spacing(4),
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function SignUpCompleted() {
	const classes = useStyles()
	const [progress, setProgress] = React.useState(0)
	const [buffer, setBuffer] = React.useState(10)
	const progressRef = useRef(() => { })
	const dispatch = useDispatch()

	const onceDispatch = once(dispatch)

	updateFlexDirection({ payload: "row" })

	useEffect(() => {
		progressRef.current = () => {
			if (progress > 95) {
				onceDispatch(setRedirect(REDIRECT_URL.CLIENT))
			} else {
				const diff = Math.random() * 10
				const diff2 = Math.random() * 10
				setProgress(progress + diff)
				setBuffer(progress + diff + diff2)
			}
		}
	})

	useEffect(() => {
		const timer = setInterval(() => { progressRef.current() }, 300)
		return () => { clearInterval(timer) }
	}, [])

	return (
		<AuthCheck>
			<TopLine
				left={<Logo />}
				center={<Logo />}
			/>

			<Paper className={classes.root} elevation={0}>

				<div style={{ marginBottom: "2rem" }}>
					<Typography variant="h1">ACCOUNT CREATION COMPLETED</Typography>
					<Typography variant="body1">Thank you! You will be redirected to the Dashboard.</Typography>
				</div>

				<LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />

			</Paper>
		</AuthCheck>
	)
}

SignUpCompleted.getLayout = getLayout

export default SignUpCompleted