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
import PropTypes from "prop-types"

// MATERIAL-UI
import { Avatar, Box, FormControl, Grid, IconButton, TextField, Typography } from "@mui/material"

//THIRD-PARTY
import { isEqual } from "lodash"
import { useDeepCompareEffect } from "react-use"

//PROJECT IMPORT
import { requestSilentRefetching } from "@helpers/realtimeApi"
import { TYPE } from "@redux/slices/firestoreApiConstants"
import useAppSettings from "@helpers/useAppSettings"
import useLocalComponentCache from "@helpers/useLocalComponentCache"
import { useUpdateAppSettingsMutation } from "@redux/slices/firestoreApi"
import {
	APP_SETTINGS,
	CODE,
	EMPTY,
	LOGO_TYPE,
} from "@helpers/constants"

import {
	deleteFile,
	STORAGE_DESTINATION,
	uploadSingleFile,
	useUploadFile,
} from "@helpers/storageApi"

import {
	ContentGroup,
	ContentRow,
	ContentDescription,
} from "@components/common/Settings"

import {
	LinearProgressWithLabel,
} from "@components/common"

//ASSETS
import UploadIcon from "@mui/icons-material/Upload"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function LogoUploader({ path, logoUrl, setLocalCache }) {
	const [message, setMessage] = useState({ code: "", message: "" })
	const [uploadFile, { uploading, progress }] = useUploadFile()

	useDeepCompareEffect(() => {
		const timeoutId = setTimeout(() => { setMessage({ code: "none", message: "" }) }, 2000)
		return function cleanup() {
			clearTimeout(timeoutId)
		}
	}, [message])

	const handleSelectAndUploadFile = async (e) => {
		const siteLogoUrl = await uploadSingleFile(
			e,
			uploadFile,
			`${STORAGE_DESTINATION.SETTINGS}/${path}-siteLogo.png`
		)

		if (siteLogoUrl?.error) {
			setMessage({
				code: CODE.FAILED,
				message: siteLogoUrl.error.message
			})
			return
		}

		setLocalCache(siteLogoUrl, path)
	}

	const handleRemovePhoto = async () => {
		setLocalCache("", path)
	}

	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			mb: { xs: 2, sm: 0 },
			mt: { xs: 1, sm: 0 }
		}}>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				flexGrow: 1,
				mr: 2,
				"& #removePhotoBtn": {
					display: "none"
				},
				":hover #removePhotoBtn": {
					display: "block"
				}
			}}>
				<div style={{ position: "relative", display: "flex", justifyContent: "center" }}>

					<Avatar
						variant="square"
						src={logoUrl ? logoUrl : "/img/no-image.png"}
						sx={{
							position: "relative",
							width: { xs: 150, md: 200 },
							"& >img": {
								objectFit: "contain"
							},
							p: 0.5,
							backgroundColor: (path === LOGO_TYPE.LIGHT)
								? "inherit"
								: "darkGrey"
						}} />

					{logoUrl && <IconButton
						id="removePhotoBtn"
						size="small"
						variant="outlined"
						disabled={logoUrl === ""}
						onClick={handleRemovePhoto}
						sx={{
							right: 0,
							top: 0,
							position: "absolute"
						}}
					>
						<RemoveCircleIcon sx={{ fontSize: 24 }} />
					</IconButton>}
				</div>

				{uploading
					&& <LinearProgressWithLabel value={progress} sx={{
						"& > div > p": { fontSize: "0.8rem" },
						zIndex: 300
					}} />}

				{message.code
					? <Typography
						color={(message.code === CODE.FAILED)
							? "error.main"
							: "primary.main"}
					>
						{message.message}
					</Typography> : null}
			</Box>

			<Box>
				<form>
					<FormControl sx={{
						"& [type=\"file\"]": {
							display: "none"
						},
					}}>
						<label
							htmlFor={`sitelogo-uploader-${path}`}
							style={{
								border: "1px solid #ccc",
								display: "inline-block",
								padding: "6px 12px",
								cursor: "pointer",
							}}
						>
							<span style={{ display: "flex", alignItems: "center" }}>
								<UploadIcon fontSize="small" /> &nbsp; {(path === LOGO_TYPE.LIGHT) ? "Light Logo" : "Dark Logo "}
							</span>
						</label>
						<input
							id={`sitelogo-uploader-${path}`}
							aria-describedby="my-helper-text"
							type="file"
							accept="image/*"
							onChange={handleSelectAndUploadFile}
						/>
					</FormControl>
				</form>
			</Box>
		</Box>
	)
}
LogoUploader.propTypes = {
	path: PropTypes.string.isRequired,
	logoUrl: PropTypes.string,
	setLocalCache: PropTypes.func.isRequired,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/


export default function GeneralAppSettings() {
	const {
		data: siteMetaInfo = EMPTY.OBJECT,
		isLoading: isLoadingSiteMetaInfo
	} = useAppSettings(null, APP_SETTINGS.siteMetaInfo)

	const {
		localCache, handlers: { setLocalCache }
	} = useLocalComponentCache(siteMetaInfo)

	const [updateAppSettings] = useUpdateAppSettingsMutation()

	const handleTextFieldOnChange = (e) => {
		setLocalCache(
			e.target.value,
			e.target.id
		)
	}

	const handleSaveSiteMetaInfo = async () => {
		const res = await updateAppSettings({
			data: localCache,
			options: {
				docName: APP_SETTINGS.siteMetaInfo,
				merge: true
			}
		})

		if (localCache.logoUrl === "" && siteMetaInfo.logoUrl !== "")
			await deleteFile(`/${STORAGE_DESTINATION.SETTINGS}/siteLogo.png`)

		if (res?.data?.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: "__",
				tag: [{ type: TYPE.SETTINGS, id: APP_SETTINGS.siteMetaInfo }],
				target: {
					isForUser: true,
					isForAdmin: true,
					isForPublic: true
				},
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	const handleCancelSiteMetaInfo = () => {
		setLocalCache(siteMetaInfo)
	}

	return (
		<ContentGroup title="Site Identity">

			<ContentDescription>
				Change the name, title, icon for your site here
			</ContentDescription>

			<ContentRow
				title="Site Information"
				defaultContent={
					<div>
						{localCache.logoUrl ? <Avatar
							variant="square"
							src={localCache.logoUrl}
							sx={{
								width: { xs: 150, sm: 200 },
								mr: 2,
								"& >img": {
									objectFit: "contain"
								}
							}} /> : null}

						<Typography>Site name: {localCache.siteName}</Typography>
						<Typography>Site description: {localCache.siteDescription}</Typography>
					</div>
				}
				editModeContent={
					<Grid Grid container spacing={2} >
						<Grid item xs={12} sm={6}>
							<LogoUploader
								path={LOGO_TYPE.LIGHT}
								logoUrl={localCache[LOGO_TYPE.LIGHT] ?? ""}
								setLocalCache={setLocalCache}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<LogoUploader
								path={LOGO_TYPE.DARK}
								logoUrl={localCache[LOGO_TYPE.DARK] ?? ""}
								setLocalCache={setLocalCache}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField fullWidth
								id="siteName"
								label="Site name"
								size="small"
								value={localCache?.siteName ?? ""}
								placeholder="eg. ProDesk"
								onChange={handleTextFieldOnChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField fullWidth
								id="siteDescription"
								label="Site description"
								size="small"
								multiline
								rows={3}
								placeholder="eg. Your Elegant & Powerful Support System"
								value={localCache?.siteDescription ?? ""}
								onChange={handleTextFieldOnChange}
							/>
						</Grid>

					</Grid >
				}
				handleSave={handleSaveSiteMetaInfo}
				handleCancel={handleCancelSiteMetaInfo}
				isUpdating={isLoadingSiteMetaInfo}
				isModified={!isEqual(localCache, siteMetaInfo)}
			/>

			< ContentRow
				title="Login methods"
				defaultContent={
					<Box>
						Active login methods
					</Box >
				}
				editModeContent={
					<Box>
						login via Email, Google Account, Github Account, Twitter account
					</Box>
				}
				handleSave={() => { }}
				handleCancel={() => { }}
			/>
		</ContentGroup >
	)
}