/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Paper, Tab, Tabs, useMediaQuery } from "@mui/material"

//THIRD-PARTY
import { useSelector, useDispatch } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "../../redux/selectors"
import { setRedirect } from "../../redux/slices/redirect"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const getTabId = (tabName, dataSet) => {
	for (let i = 0; i < dataSet.length; i++) {
		if (dataSet[i].indexOf(tabName) !== -1) return i
	}
	return 0
}

const TabsSettings = ({ dataSet }) => {
	const isScreenBigEnough = useMediaQuery("(min-width: 1000px)")
	const dispatch = useDispatch()
	const { activeSettingTab } = useSelector(getUiSettings)

	const handleChange = (event, selectedTabId) => {
		dispatch(setRedirect(dataSet[selectedTabId][1]))
	}

	return (
		<Paper
			sx={{
				flexGrow: 1,
				marginTop: "1rem",
				marginBottom: "2rem"
			}}
		>
			<Tabs
				value={getTabId(activeSettingTab, dataSet)}
				onChange={handleChange}
				indicatorColor="primary"
				variant={isScreenBigEnough ? "standard" : "scrollable"}
				scrollButtons="auto"
				textColor="primary"
				centered={isScreenBigEnough}
			>
				{
					dataSet.map((item, idx) => {
						return <Tab key={idx} label={item[0]} />
					})
				}
			</Tabs>
		</Paper>
	)
}
TabsSettings.propTypes = { dataSet: PropTypes.array }

export default TabsSettings