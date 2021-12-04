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

import React, { useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

// MATERIAL-UI
import { Paper, Tab, Tabs, useMediaQuery } from "@mui/material"

//THIRD-PARTY
import { findIndex } from "lodash"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "@redux/selectors"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function TabsSettings({ tabsList }) {
	const router = useRouter()
	const isScreenBigEnough = useMediaQuery("(min-width: 1000px)")
	const { activeSettingTab } = useSelector(getUiSettings)

	const handleChange = useCallback((event, selectedTabIndex) => {
		const path = tabsList.find(i => i.index === selectedTabIndex).path
		router.push(path)
	}, [tabsList, router])

	const activeTabIndex = useMemo(() => {
		const res = findIndex(tabsList, (i) => i.name === activeSettingTab)
		return res === -1 ? 0 : res
	}, [activeSettingTab, tabsList])

	return (
		<Paper
			sx={{
				flexGrow: 1,
				marginTop: "1rem",
				marginBottom: "2rem"
			}}
		>
			<Tabs
				value={activeTabIndex}
				variant={isScreenBigEnough ? "standard" : "scrollable"}
				onChange={handleChange}
				centered={isScreenBigEnough}
				textColor="primary"
				scrollButtons="auto"
				indicatorColor="primary"
			>
				{tabsList.map((tabItem) => <Tab key={tabItem.name} label={tabItem.name} />)}
			</Tabs>
		</Paper>
	)
}
TabsSettings.propTypes = { tabsList: PropTypes.array }

export default TabsSettings