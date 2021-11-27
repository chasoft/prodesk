import React from "react"
import { Container } from "@mui/material"

import useGroupedDocs from "@helpers/useGroupedDocs"

export default function TestPage() {

	const {
		data,
		isLoading
	} = useGroupedDocs()

	console.log({ groupedDocs: data })

	return (
		<Container sx={{ marginTop: 10, display: "flex", flexDirection: "column" }}>



		</Container >
	)
}
