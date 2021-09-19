import PropTypes from "prop-types"
import {
	Box,
	Grid,
	Popover,
	TextField,
	Button,
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	ImageList,
	ImageListItem,
	CircularProgress,
	Dialog,
	useMediaQuery,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	IconButton,
	Tabs,
	Tab,
	Paper,
} from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAuth } from "../../redux/selectors"
import * as yup from "yup"
import { useFormik } from "formik"
import dayjs from "dayjs"
import { useTheme } from "@mui/material/styles"

import { useDownloadURL } from "react-firebase-hooks/storage"
import { storage } from "../../helpers/firebase"
import { getListAll, useGetAllFiles } from "../../helpers/firebase-storage"
import CloseIcon from "@mui/icons-material/Close"


const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
		width: "500px",
		[theme.breakpoints.down("md")]: {
			width: "100%"
		}
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "100%"
	},
	imageList: {

	},
	DialogTitle: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(1, 1, 0, 2)
	},
	DialogContent: {
		minHeight: "300px",
		[theme.breakpoints.up("xs")]: {
			minWidth: "400px"
		},
	}


}))

const validationSchema = yup.object({
	dateFrom: yup
		.string("FromDate must be ealier than ToDate"),
	// .when(["dateFrom", "dateTo"], {
	// 	is: (dateFrom, dateTo) => { return dayjs(dateFrom) < dayjs(dateTo) },
	// 	then: yup.string()
	// }),
	dateTo: yup
		.string("ToDate must be later than FromDate")
	// .when(["dateFrom", "dateTo"], {
	// 	is: (dateFrom, dateTo) => { return dayjs(dateFrom) < dayjs(dateTo) },
	// 	then: yup.string()
	// })
})

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

const itemData = [
	{
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	},
	{
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	},
	{
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	}, {
		img: "/img/default-avatar.png",
		title: "Image",
		author: "author",
	},
]

function Gallery({ children }) {
	const theme = useTheme()
	const classes = useStyles()
	const { fileList } = useGetAllFiles()
	const { enqueueSnackbar } = useSnackbar()

	const [showGallery, setShowGallery] = useState(false)
	const [tabId, setTabId] = useState(0)
	const [selectedImage, setSelectedImage] = useState("")

	const handleClose = () => { setShowGallery(false) }
	const handleChange = (event, newValue) => { setTabId(newValue) }

	const fullScreen = useMediaQuery(theme.breakpoints.down("lg"))





	const formik = useFormik({
		initialValues: {
			dateFrom: dayjs().format("YYYY-MM-DD"),
			dateTo: dayjs().subtract(1, "month").format("YYYY-MM-DD")
		},
		validationSchema: validationSchema,
		onSubmit: async () => {
			//dddd
		},
	})



	return (
		<>
			<span onClick={() => setShowGallery(true)}
			>{children}</span>

			<Dialog open={showGallery} onClose={handleClose} fullScreen={fullScreen}>
				<DialogTitle id="responsive-dialog-title" style={{ padding: 0 }}>
					<div className={classes.DialogTitle}>


						<Typography style={{ flexGrow: 1 }} variant="button">Image Gallery</Typography>

						<IconButton
							size="small" aria-label="close"
							className={classes.closeButton} onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>

					</div>
				</DialogTitle>

				<DialogContent className={classes.DialogContent}>
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