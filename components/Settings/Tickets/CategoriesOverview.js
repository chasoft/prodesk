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
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { useUpdateCategoryMutation } from "./../../../redux/slices/firestoreApi"
import { setActiveSettingPanel } from "./../../../redux/slices/uiSettings"
import useTicketCategories from "../../../helpers/useTicketCategories"
import { SettingsContentDetails, SettingsContentHeader, SettingsContentHelper, SettingsContentHelperText } from "./../../Settings/SettingsPanel"

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

	if (isLoading) {
		return (
			<div style={{ display: "flex", alignItems: "center" }} >
				<Typography>
					Loading...
				</Typography>
			</div>
		)
	}

	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				Category overview
			</SettingsContentHeader>

			<SettingsContentHelper>
				<SettingsContentHelperText>
					Department Overview Department Overview Department Overview Department Overview Department Overview
					Department Overview Department Overview Department Overview Department Overview Department Overview
				</SettingsContentHelperText>
				<SettingsContentHelperText>
					Department Overview Department Overview Department Overview Department Overview Department Overview
					Department Overview
				</SettingsContentHelperText>
			</SettingsContentHelper>

			{isLoading ?
				<SettingsContentDetails>
					<Typography>
						Loading...
					</Typography>
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
								visibility: "hidden"
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
							<Box
								sx={{
									display: "flex",
									alignItems: "center"
								}}
							>
								<Typography variant="h3" style={{ margin: 0 }}>
									{category.name}
								</Typography>
							</Box>
							<Box sx={{
								display: "flex",
								flexDirection: { xs: "column", md: "row" },
								"&>#sub": { marginRight: 0.5 },
								"&>#sub-default": {
									marginRight: 0.5,
									backgroundColor: "primary.main",
									color: "white"
								}
							}}>
								{category.subCategories.map((item) => (
									<Tooltip
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
								: <IconButton id="set-default-button" onClick={async (e) => {
									e.stopPropagation()
									let affectedItems = []
									categories.forEach(i => {
										affectedItems.push({
											catId: i.catId,
											default: (i.catId === category.catId) ? true : false
										})
									})
									await updateCategory({
										categoryItem: {},
										affectedItems: affectedItems
									})
								}}>
									<CheckBoxIcon />
								</IconButton>}
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