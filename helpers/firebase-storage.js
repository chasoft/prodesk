import { isEqual } from "lodash"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { storage } from "./firebase"

/**
 * get all files with in a folder + its thumbnails list
 * @returns a list of object { filename, thumb, original }
 */
export const useGetAllFiles = () => {
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const isAuthenticated = useSelector(s => s.authState.isAuthenticated)

	const [fileList, setFileList] = useState([])

	useEffect(() => {
		let didCancel = false
		async function fetchData() {
			try {
				if (isAuthenticated === false) {
					throw new Error("useGetAllFiles: Unauthorized activities!")
				}

				const nodeRef = storage.ref().child(`uploads/${currentUser.username}/`)
				const nodeRef_thumbs = storage.ref().child(`uploads/${currentUser.username}/thumbs/`)

				const [query, query_thumbs] = await Promise.all([nodeRef.listAll(), nodeRef_thumbs.listAll()])

				const _filename = query.items.map((item) => item.name)

				const _fileList = await Promise.all(query.items.map(async (itemRef) => {
					const url = await itemRef.getDownloadURL()
					return url
				}))

				const _fileListThumbs = await Promise.all(query_thumbs.items.map(async (itemRef) => {
					const url = await itemRef.getDownloadURL()
					return url
				}))

				const combined = _filename.map((item, idx) => {
					return { filename: item, thumb: _fileListThumbs[idx] ?? _fileList[idx], original: _fileList[idx] }
				})

				if (!didCancel) setFileList(combined)
			}
			catch (e) {
				throw new Error(e.message)
			}
		}
		fetchData()

		return () => { didCancel = true }
	}, [currentUser.username, isAuthenticated])

	return { fileList }
}