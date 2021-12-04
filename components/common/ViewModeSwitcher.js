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

import PropTypes from "prop-types"
import React from "react"

// MATERIAL-UI
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const VIEW_LISTING_MODE = {
	OUTLINE: "Outline View",
	DETAILS: "Details View",
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ViewModeSwitcher({ listingMode, setListingMode }) {

	const handleListingMode = (event, newListingMode) => {
		if (newListingMode) {
			setListingMode(newListingMode)
		}
	}

	return (
		<ToggleButtonGroup
			exclusive
			size="small"
			value={listingMode}
			onChange={handleListingMode}
		>
			<ToggleButton value={VIEW_LISTING_MODE.OUTLINE}>
				<Tooltip title="Outline View" placement="top">
					<GridViewOutlinedIcon sx={{ fontSize: 20 }} />
				</Tooltip>
			</ToggleButton>
			<ToggleButton value={VIEW_LISTING_MODE.DETAILS}>
				<Tooltip title="Detail View" placement="top">
					<GridOnOutlinedIcon sx={{ fontSize: 20 }} />
				</Tooltip>
			</ToggleButton>
		</ToggleButtonGroup>
	)
}

ViewModeSwitcher.propTypes = {
	// listingMode: PropTypes.oneOf[VIEW_LISTING_MODE.OUTLINE, VIEW_LISTING_MODE.DETAILS],
	listingMode: PropTypes.string,
	setListingMode: PropTypes.func
}

export default ViewModeSwitcher