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

import React, { useCallback, useRef, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import ActionMenuGroup from "./ActionMenuGroup"
import TocSideBarDetails from "./TocSideBarDetails"
import TocSideBarKBArticle from "./TocSideBarKBArticle"
import TocSideBarKBCategory from "./TocSideBarKBCategory"
import TocSideBarKBSubCategory from "./TocSideBarKBSubCategory"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBar = ({ dataSource }) => {
	const [showTocSideBarDetails, setShowTocSideBarDetails] = useState(false)
	const sideBarRef = useRef(null)

	const handleCloseDetails = useCallback(() => {
		setShowTocSideBarDetails(false)
		console.log("tried to be False")
	}, [])

	const handleOpenDetails = useCallback(() => {
		setShowTocSideBarDetails(true)
		console.log("tried to be True")
	}, [])

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
					// backgroundColor: "white",
				}}
			>
				<div style={{ position: "sticky", top: "80px" }}>

					<TocSideBarKBCategory
						title="Category"
						handleOpen={handleOpenDetails}
					>

						<TocSideBarKBSubCategory
							title="SubCategory"
							onClick={() => { }}
							handleOpen={handleOpenDetails}
						>
							<TocSideBarKBArticle
								onClick={() => { }}
								active={false}
								handleOpen={handleOpenDetails}
							>
								Just an article
							</TocSideBarKBArticle>
							<TocSideBarKBArticle
								onClick={() => { }}
								active={true}
								handleOpen={handleOpenDetails}
							>
								Just an article
							</TocSideBarKBArticle>
							<TocSideBarKBArticle
								onClick={() => { }}
								handleOpen={handleOpenDetails}
							>
								Just an article
							</TocSideBarKBArticle>
						</TocSideBarKBSubCategory>

					</TocSideBarKBCategory>

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
TocSideBar.propTypes = { dataSource: PropTypes.array }

export default TocSideBar