import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAdminBackgroundId } from "../redux/slices/uiSettings"

/**
 * Update admin background when a page is loaded
 * Details is hardcoded in AdminLayout.js
 * @param {object} props
 */
export default function updateFrontendBackground(props) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setAdminBackgroundId(props.id))
	}, [])
}