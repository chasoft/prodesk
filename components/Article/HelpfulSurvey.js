import React from "react"
import { Box, Button, Typography } from "@mui/material"

function HelpfulSurvey() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				alignItems: "center",
				py: 3,
				pl: { xs: 0, md: 8 }
			}}
		>

			<Typography variant="h4"
				sx={{
					fontWeight: 500,
					mr: { xs: 0, md: 4 },
					mb: { xs: 2, md: 0 }
				}}
			>
				Was this helpful?
			</Typography>

			<div>
				<Button variant="outlined" size="small" sx={{ mr: 2, minWidth: 100 }}>Yes</Button>
				<Button variant="outlined" size="small" sx={{ px: 5, minWidth: 100 }}>No</Button>
			</div>

		</Box >
	)
}

export default HelpfulSurvey