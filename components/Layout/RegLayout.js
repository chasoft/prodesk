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
import { Container, makeStyles } from "@material-ui/core"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import Footer from "../Footer"
import { useSelector } from "react-redux"
import { getUiSettings } from "../../redux/selectors"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
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
		height: "100vh",
		[theme.breakpoints.down("md")]: { width: "40%" },
		[theme.breakpoints.down("sm")]: { display: "none" },
	},
	hideAtSmallScreen: {
		[theme.breakpoints.down("sm")]: { display: "none" },
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

export const TopLeftContent = ({ children }) => {
	return (
		<div
			style={{
				width: "100%",
				textAlign: "left",
				paddingTop: "2rem",
			}}
		>
			{children}
		</div>
	)
}
TopLeftContent.propTypes = { children: PropTypes.any }

export const TopRightContent = ({ children }) => {
	const classes = useStyles()
	return (
		<div
			className={classes.hideAtSmallScreen}
			style={{
				width: "100%",
				textAlign: "right",
				paddingTop: "2rem",
				paddingRight: "3rem",
			}}
		>
			{children}
		</div>
	)
}
TopRightContent.propTypes = { children: PropTypes.any }

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function RegLayout({ children }) {
	const classes = useStyles()
	const { flexDirection } = useSelector(getUiSettings)
	return (
		<div style={{ display: "flex", flexDirection: flexDirection }}>
			<SideImage />
			<Container className={classes.content} >
				{children}
				<Footer />
			</Container>
		</div>
	)
}
RegLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => <RegLayout>{page}</RegLayout>

export default RegLayout