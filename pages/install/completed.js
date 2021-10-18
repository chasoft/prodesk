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
import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
// import { useRouter } from "next/router"

// MATERIAL-UI
import { LinearProgress, Typography } from "@mui/material"

//THIRD-PARTY
import { once } from "lodash"
// import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "../../redux/selectors"
import { Logo } from "./../../components/common"
import { getInstallLayout } from "./InstallLayout"
import { REDIRECT_URL } from "./../../helpers/constants"
import { useFinalizeInstallationMutation } from "./../../redux/slices/firestoreApi"
import { loginSuccess } from "../../redux/slices/auth"
import { setRedirect } from "../../redux/slices/redirect"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function InstallCompleted() {
	const dispatch = useDispatch()
	const onceDispatch = once(dispatch)
	//
	const [buffer, setBuffer] = React.useState(10)
	const [progress, setProgress] = React.useState(0)
	const progressRef = useRef(() => { })
	//
	const { currentUser } = useSelector(getAuth)	//we have uid from previus step which kept here!
	const [finalizeInstallation] = useFinalizeInstallationMutation()

	useEffect(() => {
		progressRef.current = () => {
			if (progress > 95) {
				onceDispatch(setRedirect(REDIRECT_URL.ADMIN))
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

	useEffect(() => {
		const finalize = async () => {
			await finalizeInstallation({ uid: currentUser.uid[0] })
			dispatch(loginSuccess({ justInstalled: true }))
		}
		finalize()
	}, [])

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<div style={{ padding: "3rem" }}>
				<Logo />
			</div>
			<Typography variant="h1">Welcome to ProDesk</Typography>
			<Typography variant="button">Your Elegant &amp; Powerful Support System</Typography>

			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				paddingTop: "2rem"
			}}>
				<Typography variant="body1" sx={{ textAlign: "justify" }}>
					Superadmin account has been created successfully. Click the button below to finalize the installation! Then, you will be redirected to admin dashboard.
				</Typography>
				<div style={{ marginTop: "4rem" }}>
					<LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
					{/* <Button
						variant="contained"
						color="primary"
						onClick={
							async () => {
								enqueueSnackbar("Finalizing installation", { variant: "info" })
								await finalizeInstallation({ uid: currentUser.uid[0] })

								closeSnackbar()
								enqueueSnackbar("Redirecting to admin dashboard", { variant: "success" })

								//Update local Redux to indicate that use logged-in
								//with extra param: justInstalled = true
								dispatch(loginSuccess({ justInstalled: true }))
								router.push(REDIRECT_URL.ADMIN)
							}
						}
					>
						Finalize Installation
					</Button> */}
				</div>
			</div>

		</div >
	)
}
InstallCompleted.propTypes = { children: PropTypes.any }

InstallCompleted.getLayout = getInstallLayout

export default InstallCompleted