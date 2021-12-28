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

import { useCallback } from "react"

// MATERIAL-UI

//THIRD-PARTY
import { filter, set, size } from "lodash"

//PROJECT IMPORT
import { APP_SETTINGS, CODE, EMPTY } from "@helpers/constants"
import { requestSilentRefetching } from "@helpers/realtimeApi"
import { TYPE } from "@redux/slices/firestoreApiConstants"
import { useUpdateAppSettingsMutation } from "@redux/slices/firestoreApi"
import useAppSettings from "@helpers/useAppSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/**
 * Update label of un-modified menu-item
 * currently, this function will update TopMenu & footerMenu
 */
export default function useUpdateLinkedMenuItem() {
	const {
		data: { topMenu = EMPTY.OBJECT },
		isLoading: isLoadingTopMenu
	} = useAppSettings(null, APP_SETTINGS.topMenu)

	const {
		data: { footerMenu = EMPTY.OBJECT },
		isLoading: isLoadingFooterMenu
	} = useAppSettings(null, APP_SETTINGS.footerMenu)

	const [updateAppSettings] = useUpdateAppSettingsMutation()

	const updateLinkedMenuItem = useCallback(async function (docId, { newLabel, newSlug, newEmoji }) {
		let topMenuUpdated
		let footerMenuUpdated

		//Update topMenu
		const affectedTopMenuItems = filter(topMenu, i => i?.docId === docId)

		let newDataTopMenu = {}
		if (affectedTopMenuItems.length > 0) {
			affectedTopMenuItems.forEach(i => {
				set(
					newDataTopMenu,
					i.id,
					{
						...((newLabel && (i.originalLabel === i.label))
							? { originalLabel: newLabel, label: newLabel }
							: {}),
						...((newEmoji && (i.originalEmoji === i.emoji))
							? { originalEmoji: newEmoji, emoji: newEmoji }
							: {}),
						...((newSlug)
							? { slug: newSlug }
							: {})
					}
				)
			})
			if (size(newDataTopMenu) > 0) {
				topMenuUpdated = await updateAppSettings({
					data: {
						[APP_SETTINGS.topMenu]: newDataTopMenu
					},
					options: {
						docName: APP_SETTINGS.topMenu,
						merge: true //important
					}
				})
			}
		}
		//Update topMenu
		let affectedFooterMenuItems = []
		Object.values(footerMenu).forEach(column => {
			const filtered = filter(column.children, i => i?.docId === docId)
			affectedFooterMenuItems.push(...filtered)
		})

		let newDataFooterMenu = {}
		if (affectedFooterMenuItems.length > 0) {
			affectedFooterMenuItems.forEach(i => {
				set(
					newDataFooterMenu,
					`${i.parentId}.children.${i.id}`,
					{
						...((newLabel && (i.originalLabel === i.label))
							? { originalLabel: newLabel, label: newLabel }
							: {}),
						...((newEmoji && (i.originalEmoji === i.emoji))
							? { originalEmoji: newEmoji, emoji: newEmoji }
							: {}),
						...((newSlug)
							? { slug: newSlug }
							: {})
					}
				)
			})
			if (size(newDataFooterMenu) > 0) {
				footerMenuUpdated = await updateAppSettings({
					data: {
						[APP_SETTINGS.footerMenu]: newDataFooterMenu
					},
					options: {
						docName: APP_SETTINGS.footerMenu,
						merge: true //important
					}
				})
			}
		}

		if (topMenuUpdated?.data?.code === CODE.SUCCESS
			|| footerMenuUpdated?.data?.code === CODE.SUCCESS) {

			let tag = []

			if (topMenuUpdated?.data?.code === CODE.SUCCESS)
				tag.push({ type: TYPE.SETTINGS, id: APP_SETTINGS.topMenu })
			if (footerMenuUpdated?.data?.code === CODE.SUCCESS)
				tag.push({ type: TYPE.SETTINGS, id: APP_SETTINGS.footerMenu })

			const invalidatesTags = {
				trigger: "__",
				tag,
				target: {
					isForUser: true,
					isForAdmin: true,
					isForPublic: true
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}

		console.log({ newDataTopMenu, newDataFooterMenu })

	}, [updateAppSettings, topMenu, footerMenu])

	return ({
		updateLinkedMenuItem,
		isLoading: isLoadingTopMenu || isLoadingFooterMenu
	})
}