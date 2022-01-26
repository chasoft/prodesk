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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { emphasize } from "@mui/material/styles"
import { Box, Checkbox, FormControl, IconButton, InputBase, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { HexColorPicker } from "react-colorful"
import { isEqual } from "lodash"

//PROJECT IMPORT
import { CircularProgressBox, LinearProgressWithLabel } from "@components/common"
import { CustomButtonContained } from "@components/Themes/Simplicity/Buttons/Contained"
import { CustomButtonOutlined } from "@components/Themes/Simplicity/Buttons/Outlined"
import { CustomContainer } from "@components/Themes/Simplicity/Blocks/CustomContainer"
import { requestSilentRefetching } from "@helpers/realtimeApi"
import { THEME_NAME } from "@components/Themes/themeInfo"
import { TYPE } from "@redux/slices/firestoreApiConstants"
import useAppSettings from "@helpers/useAppSettings"
import useLocalComponentCache from "@helpers/useLocalComponentCache"
import usePopupContainer from "@components/common/usePopupContainer"

import {
	deleteFile,
	STORAGE_DESTINATION,
	useUploadFile,
	uploadSingleFile
} from "@helpers/storageApi"

import {
	ContentRow,
} from "@components/common/Settings"

import {
	useGetThemeSettingsQuery,
	useUpdateThemeSettingsMutation
} from "@redux/slices/firestoreApi"

import {
	APP_SETTINGS,
	CODE
} from "@helpers/constants"

//ASSETS
import SquareIcon from "@mui/icons-material/Square"
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined"
import UploadIcon from "@mui/icons-material/Upload"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"
import { useSnackbar } from "notistack"
import { useDeepCompareEffect } from "react-use"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function VariantSelect({ value, setValue }) {
	return (
		<ToggleButtonGroup
			value={value}
			size="small"
			exclusive
			onChange={setValue}
			aria-label="variant select"
		>
			<ToggleButton value="contained" aria-label="contained">
				<Tooltip arrow title="Contained" placement="top">
					<span style={{ display: "flex", alignItems: "center" }}>
						<SquareIcon fontSize="small" />
						<Box component="span" sx={{ display: { xs: "none", sm: "block" } }}>
							Solid
						</Box>
					</span>
				</Tooltip>
			</ToggleButton>
			<ToggleButton value="outlined" aria-label="outlined">
				<Tooltip arrow title="Outlined" placement="top">
					<span style={{ display: "flex", alignItems: "center" }}>
						<SquareOutlinedIcon fontSize="small" />
						<Box component="span" sx={{ display: { xs: "none", sm: "block" } }}>
							Outline
						</Box>
					</span>
				</Tooltip>
			</ToggleButton>
		</ToggleButtonGroup >
	)
}
VariantSelect.propTypes = {
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired
}

function ImageUploadButton({ callback }) {
	const { enqueueSnackbar } = useSnackbar()
	const [uploadFile, { uploading, progress }] = useUploadFile()

	const handleSelectAndUploadFile = async (e) => {

		const imgUrl = await uploadSingleFile(
			e,
			uploadFile,
			`${STORAGE_DESTINATION.THEME}/callout-block.png`
		)

		if (imgUrl?.error) {
			enqueueSnackbar(imgUrl?.error.message, { variant: "error" })
			return
		}

		//Update localCache
		if (typeof callback === "function")
			callback(imgUrl)
	}

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			{uploading && <LinearProgressWithLabel
				value={progress}
				sx={{
					marginTop: "auto",
					"& > div > p": {
						fontSize: "0.8rem",
					}
				}} />}

			<FormControl sx={{
				"& [type=\"file\"]": {
					display: "none"
				}
			}}>
				<Box
					component="label"
					htmlFor="photo-file-upload"
					sx={{
						border: "1px solid #ccc",
						display: "inline-block",
						padding: "6px 12px",
						cursor: "pointer"
					}}
				>
					<span style={{ display: "flex", alignItems: "center" }}>
						<UploadIcon fontSize="small" sx={{ mr: 1 }} />
						<span>Upload Background Photo</span>
					</span>
				</Box>
				<input
					id="photo-file-upload"
					aria-describedby="my-helper-text"
					type="file"
					accept="image/*"
					onChange={handleSelectAndUploadFile} />
			</FormControl>
		</Box>
	)
}
ImageUploadButton.propTypes = {
	callback: PropTypes.func,
}

function ColorSelector({ color, setColor }) {
	const [
		PopupContainer, open, anchorRef, {
			handleOpen, handleClose
		}
	] = usePopupContainer()

	return (
		<Box
			ref={anchorRef}
			onClick={handleOpen}
			sx={{
				ml: 1,
				alignItems: "center",
				backgroundColor: color ? color : "#D3D3D3",
				flexGrow: 1,
				display: "flex",
				justifyContent: "center",
				borderRadius: "4px",
				cursor: "pointer",
				fontSize: "0.7rem",
				border: "1px solid transparent",
				borderColor: emphasize(color ? color : "#D3D3D3", 0.2)
			}}
		>
			<InputBase
				value={color}
				onChange={(e) => { setColor(e.target.value ? e.target.value : "#FFFFFF") }}
				sx={{
					color: emphasize(color ? color : "#D3D3D3", 1),
					"&>input": {
						textAlign: "center"
					}
				}} />

			<PopupContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				placement="top"
				transformOrigin="bottom"
				elevation={1}
				sx={{ borderRadius: "8px" }}
			>
				<HexColorPicker
					color={color ? color : "#D3D3D3"}
					onChange={setColor} />
			</PopupContainer>
		</Box>
	)
}
ColorSelector.propTypes = {
	color: PropTypes.string.isRequired,
	setColor: PropTypes.func.isRequired,
}

const defaultCalloutSettings = {
	background: {
		color: "#c69ef9",
		imgUrl: "/themes/simplicity/preview/callout-bg.svg"
	},
	heading: {
		text: "Welcome to ProDesk",
		color: "#000000",
		size: {
			small: "10px",
			medium: "16px",
			large: "25px"
		}
	},
	button1: {
		display: true,
		text: "Learn more",
		variant: "contained",
		slug: "/about-us"
	},
	button2: {
		display: true,
		text: "Join the discussion",
		variant: "outlined",
		slug: "https://chasoft.net"
	}
}

function CalloutBlock(props) {
	const { themeSettings = defaultCalloutSettings } = props

	const [isModified, setIsModified] = useState(false)
	const [updateThemeSettings] = useUpdateThemeSettingsMutation()
	const { enqueueSnackbar } = useSnackbar()

	const {
		localCache,
		handlers: {
			setLocalCache
		}
	} = useLocalComponentCache(themeSettings)

	useDeepCompareEffect(() => {
		setIsModified(!isEqual(themeSettings, localCache))
	}, [localCache])

	//body = { themeName: "...", blockA: {...}, blockB: {..}}
	const handleSaveCalloutBlock = async () => {
		const res = await updateThemeSettings({
			themeName: THEME_NAME.themeSimplicity,
			callout: localCache
		})

		if (res?.data?.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: "__",
				tag: [{ type: TYPE.THEME, id: THEME_NAME.themeSimplicity }],
				target: {
					isForUser: true,
					isForAdmin: true,
					isForPublic: true
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}

		if (res?.error?.code === CODE.FAILED) {
			enqueueSnackbar(res?.error?.data.message, { variant: "error" })
		}
	}

	const handleCancelCalloutBlock = () => {
		setLocalCache(themeSettings)
	}

	const handleRemovePhoto = async () => {
		await deleteFile(`${STORAGE_DESTINATION.THEME}/callout-block.png`)
		setLocalCache("", "background.imgUrl")
	}

	return (
		<ContentRow
			title="Callout Block"
			defaultContent={
				<Box sx={{
					display: "flex",
					flexDirection: { xs: "column", xss: "row" }
				}}>
					<Box sx={{
						width: "200px",
						height: "96px",
						backgroundColor: localCache.background.color,
						backgroundImage: `url(${localCache.background.imgUrl})`,
						backgroundPosition: "bottom right",
						backgroundRepeat: "no-repeat",
						backgroundSize: "100px 96px"
					}}>
						<Typography sx={{
							fontSize: "14px",
							fontWeight: 700,
							mt: 4,
							ml: 1,
							color: "#FFF"
						}}>
							{localCache.heading.text}
						</Typography>

						<Box sx={{ display: "flex", mt: 1 }}>
							<Box sx={{
								width: "35px",
								height: "14px",
								fontSize: "5px",
								ml: 1,
								border: "2px solid white",
								backgroundColor: "white",
								borderRadius: "4px"
							}} />

							<Box sx={{
								width: "40px",
								height: "14px",
								fontSize: "5px",
								ml: 1,
								border: "2px solid white",
								borderRadius: "4px"
							}} />
						</Box>
					</Box>
					<Box sx={{
						display: "flex",
						flexDirection: "column",
						flexGrow: 1,
						justifyContent: "center",
						px: { xs: 0, xss: 2 },
						py: { xs: 2, xss: 0 }
					}}>
						This block would be appear just below the search box in the frontpage.
					</Box>
				</Box>
			}
			editModeContent={
				<Box>
					<CustomContainer>
						<Box id="preview" sx={{
							backgroundColor: localCache.background.color,
							outline: "none",
							backgroundImage: { xs: "", xss: `url(${localCache.background.imgUrl})` },
							backgroundPosition: { xs: "bottom right -240px", md: "bottom right" },
							backgroundRepeat: "no-repeat",
							borderRadius: "8px",
							color: "white",
							display: "flex",
							flexDirection: "row",
							height: "300px",
							overflow: "hidden",
							width: "100%",
							"& #removePhotoBtn": {
								display: "none"
							},
							":hover #removePhotoBtn": {
								display: "block"
							}
						}}>
							<Box id="callout-text" sx={{
								display: "inline-flex",
								flexDirection: "column",
								flexWrap: "wrap",
								margin: "auto 0px auto 8%"
							}}>
								<Typography variant="h2" sx={{
									color: "white",
									cursor: "default",
									flexBasis: "100%",
									fontFamily: "Whyte-ink",
									fontSize: { xs: "25px", xss: "30px", md: "45px" },
									lineHeight: { xs: "30px", xss: "35px", md: "45px" },
									fontWeight: "bold",
									marginBottom: { xs: "20px", xss: "40px" },
									marginTop: "0px"
								}}>
									{localCache.heading.text}
								</Typography>
								<Box id="callout-buttons" sx={{
									display: "flex",
									flexDirection: { xs: "column", md: "row" },
									width: "fit-content"
								}}>
									{["button1", "button2"].map(
										item => {
											if (localCache[item].variant === "outlined"
												&& localCache[item].display) {
												return (
													<CustomButtonOutlined key={item} sx={{
														marginRight: { xs: 0, md: 2 },
														marginBottom: { xs: 2, md: 0 },
														width: "fit-content",
													}}>
														{localCache[item].text}
													</CustomButtonOutlined>
												)
											}
											if (localCache[item].variant === "contained"
												&& localCache[item].display) {
												return (
													<CustomButtonContained key={item} sx={{
														marginRight: { xs: 0, md: 2 },
														marginBottom: { xs: 2, md: 0 },
														width: "fit-content"
													}}>
														{localCache[item].text}
													</CustomButtonContained>
												)
											}
										})}
								</Box>
							</Box>

							<div>
								<IconButton
									id="removePhotoBtn"
									size="small"
									variant="outlined"
									disabled={localCache.background.imgUrl === ""}
									onClick={handleRemovePhoto}
									sx={{
										float: "right",
										position: "relative"
									}}
								>
									<RemoveCircleIcon sx={{ fontSize: 24 }} />
								</IconButton>
							</div>

						</Box>
					</CustomContainer>

					<Box sx={{ mt: 3 }}>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Box sx={{ display: "flex", alignItems: "center", py: 1 }}>
								<Typography
									noWrap
									minWidth={{ xs: "50px", md: "150px" }}
									textAlign="right"
									paddingRight={2}
								>
									Heading text
								</Typography>
								<InputBase
									fullWidth
									value={localCache.heading.text}
									onChange={(e) => {
										setLocalCache(e.target.value, "heading.text")
									}}
									sx={{
										borderBottom: "1px solid transparent",
										borderColor: "silver"
									}}
								/>
							</Box>

							{["button1", "button2"].map((item, idx) => {
								return (
									<Box key={item} sx={{ display: "flex", alignItems: "center", py: 1 }}>
										<Typography
											noWrap
											minWidth={{ xs: "50px", md: "150px" }}
											textAlign="right"
											paddingRight={2}
										>
											Button {idx + 1}
										</Typography>
										<Checkbox
											checked={localCache[item].display}
											onChange={(e) => {
												e.stopPropagation()
												setLocalCache(null, `${item}.display`, "toggle")
											}}
										/>
										<Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, mr: 2 }}>
											<InputBase
												fullWidth
												placeholder="button text"
												value={localCache[item].text}
												onChange={(e) => {
													setLocalCache(e.target.value, `${item}.text`)
												}}
												sx={{
													borderBottom: "1px solid transparent",
													borderColor: "silver",
												}}
											/>

											<InputBase
												fullWidth
												placeholder="target url. eg: /pricing"
												value={localCache[item].slug}
												onChange={(e) => {
													setLocalCache(e.target.value, `${item}.slug`)
												}}
												sx={{
													borderBottom: "1px solid transparent",
													borderColor: "silver",
												}}
											/>
										</Box>

										<VariantSelect
											value={localCache[item].variant}
											setValue={(e, v) => {
												if (v !== null)
													setLocalCache(v, `${item}.variant`)
											}}
										/>
									</Box>
								)
							})}

							<Box
								id="imgUploadBtn"
								sx={{ display: "flex", alignItems: "stretch", height: "100%", py: 1 }}
							>

								<ImageUploadButton
									callback={(v) => {
										setLocalCache(v, "background.imgUrl")
									}}
								/>

								<ColorSelector
									color={localCache.background.color}
									setColor={(v) => {
										setLocalCache(v, "background.color")
									}}
								/>

							</Box>

						</Box>
					</Box>
				</Box>
			}
			handleSave={handleSaveCalloutBlock}
			handleCancel={handleCancelCalloutBlock}
			isModified={isModified}
		/>
	)
}
CalloutBlock.propTypes = {
	themeSettings: PropTypes.object,
}

/**
 * 
 * @returns !ContentRow
 */
export function ThemeSettings() {

	const {
		data: activeTheme,
		isLoading: isLoadingActiveTheme
	} = useAppSettings(APP_SETTINGS.activeTheme)

	const {
		data: themeSettings,
		isLoading: isLoadingThemeSettings
	} = useGetThemeSettingsQuery(activeTheme)

	if (isLoadingActiveTheme || isLoadingThemeSettings) {
		<CircularProgressBox />
	}

	return (
		<>
			<CalloutBlock themeSettings={themeSettings?.callout} />
		</>
	)
}