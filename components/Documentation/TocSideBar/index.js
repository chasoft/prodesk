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
import { findKey } from "lodash"

//PROJECT IMPORT
import TocSideBarActionsGroup from "./TocSideBarActionsGroup"
import TocSideBarDetails from "./TocSideBarDetails"
import TocSideBarDoc from "./TocSideBarDoc"
import TocSideBarExternal from "./TocSideBarExternal"
import TocSideBarCategory from "./TocSideBarCategory"
import TocSideBarSubCategory from "./TocSideBarSubCategory"

import { TYPE } from "@redux/slices/firestoreApiConstants"
import useGroupedDocs from "@helpers/useGroupedDocs"
import { requestSilentRefetching } from "@helpers/realtimeApi"
import { CircularProgressBox } from "@components/common"

import {
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

		if (sourceItem.position > targetItem.position) return

		const newSourceData = {
			docId: sourceItem.docId,
			position: targetItem.position - 100,
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

		console.log({ sourceItem, targetItem, newSourceData })
	}

	/* 1B: DOC_TYPE.SUBCATEGORY >>> DOC_TYPE.CATEGORY  */
	// if (sourceItem.type === DOC_TYPE.SUBCATEGORY && targetItem.type === DOC_TYPE.CATEGORY) {
	// 	// 1B.1: if source.category === target.category => NOTHING TO CHANGE
	// 	// 1B.2: if source.category !== target.category
	// 	// => source.category = target.category
	// 	// 	  note: 1 or many affected items
	// 	if (sourceItem.category !== targetItem.category) {

	// 		const affectedItems = filter(
	// 			unGroupedDocs,
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

	// 		const res = await updateDocDnd({
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

	// 		console.log({ sourceItem, targetItem, newSourceData, affectedItems, unGroupedDocs })
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
				position: targetItem.position - 5000
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

			console.log({ sourceItem, targetItem, newSourceData })
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
				position: targetItem.position - 5000
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

			console.log({ sourceItem, targetItem, newSourceData })
		}
	}

	/**************************************************************
	 * 2. TARGET IS A TYPE OF SUBCATEGORY
	 **************************************************************/

	/* 2A: DOC_TYPE.CATEGORY >>> DOC_TYPE.SUBCATEGORY  */
	// => NOTHING TO CHANGE
	/* 2B: DOC_TYPE.SUBCATEGORY >>> DOC_TYPE.SUBCATEGORY  */
	// if (sourceItem.type === DOC_TYPE.SUBCATEGORY && targetItem.type === DOC_TYPE.SUBCATEGORY) {
	// 	// 2B.1 if source.category === target.category
	// 	// => NOTHING TO CHANGE
	// 	// 2B.2 if source.category !== target.category
	// 	// => source.category = target.category
	// 	// => source.position = target.position - 1
	// 	//    note: 1 or many affected items
	// 	if (sourceItem.category !== targetItem.category) {

	// 		const affectedItems = filter(
	// 			unGroupedDocs,
	// 			(doc) => {
	// 				return doc.category === sourceItem.category
	// 					&& doc.subcategory === sourceItem.subcategory
	// 					&& doc.docId !== sourceItem.docId
	// 			}
	// 		)

	// 		const newSourceData = {
	// 			docId: sourceItem.docId,
	// 			category: targetItem.category,
	// 			position: targetItem.position - 100,
	// 		}

	// 		const res = await updateDocDnd({
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

	// 		console.log({ sourceItem, targetItem, newSourceData, affectedItems, unGroupedDocs })
	// }
	// }

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

			console.log({ sourceItem, targetItem, newSourceData })
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

			console.log({ sourceItem, targetItem, newSourceData })
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

		//no need to change the order, when it is already ok
		if (sourceItem.position < targetItem.position) return

		const newSourceData = {
			docId: sourceItem.docId,
			category: targetItem.category,
			subcategory: targetItem.subcategory,
			position: targetItem.position - 100
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

		console.log({ sourceItem, targetItem, newSourceData })
	}
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBar = () => {
	const dispatch = useDispatch()
	const sideBarRef = useRef(null)

	const {
		data: docs = [],	//grouped docs
		isLoading: isLoadingDocs
	} = useGroupedDocs()

	const { activeDocId } = useSelector(getDocsCenter)

	const handleCloseDetails = () => {
		reduxBatch(() => {
			dispatch(setShowTocSideBarDetails(false))
			dispatch(setShowTocSideBarDetails(false))
			dispatch(setActiveDocIdOfTocSideBarDetails(null))
		})
	}

	const handleOpenDetails = (docId) => {
		reduxBatch(() => {
			if (activeDocId !== docId) {
				dispatch(setActiveDocId(null))
			}
			console.log("handleOpenDetails => docId", docId)
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
				(sideBarRef?.current?.offsetLeft ?? 0)
				+ (sideBarRef?.current?.clientWidth ?? 300)
			))
		}

		updateSideBarLeft()
		window.addEventListener("resize", updateSideBarLeft)
		return () => window.removeEventListener("resize", updateSideBarLeft)
	}, [
		dispatch,
		sideBarRef?.current?.clientWidth,
		sideBarRef?.current?.offsetLeft
	])

	return (
		<>
			<Box
				id="TocSideBar"
				ref={sideBarRef}
				onClick={handleCloseDetails}
				sx={{
					display: { xs: "none", md: "flex" },
					flexDirection: { flexDirection: "column" },
					minWidth: "300px",
					pl: 2,
					borderRight: "1px solid transparent",
					borderColor: "divider",
					backgroundColor: "#F0F0F0",
					zIndex: 10
				}}
			>
				<div style={{ position: "sticky", top: "80px" }}>
					{(isLoadingDocs)
						? <CircularProgressBox />
						: docs.map((cat) => {
							/* Category Level */
							return (
								<TocSideBarCategory
									key={cat[1]["undefined"][0].docId}
									title={cat[0]}
									handleOpen={() => {
										handleOpenDetails(cat[1]["undefined"][0].docId)
									}}
									targetDocItem={cat[1]["undefined"][0]}
								>
									{Object.entries(cat[1]).map((subcat) => {
										/* Contents of Category */

										//Draw items at root level of Category
										if (subcat[0] === RESERVED_KEYWORDS.CAT_CHILDREN) {
											return (
												<div
													id={cat[1]["undefined"][0].slug + "-root"}
													key={cat[1]["undefined"][0].slug + "-root"}
												>
													{subcat[1].map((item) => {
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
										if (subcat[0] === RESERVED_KEYWORDS.CAT) return null

										//position of Sub-Category in the list
										const subCatIndex = findKey(subcat[1], { type: DOC_TYPE.SUBCATEGORY })

										//Draw SubCategory
										return (
											<TocSideBarSubCategory
												key={subcat[1][subCatIndex].docId}
												title={subcat[1][subCatIndex].subcategory}
												handleOpen={() => {
													handleOpenDetails(subcat[1][subCatIndex].docId)
												}}
												targetDocItem={subcat[1][subCatIndex]}
											>
												{subcat[1].map((item, idx) => {

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

					<TocSideBarActionsGroup />

				</div>

			</Box>

			<TocSideBarDetails handleClose={handleCloseDetails} />

			<HiddenBgFixBug />

		</>
	)
}

export default TocSideBar