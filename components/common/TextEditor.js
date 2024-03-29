/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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
import { ref as getStorageRef, getDownloadURL, uploadBytesResumable } from "firebase/storage"

// MATERIAL-UI

//THIRD-PARTY
import nanoid from "@helpers/nanoid"
import { isEqual, isFunction } from "lodash"
import { useSnackbar } from "notistack"
import Editor from "rich-markdown-editor"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { setEditorData } from "@redux/slices/textEditor"
import { STATE_CHANGED, storage } from "@helpers/firebase"
import { EditorLightTheme } from "@components/Themes/Editor/defaultEditorTheme"
import { STORAGE_DESTINATION } from "@helpers/storageApi"
import { LinearProgressWithLabel } from "@components/common"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//TODO: Implement embeded URLs for Editor
/*
	=> Youtube and some video sharing platform.. yeah,
	=> Music => turn to HTML5 player for .mp3, .wav...v.v.
 */

const TextEditor = React.memo(React.forwardRef((props, ref) => {
	const { defaultValue = "", readOnly = false, storageDestination = "uploads", onChange, ...otherProps } = props

	// const { scrollTo } = useSelector(getTextEditor)
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const [progress, setProgress] = useState(0)
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	// const editorInstance = useRef()
	const { enqueueSnackbar } = useSnackbar()

	console.log("TextEditor - rerender")

	const uploaderPromise = useCallback(
		(file) => {
			return new Promise((resolve, reject) => {
				// Prepare the filename
				const uniqueId = nanoid()
				const extension = file.type.split("/")[1]
				const filename = file.name.split(".")[0]

				// Makes reference to the storage bucket location
				const storageRef = getStorageRef(storage, `${storageDestination}/${currentUser.username}/${filename}-${uniqueId}.${extension}`)
				setUploading(true)

				// Starts the upload
				const uploadTask = uploadBytesResumable(storageRef, file)

				//!! Can support pause / resume / cancel upload - ref: https://firebase.google.com/docs/storage/web/upload-files
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
						const imgURL = await getDownloadURL(uploadTask.snapshot.ref)
						resolve(imgURL)
					}
				)
			})
		}, [currentUser.username, storageDestination]
	)

	const doImageUpload = useCallback(async (file) => {
		const imageURL = await uploaderPromise(file)
		setUploading(false)
		return imageURL
	}, [uploaderPromise])

	const handleOnChange = useCallback((aFunctionToGetEditorData) => {
		if (isFunction(onChange)) {
			onChange(aFunctionToGetEditorData())
		} else {
			dispatch(setEditorData(aFunctionToGetEditorData()))
		}
	}, [dispatch, onChange])

	return (
		<>
			<Editor
				ref={ref}
				// scrollTo={scrollTo}
				readOnly={readOnly}
				defaultValue={defaultValue}
				onChange={handleOnChange}
				uploadImage={doImageUpload}
				onShowToast={(message, type) => { enqueueSnackbar(message, { variant: type }) }}
				theme={EditorLightTheme}
				{...otherProps}
			/>
			{uploading && <LinearProgressWithLabel value={progress} />}
		</>
	)
}), (prevProps, nextProps) => isEqual(prevProps, nextProps))

TextEditor.displayName = "TextEditor"

TextEditor.whyDidYouRender = true

TextEditor.propTypes = {
	defaultValue: PropTypes.any,
	readOnly: PropTypes.bool,
	//specify storage destination for image uploading
	storageDestination: PropTypes.oneOf([
		STORAGE_DESTINATION.USER,
		STORAGE_DESTINATION.BLOG,
		STORAGE_DESTINATION.PAGES,
		STORAGE_DESTINATION.DOCS,
		STORAGE_DESTINATION.SETTINGS
	]),
	onChange: PropTypes.func,
	others: PropTypes.object,
}

export default TextEditor