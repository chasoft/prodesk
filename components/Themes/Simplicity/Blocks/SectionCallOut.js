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

import React from "react"

//MATERIAL-UI
import { Box, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { APP_SETTINGS } from "@helpers/constants"
import { CircularProgressBox } from "@components/common"
import { CustomButtonContained } from "@components/Themes/Simplicity/Buttons/Contained"
import { CustomButtonOutlined } from "@components/Themes/Simplicity/Buttons/Outlined"
import { CustomContainer } from "@components/Themes/Simplicity/Blocks/CustomContainer"
import { regURL } from "@helpers/regex"
import { setRedirect } from "@redux/slices/redirect"
import { useGetThemeSettingsQuery } from "@redux/slices/firestoreApi"
import useAppSettings from "@helpers/useAppSettings"

/*****************************************************************
 * CUSTOM COMPONENTS                                             *
 *****************************************************************/


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function SectionCallOut() {
	const {
		data: activeTheme,
		isLoading: isLoadingActiveTheme
	} = useAppSettings(APP_SETTINGS.activeTheme)

	const {
		data: themeSettings,
		isLoading: isLoadingThemeSettings
	} = useGetThemeSettingsQuery(activeTheme)

	const dispatch = useDispatch()

	if (isLoadingActiveTheme || isLoadingThemeSettings)
		return <CircularProgressBox />

	const handleOpenSlug = (slug) => {
		if (regURL.test(slug))
			window.open(slug, "_blank")
		else
			dispatch(setRedirect(slug))
	}

	return (
		<Box component="section" sx={{
			margin: "24px 0 80px 0"
		}}>
			<CustomContainer>
				<Box id="callout-inner" sx={{
					backgroundColor: themeSettings.callout.background.color,
					outline: "none",
					backgroundImage: { xs: "", xss: `url(${themeSettings.callout.background.imgUrl})` },
					backgroundPosition: { xs: "bottom right -240px", md: "bottom right" },
					backgroundRepeat: "no-repeat",
					borderRadius: "8px",
					color: "white",
					display: "flex",
					flexDirection: "row",
					height: "500px",
					overflow: "hidden",
					width: "100%"
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
							fontSize: { xs: "60px", sm: "80px" },
							lineHeight: { xs: "72px", sm: "96px" },
							fontWeight: "bold",
							marginBottom: "40px",
							marginTop: "0px"
						}}>
							{themeSettings.callout.heading.text}
						</Typography>
						<Box id="callout-buttons" sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							width: "fit-content"
						}}>

							{["button1", "button2"].map(
								item => {
									if (themeSettings.callout[item].variant === "outlined"
										&& themeSettings.callout[item].display) {
										return (
											<CustomButtonOutlined
												key={item}
												sx={{
													marginRight: { xs: 0, md: 2 },
													marginBottom: { xs: 2, md: 0 },
													width: "fit-content",
												}}
												onClick={() => { handleOpenSlug(item.slug) }}
											>
												{themeSettings.callout[item].text}
											</CustomButtonOutlined>
										)
									}
									if (themeSettings.callout[item].variant === "contained"
										&& themeSettings.callout[item].display) {
										return (
											<CustomButtonContained
												key={item}
												sx={{
													marginRight: { xs: 0, md: 2 },
													marginBottom: { xs: 2, md: 0 },
													width: "fit-content"
												}}
												onClick={() => { handleOpenSlug(item.slug) }}
											>
												{themeSettings.callout[item].text}
											</CustomButtonContained>
										)
									}
								})}

						</Box>
					</Box>
				</Box>
			</CustomContainer>
		</Box>

	)
}