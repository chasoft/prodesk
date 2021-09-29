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

import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, ButtonBase, IconButton, Popper, Typography } from "@mui/material"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import TocSideBarDetails from "./TocSideBarDetails"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DetailsRightButton = ({ handleOpen }) => (
	<MoreHorizIcon
		id="detailsRightButton" size="small"
		fontSize="small"
		sx={{
			fill: (theme) => theme.palette.grey[500],
			my: 0.5, mr: 1
		}}
		onClick={() => {
			handleOpen()
			console.log({ a: handleOpen })
			console.log("details clicked")
		}}
	/>
)
DetailsRightButton.propTypes = {
	handleOpen: PropTypes.func
}

const TocSideBarKBCategory = ({ title, handleOpen, children }) => (
	<Box sx={{
		display: "flex",
		flexDirection: "column",
		py: 4,
	}}>
		<Box sx={{
			display: "flex",
			justifyContent: "space-between",
			"& > #detailsRightButton": { visibility: "hidden", },
			":hover>#detailsRightButton": { visibility: "visible" }
		}}>
			<Typography sx={{
				px: 2, py: 1,
				ml: -2, mr: 0,
				textTransform: "uppercase",
				color: "grey.500",
				fontWeight: "bold",
			}}>
				{title}
			</Typography>
			<DetailsRightButton handleOpen={handleOpen} />
		</Box>

		{children}
	</Box>
)
TocSideBarKBCategory.propTypes = {
	title: PropTypes.string,
	handleOpen: PropTypes.func,
	children: PropTypes.node
}

//#e8f0fe
const TocSideBarKBSubCategory = ({ title, selected, onClick, handleOpen, children }) => {
	return (
		<>
			<ButtonBase
				onClick={() => { }}
				sx={{ display: "block", width: "100%", textAlign: "left" }}
			>
				<Box
					sx={{
						ml: -2,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						":hover": {
							backgroundColor: "action.hover"
						},
						"& > #detailsRightButton": { visibility: "hidden", },
						":hover>#detailsRightButton": { visibility: "visible" }
					}}
				>
					<Typography sx={{ ml: 2 }}>
						{title}
					</Typography>

					<DetailsRightButton handleOpen={handleOpen} />
				</Box>
			</ButtonBase>
			<Box sx={{
				borderLeft: "1px solid transparent",
				borderColor: "divider"
			}}>
				{children}
			</Box>
		</>
	)
}
TocSideBarKBSubCategory.propTypes = {
	title: PropTypes.string,
	selected: PropTypes.bool,
	onClick: PropTypes.func,
	handleOpen: PropTypes.func,
	children: PropTypes.node
}

const TocSideBarKBArticle = ({ selected, onClick, handleOpen, children }) => {
	return (
		<ButtonBase
			onClick={() => { }}
			sx={{ display: "block", width: "100%", textAlign: "left" }}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					fontWeight: 500,
					"&:hover": {
						backgroundColor: selected ? "#e8f0fe" : "action.hover",
						cursor: "pointer",
					},
					"& > #detailsRightButton": { visibility: "hidden", },
					":hover>#detailsRightButton": { visibility: "visible" }
				}}
			>

				<Typography sx={{ ml: 2 }}>
					{children}
				</Typography>

				<DetailsRightButton handleOpen={handleOpen} />

			</Box>
		</ButtonBase>
	)
}
TocSideBarKBArticle.propTypes = {
	selected: PropTypes.bool,
	onClick: PropTypes.func,
	handleOpen: PropTypes.func,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBar = ({ dataSource }) => {
	const [showTocSideBarDetails, setShowTocSideBarDetails] = useState(false)

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
			<Box sx={{
				display: { xs: "none", md: "flex" },
				flexDirection: { flexDirection: "column" },
				minWidth: "300px",
				pl: 4,
				borderRight: "1px solid transparent",
				borderColor: "divider",
				backgroundColor: "action.hover"
			}}>


				<TocSideBarKBCategory title="Category" handleOpen={handleOpenDetails}>

					<TocSideBarKBSubCategory title="SubCategory" handleOpen={handleOpenDetails}>
						<TocSideBarKBArticle handleOpen={handleOpenDetails}>Just an article</TocSideBarKBArticle>
						<TocSideBarKBArticle handleOpen={handleOpenDetails}>Just an article</TocSideBarKBArticle>
						<TocSideBarKBArticle handleOpen={handleOpenDetails}>Just an article</TocSideBarKBArticle>
					</TocSideBarKBSubCategory>

				</TocSideBarKBCategory>
				{JSON.stringify(showTocSideBarDetails)}


			</Box>

			<Popper
				id="userInfo-popup"
				anchorEl={anchorRef.current}
				open={open}
				placement="bottom-end"
				transition
				disablePortal
				role={undefined}
			>
				<TocSideBarDetails
					open={showTocSideBarDetails}
					handleClose={handleCloseDetails}
					dataSource={[]}
				/>
			</Popper>
		</>
	)
}
TocSideBar.propTypes = { dataSource: PropTypes.array }

export default TocSideBar