import React from "react"
import { Card, CardContent, Grid, Typography } from "@mui/material"

function ClientStats() {

	return (
		<Grid container spacing={2} >
			<Grid item xs>
				<Card sx={{ width: "100%" }}>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							Word of the Day
						</Typography>
						<Typography variant="h5" component="h2">
							belent
						</Typography>
						<Typography color="textSecondary">
							adjective
						</Typography>
						<Typography variant="body2" component="p">
							well meaning and kindly.
							<br />
							{"\"a benevolent smile\""}
						</Typography>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs>
				<Card sx={{ width: "100%" }}>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							Word of the Day
						</Typography>
						<Typography variant="h5" component="h2">
							belent
						</Typography>
						<Typography color="textSecondary">
							adjective
						</Typography>
						<Typography variant="body2" component="p">
							well meaning and kindly.
							<br />
							{"\"a benevolent smile\""}
						</Typography>
					</CardContent>
				</Card>
			</Grid>

		</Grid>
	)
}

export default ClientStats