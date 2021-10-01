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

import React, { useCallback, useEffect, useRef, useState } from "react"
// import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

//THIRD-PARTY

//PROJECT IMPORT
import ActionMenuGroup from "./ActionMenuGroup"
import TocSideBarDetails from "./TocSideBarDetails"
import TocSideBarDCArticle from "./TocSideBarDCArticle"
import TocSideBarDCCategory from "./TocSideBarDCCategory"
import TocSideBarDCSubCategory from "./TocSideBarDCSubCategory"
import { setSideBarLeft } from "./../../../redux/slices/uiSettings"
import { getDocsCenter } from "../../../redux/selectors"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBar = () => {
	const [showTocSideBarDetails, setShowTocSideBarDetails] = useState(false)
	const sideBarRef = useRef(null)
	const dispatch = useDispatch()

	const { docsList } = useSelector(getDocsCenter)

	const handleCloseDetails = useCallback(() => {
		setShowTocSideBarDetails(false)
	}, [])

	const handleOpenDetails = useCallback(() => {
		setShowTocSideBarDetails(p => !p)
	}, [])

	const updateSideBarLeft = useCallback(() => {
		dispatch(setSideBarLeft(sideBarRef?.current?.offsetLeft ?? 0))
	}, [dispatch])

	useEffect(() => {
		updateSideBarLeft()
	}, [updateSideBarLeft])

	useEffect(() => {
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
				}}
			>
				<div style={{ position: "sticky", top: "80px" }}>

					{(docsList.length === 0) && <Box>


					</Box>}

					{(docsList.length > 0) && <Box>


					</Box>}


					{/* <TocSideBarDCCategory
						title="Category"
						handleOpen={handleOpenDetails}
					>

						<TocSideBarDCSubCategory
							title="SubCategory"
							onClick={() => { }}
							handleOpen={handleOpenDetails}
						>
							<TocSideBarDCArticle
								onClick={() => { }}
								active={false}
								handleOpen={handleOpenDetails}
							>
								Just an article
							</TocSideBarDCArticle>
							<TocSideBarDCArticle
								onClick={() => { }}
								active={true}
								handleOpen={handleOpenDetails}
							>
								Just an article
							</TocSideBarDCArticle>
							<TocSideBarDCArticle
								onClick={() => { }}
								handleOpen={handleOpenDetails}
							>
								Just an article
							</TocSideBarDCArticle>
						</TocSideBarDCSubCategory>

					</TocSideBarDCCategory> */}

					<ActionMenuGroup />

				</div>

			</Box>

			<TocSideBarDetails
				open={showTocSideBarDetails}
				handleClose={handleCloseDetails}
				dataSource={[]}
			/>

		</>
	)
}
// TocSideBar.propTypes = { dataSource: PropTypes.array }

export default TocSideBar