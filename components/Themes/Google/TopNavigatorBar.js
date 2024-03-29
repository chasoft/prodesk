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

import React from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

// MATERIAL-UI
import { Paper, Tab, Tabs } from "@mui/material"

//THIRD-PARTY
import { useSelector } from "react-redux"
import { FRONT_PAGE_TABS_NAME } from "@layout/EntryLayout"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function getTabId(tabName, dataSet) {
	for (let i = 0; i < dataSet.length; i++) {
		if (dataSet[i].indexOf(tabName) !== -1)
			return i
	}
	return 0
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TopNavigatorBar({ dataSet }) {
	// const dispatch = useDispatch()
	const router = useRouter()

	const activeSettingTab = useSelector(s => s.uiSettingsState.activeSettingTab)

	const handleChange = (event, selectedTabId) => {
		// dispatch(setRedirect(dataSet[selectedTabId][1]))
		router.push(dataSet[selectedTabId][1])
	}

	return (
		<Paper elevation={0} sx={{ borderBottom: (activeSettingTab === FRONT_PAGE_TABS_NAME.HOME) ? 0 : 1, borderColor: "divider" }}>
			<Tabs
				value={getTabId(activeSettingTab, dataSet)}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				variant="scrollable"
				sx={{
					pl: { xs: 1, sm: 2 },
					".MuiTabs-indicator": {
						backgroundColor: "transparent",
						borderLeft: "3px solid transparent",
						borderRight: "3px solid transparent",
						borderBottom: (theme) => `3px solid ${theme.palette.primary.main}`,
					}
				}}

			>
				{dataSet.map((item, idx) => (
					<Tab
						key={idx} label={item[0]}
						sx={{
							fontSize: "0.875rem",
							color: "#5f6368"
						}} />
				))}
			</Tabs>
		</Paper>
	)
}
TopNavigatorBar.propTypes = {
	dataSet: PropTypes.array,
	borderBottom: PropTypes.bool
}

export default TopNavigatorBar