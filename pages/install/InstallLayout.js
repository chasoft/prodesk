/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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
import React from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import DefaultErrorPage from "next/error"

// MATERIAL-UI
import { Box, CircularProgress, Container } from "@mui/material"

//THIRD-PARTY
import { isEqual } from "lodash"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import Footer from "@components/common/Footer"
import { ReduxRedirect } from "@components/AuthCheck"
import { useGetInstallStatusQuery } from "@redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const bgImgList = {
	"/install": {
		backgroundImage: "url('/img/installation_1.svg')",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "95% 95%",
		backgroundSize: { xs: "70%", sm: "50%", md: "40%", lg: "30%", xl: "25%" }
	},
	"/install/create": {
		backgroundImage: "url('/img/installation_2.svg')",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "95% 95%",
		backgroundSize: { xs: "70%", sm: "50%", md: "40%", lg: "30%", xl: "25%" }
	},
	"/install/completed": {
		backgroundImage: "url('/img/installation_3.svg')",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "3% 96%",
		backgroundSize: { xs: "70%", sm: "50%", md: "40%", lg: "30%", xl: "25%" }
	}
}


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function InstallLayout({ children }) {
	const router = useRouter()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const { data: installStatus, isLoading } = useGetInstallStatusQuery()

	if ((installStatus?.isInstalled === true && currentUser.justInstalled !== true))
		return <DefaultErrorPage statusCode={404} />

	return (
		<ReduxRedirect>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				...bgImgList[router.pathname]
			}}>
				<Container maxWidth="sm" sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					flexGrow: 1
				}}>

					{isLoading && <CircularProgress />}

					{(installStatus?.isInstalled === false) && children}

				</Container>

				<Footer />

			</Box>
		</ReduxRedirect>
	)
}
InstallLayout.propTypes = { children: PropTypes.any }

export const getInstallLayout = page => <InstallLayout>{page}</InstallLayout>

export default InstallLayout