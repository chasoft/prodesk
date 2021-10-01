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
import React, { useState, useCallback } from "react"

// MATERIAL-UI
import { Box, LinearProgress, Typography } from "@mui/material"

//THIRD-PARTY
import { nanoid } from "nanoid"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"
import Editor from "rich-markdown-editor"

//PROJECT IMPORT
import { setEditorData } from "./../../redux/slices/textEditor"
import { getAuth, getTextEditor } from "./../../redux/selectors"
import { STATE_CHANGED, storage } from "./../../helpers"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const STORAGE_DESTINATION = {
	USER: "User", //ticket
	BLOG: "Blog",
	PAGES: "Pages",
	DOCUMENTATION: "Documentation",
	SETTINGS: "Settings"
}

const LinearProgressWithLabel = (props) => (
	<Box display="flex" alignItems="center">
		<Box width="100%" mr={1}>
			<LinearProgress variant="determinate" {...props} />
		</Box>
		<Box minWidth={35}>
			<Typography variant="body2" color="textSecondary">
				{`${Math.round(props.value)}%`}
			</Typography>
		</Box>
	</Box>
); LinearProgressWithLabel.propTypes = { value: PropTypes.number.isRequired }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//TODO: Embeded URLs... yeah, great!!!!
/*
	=> Youtube and some video sharing platform.. yeah,
	=> Music => turn to HTML5 player for .mp3, .wav...v.v.
 */

const TextEditor = React.forwardRef((props, ref) => {
	const { defaultValue = "", readOnly = false, storageDestination = "uploads", ...otherProps } = props

	const { currentUser } = useSelector(getAuth)
	const { scrollTo } = useSelector(getTextEditor)
	const [uploading, setUploading] = useState(false)
	const [progress, setProgress] = useState(0)

	const dispatch = useDispatch()

	// const editorInstance = useRef()
	const { enqueueSnackbar } = useSnackbar()

	const uploaderPromise = useCallback(
		(file) => {
			return new Promise((resolve, reject) => {
				// Prepare the filename
				const uniqueId = nanoid(5)
				const extension = file.type.split("/")[1]
				const filename = file.name.split(".")[0]

				// Makes reference to the storage bucket location
				const storageRef = storage.ref(`${storageDestination}/${currentUser.username}/${filename}-${uniqueId}.${extension}`)
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
		}, []
	)

	const doImageUpload = useCallback(
		async (file) => {
			const imageURL = await uploaderPromise(file)
			setUploading(false)
			return imageURL
		}, []
	)

	return (
		<>
			<Editor
				ref={ref}
				scrollTo={scrollTo}
				readOnly={readOnly}
				defaultValue={defaultValue}
				onChange={(funcGetData) => {
					dispatch(setEditorData(funcGetData()))
				}}
				uploadImage={doImageUpload}
				onShowToast={(message, type) => { enqueueSnackbar(message, { variant: type }) }}
				{...otherProps}
			/>
			{uploading && <LinearProgressWithLabel value={progress} />}
		</>
	)
})

TextEditor.displayName = "TextEditor"

TextEditor.propTypes = {
	defaultValue: PropTypes.any,
	readOnly: PropTypes.bool,
	pullEditorData: PropTypes.func,
	//specify storage destination for image uploading
	storageDestination: PropTypes.oneOf([
		STORAGE_DESTINATION.USER,
		STORAGE_DESTINATION.BLOG,
		STORAGE_DESTINATION.PAGES,
		STORAGE_DESTINATION.DOCUMENTATION,
		STORAGE_DESTINATION.SETTINGS
	]),
	others: PropTypes.object,
}

export default TextEditor