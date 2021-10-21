/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.0     ║ *
 * ╠═══════════════════════════════════════════════════════════════════╣ *
 * ║                                                                   ║ *
 * ║   @author     A. Cao <cao@anh.pw>                                 ║ *
 * ║   @copyright  Chasoft Labs © 2021                                 ║ *
 * ║   @link       https://chasoft.net                                 ║ *
 * ║                                                                   ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║ @license This product is licensed and sold at CodeCanyon.net      ║ *
 * ║ If you have downloaded this from another site or received it from ║ *
 * ║ someone else than me, then you are engaged in an illegal activity.║ *
 * ║ You must delete this software immediately or buy a proper license ║ *
 * ║ from http://codecanyon.net/user/chasoft/portfolio?ref=chasoft.    ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║      THANK YOU AND DON'T HESITATE TO CONTACT ME FOR ANYTHING      ║ *
 * ╚═══════════════════════════════════════════════════════════════════╝ *
 ************************************************************************/

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"

// MATERIAL-UI
import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	IconButton,
	Typography,
} from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "./../../../layout/AdminLayout"

//ASSETS
import MoreVertIcon from "@mui/icons-material/MoreVert"
import useUiSettings from "./../../../helpers/useUiSettings"


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Settings() {

	useUiSettings({
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>
			<Typography variant="h1">Admin Settings</Typography>

			<Card sx={{ marginTop: "2rem" }} variant="outlined">
				<CardHeader
					avatar={
						<Avatar aria-label="recipe">
							R
						</Avatar>
					}
					action={
						<IconButton aria-label="settings" size="large">
							<MoreVertIcon />
						</IconButton>
					}
					title="Shrimp and Chorizo Paella"
					subheader="September 14, 2016"
				/>
				<CardContent>
					<Typography color="textSecondary" gutterBottom>
						Word of the Day
					</Typography>
					<Typography variant="h5" component="h2">
						beddddddlent
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
				<CardActions>
					<Button size="small">Learn More</Button>
				</CardActions>
			</Card>





		</Container>
	)
}

Settings.getLayout = getLayout
export default Settings