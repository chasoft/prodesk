import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setBackgroundForLoggedinPage } from "../redux/slices/uiSettings"

export default function updateFrontendBackground(props) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setBackgroundForLoggedinPage(props.data))
	}, [])
}