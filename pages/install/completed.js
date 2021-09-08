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

//CORE SYSTEM
import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { LinearProgress, Typography } from "@material-ui/core"

//PROJECT IMPORT
import { Logo } from "./../../components/common"
import { getInstallLayout } from "./InstallLayout"
import { useDispatch } from "react-redux"
import { once } from "../../helpers/utils"
import { installCompleted } from "../../helpers/userAuthentication"
import { useSnackbar } from "notistack"

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function InstallCompleted() {
	const [progress, setProgress] = React.useState(0)
	const [buffer, setBuffer] = React.useState(10)
	const progressRef = useRef(() => { })
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()
	const onceInstallCompleted = once(installCompleted)

	useEffect(() => {
		progressRef.current = () => {
			if (progress > 95) {
				onceInstallCompleted({ enqueueSnackbar, dispatch })
			} else {
				const diff = Math.random() * 10
				const diff2 = Math.random() * 10
				setProgress(progress + diff)
				setBuffer(progress + diff + diff2)
			}
		}
	})

	useEffect(() => {
		const timer = setInterval(() => { progressRef.current() }, 500)
		return () => { clearInterval(timer) }
	}, [])

	return (
		<>
			<div style={{ padding: "3rem" }}>
				<Logo />
			</div>
			<Typography variant="h1">Welcome to ProDesk</Typography>
			<Typography variant="button">Your Elegant &amp; Powerful Blog / Documentation / Ticket System</Typography>

			<div style={{ padding: "2rem" }}>
				<Typography variant="h2">Superadmin account has been created successfully.</Typography>
				<Typography variant="body1">
					You will be redirected to the dashboard to start setting up your great site!
				</Typography>
				<div style={{ paddingTop: "2rem" }}>
					<LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
				</div>
			</div>

		</>
	)
}
InstallCompleted.propTypes = { children: PropTypes.any }

InstallCompleted.getLayout = getInstallLayout

export default InstallCompleted