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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Paper, Tab, Tabs } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"
import { getUiSettings } from "../../redux/selectors"
import { setRedirect } from "../../redux/slices/redirect"
import { FRONT_PAGE_TABS_NAME } from "../../layout/EntryLayout"

//PROJECT IMPORT

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

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TopNavigatorBar = ({ dataSet }) => {

	const dispatch = useDispatch()

	const { activeSettingTab } = useSelector(getUiSettings)

	const handleChange = (event, selectedTabId) => {
		dispatch(setRedirect(dataSet[selectedTabId][1]))
	}

	return (
		<Paper elevation={0} sx={{ borderBottom: (activeSettingTab === FRONT_PAGE_TABS_NAME.HOME) ? 0 : 1, borderColor: "divider" }}		>
			<Tabs
				value={getTabId(activeSettingTab, dataSet)}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				variant="scrollable"
			>
				{
					dataSet.map((item, idx) => (
						<Tab key={idx} label={item[0]} />
					))
				}
			</Tabs>
		</Paper>
	)
}
TopNavigatorBar.propTypes = {
	dataSet: PropTypes.array,
	borderBottom: PropTypes.bool
}

export default TopNavigatorBar