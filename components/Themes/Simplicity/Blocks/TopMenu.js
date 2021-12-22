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

import React, { useMemo, useRef } from "react"
import Link from "next/link"
import PropTypes from "prop-types"

//MATERIAL-UI
import { Box } from "@mui/material"
import { APP_SETTINGS } from "@helpers/constants"
import useAppSettings from "@helpers/useAppSettings"
import { groupBy, orderBy } from "lodash"
import { NO_PARENT } from "@components/Settings/MenuSettings"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const TopMenu = React.memo(function _TopMenu({ isPreview = false }) {
	const groupedMenu = useRef({})

	const {
		data: { topMenu = {} },
		// isLoading: isLoadingTopMenu
	} = useAppSettings(null, APP_SETTINGS.topMenu)

	groupedMenu.current = useMemo(() => {
		return groupBy(orderBy(topMenu, ["order"]), i => i.parentId)
	}, [topMenu])

	console.log("groupedMenu.current", groupedMenu.current)

	return (
		<Box
			id="user-nav"
			component="nav"
			sx={{
				...(isPreview
					? {}
					: { display: { xs: "none", mdd: "block" } }
				),
				"&>ul": {
					display: "flex",
					listStyle: "none",
					margin: "0",
					padding: "0",
				},
				"&>ul>li": {
					padding: "0 0",
					position: "relative"
				},
				"&>ul>li>a:not(:only-child):after": {
					content: "url(\"/themes/simplicity/menu-arrow.svg\")",
					display: "inline-block",
					marginLeft: "6px",
					verticalAlign: "text-top"
				},
				"&>ul>li:hover": {
					"&>.sub-menu": {
						display: "flex",
						flexDirection: "column"
					}
				},
				"&>ul>li>a": {
					border: "0",
					color: "#000000",
					display: "inline-block",
					fontSize: "18px",
					fontWeight: "500",
					padding: "16px 16px",
					width: "auto",
					letterSpacing: "0.03em"
				},
				"&>ul>li>.sub-menu": {
					backgroundColor: "#fff",
					border: "3px solid #000",
					display: "none",
					position: "absolute",
					marginBottom: "16px",
					maxHeight: "calc(100vh - 156px) !important",
					overflowY: "auto",
					padding: "8px 0",
					top: "46px",
					whiteSpace: "pre-wrap",
					width: "max-content",
					zIndex: "9999",
					minWidth: "250px"
				},
				"&>ul>li>.sub-menu>li": {
					display: "block",
					padding: "12px 22px"
				},
				"&>ul>li>.sub-menu>li>a": {
					border: "0",
					color: "#000000",
					display: "inline-block",
					fontSize: "18px",
					fontWeight: "400",
					width: "auto",
					letterSpacing: "0.03em"
				},
				"&>ul>li>.sub-menu>li>a:hover": {
					textDecoration: "underline",
					textDecorationThickness: "3px",
					textUnderlineOffset: "5px"
				}
			}}
		>
			<ul>
				{(groupedMenu.current[NO_PARENT] ?? []).map((menu) => {
					return (
						<li key={menu.id}>
							<Link href={menu.slug} passHref>
								<a href="just-a-placeholder">{menu.emoji ? menu.emoji : null} {menu.label}</a>
							</Link>
							{(groupedMenu.current[menu.id]) ?
								<ul className="sub-menu">
									{groupedMenu.current[menu.id].map(subMenu => {
										return (
											<li key={subMenu.id}>
												<Link href={subMenu.slug} passHref>
													<a href="just-a-placeholder">{subMenu.emoji ? subMenu.emoji : null} {subMenu.label}</a>
												</Link>
											</li>
										)
									})}
								</ul> : null}
						</li>
					)
				})}
			</ul>

		</Box>
	)
})
TopMenu.propTypes = {
	isPreview: PropTypes.bool
}