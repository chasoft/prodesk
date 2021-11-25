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

//PROJECT IMPORT

import React from "react"
import PropTypes from "prop-types"

//MATERIAL-UI
import { Box, Chip, Typography, IconButton, Tooltip } from "@mui/material"

//THIRD-PARTY
import { cloneDeep } from "lodash"
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import useTicketCategories from "@helpers/useTicketCategories"
import { setActiveSettingPanel } from "@redux/slices/uiSettings"
import { useUpdateCategoryMutation } from "@redux/slices/firestoreApi"
import { CircularProgressBox } from "@components/common"

import {
	SettingsContentHeader,
	SettingsContentHelper,
	SettingsContentDetails,
	SettingsContentHelperText,
	SettingsContentHelperLearnMore,
} from "@components/Settings/SettingsPanel"

//ASSETS
import CheckBoxIcon from "@mui/icons-material/CheckBox"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CategoriesOverview = ({ backBtnClick }) => {

	const dispatch = useDispatch()
	const [updateCategory] = useUpdateCategoryMutation()
	const { data: categories, isLoading } = useTicketCategories()

	if (isLoading)
		return <CircularProgressBox />

	const handleSetDefault = async (e, category) => {
		e.stopPropagation()
		//make a independent copy current category list (deep copy)
		const fullList = cloneDeep(categories)
		//set all items to default false
		const oldDefaultItem = fullList.find(c => c.default === true)
		if (oldDefaultItem !== undefined) {
			Object.assign(oldDefaultItem, { default: false })
		}
		let updatedItem = fullList.find(c => c.catId === category.catId)
		Object.assign(updatedItem, { default: true })

		await updateCategory({
			isDefault: true,
			categoryItem: {
				catId: category.catId,
				default: true
			},
			fullList
		})
	}

	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				Category overview
			</SettingsContentHeader>

			<SettingsContentHelper>
				<SettingsContentHelperText>
					You can create as many category and sub-category as you want to support your business.
					<SettingsContentHelperLearnMore target="/docs" />
				</SettingsContentHelperText>
			</SettingsContentHelper>

			{isLoading ?
				<SettingsContentDetails>
					<CircularProgressBox />
				</SettingsContentDetails>
				: categories.map((category) => (
					<Box
						key={category.catId}
						onClick={() => dispatch(setActiveSettingPanel(category.name))}
						sx={{
							display: "flex",
							alignItems: "center",
							p: 3,
							"&>div>button#set-default-button": {
								visibility: { xs: "visible", sm: "hidden" }
							},
							":hover": {
								cursor: "pointer",
								bgcolor: "action.hover",
								"&>div>button#set-default-button": {
									visibility: "visible"
								}
							},
							":last-child:hover": {
								borderBottomRightRadius: "0.5rem",
							},

						}}
					>
						<Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
							<Box sx={{
								display: "flex",
								alignItems: "center"
							}}>
								<Typography variant="h4">
									{category.name}
								</Typography>
							</Box>
							<Box sx={{
								display: "flex",
								"&>#sub": { marginRight: 0.5 },
								"&>#sub-default": {
									marginRight: 0.5,
									backgroundColor: "primary.main",
									color: "white"
								}
							}}>
								{category.subCategories.map((item) => (
									<Tooltip
										arrow
										key={item.name}
										placement="top"
										title={
											item.default
												? "Default sub-category"
												: ""
										}
									>
										<Chip
											id={item.default ? "sub-default" : "sub"}
											label={item.name}
											size="small"
											variant={item.default ? "" : "outlined"}
										/>
									</Tooltip>
								))}
							</Box>
						</Box>

						<Box>
							{category.default
								? <Typography color="primary.main" sx={{ fontWeight: "bold" }}>Default</Typography>
								: <Tooltip arrow title="Set this default Category" placement="left">
									<IconButton
										id="set-default-button"
										onClick={(e) => handleSetDefault(e, category)}
										sx={{ ":hover": { color: "primary.main" } }}
									>
										<CheckBoxIcon />
									</IconButton>
								</Tooltip>}
						</Box>

					</Box>
				))
			}
		</>
	)
}

CategoriesOverview.propTypes = {
	backBtnClick: PropTypes.func,
}

export default CategoriesOverview