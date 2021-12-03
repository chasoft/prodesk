/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import PropTypes from "prop-types"
import Link from "next/link"

// MATERIAL-UI
import { Box, Button, Container, Grid, LinearProgress, Popover, Typography } from "@mui/material"

//THIRD-PARTY
import Editor from "rich-markdown-editor"
import { useSnackbar } from "notistack"

//PROJECT IMPORT
import { getRootLayout } from "@layout/RootLayout"
import { imageUploader, STATE_CHANGED, storage } from "@helpers/firebase"
import { useSelector } from "react-redux"
import { getAuth } from "@redux/selectors"
import nanoid from "@helpers/nanoid"
import Gallery from "@components/Gallery"
import AuthCheck from "@components/AuthCheck"

//ASSETS
import DescriptionIcon from "@mui/icons-material/Description"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"

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

const GoogleDocEmbed = ({ attrs }) => {
	console.log(attrs)
	return <div style={{ border: "5px solid blue" }}>
		<a href={attrs.href}>You embeded a GOOGLE DOCs Link</a>
	</div>
}
GoogleDocEmbed.propTypes = { attrs: PropTypes.any }

const FaceBookEmbed = ({ attrs }) => {
	console.log(attrs)
	return <div style={{ border: "3px solid red" }}>
		<a href={attrs.href} rel="noreferrer" target="_blank">You embeded a FACEBOOK link</a>
	</div>
}
FaceBookEmbed.propTypes = { attrs: PropTypes.any }

const Test = () => {
	const [toggle, setToggle] = useState(false)
	const { currentUser } = useSelector(getAuth)
	const [uploading, setUploading] = useState(false)
	const [progress, setProgress] = useState(0)

	const editorInstance = useRef()
	const { enqueueSnackbar } = useSnackbar()


	function uploaderPromise(file) {
		return new Promise((resolve, reject) => {
			// Prepare the filename
			const uniqueId = nanoid()
			const extension = file.type.split("/")[1]
			const filename = file.name.split(".")[0]

			//fixbug
			if (currentUser.username === undefined) {
				reject("You must loggin to use this feature!")
			}

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

	useEffect(() => {
		// not working because at this time, editorInstance not yet initialized done!
		// editorInstance.current?.focusAtStart()
		//console.log(headings) 
	}, [])

	return (
		<AuthCheck>
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

- please, do not do this!`}
							onChange={(data) => { console.log(data()) }}
							readOnly={toggle}
							ref={editorInstance}
							uploadImage={doImageUpload}

							// extensions={[new Emoji()]}
							// onHoverLink={(event) => {
							// 	// console.log(`Hovered link ${event.target.href}`)
							// 	setLinkHoverURL(event.target.href)
							// 	handlePopoverOpen(event.currentTarget)
							// 	setLinkHover(true)
							// }}
							embeds={[
								{
									title: "Google Doc",
									keywords: "google docs gdocs",
									icon: DescriptionIcon,
									defaultHidden: false,
									matcher: href => {
										return /^(http|https):\/\/docs.google.com/.test(href)
									},
									component: GoogleDocEmbed
								},
								{
									title: "Facebook",
									keywords: "fb facebook",
									icon: InsertPhotoIcon,
									defaultHidden: false,
									matcher: href => {
										return /^(http|https):\/\/(|www.)facebook.com/.test(href)
									},
									component: FaceBookEmbed
								},
							]}
							onSearchLink={async searchTerm => {
								// const results = await MyAPI.search(searchTerm)
								// USE THIS FEATURE TO SEARCH FOR INTERNAL LINK
								// MAKING INTERNAL LINKING BECOMES SOO EASY
								const results = [
									{
										name: "name 1",
										createdAt: "2021-09-10",
										url: "http://www.facebook.com"
									},
									{
										name: "name 2",
										createdAt: "2021-08-10",
										url: "http://www.facebook.com/1"
									},
									{
										name: "name 3",
										createdAt: "2021-07-10",
										url: "http://www.facebook.com/2"
									},
								]

								return results.map(result => ({
									title: result.name,
									subtitle: `Created ${result.createdAt}`,
									url: result.url
								}))
							}}

							onShowToast={(message, type) => {

								enqueueSnackbar(message, { variant: type })

							}}




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
		</AuthCheck>
	)
}

Test.getLayout = getRootLayout

export default Test