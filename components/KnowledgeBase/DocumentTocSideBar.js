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

import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import { useSelector } from "react-redux"
import PostAddIcon from "@mui/icons-material/PostAdd"
import { getTextEditor } from "../../redux/selectors"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TocItem = ({ sx, anchor, active, children }) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				px: 2, py: 0.5,
				cursor: "pointer",
				":hover": {
					color: "primary.main",
					"&>svg": {
						fill: (theme) => theme.palette.primary.main
					}
				},
				color: active ? "primary.main" : "grey.500",
				...sx
			}}
		>
			<a href={`#${anchor}`}>
				<Typography sx={{ fontSize: "0.80rem" }} noWrap>
					{children}
				</Typography>
			</a>
		</Box>
	)
}
TocItem.propTypes = {
	sx: PropTypes.object,
	anchor: PropTypes.string,
	active: PropTypes.bool,
	children: PropTypes.node
}

const RightMenuItem = ({ sx, Icon, children }) => {
	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			px: 2, py: 1,
			cursor: "pointer",
			":hover": {
				backgroundColor: "action.hover",
				"&>p": { color: "primary.main" },
				"&>svg": { fill: (theme) => theme.palette.primary.main }
			},
			...sx
		}}>
			{Icon && <Icon
				fontSize="small"
				sx={{
					mr: 1,
					fill: (theme) => theme.palette.grey[500]
				}} />}

			<Typography sx={{ fontSize: "0.80rem", fontWeight: "bold", color: "grey.700" }} noWrap>{children}</Typography>
		</Box>
	)
}
RightMenuItem.propTypes = {
	sx: PropTypes.object,
	Icon: PropTypes.object,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DocumentTocSideBar = () => {
	const { editorDataHeadings } = useSelector(getTextEditor)
	const [menuItems, setMenuItem] = useState({ Top: 0 })

	/*
	 * Update menuItems whenever editorDataHeadings has changed!
	 * Keep current pos value!
	 */
	const getMenuItems = useMemo(() => {
		const blankNewObject = editorDataHeadings.reduce((res, item) => {
			if (item.level < 3) return res = { ...res, [item.id]: null }
		}, { "Top": 0 })

		for (const key in blankNewObject) {
			if (key in menuItems) blankNewObject[key] = menuItems[key]
		}
		console.log("getMenuItems executed")
		console.log({ editorDataHeadings: editorDataHeadings })
		return blankNewObject
	}, [menuItems])

	useEffect(() => {
		setMenuItem(getMenuItems)
		console.log("setMenuItem executed")
		console.log({ getMenuItems: getMenuItems })
	}, [getMenuItems])

	/*
	 * Store the active menuItem in state to force update
	 * when changed
	 */
	const [activeItem, setActiveItem] = useState("Top")

	/*
	* The MutationObserver allows us to watch for a few different
	* events, including page resizing when new elements might be
	* added to the page (potentially changing the location of our
	* anchor points)
	* We also listen to the scroll event in order to update based
	* on our user's scroll depth
	  */
	useEffect(() => {
		const observer = new MutationObserver(getAnchorPoints)
		observer.observe(document?.getElementById("__next"), {
			childList: true,
			subtree: true,
		})
		window.addEventListener("scroll", handleScroll)
	}, [])

	/*
	* Programmatically determine where to set AnchorPoints for our Menu
	*/
	const getAnchorPoints = () => {
		const curScroll = window.scrollY
		// const viewPortHeight = Math.max(
		// 	document.documentElement.clientHeight,
		// 	window.innerHeight || 0
		// )
		for (const key in menuItems) {
			menuItems[key] = document.getElementById(key).getBoundingClientRect().top - curScroll
		}
		// const bottom = document.body.offsetHeight
		handleScroll()
	}

	/*
	 * Determine which section the user is viewing, based on their scroll-depth
	 * Locating the active section allows us to update our MenuItems to show which
	 * item is currently active
	 */
	const handleScroll = () => {
		const curPos = window.scrollY
		let curSection = null
		/*
		 * Iterate through our sections object to find which section matches with
		 * the current scrollDepth of the user.
		 * NOTE: This code assumes that the sections object is built with an 'ordered'
		 * list of sections, with the lowest depth (top) section first and greatest
		 * depth (bottom) section last
		 * If your items are out-of-order, this code will not function correctly
		 */
		for (const section in menuItems) {
			curSection = curPos > menuItems[section] ? section : curSection
			if (curSection !== section) {
				break
			}
		}
		if (curSection !== activeItem) {
			setActiveItem(curSection)
		}
	}

	return (
		<Box sx={{
			position: "sticky",
			display: { xs: "none", lg: "flex" },
			flexDirection: "column",
			width: "224px",
			backgroundColor: "#FFF",
		}}>
			<div style={{ position: "sticky", top: "80px" }}>

				<Box sx={{
					borderLeft: "1px solid transparent",
					borderColor: "divider",
				}}>

					<RightMenuItem Icon={PostAddIcon}>New Article</RightMenuItem>
					<RightMenuItem Icon={MoreHorizIcon}>More...</RightMenuItem>

				</Box>

				<Box sx={{
					borderLeft: "1px solid transparent",
					borderColor: "divider",
					color: "grey.500",
					mt: 5, mb: 3
				}}>
					<Typography sx={{
						px: 2, pb: 1,
						textTransform: "uppercase",
						fontWeight: "bold",
						fontSize: "0.70rem"
					}}>
						Contents
					</Typography>

					{
						editorDataHeadings.map((item) => {
							if (item.level > 2) return null

							return (
								<TocItem
									key={item.id}
									anchor={item.id}
									active={(item.id === activeItem) ? true : false}
									sx={{
										py: 0.5,
										ml: (item.level === 2) ? 2 : 0
									}}>
									{item.title}
								</TocItem>
							)

						})
					}
				</Box>

			</div>
		</Box>
	)
}
DocumentTocSideBar.propTypes = { children: PropTypes.node }

export default DocumentTocSideBar