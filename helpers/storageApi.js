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

import { useCallback, useState } from "react"
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage"

//MATERIAL-UI

//THIRD-PARTY

//PROJECT IMPORT
import { CODE } from "@helpers/constants"
import { STATE_CHANGED, storage } from "@helpers/firebase"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const STORAGE_DESTINATION = {
	BLOG: "Blog",
	DOCS: "Documentation",
	PAGES: "Pages",
	SETTINGS: "Settings",
	THEME: "Theme",
	USER: "User", //ticket
}

export async function getFileURL(fullDestinationFilePath) {
	try {
		const url = await getDownloadURL(ref(storage, fullDestinationFilePath))
		return url
	} catch (e) {
		console.log(e.code)
	}
}

export async function deleteFile(fileLocation) {
	const fileRef = ref(storage, fileLocation)
	deleteObject(fileRef)
		.then(() => {
			return {
				data: {
					code: CODE.SUCCESS,
					message: "Photo removed successfully"
				}
			}
		})
		.catch((e) => {
			console.log("Error when trying to delete file", { e })
			return {
				data: {
					code: CODE.FAILED,
					errorCode: e.code,
					message: "Failed to remove photo from server"
				}
			}
		})
}

export function useUploadFile() {
	const [progress, setProgress] = useState(0)
	const [uploading, setUploading] = useState(false)

	const uploadFile = useCallback(
		(file, fullDestinationFilePath) => {
			return new Promise((resolve, reject) => {
				//`${storageDestination}/${currentUser.username}/${filename}-${uniqueId}.${extension}`
				const storageRef = ref(storage, fullDestinationFilePath)
				setUploading(true)

				// Starts the upload
				const uploadTask = uploadBytesResumable(storageRef, file)

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
						setUploading(false)
						resolve(imgURL)
					}
				)
			})
		}, []
	)

	return [uploadFile, { uploading, progress }]
}

// export async function uploadDocSearchIndex(docIndexes) {
// 	try {
// 		const uploadData = JSON.stringify(docIndexes.toJSON())
// 		const docSearchIndexRef = ref(storage, `${STORAGE_DESTINATION.DOCS}/doc-index.json`)
// 		await uploadString(docSearchIndexRef, uploadData)
// 		console.log("uploaded doc-index.json")
// 	} catch (e) {
// 		console.log(e.code)
// 	}
// }

/**
 * Upload a single file
 * @param {event} e - event
 * @param {func} uploadFile - get from useUploadFile()
 * @param {*} fileLocation - file location at firebase storage
 * @returns 
 */
export async function uploadSingleFile(e, uploadFile, fileLocation) {
	const file = e.target.files[0]

	if (!file) {
		return {
			error: {
				message: "No file selected"
			}
		}
	}

	if (file.size > 1024000) {
		return {
			error: {
				message: "File size cannot exceed more than 1MB"
			}
		}
	}

	// const extension = file.type.split("/")[1]
	/*
		Currently, i don't want to deal with searching files
		then, I use fixed fileRef which distinguish by docId
	*/
	const fileURL = await uploadFile(
		file,
		fileLocation
	)

	return fileURL
}