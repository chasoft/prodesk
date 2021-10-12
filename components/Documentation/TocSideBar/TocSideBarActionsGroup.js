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

import React, { useMemo } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, ButtonBase, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"
import { filter } from "lodash"

//PROJECT IMPORT
import AddNewPopupMenu from "./AddNewPopupMenu"
import { DOCS_ADD } from "../../../helpers/constants"
import { getDocsCenter } from "../../../redux/selectors"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined"
import { firestoreApi, useGetDocsQuery } from "../../../redux/slices/firestoreApi"

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

const TocSideBarActionsGroup = () => {
	const { activeDocId } = useSelector(getDocsCenter)

	const { targetDocItem } = useGetDocsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			targetDocItem: data?.find((post) => post.docId === activeDocId) ?? {},
		})
	})

	// const targetDocItem = useMemo(() => {
	// 	if (isDocsListEmpty
	// 		|| !allDocsRaw.data
	// 		|| activeDocId === null
	// 	)
	// 		return {}

	// 	const filteredArray = filter(allDocsRaw.data, (i) => i.docId === activeDocId)
	// 	if (filteredArray.length === 0) return {}
	// 	return filteredArray[0]
	// }, [allDocsRaw, activeDocId, isDocsListEmpty])

	return (
		<Box
			sx={{
				mt: 3,
				borderTop: "1px solid transparent",
				borderColor: "divider"
			}}
		>
			<AddNewPopupMenu
				placement="right"
				actions={
					(activeDocId === null)
						? [DOCS_ADD.CATEGORY]
						: [
							DOCS_ADD.CATEGORY,
							DOCS_ADD.SUB_CATEGORY,
							DOCS_ADD.DOC,
							DOCS_ADD.EXTERNAL
						]
				}
				targetDocItem={targetDocItem}
			>
				<TocSideBarActionItem onClick={() => {/* empty for this case */ }} ItemIcon={AddIcon}>
					New
				</TocSideBarActionItem>
			</AddNewPopupMenu>

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