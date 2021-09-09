/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useState } from "react"
import dynamic from "next/dynamic"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, Container, Grid, LinearProgress, Typography } from "@material-ui/core"

//THIRD-PARTY
import Editor from "rich-markdown-editor"

//PROJECT IMPORT
import { getRootLayout } from "./../../layout/RootLayout"
import { imageUploader, STATE_CHANGED, storage } from "./../../helpers/firebase"
import { useSelector } from "react-redux"
import { getAuth } from "../../redux/selectors"
import { nanoid } from "nanoid"
import Gallery from "../../components/Gallery"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/
function LinearProgressWithLabel(props) {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(
					props.value,
				)}%`}</Typography>
			</Box>
		</Box>
	)
}
LinearProgressWithLabel.propTypes = { value: PropTypes.number.isRequired, }

const Test = () => {
	const [toggle, setToggle] = useState(false)
	const { currentUser } = useSelector(getAuth)
	const [uploading, setUploading] = useState(false)
	const [progress, setProgress] = useState(0)

	function uploaderPromise(file) {
		return new Promise((resolve, reject) => {
			// Prepare the filename
			const uniqueId = nanoid(5)
			const extension = file.type.split("/")[1]
			const filename = file.name.split(".")[0]

			// Makes reference to the storage bucket location
			const storageRef = storage.ref(`uploads/${currentUser.username}/${filename}-${uniqueId}.${extension}`)
			setUploading(true)

			// Starts the upload
			const uploadTask = storageRef.put(file)

			uploadTask.on(STATE_CHANGED,
				(snapshot) => {
					// Update the uploading progress
					const pct = Math.round(((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
					setProgress(pct)
				},
				(error) => {
					// Handle the error
					console.log(error)
					reject(error)
				},
				async () => {
					const imgURL = await uploadTask.snapshot.ref.getDownloadURL()
					resolve(imgURL)
				}
			)
		})
	}

	const doImageUpload = async (file) => {
		const imageURL = await uploaderPromise(file)
		setUploading(false)
		return imageURL
	}

	return (
		<Container maxWidth="md" style={{ marginTop: "100px", marginBottom: "300px" }}>
			<Grid container spacing={10}>
				<Grid item>
					<Button onClick={() => setToggle(p => !p)}>{toggle.toString()}</Button>
				</Grid>
				<Grid item>
					<Editor
						defaultValue={`Hello world!
# yes, you can type a text

> yes, please

| how | are | you |
|----|----|----|
|    |    |    |
|    |    |    |

- [ ] please, do not do this!`}
						onChange={(data) => { console.log(data()) }}
						readOnly={toggle}
						uploadImage={doImageUpload}


					/>
					{uploading ? <LinearProgressWithLabel value={progress} /> : null}

				</Grid>

				<Grid item>
					<label className="btn">
						📸 Upload Img
						<input type="file" onChange={(e) => console.log(Array.from(e.target.files)[0])} accept="image/x-png,image/gif,image/jpeg" />
					</label>
				</Grid>
			</Grid>

			<Gallery>
				<Button variant="contained">Show Gallery</Button>
			</Gallery>

		</Container >
	)
}

Test.getLayout = getRootLayout

export default Test