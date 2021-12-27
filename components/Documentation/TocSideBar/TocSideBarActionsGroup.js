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

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, ButtonBase, Typography } from "@mui/material"

//THIRD-PARTY
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { DOCS_ADD } from "@helpers/constants"
import { useGetDoc } from "@helpers/useGetDocs"

import useAddNewDocumentationPopupMenu from "@components/Documentation/TocSideBar/useAddNewDocumentationPopupMenu"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TocSideBarActionItem = React.forwardRef(({ ItemIcon, onClick, children }, ref) => {
	return (
		<ButtonBase
			ref={ref}
			onClick={() => { onClick() }}
			sx={{ display: "block", width: "100%", textAlign: "left" }}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					fontWeight: 500,
					"&:hover": {
						backgroundColor: "action.hover",
						cursor: "pointer",
					},
				}}
			>

				<Typography sx={{ ml: 2, color: "grey.500", fontWeight: "bold" }}>
					{children}
				</Typography>

				{<ItemIcon
					id="detailsRightButton" size="small"
					fontSize="small"
					sx={{
						fill: (theme) => theme.palette.grey[500],
						my: 1, mr: 2,
						cursor: "pointer"
					}}
				/>}

			</Box>
		</ButtonBase >
	)
})

TocSideBarActionItem.displayName = "TocSideBarActionItem"

TocSideBarActionItem.propTypes = {
	ItemIcon: PropTypes.object,
	onClick: PropTypes.func,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TocSideBarActionsGroup() {
	const activeDocId = useSelector(s => s.docsCenterState.activeDocId)

	const [
		AddNewPopupMenu, open, anchorRef, {
			handleToggle, handleClose
		}
	] = useAddNewDocumentationPopupMenu()

	const {
		data: targetDocItem, isLoading: isLoadingTargetDocItem
	} = useGetDoc(activeDocId)

	return (
		<Box id="TocSideBarActionsGroup"
			sx={{
				mt: 8,
				borderTop: "1px solid transparent",
				borderColor: "divider"
			}}
		>
			{!isLoadingTargetDocItem &&
				<TocSideBarActionItem
					onClick={handleToggle}
					ItemIcon={AddIcon}
					ref={anchorRef}
				>
					New
				</TocSideBarActionItem>}

			<AddNewPopupMenu
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				targetDocItem={targetDocItem}
				actions={(activeDocId === null)
					? [DOCS_ADD.CATEGORY]
					: [
						DOCS_ADD.CATEGORY,
						DOCS_ADD.SUB_CATEGORY,
						DOCS_ADD.DOC,
						DOCS_ADD.EXTERNAL
					]}
				placement="right" />

			<TocSideBarActionItem
				ItemIcon={FolderOutlinedIcon}
				onClick={() => { }}
			>
				File
			</TocSideBarActionItem>
		</Box>
	)
}

export default TocSideBarActionsGroup