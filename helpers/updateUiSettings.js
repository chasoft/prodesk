import { useEffect } from "react"
import { batch, useDispatch } from "react-redux"

import { setBackgroundForLoggedinPage, setActiveSettingTab } from "../redux/slices/uiSettings"
import { setTitle, setSubTitle, setPageId } from "./../redux/slices/pageMeta"

export default function updateUiSettings(
	{
		//for background of loggedin pages
		background,

		//pageMeta purposes
		id, title, subTitle,

		//Name of activeTab (used in admin settings pages)
		activeTab
	}
) {
	const dispatch = useDispatch()
	useEffect(() => {

		batch(() => {

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

		})

	}, [])
}