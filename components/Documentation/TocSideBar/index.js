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
import { batch as ReduxBatch, useDispatch, useSelector } from "react-redux"

//THIRD-PARTY

//PROJECT IMPORT
import TocSideBarActionsGroup from "./TocSideBarActionsGroup"
import TocSideBarDetails from "./TocSideBarDetails"
import TocSideBarDCArticle from "./TocSideBarDCArticle"
import TocSideBarDCExternal from "./TocSideBarDCExternal"
import TocSideBarDCCategory from "./TocSideBarDCCategory"
import TocSideBarDCSubCategory from "./TocSideBarDCSubCategory"
import { setShowTocSideBarDetails, setSideBarLeft } from "./../../../redux/slices/uiSettings"
import { getDocsCenter, getUiSettings } from "../../../redux/selectors"
import { DOC_TYPE } from "./../../../helpers/constants"
import { setActiveDocIdOfTocSideBarDetails } from "../../../redux/slices/docsCenter"

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

	const { showTocSideBarDetails } = useSelector(getUiSettings)
	const { activeDocId, docsListArray } = useSelector(getDocsCenter)

	const handleCloseDetails = useCallback(() => {
		ReduxBatch(() => {
			dispatch(setShowTocSideBarDetails(false))
			dispatch(setActiveDocIdOfTocSideBarDetails(null))
		})
	}, [dispatch])

	const handleOpenDetails = useCallback((docId) => {
		ReduxBatch(() => {
			dispatch(setShowTocSideBarDetails(true))
			dispatch(setActiveDocIdOfTocSideBarDetails(docId))
		})
	}, [dispatch])

	const updateSideBarLeft = useCallback(() => {
		dispatch(setSideBarLeft(sideBarRef?.current?.offsetLeft ?? 0))
	}, [dispatch])

	useEffect(() => {
		updateSideBarLeft()
		window.addEventListener("resize", updateSideBarLeft)
		return () => window.removeEventListener("resize", updateSideBarLeft)
	}, [updateSideBarLeft])

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

					{docsListArray.map((cat) => {
						/* Category Level */
						return (
							<TocSideBarDCCategory
								key={cat[0]}
								title={cat[0]}
								handleOpen={() => handleOpenDetails(cat[1]["undefined"][0].docId)}
							>
								{Object.entries(cat[1]).map((subcat) => {
									/* Contents of Category */

									//Draw items at root level of Category
									if (subcat[0] === "000000") {

										subcat[1].map((item) => {

											if (item.type === DOC_TYPE.DOC)
												return (
													<TocSideBarDCArticle
														key={item.docId}
														onClick={() => {/* TODO: Implement.. loading DOC content */ }}
														active={item.docId === activeDocId}
														handleOpen={() => handleOpenDetails(item.docId)}
													>
														{item.title}
													</TocSideBarDCArticle>
												)

											if (item.type === DOC_TYPE.EXTERNAL)
												return (
													<TocSideBarDCExternal
														key={item.docId}
														url={item.url}
														handleOpen={() => handleOpenDetails(item.docId)}
													>
														{item.title}
													</TocSideBarDCExternal>
												)
										})

									}

									//Draw SubCategory
									//item items which hold subCategory is the 1st item, it is subcat[1][0]
									//then, when do sorting, make sure this requirement
									return (
										<>
											<TocSideBarDCSubCategory
												key={subcat[1][0].docId}
												title={subcat[1][0].subcategory}
												handleOpen={() => handleOpenDetails(subcat[1][0].docId)}
											>
												{subcat[1].map((item, idx) => {

													if (idx === 0) return

													//Draw items within SubCategory
													if (item.type === DOC_TYPE.DOC)
														return (
															<TocSideBarDCArticle
																key={item.docId}
																onClick={() => {/* TODO: Implement.. loading DOC content */ }}
																active={item.docId === activeDocId}
																handleOpen={() => handleOpenDetails(item.docId)}
															>
																{item.title}
															</TocSideBarDCArticle>
														)

													if (item.type === DOC_TYPE.EXTERNAL)
														return (
															<TocSideBarDCExternal
																key={item.docId}
																url={item.url}
																handleOpen={() => handleOpenDetails(item.docId)}
															>
																{item.title}
															</TocSideBarDCExternal>
														)
												})}

											</TocSideBarDCSubCategory>
										</>
									)
								})}
							</TocSideBarDCCategory>
						)
					})}

					<TocSideBarActionsGroup />

				</div>

			</Box>

			<TocSideBarDetails
				open={showTocSideBarDetails}
				handleClose={handleCloseDetails}
				dataSource={[]}
			/>

			<HiddenBgFixBug />

		</>
	)
}
// TocSideBar.propTypes = { dataSource: PropTypes.array }

export default TocSideBar