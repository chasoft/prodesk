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

import React, { useState } from "react"

// MATERIAL-UI
import { Box, Button, CircularProgress, Typography } from "@mui/material"

//THIRD-PARTY
import { some } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "./../../../../redux/selectors"
import useUiSettings from "./../../../../helpers/useUiSettings"
import { setActiveSettingPanel } from "./../../../../redux/slices/uiSettings"
import CategoriesAddNew from "./../../../../components/Settings/Tickets/CategoriesAddNew"
import CategoriesDetails from "./../../../../components/Settings/Tickets/CategoriesDetails"
import CategoriesOverview from "./../../../../components/Settings/Tickets/CategoriesOverview"
import { getLayout, TICKET_SETTINGS_NAMES } from "./../../../../components/Settings/InnerLayoutTickets"
import { ListItem, ListTitle, SettingsContainer, SettingsContent, SettingsHeader, SettingsList } from "./../../../../components/Settings/SettingsPanel"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import InfoIcon from "@mui/icons-material/Info"
import BusinessIcon from "@mui/icons-material/Business"
import useTicketCategories from "../../../../helpers/useTicketCategories"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const CATEGORY_PAGES = {
	OVERVIEW: "Category overview",
	ADD_NEW_CATEGORY: "Add new ticket category"
}

// {
// 	catId: string
// 	name: string
// 	default: boolean
// 	subcategories: [{ name: string, default: boolean }]
// }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketSettingsCategory() {

	useUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.CATEGORY,
		activePanel: CATEGORY_PAGES.OVERVIEW,
		background: {
			backgroundImage: ""
		}
	})

	const dispatch = useDispatch()
	const [showContent, setShowContent] = useState(false)
	const { activeSettingPanel } = useSelector(getUiSettings)

	const { data: categories, isLoading } = useTicketCategories()

	const hasSelectedCategory = isLoading ? false : some(categories, { name: activeSettingPanel })

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>Categories</Typography>
				<Button
					variant="contained" color="primary" size="small" startIcon={<AddIcon />}
					onClick={() => {
						dispatch(setActiveSettingPanel(CATEGORY_PAGES.ADD_NEW_CATEGORY))
						setShowContent(true)
					}}
				>
					Add New
				</Button>
			</SettingsHeader>

			<SettingsContainer>

				<SettingsList showContent={showContent}>
					<ListItem
						selected={activeSettingPanel === CATEGORY_PAGES.OVERVIEW}
						icon={<InfoIcon fontSize="small" />}
						onClick={() => {
							dispatch(setActiveSettingPanel(CATEGORY_PAGES.OVERVIEW))
							setShowContent(true)
						}}
					>
						Overview
					</ListItem>

					<ListTitle>{(categories?.length > 0) ? "Available categories" : "No available category"}</ListTitle>

					{isLoading
						? <Box sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							minHeight: "100px"
						}}>
							<CircularProgress />
						</Box>
						: categories.map((category) => (
							<ListItem
								key={category.catId}
								selected={activeSettingPanel === category.name}
								icon={<BusinessIcon fontSize="small" />}
								onClick={() => {
									dispatch(setActiveSettingPanel(category.name))
									setShowContent(true)
								}}
							>
								{category.name}
							</ListItem>
						))}

				</SettingsList>

				<SettingsContent showContent={showContent}>

					{isLoading &&
						<Box sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							minHeight: "200px"
						}}>
							<CircularProgress />
						</Box>}

					{(!isLoading && activeSettingPanel === CATEGORY_PAGES.OVERVIEW)
						&& <CategoriesOverview backBtnClick={setShowContent} />}

					{(!isLoading && activeSettingPanel === CATEGORY_PAGES.ADD_NEW_CATEGORY)
						&& <CategoriesAddNew backBtnClick={setShowContent} />}

					{!isLoading && hasSelectedCategory
						&& <CategoriesDetails backBtnClick={setShowContent} />}

				</SettingsContent>

			</SettingsContainer>
		</>
	)
}

TicketSettingsCategory.getLayout = getLayout

export default TicketSettingsCategory