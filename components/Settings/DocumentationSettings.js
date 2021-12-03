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

import React, { useEffect, useState } from "react"

// MATERIAL-UI
import { Box, Grid, Paper, Typography } from "@mui/material"

//THIRD-PARTY
import { find, map } from "lodash"

//PROJECT IMPORT
import {
	ContentGroup,
	ContentRow,
	EditButton,
	SettingsContainer,
	SettingsContent,
	SettingsHeader
} from "@components/common/Settings"

import { getLayout } from "@layout/ClientLayout"
import { themeInfo } from "@components/Themes/themeInfo"
import { useUpdateAppSettingsMutation } from "@redux/slices/firestoreApi"
import { APP_SETTINGS } from "@helpers/constants"
import useAppSettings from "@helpers/useAppSettings"
import { CircularProgressBox } from "@components/common"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function DocumentationSettings() {
	const [updateAppSettings] = useUpdateAppSettingsMutation()

	const {
		data: activeTheme,
		isLoading: isLoadingActiveTheme
	} = useAppSettings(APP_SETTINGS.activeTheme)

	const [selectedTheme, setSelectedTheme] = useState(activeTheme)

	useEffect(() => {
		setSelectedTheme(activeTheme)
	}, [activeTheme])

	const themeDetails = find(
		themeInfo,
		theme => theme.id === activeTheme
	) ?? themeInfo[APP_SETTINGS.activeTheme]

	const handleSaveSelectedTheme = async () => {
		await updateAppSettings({
			[APP_SETTINGS.activeTheme]: selectedTheme
		})
	}

	const handleCancel = () => {
		setSelectedTheme(activeTheme)
	}

	return (
		<>
			<SettingsHeader>
				<Typography variant="h1" sx={{ mt: 5 }}>
					Documentation Settings
				</Typography>
			</SettingsHeader>

			<SettingsContainer>
				<SettingsContent>

					<ContentGroup title="Themes">
						<ContentRow title="Active theme">
							<EditButton
								defaultState={
									isLoadingActiveTheme
										? <CircularProgressBox minHeight="128px" />
										: <Grid container spacing={2}>
											<Grid item>
												<Paper sx={{ width: 128, height: 128 }}>
													{themeDetails.name}
												</Paper>
											</Grid>
											<Grid item>
												<Typography>name: {themeDetails.name}</Typography>
												<Typography>description: {themeDetails.description}</Typography>
											</Grid>
										</Grid>
								}
								saveAction={handleSaveSelectedTheme}
								cancelAction={handleCancel}
							>
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										"& > :not(style)": {
											m: 1,
											width: 128,
											height: 128,
										},
									}}
								>
									{map(themeInfo, theme => {
										return (
											<Paper
												key={theme.id}
												elevation={(selectedTheme === theme.id) ? 3 : 0}
												onClick={() => setSelectedTheme(theme.id)}
												sx={{
													cursor: "pointer",
													... ((selectedTheme === theme.id)
														? {
															border: "2px solid transparent",
															borderColor: "blue"
														}
														: {
															border: "2px solid transparent",
															borderColor: "white",
														})
												}}
											>
												<div>
													{theme.name + " (version " + theme.version + ")"}
												</div>
												<div>
													{theme.description}
												</div>
											</Paper>
										)
									})}
								</Box>

							</EditButton>
						</ContentRow>

					</ContentGroup>

				</SettingsContent>
			</SettingsContainer>
		</>
	)
}

DocumentationSettings.getLayout = getLayout

export default DocumentationSettings