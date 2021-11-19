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
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, ButtonBase, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { isMobile } from "react-device-detect"
import { useSelector, useDispatch } from "react-redux"
import PerfectScrollbar from "react-perfect-scrollbar"

//PROJECT IMPORT
import { Logo } from "@components/common"
import HomeButton from "./HomeButton"
import NavCollapse from "./NavCollapse"
import { getUiSettings } from "@redux/selectors"
import { MENU_ITEM_TYPE } from "@helpers/constants"
import { setIsSideBarExpanded, setShowSideBar } from "@redux/slices/uiSettings"

//ASSETS
import "react-perfect-scrollbar/dist/css/styles.css"
import BarChartIcon from "@mui/icons-material/BarChart"
import CategoryIcon from "@mui/icons-material/Category"
import AssessmentIcon from "@mui/icons-material/Assessment"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const IconLib = {
	"0": <AssessmentIcon />,
	"1": <AssessmentIcon />,
	"2": <CreditCardIcon />,
	"3": <AccountTreeIcon />,
	"4": <BarChartIcon />,
	"5": <CategoryIcon />,
	"6": <AssessmentIcon />
}

const SideBarContentExpanded = ({ data }) => (
	<PerfectScrollbar component="div" style={{ height: "calc(100vh - 88px)" }}>
		{data.map((group) => {
			if (group.type === MENU_ITEM_TYPE.ITEM)
				return (
					<Link key={group.url} href={group.url} passHref>
						<a href="just-a-placeholder">
							<ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }}>
								<Box
									sx={{
										width: "256px",
										display: "flex",
										cursor: "pointer",
										alignItems: "center",
										borderBottom: "1px solid #2A4257",
										padding: 3, pr: 1,
										"&:hover": { backgroundColor: "#ffffff14" },
									}}
								>
									<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
										<div style={{ display: "flex", alignItems: "center" }}>
											<Typography
												sx={{
													color: "#fff",
													fontSize: "1rem",
													fontFamily: "\"Google Sans\", Roboto, sans-serif",
													flexGrow: 1
												}}
											>
												{group.title}
											</Typography>
										</div>
										<Typography
											sx={{
												fontSize: "0.75rem",
												color: "#ffffff80",
												width: "90%"
											}}
											variant="caption"
											noWrap
										>
											{group.description}
										</Typography>
									</div>
								</Box>
							</ButtonBase>
						</a>
					</Link>
				)
			else if (group.type === MENU_ITEM_TYPE.GROUP)
				return (
					<NavCollapse
						key={group.id}
						title={group.title}
						isExpanded={group.expanded}
						description={group.description}
						isLongDisplay={true}
					>
						<Box
							component="ul"
							sx={{
								margin: 0,
								padding: 0,
								width: "100%",
								listStyle: "none",
								"& > button > li > a": {
									display: "flex",
									alignItems: "center",
									fontSize: "0.875rem",
									py: 1, pr: 2, pl: 3,
									"& >:first-of-type": {
										mr: 1,
										height: "20px",
										weight: "20px",
									}
								},
								"& > button > li:hover": {
									backgroundColor: "#ffffff14",
									cursor: "pointer",
								}
							}}
						>
							{group.items.map((item) => (
								<ButtonBase key={item.id} sx={{ display: "block", width: "100%", textAlign: "left" }}>
									<li>
										<Link href={item.url} passHref>
											<a href="just-a-placeholder">
												{IconLib[item.icon]}{item.text}
											</a>
										</Link>
									</li>
								</ButtonBase>
							))}
						</Box>
					</NavCollapse>
				)
			else
				throw new Error("Wrong-Menu-DataType")
		})}
	</PerfectScrollbar >
)
SideBarContentExpanded.propTypes = { data: PropTypes.array }

const SideBarContentCollapsed = ({ data }) => (
	<PerfectScrollbar component="div" style={{ height: "calc(100vh - 88px)" }}>
		{data.map((group) => {
			if (group.type === MENU_ITEM_TYPE.ITEM)
				return (
					<Link key={group.url} href={group.url} passHref >
						<Tooltip arrow title={group.description} placement="right">
							<ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }}>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										textAlign: "center",
										px: 2, py: 1,
										"&:hover": { backgroundColor: "#ffffff14" },
										borderTop: "1px solid #2A4257",
										color: "#ffffffcc",
										cursor: "pointer",
										"& >:first-of-type": { height: 20, weight: 20 },
									}}
								>
									{IconLib[group.icon]}
								</Box>
							</ButtonBase>
						</Tooltip>
					</Link>
				)
			else if (group.type === MENU_ITEM_TYPE.GROUP)
				return (
					<Box
						key={group.id}
						component="ul"
						sx={{
							margin: 0,
							padding: 0,
							width: "100%",
							listStyle: "none",
							textAlign: "center",
							backgroundColor: "#ffffff14",
							"&>button>li": {
								display: "flex",
								justifyContent: "center",
								pt: 1, px: 2, pb: 1,
								color: "#ffffffcc",
								"& > a > :first-of-type": {
									height: "20px",
									weight: "20px",
								}
							},
							"&>button>li:hover": {
								backgroundColor: "#ffffff14",
								cursor: "pointer",
							},
							borderTop: "1px solid #2A4257",
						}}
					>
						{group.items.map((item) => (
							<Tooltip arrow key={item.id} title={item.text} placement="right">
								<ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }}>
									<li>
										<Link href={item.url} passHref>
											<a href="just-a-placeholder">
												{IconLib[item.icon]}
											</a>
										</Link>
									</li>
								</ButtonBase>
							</Tooltip>
						))}
					</Box>
				)
			else
				throw new Error("Wrong-Menu-DataType")
		})}
	</PerfectScrollbar>
)
SideBarContentCollapsed.propTypes = { data: PropTypes.array }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const SideBar = ({ homeUrl, settingsUrl, settingsTooltip, data = [] }) => {
	const { showSideBar, isSmallScreen, isSideBarExpanded } = useSelector(getUiSettings)
	const dispatch = useDispatch()
	return (
		<>
			<Box
				sx={{
					position: isMobile ? "fixed" : { xs: "fixed", sm: "sticky" },
					top: 0,
					display: "flex",
					flexDirection: "column",
					width: isSideBarExpanded ? "256px" : "68px",
					...((isSmallScreen || isMobile) ? showSideBar ? { left: 0 } : { left: isSideBarExpanded ? "-257px" : "-69px" } : {}),
					height: "100vh",
					backgroundAttachment: "fixed",
					backgroundColor: "#051e34",
					backgroundImage: "url(\"/img/nav_admin_bg.png\")",
					backgroundRepeat: "no-repeat",
					backgroundSize: "256px 556px",
					transition: "width .3s cubic-bezier(0.4, 0, 0.2, 1), left .3s cubic-bezier(0.4, 0, 0.2, 1)",
					zIndex: 165
				}}
				onClick={() => { dispatch(setShowSideBar(false)) }}
			>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						...(isSideBarExpanded ? {
							height: "59px",
							padding: (theme) => theme.spacing(1, 1, 0.5, 3)
						} : {
							justifyContent: "center",
							height: "56px",
							padding: (theme) => theme.spacing(1, 0, 0.5, 0)
						})
					}}
				>
					<Logo theme="dark" isSmall={!isSideBarExpanded} />
				</Box>

				<HomeButton
					homeUrl={homeUrl}
					settingsUrl={settingsUrl}
					settingsTooltip={settingsTooltip}
					isExpanded={isSideBarExpanded}
				/>

				{isSideBarExpanded
					? <SideBarContentExpanded data={data} />
					: <SideBarContentCollapsed data={data} />}

				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						marginTop: "auto",
						borderTop: "1px solid #2A4257",
						p: 2,
					}}
				>
					<IconButton
						color="secondary"
						aria-label="Settings"
						style={{ padding: "5px" }}
						onClick={(e) => {
							e.stopPropagation()
							dispatch(setIsSideBarExpanded(!isSideBarExpanded))
						}}
						size="large">
						{isSideBarExpanded
							? <ArrowBackIosIcon style={{ color: "#fff", height: "20px", width: "20px" }} />
							: <ArrowForwardIosIcon style={{ color: "#fff", height: "20px", width: "20px" }} />}
					</IconButton>
				</Box>

			</Box>

			<Box
				sx={{
					position: "fixed",
					display: showSideBar ? "absolute" : "none",
					backgroundColor: "action.hover",
					zIndex: 164,
					width: "100%",
					height: "100%"
				}}
				onClick={() => { dispatch(setShowSideBar(false)) }}
			/>

		</>
	)
}
SideBar.propTypes = {
	isExpanded: PropTypes.bool,
	toggle: PropTypes.func,
	homeUrl: PropTypes.string,
	settingsUrl: PropTypes.string,
	settingsTooltip: PropTypes.string,
	data: PropTypes.array
}

export default SideBar