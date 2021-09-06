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
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import DefaultErrorPage from "next/error"

// MATERIAL-UI
import { CircularProgress, Container, makeStyles } from "@material-ui/core"

//PROJECT IMPORT
import Footer from "../../components/common/Footer"
import { getInstallStatus } from "../../helpers/firebase"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1
	}
})

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function InstallLayout({ children }) {
	const classes = useStyles()
	const [isInstalled, setIsInstalled] = useState(null)

	useEffect(async () => {
		const installStatus = await getInstallStatus()
		setIsInstalled(installStatus)
	})

	if (isInstalled)
		return <DefaultErrorPage statusCode={404} />

	return (
		<div className={classes.root} >
			<Container maxWidth="md" className={classes.content}>
				{
					(isInstalled === null) ? <CircularProgress />
						: children
				}
			</Container>

			<Footer />

		</div>
	)
}
InstallLayout.propTypes = { children: PropTypes.any }

export const getInstallLayout = page => <InstallLayout>{page}</InstallLayout>

export default InstallLayout