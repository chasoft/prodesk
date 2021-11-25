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

import useGroupedDocs from "@helpers/useGroupedDocs"
import { CircularProgressBox } from "@components/common"

import {
	getDocsCenter,
} from "@redux/selectors"

import {
	setShowTocSideBarDetails,
	setSideBarLeft
} from "@redux/slices/uiSettings"

import {
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

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBar = () => {
	const dispatch = useDispatch()
	const sideBarRef = useRef(null)

	const {
		data: docs,
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
					{isLoadingDocs
						? <CircularProgressBox />
						: docs.map((cat) => {
							/* Category Level */
							return (
								<TocSideBarCategory
									key={cat[1]["undefined"][0].docId}
									title={cat[0]}
									handleOpen={() => {
										handleOpenDetails(cat[1]["undefined"][0].docId)
										// console.log("Category clicked")
									}}
									targetDocItem={cat[1]["undefined"][0]}
								>
									{Object.entries(cat[1]).map((subcat) => {
										/* Contents of Category */

										//Draw items at root level of Category
										if (subcat[0] === RESERVED_KEYWORDS.CAT_CHILDREN) {
											return subcat[1].map((item) => {
												if (item.type === DOC_TYPE.DOC)
													return (
														<TocSideBarDoc
															key={item.docId}
															onClick={() => { loadDocContent(item.docId) }}
															active={item.docId === activeDocId}
															handleOpen={() => handleOpenDetails(item.docId)}
															targetDocItem={{ docId: item.docId }}
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
															targetDocItem={{ docId: item.docId }}
														>
															{item.title}
														</TocSideBarExternal>
													)
											})
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
																targetDocItem={{ docId: item.docId }}
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
																targetDocItem={{ docId: item.docId }}
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
// TocSideBar.propTypes = { dataSource: PropTypes.array }

export default TocSideBar