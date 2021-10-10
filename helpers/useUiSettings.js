
import { useDeepCompareEffect } from "react-use"

import { batch as reduxBatch, useDispatch } from "react-redux"
import { setBackgroundForLoggedinPage, setActiveSettingTab, setActiveSettingPanel } from "../redux/slices/uiSettings"
import { setTitle, setSubTitle, setPageId } from "../redux/slices/pageMeta"

/**
 * This hook is used to update UI's Settings
 * @param {*} param0 
 * @returns null
 */
export default function useUiSettings({
	//for background of loggedin pages
	background,
	//pageMeta purposes
	id, title, subTitle,
	//Name of activeTab (used in admin settings pages or any group of tabs)
	activeTab,
	//active settings panel
	activePanel
}) {

	const dispatch = useDispatch()

	useDeepCompareEffect(() => {
		reduxBatch(() => {
			if (background) {
				dispatch(setBackgroundForLoggedinPage(background))
			}

			if (title) {
				dispatch(setTitle(title))
				dispatch(setPageId(id ?? ""))
				dispatch(setSubTitle(subTitle ?? ""))
			}

			if (activeTab) {
				dispatch(setActiveSettingTab(activeTab))
			}

			if (activePanel) {
				dispatch(setActiveSettingPanel(activePanel))
			}

		})
	}, [dispatch, background, title, id, subTitle, activeTab, activePanel])

	return null
}