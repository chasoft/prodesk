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

import React, { useEffect, useRef } from "react"
// import PropTypes from "prop-types"

// MATERIAL-UI
import { Box } from "@mui/material"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//THIRD-PARTY
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { findKey } from "lodash"
import PerfectScrollbar from "react-perfect-scrollbar"

//PROJECT IMPORT
// import TocSideBarActionsGroup from "./TocSideBarActionsGroup"
import TocSideBarDetails from "./TocSideBarDetails"
import TocSideBarDoc from "./TocSideBarDoc"
import TocSideBarExternal from "./TocSideBarExternal"
import TocSideBarCategory from "./TocSideBarCategory"
import TocSideBarSubCategory from "./TocSideBarSubCategory"

import { TYPE } from "@redux/slices/firestoreApiConstants"
import { useGetDocsGrouped } from "@helpers/useGetDocs"
import { requestSilentRefetching } from "@helpers/realtimeApi"
import { CircularProgressBox } from "@components/common"

import {
	getAuth,
	getDocsCenter,
} from "@redux/selectors"

import {
	setShowTocSideBarDetails,
	setSideBarLeft
} from "@redux/slices/uiSettings"

import {
	CODE,
	DOC_TYPE,
	RESERVED_KEYWORDS
} from "@helpers/constants"

import {
	setActiveDocId,
	setActiveDocIdOfTocSideBarDetails
} from "@redux/slices/docsCenter"
import { docItemNewCategory, docItemNewSubCategory } from "@helpers/firebase/docs"
import TocSideBarActionsGroup from "@components/Documentation/TocSideBar/TocSideBarActionsGroup"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const HiddenBgFixBug = () => {
	return (<Box id="HiddenBgFixBug" sx={{
		position: "fixed",
		zIndex: 1,
		display: "flex",
		alignItems: "stretch",
		left: 0,
		minWidth: "700px",
		height: "100%",
		backgroundColor: "#F0F0F0",
		opacity: 1,
		visibility: "visible",
		transition: "0.5s opacity, 0 0.5s visibility"
	}} />)
}

/**
 * To check whether the drag-n-drop is valid or not, better UX
 * @param {*} sourceItem 
 * @param {*} targetItem 
 */
export const isValidDnD = (sourceItem, targetItem) => {
	/**************************************************************
	 * 1. TARGET IS A TYPE OF CATEGORY
	 **************************************************************/

	/* 1A: DOC_TYPE.CATEGORY >>> DOC_TYPE.CATEGORY  */
	if (sourceItem.type === DOC_TYPE.CATEGORY && targetItem.type === DOC_TYPE.CATEGORY) {
		// if (sourceItem.position < targetItem.position) return false
		return true
	}

	/* 1B: DOC_TYPE.SUBCATEGORY >>> DOC_TYPE.CATEGORY  */
	if (sourceItem.type === DOC_TYPE.SUBCATEGORY && targetItem.type === DOC_TYPE.CATEGORY) {
		return false
	}

	/* 1C: DOC_TYPE.DOC || DOC_TYPE.EXTERNAL >>> DOC_TYPE.CATEGORY  */
	if ((sourceItem.type === DOC_TYPE.DOC || sourceItem.type === DOC_TYPE.EXTERNAL) && targetItem.type === DOC_TYPE.CATEGORY) {
		if (sourceItem.category === targetItem.category && sourceItem.subcategory === RESERVED_KEYWORDS.CAT_CHILDREN)
			return false
		return true
	}

	/**************************************************************
	 * 2. TARGET IS A TYPE OF SUBCATEGORY
	 **************************************************************/

	/* 2A: DOC_TYPE.CATEGORY >>> DOC_TYPE.SUBCATEGORY  */
	if (sourceItem.type === DOC_TYPE.CATEGORY && targetItem.type === DOC_TYPE.SUBCATEGORY)
		return false
	/* 2B: DOC_TYPE.SUBCATEGORY >>> DOC_TYPE.SUBCATEGORY  */
	if (sourceItem.type === DOC_TYPE.SUBCATEGORY && targetItem.type === DOC_TYPE.SUBCATEGORY) {
		if (sourceItem.category !== targetItem.category) return false
		// if (sourceItem.position < targetItem.position) return false
		return true
	}

	/* 2C: DOC_TYPE.DOC || DOC_TYPE.EXTERNAL >>> DOC_TYPE.SUBCATEGORY  */
	if ((sourceItem.type === DOC_TYPE.DOC || sourceItem.type === DOC_TYPE.EXTERNAL) && targetItem.type === DOC_TYPE.SUBCATEGORY) {
		if (sourceItem.category === targetItem.category && sourceItem.subcategory === targetItem.subcategory) return false
		return true
	}

	/**************************************************************
	 * 3. TARGET IS A TYPE OF DOC || EXTERNAL
	 **************************************************************/
	/* 3A: DOC_TYPE.CATEGORY >>> DOC_TYPE.DOC || DOC_TYPE.EXTERNAL  */
	/* 3B: DOC_TYPE.SUBCATEGORY >>> DOC_TYPE.DOC || DOC_TYPE.EXTERNAL  */
	if (
		(sourceItem.type === DOC_TYPE.CATEGORY || sourceItem.type === DOC_TYPE.SUBCATEGORY)
		&& (targetItem.type === DOC_TYPE.DOC || targetItem.type === DOC_TYPE.EXTERNAL)
	)
		return false

	/* 3C: DOC_TYPE.DOC || DOC_TYPE.EXTERNAL >>> DOC_TYPE.DOC || DOC_TYPE.EXTERNAL  */
	if ((sourceItem.type === DOC_TYPE.DOC || sourceItem.type === DOC_TYPE.EXTERNAL)
		&& (targetItem.type === DOC_TYPE.DOC || targetItem.type === DOC_TYPE.EXTERNAL)) {

		// if (sourceItem.category === targetItem.category && sourceItem.subcategory === targetItem.subcategory)
		// if (sourceItem.position < targetItem.position) return false

		return true
	}
}

/**
 * Move documents (used by drag-n-drop feature)
 * @param {object} sourceItem 
 * @param {object} targetItem 
 */
export const moveDocItem = async (sourceItem, targetItem, updateDoc, username) => {
	/**************************************************************
	 * 1. TARGET IS A TYPE OF CATEGORY
	 **************************************************************/

	/* 1A: DOC_TYPE.CATEGORY >>> DOC_TYPE.CATEGORY  */
	// => sourceItem.position = targetItem.position - 1
	//    note: only 1 affected item
	if (sourceItem.type === DOC_TYPE.CATEGORY && targetItem.type === DOC_TYPE.CATEGORY) {

		const newSourceData = {
			docId: sourceItem.docId,
			position: (sourceItem.position < targetItem.position)
				? targetItem.position + 1
				: targetItem.position - 1,
		}

		const res = await updateDoc({
			docItem: newSourceData,
			affectedItems: []
		})

		if (res?.data.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: username,
				tag: [{ type: TYPE.DOCS, id: sourceItem.docId }],
				target: {
					isForUser: false,
					isForAdmin: true,
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	/* 1B: DOC_TYPE.SUBCATEGORY >>> DOC_TYPE.CATEGORY  */
	// if (sourceItem.type === DOC_TYPE.SUBCATEGORY && targetItem.type === DOC_TYPE.CATEGORY) {
	// 	// 1B.1: if source.category === target.category => NOTHING TO CHANGE
	// 	// 1B.2: if source.category !== target.category
	// 	// => source.category = target.category
	// 	// 	  note: 1 or many affected items
	// 	if (sourceItem.category !== targetItem.category) {

	// 		const affectedItems = filter(
	// 			allDocs,
	// 			(doc) => {
	// 				return doc.category === sourceItem.category
	// 					&& doc.subcategory === sourceItem.subcategory
	// 					&& doc.docId !== sourceItem.docId
	// 			}
	// 		)

	// 		const newSourceData = {
	// 			docId: sourceItem.docId,
	// 			category: targetItem.category,
	// 		}

	// 		const res = await updateDoc({
	// 			docItem: newSourceData,
	// 			affectedItems: affectedItems,
	// 			affectedItemsData: {
	// 				category: targetItem.category
	// 			}
	// 		})

	// 		if (res?.data.code === CODE.SUCCESS) {
	// 			const invalidatesTags = {
	// 				trigger: username,
	// 				tag: [
	// 					{ type: TYPE.DOCS, id: sourceItem.docId },
	// 					...(affectedItems.map(item => ({ type: TYPE.DOCS, id: item.docId })))
	// 				],
	// 				target: {
	// 					isForUser: false,
	// 					isForAdmin: true,
	// 				}
	// 			}
	// 			await requestSilentRefetching(invalidatesTags)
	// 		}

	// 		console.log({ sourceItem, targetItem, newSourceData, affectedItems, allDocs })
	// 	}

	// }

	/* 1C: DOC_TYPE.DOC || DOC_TYPE.EXTERNAL >>> DOC_TYPE.CATEGORY  */
	if ((sourceItem.type === DOC_TYPE.DOC || sourceItem.type === DOC_TYPE.EXTERNAL) && targetItem.type === DOC_TYPE.CATEGORY) {
		// 1C.1: if source.category === target.category && source.subcategory === RESERVED_KEYWORDS.CAT_CHILDREN
		// => NOTHING TO CHANGE
		// 1C.2: if source.category === target.category && source.subcategory !== RESERVED_KEYWORDS.CAT_CHILDREN
		// => source.subcategory = RESERVED_KEYWORDS.CAT_CHILDREN
		//    note: only 1 affected item
		if (sourceItem.category === targetItem.category && sourceItem.subcategory !== RESERVED_KEYWORDS.CAT_CHILDREN) {
			const newSourceData = {
				docId: sourceItem.docId,
				subcategory: RESERVED_KEYWORDS.CAT_CHILDREN,
				position: targetItem.position - 1
			}

			const res = await updateDoc({
				docItem: newSourceData,
				affectedItems: []
			})

			if (res?.data.code === CODE.SUCCESS) {
				const invalidatesTags = {
					trigger: username,
					tag: [{ type: TYPE.DOCS, id: sourceItem.docId }],
					target: {
						isForUser: false,
						isForAdmin: true,
					}
				}
				await requestSilentRefetching(invalidatesTags)
			}
		}

		// 1C.3: if source.category !== target.category
		// => source.category = target.category
		// => source.subcategory = RESERVED_KEYWORDS.CAT_CHILDREN
		//    note: only 1 affected item
		if (sourceItem.category !== targetItem.category) {
			const newSourceData = {
				docId: sourceItem.docId,
				category: targetItem.category,
				subcategory: RESERVED_KEYWORDS.CAT_CHILDREN,
				position: targetItem.position - 1
			}

			const res = await updateDoc({
				docItem: newSourceData,
				affectedItems: []
			})

			if (res?.data.code === CODE.SUCCESS) {
				const invalidatesTags = {
					trigger: username,
					tag: [{ type: TYPE.DOCS, id: sourceItem.docId }],
					target: {
						isForUser: false,
						isForAdmin: true,
					}
				}
				await requestSilentRefetching(invalidatesTags)
			}
		}
	}

	/**************************************************************
	 * 2. TARGET IS A TYPE OF SUBCATEGORY
	 **************************************************************/

	/* 2A: DOC_TYPE.CATEGORY >>> DOC_TYPE.SUBCATEGORY  */
	// => NOTHING TO CHANGE
	/* 2B: DOC_TYPE.SUBCATEGORY >>> DOC_TYPE.SUBCATEGORY  */
	if (sourceItem.type === DOC_TYPE.SUBCATEGORY && targetItem.type === DOC_TYPE.SUBCATEGORY) {
		// 2B.1 if source.category === target.category
		if (sourceItem.category === targetItem.category) {

			const newSourceData = {
				docId: sourceItem.docId,
				position: (sourceItem.position < targetItem.position)
					? targetItem.position + 1
					: targetItem.position - 1,
			}

			const res = await updateDoc({
				docItem: newSourceData,
				affectedItems: []
			})

			if (res?.data.code === CODE.SUCCESS) {
				const invalidatesTags = {
					trigger: username,
					tag: [{ type: TYPE.DOCS, id: sourceItem.docId }],
					target: {
						isForUser: false,
						isForAdmin: true,
					}
				}
				await requestSilentRefetching(invalidatesTags)
			}
		}
		// 	// => NOTHING TO CHANGE
		// 	// 2B.2 if source.category !== target.category
		// 	// => source.category = target.category
		// 	// => source.position = target.position - 1
		// 	//    note: 1 or many affected items
		// 	if (sourceItem.category !== targetItem.category) {

		// 		const affectedItems = filter(
		// 			allDocs,
		// 			(doc) => {
		// 				return doc.category === sourceItem.category
		// 					&& doc.subcategory === sourceItem.subcategory
		// 					&& doc.docId !== sourceItem.docId
		// 			}
		// 		)

		// 		const newSourceData = {
		// 			docId: sourceItem.docId,
		// 			category: targetItem.category,
		// 			position: targetItem.position - 1,
		// 		}

		// 		const res = await updateDoc({
		// 			docItem: newSourceData,
		// 			affectedItems: affectedItems,
		// 			affectedItemsData: {
		// 				category: targetItem.category
		// 			}
		// 		})

		// 		if (res?.data.code === CODE.SUCCESS) {
		// 			const invalidatesTags = {
		// 				trigger: username,
		// 				tag: [
		// 					{ type: TYPE.DOCS, id: sourceItem.docId },
		// 					...(affectedItems.map(item => ({ type: TYPE.DOCS, id: item.docId })))
		// 				],
		// 				target: {
		// 					isForUser: false,
		// 					isForAdmin: true,
		// 				}
		// 			}
		// 			await requestSilentRefetching(invalidatesTags)
		// 		}
		// 	}
	}

	/* 2C: DOC_TYPE.DOC || DOC_TYPE.EXTERNAL >>> DOC_TYPE.SUBCATEGORY  */
	if ((sourceItem.type === DOC_TYPE.DOC || sourceItem.type === DOC_TYPE.EXTERNAL) && targetItem.type === DOC_TYPE.SUBCATEGORY) {
		// 2C.1: if source.category === target.category && source.subcategory === target.subcategory
		// => NOTHING TO CHANGE
		// 2C.2: if source.category === target.category && source.subcategory !== target.subcategory
		// => source.subcategory = target.subcategory
		//    note: only 1 affected item
		if (sourceItem.category === targetItem.category && sourceItem.subcategory !== targetItem.subcategory) {
			const newSourceData = {
				docId: sourceItem.docId,
				subcategory: targetItem.subcategory,
			}

			const res = await updateDoc({
				docItem: newSourceData,
				affectedItems: []
			})

			if (res?.data.code === CODE.SUCCESS) {
				const invalidatesTags = {
					trigger: username,
					tag: [{ type: TYPE.DOCS, id: sourceItem.docId }],
					target: {
						isForUser: false,
						isForAdmin: true,
					}
				}
				await requestSilentRefetching(invalidatesTags)
			}
		}

		// 2C.3: if source.category !== target.category
		// => source.category = target.category
		// => source.subcategory = target.subcategory
		//    note: only 1 affected item
		if (sourceItem.category !== targetItem.category) {
			const newSourceData = {
				docId: sourceItem.docId,
				category: targetItem.category,
				subcategory: targetItem.subcategory,
			}

			const res = await updateDoc({
				docItem: newSourceData,
				affectedItems: []
			})

			if (res?.data.code === CODE.SUCCESS) {
				const invalidatesTags = {
					trigger: username,
					tag: [{ type: TYPE.DOCS, id: sourceItem.docId }],
					target: {
						isForUser: false,
						isForAdmin: true,
					}
				}
				await requestSilentRefetching(invalidatesTags)
			}
		}
	}

	/**************************************************************
	 * 3. TARGET IS A TYPE OF DOC || EXTERNAL
	 **************************************************************/

	/* 3A: DOC_TYPE.CATEGORY >>> DOC_TYPE.DOC || DOC_TYPE.EXTERNAL  */
	// => NOTHING TO CHANGE
	/* 3B: DOC_TYPE.SUBCATEGORY >>> DOC_TYPE.DOC || DOC_TYPE.EXTERNAL  */
	// => NOTHING TO CHANGE
	/* 3C: DOC_TYPE.DOC || DOC_TYPE.EXTERNAL >>> DOC_TYPE.DOC || DOC_TYPE.EXTERNAL  */
	// => source.category = target.category
	// => source.subcategory = target.subcategory
	// => source.position = target.position - 1
	//    note: only 1 affected item
	if ((sourceItem.type === DOC_TYPE.DOC || sourceItem.type === DOC_TYPE.EXTERNAL)
		&& (targetItem.type === DOC_TYPE.DOC || targetItem.type === DOC_TYPE.EXTERNAL)) {

		const newSourceData = {
			docId: sourceItem.docId,
			category: targetItem.category,
			subcategory: targetItem.subcategory,
			position: (sourceItem.position < targetItem.position)
				? targetItem.position + 1
				: targetItem.position - 1
		}

		const res = await updateDoc({
			docItem: newSourceData,
			affectedItems: []
		})

		if (res?.data.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: username,
				tag: [{ type: TYPE.DOCS, id: sourceItem.docId }],
				target: {
					isForUser: false,
					isForAdmin: true,
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBar = () => {
	const dispatch = useDispatch()
	const sideBarRef = useRef(null)
	const { currentUser } = useSelector(getAuth)

	const {
		data: docs = [],	//grouped docs
		isLoading: isLoadingDocs
	} = useGetDocsGrouped()

	const { activeDocId } = useSelector(getDocsCenter)

	const handleCloseDetails = () => {
		reduxBatch(() => {
			dispatch(setShowTocSideBarDetails(false))
			dispatch(setShowTocSideBarDetails(false))
			dispatch(setActiveDocIdOfTocSideBarDetails(null))
		})
	}

	const handleOpenDetails = (docId) => {
		if (docId === undefined) return
		reduxBatch(() => {
			if (activeDocId !== docId) {
				dispatch(setActiveDocId(null))
			}
			dispatch(setShowTocSideBarDetails(true))
			dispatch(setActiveDocIdOfTocSideBarDetails(docId))
		})
	}

	const loadDocContent = (docId) => {
		reduxBatch(() => {
			dispatch(setActiveDocId(docId))
			dispatch(setShowTocSideBarDetails(false))
			dispatch(setActiveDocIdOfTocSideBarDetails(null))
		})
	}

	useEffect(() => {
		const updateSideBarLeft = () => {
			dispatch(setSideBarLeft(
				(sideBarRef?.current?.parentNode?.offsetLeft ?? 0)
				+ (sideBarRef?.current?.parentNode?.clientWidth ?? 300)
			))
		}

		updateSideBarLeft()
		window.addEventListener("resize", updateSideBarLeft)
		return () => window.removeEventListener("resize", updateSideBarLeft)
	}, [
		dispatch,
		sideBarRef?.current?.parentNode?.clientWidth,
		sideBarRef?.current?.parentNode?.offsetLeft
	])

	return (
		<DndProvider backend={HTML5Backend}>

			<PerfectScrollbar
				id="TocSideBar-PerfectScrollbar"
				component="div"
				options={{ suppressScrollX: true }}
				style={{ height: "calc(100vh - 62px)", zIndex: 10, minWidth: "300px" }}
			>
				<Box
					id="TocSideBar"
					onClick={handleCloseDetails}
					ref={sideBarRef}
					sx={{
						display: { xs: "none", md: "flex" },
						flexDirection: { flexDirection: "column" },
						minWidth: "300px",
						pl: 2,
						borderRight: "1px solid transparent",
						borderColor: "divider",
						backgroundColor: "#F0F0F0",
						marginBottom: "50px"
					}}
				>
					<div style={{ position: "sticky", display: "flex", flexDirection: "column" }}>
						{isLoadingDocs
							? <CircularProgressBox />
							: docs.map((cat) => {
								/* Category Level */
								const catDetail = cat[1]["undefined"][0] ?? docItemNewCategory(currentUser.username, "Missing category")
								return (
									<TocSideBarCategory
										key={catDetail.docId}
										title={cat[0]}
										handleOpen={() => { handleOpenDetails(catDetail.docId) }}
										targetDocItem={catDetail}
									>
										{Object.entries(cat[1]).map((subCat) => {
											/* Contents of Category */

											//Draw items at root level of Category
											if (subCat[0] === RESERVED_KEYWORDS.CAT_CHILDREN) {
												return (
													<div
														id={catDetail.slug + "-root"}
														key={catDetail.slug + "-root"}
														style={{ order: -9999 }}
													>
														{subCat[1].map((item) => {
															if (item.type === DOC_TYPE.DOC)
																return (
																	<TocSideBarDoc
																		key={item.docId}
																		onClick={() => { loadDocContent(item.docId) }}
																		active={item.docId === activeDocId}
																		handleOpen={() => handleOpenDetails(item.docId)}
																		targetDocItem={item}
																	>
																		{item.title}
																	</TocSideBarDoc>
																)

															if (item.type === DOC_TYPE.EXTERNAL)
																return (
																	<TocSideBarExternal
																		key={item.docId}
																		url={item.url}
																		handleOpen={() => handleOpenDetails(item.docId)}
																		targetDocItem={item}
																	>
																		{item.title}
																	</TocSideBarExternal>
																)
														})}
													</div>
												)
											}

											//bypass undefined item which represent/hold category's info
											if (subCat[0] === RESERVED_KEYWORDS.CAT) return null

											//position of Sub-Category in the list
											const subCatIndex = findKey(subCat[1], { type: DOC_TYPE.SUBCATEGORY })

											const subcatDetail = subCat[1][subCatIndex] ?? docItemNewSubCategory(currentUser.username, "Missing subcategory")

											//Draw SubCategory
											return (
												<TocSideBarSubCategory
													key={subcatDetail.docId}
													title={subcatDetail.subcategory}
													handleOpen={() => {
														handleOpenDetails(subcatDetail.docId)
													}}
													targetDocItem={subcatDetail}
												>
													{subCat[1].map((item, idx) => {

														//bypass position of the sub-category
														if (idx == subCatIndex) return null

														//Draw items within SubCategory
														if (item.type === DOC_TYPE.DOC)
															return (
																<TocSideBarDoc
																	key={item.docId}
																	onClick={() => { loadDocContent(item.docId) }}
																	active={item.docId === activeDocId}
																	handleOpen={() => handleOpenDetails(item.docId)}
																	targetDocItem={item}
																>
																	{item.title}
																</TocSideBarDoc>
															)

														if (item.type === DOC_TYPE.EXTERNAL)
															return (
																<TocSideBarExternal
																	key={item.docId}
																	url={item.url}
																	handleOpen={() => handleOpenDetails(item.docId)}
																	targetDocItem={item}
																>
																	{item.title}
																</TocSideBarExternal>
															)
													})}

												</TocSideBarSubCategory>
											)
										})}
									</TocSideBarCategory>
								)
							})}
					</div>

					<TocSideBarActionsGroup />
				</Box>
			</PerfectScrollbar>

			<HiddenBgFixBug />

			<TocSideBarDetails handleClose={handleCloseDetails} />

		</DndProvider>
	)
}

export default TocSideBar