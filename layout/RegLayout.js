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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React from "react"
import PropTypes from "prop-types"
import { Container, Hidden, makeStyles } from "@material-ui/core"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import Footer from "./../components/common/Footer"
import { useDispatch, useSelector } from "react-redux"
import { getUiSettings } from "../redux/selectors"
import { useEffect } from "react"
import { setflexDirection } from "../redux/slices/uiSettings"
import AuthCheck from "../components/AuthCheck"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		// justifyContent: "center",
		width: "100%",
		[theme.breakpoints.down("md")]: { width: "60%" },
		[theme.breakpoints.down("sm")]: { width: "100%" },
	},
	sideImage: {
		backgroundRepeat: "no-repeat",
		backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
		width: "500px",
		// height: "100%",
		[theme.breakpoints.down("md")]: { width: "40%" },
		[theme.breakpoints.down("sm")]: { display: "none" },
	},
	centerAlignAtSmallScreen: {
		[theme.breakpoints.down("sm")]: { textAlign: "center", },
	},
}))

const SideImage = ({ imageUrl = null, children }) => {
	const classes = useStyles()
	return (
		<div
			className={classes.sideImage}
			style={{ backgroundImage: imageUrl ?? "url(https://source.unsplash.com/random)" }}
		>
			{children}
		</div>
	)
}
SideImage.propTypes = { imageUrl: PropTypes.string, children: PropTypes.any }

export const TopLine = ({ left, center, right }) => {
	return (
		<div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "2rem" }}>
			<Hidden smDown>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
					{left ?? ""}
				</div>
			</Hidden>

			<Hidden mdUp>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "5rem", flexGrow: 1 }}>
					{center ?? " "}
				</div>
			</Hidden>

			<Hidden smDown>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "2rem" }}>
					{right ?? ""}
				</div>
			</Hidden>
		</div>
	)
}
TopLine.propTypes = { left: PropTypes.any, center: PropTypes.any, right: PropTypes.any }

export const updateFlexDirection = (props) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setflexDirection(props.payload))
	}, [])
}

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function RegLayout({ children }) {
	const classes = useStyles()
	const { flexDirection } = useSelector(getUiSettings)
	console.log("started RegLayout")
	return (
		<AuthCheck>
			<div style={{ display: "flex", flexDirection: flexDirection, minHeight: "100vh" }}>
				<SideImage />
				<Container className={classes.content} >
					{children}
					<Footer />
				</Container>
			</div>
		</AuthCheck>
	)
}
RegLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => <RegLayout>{page}</RegLayout>

export default RegLayout