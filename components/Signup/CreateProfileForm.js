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

import React, { useState } from "react"

// MATERIAL-UI
import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material"

//THIRD-PARTY
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "../../redux/selectors"
import { RegContainer } from "../../layout/RegLayout"
import { createProfileRegStep } from "../../helpers/firebase"
import { SimpleTogglePanel, DefaultAvatarPanel } from "../common"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CreateProfileForm = () => {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)
	const [location, setLocation] = useState("")
	const [avatar, setAvatar] = useState(currentUser.photoURL ?? "/img/default-avatar.png")

	return (
		<RegContainer>

			<Box sx={{ mb: 4 }}>
				<Typography variant="h1">{"Welcome! Let's create your profile"}</Typography>
				<Typography variant="body1">Let others get to know you better! You can do these later</Typography>
			</Box>

			<Typography variant="h2">Add an avatar</Typography>
			<Grid container spacing={2}>
				<Grid item>
					<Avatar url={avatar} sx={{ width: 128, height: 128 }} />
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

		</RegContainer>
	)
}

export default CreateProfileForm