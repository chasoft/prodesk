import PropTypes from "prop-types"
import { Box, makeStyles, Grid, Popover, TextField, Button, Drawer, AppBar, Toolbar, Typography, ImageList, ImageListItem } from "@material-ui/core"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { getAuth } from "../../redux/selectors"
import * as yup from "yup"
import { useFormik } from "formik"
import dayjs from "dayjs"
import { useDownloadURL } from "react-firebase-hooks/storage"
import { storage } from "../../helpers/firebase"


const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
		minWidth: "500px",
		[theme.breakpoints.down("xs")]: {
			minWidth: "100%"
		}
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "100%"
	},
	imageList: {

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

function Gallery({ children }) {

	const { currentUser } = useSelector(getAuth)
	//const [downloadUrl, loading, error] = useDownloadURL(storage.ref(`uploads/${currentUser?.username}`))
	const [allFiles, setAllFiles] = useState({})

	const classes = useStyles()
	const [toggleDrawer, setToggleDrawer] = useState(false)

	const { enqueueSnackbar } = useSnackbar()


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
			<span onClick={async () => {
				setToggleDrawer(true)
				const aaa = `uploads/${currentUser.username}/`
				console.log(aaa)
				const listRef = storage.ref().child(aaa)
				const res = await listRef.listAll()
				const folderList = []
				const fileList = []

				res.prefixes.forEach((folderRef) => {
					// All the prefixes under listRef.
					// You may call listAll() recursively on them.
					folderList.push(folderRef)
				})
				res.items.forEach(async (itemRef) => {
					// All the items under listRef.
					const url = await itemRef.getDownloadURL()
					fileList.push(url)
				})

				setAllFiles({ folderList, fileList })
			}}
			>{children}</span>

			<Drawer anchor="right" open={toggleDrawer} onClose={() => setToggleDrawer(false)}>
				<div>
					<Toolbar>
						<Typography variant="h6" noWrap>
							Permanent drawer
						</Typography>
					</Toolbar>
				</div>
				<div className={classes.datetime}>
					<form className={classes.container} onSubmit={formik.handleSubmit}>

						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									id="dateFrom"
									label="From"
									type="date"
									value={formik.values.dateFrom}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.dateFrom && Boolean(formik.errors.dateFrom)}
									helperText={formik.touched.dateFrom && formik.errors.dateFrom}
									className={classes.textField}
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
								/>
							</Grid>

							<Grid item xs={6}>
								<TextField
									id="dateTo"
									label="To"
									type="date"
									value={formik.values.dateTo}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.dateTo && Boolean(formik.errors.dateTo)}
									helperText={formik.touched.dateTo && formik.errors.dateTo}
									className={classes.textField}
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
								/>
							</Grid>
						</Grid>

					</form>
				</div>
				<div className={classes.imageList}>
					{
						// allFiles ? JSON.stringify(allFiles) : "Empty"
						allFiles ? console.log({ allFiles }) : "Empty"
					}

					{
						allFiles?.fileList?.length > 0 &&
						allFiles.fileList.map((item) => (
							<img key={item} src={item} alt="aa" />
						))
					}

				</div>
			</Drawer>
		</>
	)
}
Gallery.propTypes = { children: PropTypes.node }

export default Gallery