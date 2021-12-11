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

import React, { useEffect, useState, useCallback } from "react"

// MATERIAL-UI
import { Box, Button, Grid, Paper, Typography } from "@mui/material"

//THIRD-PARTY
import { find, map, size } from "lodash"
import { useSelector } from "react-redux"
import { useSnackbar } from "notistack"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

//PROJECT IMPORT
import { getAuth } from "@redux/selectors"
import { getLayout } from "@layout/ClientLayout"
import { themeInfo, THEME_NAME } from "@components/Themes/themeInfo"
import { useCreateDocSearchIndex } from "@helpers/docSearchIndex"
import useAppSettings from "@helpers/useAppSettings"

import {
	ContentGroup,
	ContentRow,
	ContentDescription,
	EditButton,
	SettingsContainer,
	SettingsContent,
	SettingsHeader
} from "@components/common/Settings"

import {
	useGetDocsQuery,
	useUpdateAppSettingsMutation,
	useGetDocSearchIndexQuery
} from "@redux/slices/firestoreApi"

import {
	APP_SETTINGS,
	CODE,
	DATE_FORMAT
} from "@helpers/constants"

import {
	CircularProgressBox,
	LinearProgressWithLabel
} from "@components/common"
import { ThemeSettings as SimplicityThemeSettings } from "@components/Themes/Simplicity/ThemeSettings"
import { ThemeSettings as TraditionalThemeSettings } from "@components/Themes/Traditional/ThemeSettings"
import { ThemeSettings as GoogleThemeSettings } from "@components/Themes/Google/ThemeSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function DocTheme() {
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
		<ContentGroup title="Theme">
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

			{(activeTheme === THEME_NAME.themeSimplicity)
				? <SimplicityThemeSettings />
				: null}

			{(activeTheme === THEME_NAME.themeTraditional)
				? <TraditionalThemeSettings />
				: null}

			{(activeTheme === THEME_NAME.themeGoogle)
				? <GoogleThemeSettings />
				: null}

		</ContentGroup>
	)
}

function DocSearchIndex() {
	const {
		data: docs = [],
		isLoading: isLoadingDocs
	} = useGetDocsQuery(undefined)

	const {
		data: docSearchIndex = undefined,
		isLoading: isLoadingDocSearchIndex
	} = useGetDocSearchIndexQuery(undefined)

	const { currentUser } = useSelector(getAuth)

	const { enqueueSnackbar } = useSnackbar()

	const [createSearchIndex, { isCreating, progress }] = useCreateDocSearchIndex()

	const handleCreateDocSearchIndex = useCallback(async () => {
		const res = await createSearchIndex(docs, currentUser.username)
		if (res?.data?.code === CODE.SUCCESS)
			enqueueSnackbar("Searching Index created successfully", { variant: "success" })
		else
			enqueueSnackbar("Fail to create Searching Index!", { variant: "error" })
	}, [docs, createSearchIndex, currentUser.username, enqueueSnackbar])

	dayjs.extend(relativeTime)

	return (
		<ContentGroup title="Searching Index">
			<ContentDescription>
				Creating searching index helps boost overal performance to a new level. It is &quot;instantly&quot;. Re-create the index if you have any update/modification on documentation.
			</ContentDescription>
			<ContentRow title="Index status">
				<Box sx={{
					display: "flex",
					flexDirection: { xs: "column", xss: "row" },
					py: 2
				}}>
					<Box sx={{ flexGrow: 1 }}>

						{isCreating ? <LinearProgressWithLabel
							value={progress}
							sx={{
								"& > div > p": {
									fontSize: "0.8rem",
								}
							}} /> : null}

						{(isLoadingDocs || isLoadingDocSearchIndex) ?
							<CircularProgressBox minHeight="60px" /> : null}

						{(!isLoadingDocs && !isLoadingDocSearchIndex && size(docSearchIndex)) ?
							<Box>
								<Typography sx={{ fontWeight: 700 }}>
									Index Created
								</Typography>
								<Typography>
									Created: {dayjs(docSearchIndex.updatedAt).format(DATE_FORMAT.LONG)}<br />
									<span style={{ fontStyle: "italic" }}>({dayjs(docSearchIndex.updatedAt).fromNow()})</span> by {docSearchIndex.updatedBy}
								</Typography>
							</Box> : null}

						{(!isLoadingDocs && !isLoadingDocSearchIndex && !size(docSearchIndex)) ?
							<div>
								<Typography sx={{ fontWeight: 700 }}>
									No Index Created<br />
								</Typography>
								<Typography>
									Documentation searching would not be active unless you have an index created.
								</Typography>
							</div> : null}
					</Box>


					<Box sx={{
						display: "flex",
						alignItems: "center"
					}}>
						<Button variant="contained" onClick={handleCreateDocSearchIndex}>
							{size(docSearchIndex)
								? "ReCreate"
								: "Create"}
						</Button>
					</Box>

				</Box>
			</ContentRow>
		</ContentGroup >
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function DocumentationSettings() {
	return (
		<>
			<SettingsHeader>
				<Typography variant="h1" sx={{ mt: 5 }}>
					Documentation Settings
				</Typography>
			</SettingsHeader>

			<SettingsContainer>
				<SettingsContent>

					<DocTheme />
					<DocSearchIndex />

				</SettingsContent>
			</SettingsContainer>
		</>
	)
}

DocumentationSettings.getLayout = getLayout

export default DocumentationSettings