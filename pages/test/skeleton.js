import React from "react"
import { Container } from "@mui/material"
import Editor from "rich-markdown-editor"

export default function TestPage() {



	return (
		<Container sx={{ marginTop: 10, display: "flex", flexDirection: "column" }}>


			<Editor />


		</Container >
	)
}
