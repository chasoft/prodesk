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

import React, { useCallback, useEffect, useRef } from "react"
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
import { setShowTocSideBarDetails, setSideBarLeft } from "./../../../redux/slices/uiSettings"
import { getDocsCenter } from "../../../redux/selectors"
import { DOC_TYPE, RESERVED_KEYWORDS } from "./../../../helpers/constants"
import { setActiveDocId, setActiveDocIdOfTocSideBarDetails } from "../../../redux/slices/docsCenter"
import useGroupedDocs from "../../../helpers/useGroupedDocs"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const HiddenBgFixBug = () => <Box sx={{
	position: "fixed",
	zIndex: 1,
	display: "flex",
	alignItems: "stretch",
	left: 0,
	minWidth: "700px",
	height: "100%",
	backgroundColor: "#FAFAFA",
	...(open ?
		{
			opacity: 1,
			visibility: "visible",
			transition: "0.5s opacity, 0 0.5s visibility"
		} : {
			opacity: 0,
			visibility: "hidden",
			transition: "0.5s opacity, 0.5s visibility"
		}
	)
}} />

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBar = () => {
	const dispatch = useDispatch()
	const sideBarRef = useRef(null)
	const docsList = useGroupedDocs()
	const { activeDocId } = useSelector(getDocsCenter)

	const handleCloseDetails = useCallback(() => {
		reduxBatch(() => {
			dispatch(setShowTocSideBarDetails(false))
			dispatch(setActiveDocIdOfTocSideBarDetails(null))
		})
	}, [dispatch])

	const handleOpenDetails = useCallback((docId) => {
		reduxBatch(() => {
			dispatch(setShowTocSideBarDetails(true))
			dispatch(setActiveDocIdOfTocSideBarDetails(docId))
		})
	}, [dispatch])

	const loadDocContent = useCallback((docId) => {
		reduxBatch(() => {
			dispatch(setActiveDocId(docId))
			dispatch(setActiveDocIdOfTocSideBarDetails(null))
		})
	}, [dispatch])

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
	}, [dispatch, sideBarRef?.current?.clientWidth, sideBarRef?.current?.offsetLeft])

	return (
		<>
			<Box
				ref={sideBarRef}
				onClick={() => handleCloseDetails()}
				sx={{
					display: { xs: "none", md: "flex" },
					flexDirection: { flexDirection: "column" },
					minWidth: "300px",
					pl: 4,
					borderRight: "1px solid transparent",
					borderColor: "divider",
					backgroundColor: "#FAFAFA",
					zIndex: 10
				}}
			>
				<div style={{ position: "sticky", top: "80px" }}>
					{docsList.map((cat) => {
						/* Category Level */
						return (
							<TocSideBarCategory
								key={cat[1]["undefined"][0].docId}
								title={cat[0]}
								handleOpen={() => handleOpenDetails(cat[1]["undefined"][0].docId)}
								targetDocItem={cat[1]["undefined"][0]}
							>
								{Object.entries(cat[1]).map((subcat) => {
									/* Contents of Category */

									//Draw items at root level of Category
									if (subcat[0] === RESERVED_KEYWORDS.CAT_CHILDREN) {

										subcat[1].map((item) => {

											if (item.type === DOC_TYPE.DOC)
												return (
													<TocSideBarDoc
														key={item.docId}
														onClick={() => { loadDocContent(item.docId) }}
														active={item.docId === activeDocId}
														handleOpen={() => handleOpenDetails(item.docId)}
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
													>
														{item.title}
													</TocSideBarExternal>
												)
										})

										return null
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
												console.log(subcat[1][subCatIndex].docId)
											}}
											targetDocItem={subcat[1][subCatIndex]}
										>
											{subcat[1].map((item, idx) => {

												if (idx === subCatIndex) return null

												//Draw items within SubCategory
												if (item.type === DOC_TYPE.DOC)
													return (
														<TocSideBarDoc
															key={item.docId}
															onClick={() => { loadDocContent(item.docId) }}
															active={item.docId === activeDocId}
															handleOpen={() => handleOpenDetails(item.docId)}
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