import React from "react"
import { Box, Button, Typography } from "@mui/material"


function TicketUploader() {

	const RemoveBtn = () => {
		return (
			<Typography variant="button" sx={{
				color: "error.dark",
				paddingLeft: 1,
				cursor: "pointer",
				"&:hover": {
					textDecoration: "underline"
				}
			}}>
				remove
			</Typography>
		)
	}

	return (
		<Box sx={{ width: "100%" }}>
			<Button>Upload</Button>
			<ol>
				<li>
					file adsfujfldsa.png
					<Typography variant="caption"> (0.5 MB)</Typography>
					<RemoveBtn />
				</li>

				<li>file jfldsa.png <RemoveBtn /></li>
				<li>file adsfldkjksajfldsa.png <RemoveBtn /></li>
				<li>file adsajfldsa.png <RemoveBtn /></li>
			</ol>
		</Box>
	)
}

export default TicketUploader