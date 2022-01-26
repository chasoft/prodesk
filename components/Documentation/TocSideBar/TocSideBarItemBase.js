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

import React, { useCallback } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, ButtonBase } from "@mui/material"

//THIRD-PARTY
// import { isEqual } from "lodash"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import DetailsRightButton from "./DetailsRightButton"
import { setShowTocSideBarDetails } from "@redux/slices/uiSettings"
import {
	setActiveDocId,
	setActiveDocIdOfTocSideBarDetails
} from "@redux/slices/docsCenter"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarItemBase = React.forwardRef(
	(
		{
			docId,
			activeDocId,
			additionalButton,
			children,
			handleOpen,
			showDetailsButton = true,
			published = true,
			sx,
			...otherProps
		},
		ref
	) => {
		const dispatch = useDispatch()

		const activeDocIdOfTocSideBarDetails = useSelector(s => s.docsCenterState.activeDocIdOfTocSideBarDetails)

		const handleOpenDetail = useCallback((e) => {
			e.stopPropagation()
			reduxBatch(() => {
				if (activeDocId !== docId) {
					dispatch(setActiveDocId(null))
				}
				dispatch(setShowTocSideBarDetails(true))
				dispatch(setActiveDocIdOfTocSideBarDetails(docId))
			})
		}, [dispatch, docId, activeDocId])

		const _handleOpen = useCallback((e) => {
			e.stopPropagation()
			if (typeof handleOpen === "function")
				handleOpen(e)
			else
				handleOpenDetail(e)
		}, [handleOpen, handleOpenDetail])

		console.log("TocSideBarItemBase -> ", docId)

		return (
			<ButtonBase
				ref={ref}
				onClick={_handleOpen}
				sx={{
					display: "block",
					width: "100%",
					textAlign: "left",
				}}
				{...otherProps}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						backgroundColor: (activeDocIdOfTocSideBarDetails === docId)
							? "action.hover"
							: (docId === activeDocId)
								? "#FFF"
								: "transparent",
						borderTop: "1px solid transparent",
						borderBottom: "1px solid transparent",
						borderColor: (docId === activeDocId) ? "divider" : "transparent",
						color: (activeDocIdOfTocSideBarDetails === docId || docId === activeDocId) ? "primary.main" : "initial",
						":hover": {
							backgroundColor: "action.hover",
							color: "primary.main"
						},
						"&>div": {
							"&>#popper-trigger": { visibility: "hidden" },
							"&>#detailsRightButton": { visibility: "hidden" },
						},
						":hover>div": {
							"&>#popper-trigger": { visibility: "visible" },
							"&>#detailsRightButton": { visibility: "visible" },
						},
						...sx
					}}
				>
					<Box sx={{
						ml: 2,
						flexGrow: 1,
						...(published ? {} : { textDecoration: "underline #e97272 dotted" })
					}}>
						{children}
					</Box>

					<Box sx={{
						display: "flex",
						alignItems: "center",
					}}>
						{additionalButton}
						{showDetailsButton && <DetailsRightButton handleOpen={handleOpenDetail} />}
					</Box>
				</Box>
			</ButtonBase>
		)
	}
)
TocSideBarItemBase.displayName = "TocSideBarItemBase"

TocSideBarItemBase.propTypes = {
	docId: PropTypes.string,
	activeDocId: PropTypes.string,
	additionalButton: PropTypes.node,
	children: PropTypes.node,
	handleOpen: PropTypes.func,
	otherProps: PropTypes.any,
	showDetailsButton: PropTypes.bool,
	published: PropTypes.bool,
	sx: PropTypes.object
}

export default TocSideBarItemBase