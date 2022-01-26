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

import PropTypes from "prop-types"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

// MATERIAL-UI
import { Avatar, Box, Container, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import Footer from "@components/common/Footer"
import { getRootLayout } from "@layout/RootLayout"
import { setflexDirection } from "@redux/slices/uiSettings"
import { useGetInstallStatusQuery } from "@redux/slices/firestoreApi"
import { CircularProgressBox } from "@components/common"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function SideImage({ imageUrl = null, children }) {
	return (
		<Box sx={{
			backgroundRepeat: "no-repeat",
			backgroundColor: (theme) => (theme.palette.mode === "light")
				? theme.palette.grey[50]
				: theme.palette.grey[900],
			backgroundSize: "cover",
			backgroundPosition: "center",
			width: { xs: "40%", xl: "500px" },
			display: { xs: "none", sm: "block" },
			backgroundImage: imageUrl ?? "url(https://source.unsplash.com/random)"
		}}>
			{children}
		</Box>
	)
}
SideImage.propTypes = { imageUrl: PropTypes.string, children: PropTypes.any }

export function TopLine({ left, center, right }) {
	return (
		<Box sx={{
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			pt: 3,
		}}>
			<Box sx={{
				display: { xs: "none", lg: "flex" },
				alignItems: "center", justifyContent: "flex-start",
			}}>
				{left ?? ""}
			</Box>

			<Box sx={{
				display: { lg: "none", xs: "flex" },
				alignItems: "center", justifyContent: "center", flexGrow: 1,
				py: 8,
			}}>
				{center ?? ""}
			</Box>

			<Box sx={{
				display: { xs: "none", lg: "flex" },
				alignItems: "center", justifyContent: "flex-end", pr: 2
			}}>
				{right ?? ""}
			</Box>
		</Box>
	)
}
TopLine.propTypes = {
	left: PropTypes.any,
	center: PropTypes.any,
	right: PropTypes.any
}

export function RegContainer({ maxWidth = "400px", children }) {
	return (
		<Box sx={{
			display: "flex",
			justifyContent: "center",
			flexGrow: 1
		}}>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: { xs: "flex-start", lg: "center" },
				flexGrow: 1,
				maxWidth: { maxWidth },
				mb: 4
			}}>
				{children}
			</Box>
		</Box>
	)
}
RegContainer.propTypes = {
	maxWidth: PropTypes.string,
	children: PropTypes.node
}

export function RegHeader({ icon, title }) {
	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			pt: 0, px: 0, pb: 4
		}}>
			<Avatar sx={{ margin: 1, backgroundColor: "secondary.main", }}>
				{icon}
			</Avatar>
			<Typography component="h1" variant="h1">
				{title}
			</Typography>
		</Box>
	)
}
RegHeader.propTypes = { icon: PropTypes.node, title: PropTypes.string }

export function useFlexDirection(props) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setflexDirection(props.payload))
	}, [dispatch, props.payload])
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function RegLayout({ children }) {
	const router = useRouter()
	const flexDirection = useSelector(s => s.uiSettingsState.flexDirection)

	//Checking install status, if not installed, go install
	const { data: installStatus, isLoading } = useGetInstallStatusQuery()
	if (installStatus?.isInstalled === false) {
		router.push("/install")
		return null
	}

	//But if not yet got the finall query result, let's wait
	if (isLoading || (installStatus?.isInstalled !== true))
		return <CircularProgressBox minHeight="100vh" />


	//You are good to go to sign up/sign in pages
	return (
		<div style={{ display: "flex", flexDirection: flexDirection, minHeight: "100vh" }}>

			<SideImage />

			<Container
				maxWidth={false}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					width: { xs: "100%", sm: "60%", xl: "100%" }
				}}
			>

				{children}

				<Footer />
			</Container>

		</div>
	)
}
RegLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => getRootLayout(<RegLayout>{page}</RegLayout>)

export default RegLayout