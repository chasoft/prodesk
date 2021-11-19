import React from "react"
import { Container } from "@mui/material"
// import { addDemoNotifications, addNewNotification } from "../../helpers/realtimeApi"
// import { useSelector } from "react-redux"
// import { getAuth } from "../../redux/selectors"

import { TestComponent } from "@hehe/ccc"

export default function TestPage() {
	// const [res, setRes] = useState()
	// const { currentUser } = useSelector(getAuth)
	return (
		<Container sx={{ marginTop: 10, display: "flex", flexDirection: "column" }}>

			<TestComponent />

		</Container >
	)
}
