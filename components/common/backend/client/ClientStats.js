import React from "react"
import { Card, CardContent, Grid, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
}))

function ClientStats() {
	const classes = useStyles()
	const bull = <span className={classes.bullet}>•</span>

	return (
		<Grid container spacing={2} >
			<Grid item xs>
				<Card className={classes.root}>
					<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							Word of the Day
						</Typography>
						<Typography variant="h5" component="h2">
							be{bull}nev{bull}o{bull}lent
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
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
				<Card className={classes.root}>
					<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							Word of the Day
						</Typography>
						<Typography variant="h5" component="h2">
							be{bull}nev{bull}o{bull}lent
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
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