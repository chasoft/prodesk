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
import PropTypes from "prop-types"
import DefaultErrorPage from "next/error"
import React, { useEffect, useState } from "react"

// MATERIAL-UI
import { Box, CircularProgress, Container } from "@mui/material"

//PROJECT IMPORT
import Footer from "./../../components/common/Footer"
import { ReduxRedirect } from "./../../components/AuthCheck"
import { getInstallStatus } from "./../../helpers/firebase/install"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function InstallLayout({ children }) {
	const [isInstalled, setIsInstalled] = useState(null)

	useEffect(async () => {
		const installStatus = await getInstallStatus()
		setIsInstalled(installStatus)
	}, [])

	if (isInstalled)
		return <DefaultErrorPage statusCode={404} />

	return (
		<ReduxRedirect>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}>
				<Container maxWidth="sm" sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					flexGrow: 1
				}}>
					{
						(isInstalled === null) ? <CircularProgress />
							: children
					}
				</Container>

				<Footer />

			</Box>
		</ReduxRedirect>
	)
}
InstallLayout.propTypes = { children: PropTypes.any }

export const getInstallLayout = page => <InstallLayout>{page}</InstallLayout>

export default InstallLayout