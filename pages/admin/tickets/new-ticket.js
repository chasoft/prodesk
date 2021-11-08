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

import React, { useEffect } from "react"
import useUiSettings from "./../../../helpers/useUiSettings"

// MATERIAL-UI
import { Box, Container, FormControl, Avatar, Select, Typography, ListItemText, MenuItem } from "@mui/material"

//THIRD-PARTY
import { isMobile } from "react-device-detect"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"
import TicketStepper from "../../../components/Ticket/Create/NewTicketStepper"

//PROJECT IMPORT
import useProfiles from "../../../helpers/useProfiles"
import { getNewTicket, getUiSettings } from "../../../redux/selectors"
import { REDIRECT_URL } from "../../../helpers/constants"
import { getLayout } from "./../../../layout/ClientLayout"
import { setEditorData } from "../../../redux/slices/textEditor"
import IconBreadcrumbs from "../../../components/BackEnd/IconBreadcrumbs"
import { resetNewTicket, setOnBehalf } from "../../../redux/slices/newTicket"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import PersonIcon from "@mui/icons-material/Person"
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminNewTicket() {

	const dispatch = useDispatch()
	const { userList, isLoading } = useProfiles()
	const { onBehalf } = useSelector(getNewTicket)
	const { currentStep } = useSelector(getNewTicket)
	const { isSmallScreen } = useSelector(getUiSettings)

	useUiSettings({
		title: "Open New Ticket",
		background: {
			backgroundImage: "",
		}
	})

	useEffect(() => {
		reduxBatch(() => {
			dispatch(resetNewTicket())
			dispatch(setEditorData(""))
		})
	}, [dispatch])

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<Box sx={{ display: "flex" }}>

				<Box sx={{ flexGrow: 1 }}>

					<Box sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						px: { xs: isMobile ? 0 : 2, md: 4 },
						pt: { xs: 3, sm: 6, md: 8, lg: 10 },
						pb: { xs: 2, sm: 4 }
					}}>
						<IconBreadcrumbs
							icon={null}
							title="New ticket"
							items={[
								{
									icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
									title: "Home",
									url: REDIRECT_URL.ADMIN.INDEX
								},
								{
									icon: <AirplaneTicketIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
									title: "Tickets management",
									url: REDIRECT_URL.ADMIN.TICKETS
								}
							]}
						/>
						<Typography variant="h1" sx={{ fontWeight: 500, mt: 4 }}>
							Open New Ticket
						</Typography>

						{(currentStep === 0) &&
							<Box sx={{
								display: "flex",
								width: "100%",
								alignItems: { xs: "flex-start", sm: "center" },
								flexDirection: { xs: "column", sm: "row" }
							}}>
								<Typography variant="body2" sx={{ my: isMobile ? 1 : 0 }}>
									Post a question on behalf of
								</Typography>

								{!isLoading &&
									<FormControl
										variant="standard"
										sx={{ ml: { xs: 0, sm: 1 } }}
										fullWidth={isMobile || isSmallScreen}
									>
										<Select
											labelId="on-behalf-of"
											id="on-behalf-of"
											value={onBehalf ?? "default"}
											onChange={(e) => {
												dispatch(
													setOnBehalf(
														(e.target.value === "default") ? null : e.target.value
													)
												)
											}}
										>
											<MenuItem value="default">
												<Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
													<Avatar sx={{ width: 32, height: 32, mr: 2 }} ><PersonIcon /></Avatar>
													<Typography>Please select a user...</Typography>
												</Box>
											</MenuItem>
											{userList.map((profile) => {
												return (
													<MenuItem key={profile.username} value={profile.username}>
														<Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
															<Avatar url={profile.photoURL} sx={{ width: 32, height: 32, mr: 2 }} />
															<ListItemText primary={`${profile.displayName} (${profile.email})`} />
														</Box>
													</MenuItem>
												)
											})}
										</Select>
									</FormControl>}
							</Box>}

					</Box>

					<Box sx={{ px: { xs: 2, md: 4 }, pb: 2 }}>
						<TicketStepper />
					</Box>

				</Box>
			</Box>

		</Container >
	)
}

AdminNewTicket.getLayout = getLayout

export default AdminNewTicket