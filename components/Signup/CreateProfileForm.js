/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React, { useState } from "react"
import { Button, Grid, Box, TextField, Typography, Avatar } from "@mui/material"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { SimpleTogglePanel, DefaultAvatarPanel } from "../common"
import { useDispatch, useSelector } from "react-redux"
import { getAuth } from "../../redux/selectors"
import { createProfileRegStep } from "../../helpers/firebase"
import { useSnackbar } from "notistack"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const CreateProfileForm = () => {
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()
	const { currentUser } = useSelector(getAuth)
	const [avatar, setAvatar] = useState(currentUser.photoURL ?? "/img/default-avatar.png")
	const [location, setLocation] = useState("")
	return (
		<Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
			<Box
				sx={{
					maxWidth: "600px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					flexGrow: 1,
					mb: 4,
					"& > h2": { mt: 4, mb: 2 }
				}}
			>
				<div style={{ marginBottom: "2rem" }}>
					<Typography variant="h1">Welcome! Let&apos;s create your profile</Typography>
					<Typography variant="body1">Let others get to know you better! You can do these later</Typography>
				</div>

				<Typography variant="h2">Add an avatar</Typography>
				<Grid container spacing={2}>
					<Grid item>
						<Avatar url={avatar} style={{ width: 128, height: 128 }} />
					</Grid>
					<Grid item>
						<Button variant="outlined" color="secondary">Choose Image</Button>
						<SimpleTogglePanel title="or choose one of our defaults">
							<DefaultAvatarPanel callback={(url) => { setAvatar(url) }} defaultAvatar={currentUser.photoURL} />
						</SimpleTogglePanel>
					</Grid>
				</Grid>

				<Typography variant="h2">Add your location</Typography>
				<form>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								id="location"
								name="location"
								label="Location"
								variant="outlined"
								margin="dense"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								fullWidth
								autoFocus
								required
							/>
						</Grid>
					</Grid>
					<Button
						type="submit" variant="contained" color="primary"
						sx={{ mt: 3, mx: 0, mb: 2 }}
						onClick={(e) => {
							e.preventDefault()
							createProfileRegStep({
								username: currentUser.username,
								avatar,
								location
							}, { enqueueSnackbar, dispatch })
						}}
						disabled={(location === "")}
					>
						Continue
					</Button>
				</form>
			</Box>
		</Box>
	)
}

export default CreateProfileForm