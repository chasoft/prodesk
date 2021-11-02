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

import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import { Box, Grid, Button, Typography, Dialog, useMediaQuery, DialogTitle, DialogContent, DialogActions, IconButton, Paper } from "@mui/material"

//THIRD-PARTY
// import dayjs from "dayjs"
// import * as yup from "yup"
// import { useFormik } from "formik"

//PROJECT IMPORT
import { useGetAllFiles } from "./../../helpers/firebase-storage"

//ASSETS
import CloseIcon from "@mui/icons-material/Close"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// const validationSchema = yup.object({
// 	dateFrom: yup
// 		.string("FromDate must be ealier than ToDate"),
// 	// .when(["dateFrom", "dateTo"], {
// 	// 	is: (dateFrom, dateTo) => { return dayjs(dateFrom) < dayjs(dateTo) },
// 	// 	then: yup.string()
// 	// }),
// 	dateTo: yup
// 		.string("ToDate must be later than FromDate")
// 	// .when(["dateFrom", "dateTo"], {
// 	// 	is: (dateFrom, dateTo) => { return dayjs(dateFrom) < dayjs(dateTo) },
// 	// 	then: yup.string()
// 	// })
// })

function TabPanel(props) {
	const { children, value, index, ...other } = props
	return (
		<div
			role="tabpanel" id={`simple-tabpanel-${index}`}
			hidden={value !== index} {...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Gallery({ children }) {
	const theme = useTheme()
	const { fileList } = useGetAllFiles()

	const [showGallery, setShowGallery] = useState(false)
	// const [tabId, setTabId] = useState(0)
	const [selectedImage, setSelectedImage] = useState("")

	const handleClose = () => { setShowGallery(false) }
	// const handleChange = (event, newValue) => { setTabId(newValue) }

	const fullScreen = useMediaQuery(theme.breakpoints.down("lg"))





	// const formik = useFormik({
	// 	initialValues: {
	// 		dateFrom: dayjs().format("YYYY-MM-DD"),
	// 		dateTo: dayjs().subtract(1, "month").format("YYYY-MM-DD")
	// 	},
	// 	validationSchema: validationSchema,
	// 	onSubmit: async () => {
	// 		//dddd
	// 	},
	// })



	return (
		<>
			<span onClick={() => setShowGallery(true)}>{children}</span>

			<Dialog open={showGallery} onClose={handleClose} fullScreen={fullScreen}>
				<DialogTitle id="responsive-dialog-title" style={{ padding: 0 }}>
					<Box sx={{
						display: "flex",
						alignItems: "center",
						pt: 1, pr: 1, pb: 0, pl: 2
					}}>

						<Typography style={{ flexGrow: 1 }} variant="button">Image Gallery</Typography>

						<IconButton
							size="small" aria-label="close"
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>

					</Box>
				</DialogTitle>

				<DialogContent sx={{
					minHeight: "300px",
					minWidth: { xs: "initial", md: "400px" }
				}}>
					<Box onClick={() => setSelectedImage("")}>
						<Typography variant="h3">10-Sep-2021</Typography>
						<Grid container spacing={2}>
							{
								(fileList.length === 0) ?
									<Grid item xs>
										<Typography>There is no images in your gallery!</Typography>
									</Grid>
									: fileList.map((item) => (
										<Grid key={item.filename} item xs>
											<Paper
												variant="outlined"
												style={{
													textAlign: "center",
													height: "120px", width: "120px",
													border: (selectedImage === item.filename) ? "3px solid #1A73E8" : "1px solid #E0E0E0",
													cursor: "pointer",
													backgroundImage: "url(" + item.thumb + ")",
													backgroundSize: "cover"
												}}
												onClick={(e) => {
													e.stopPropagation()
													setSelectedImage(item.filename)
												}}
											>
											</Paper>
										</Grid>
									))
							}
						</Grid>
					</Box>
				</DialogContent>

				<DialogActions>
					<div style={{ display: "flex", flexGrow: 1, justifyContent: "flex-start", paddingLeft: "1rem" }}>
						<Typography>{(selectedImage.length > 0) && "You selected: "}</Typography>
						<Typography style={{ fontWeight: 500 }}>
							{
								(selectedImage.length < 30)
									? selectedImage
									: (selectedImage.slice(0, 15) + "..." + selectedImage.slice(-15))
							}
						</Typography>
					</div>
					<div style={{ paddingRight: "1rem" }}>
						<Button onClick={handleClose} color="secondary" style={{ marginRight: "1rem" }}>
							Cancel
						</Button>
						<Button onClick={() => { }} variant="contained" color="primary">
							Insert
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</>
	)
}
Gallery.propTypes = { children: PropTypes.node }

export default Gallery