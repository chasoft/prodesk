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

import React, { useState, useRef } from "react"
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, Chip, IconButton, ListItemIcon, ListItemText, MenuItem, Paper, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { orderBy, groupBy } from "lodash"
import { useDeepCompareEffect } from "react-use"
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { setRedirect } from "@redux/slices/redirect"
import { getLayout } from "@layout/AdminLayout"
import IconBreadcrumbs from "@components/BackEnd/IconBreadcrumbs"
import { EMPTY, REDIRECT_URL, STATUS_FILTER } from "@helpers/constants"
import { CircularProgressBox } from "@components/common"
import { useGetPagesQuery } from "@redux/slices/firestoreApi"
import useMenuContainer from "@components/common/useMenuContainer"
import { TicketCreatedBy, TicketDateTime, TicketDateTimeSmallScreen, TicketUser } from "../../Ticket/AdminTicketListItem"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import AddIcon from "@mui/icons-material/Add"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import Check from "@mui/icons-material/Check"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const PAGE_STATUS = {
	[STATUS_FILTER.ALL]: {
		name: STATUS_FILTER.ALL,
		title: "All Pages",
		icon: <WhatshotIcon />,
		color: "primary"
	},
	[STATUS_FILTER.PUBLISHED]: {
		name: STATUS_FILTER.PUBLISHED,
		title: "Published Pages",
		icon: <AssignmentTurnedInIcon />,
		color: "secondary"
	},
	[STATUS_FILTER.DRAFT]: {
		name: STATUS_FILTER.DRAFT,
		title: "Draft Pages",
		icon: <AssignmentIcon />,
		color: "warning"
	}
}

function AdminPageListItem({ page, isFirst = false, isLast = false }) {
	const dispatch = useDispatch()
	return (
		<Box
			sx={{
				borderTop: isFirst ? 0 : "1px solid",
				borderColor: "divider",
				display: "block"
			}}
		>
			<Box
				onClick={() => {
					dispatch(setRedirect(`${REDIRECT_URL.ADMIN.PAGES}/${page.slug}`))
				}}
				sx={{
					display: "flex",
					"&>#ticket-selector": { display: { xs: "block", sm: "none" } },
					"&>#date-time": { marginRight: "30px" },
					"&:hover": {
						cursor: "pointer",
						backgroundColor: "action.hover",
						transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
						"&>#ticket-selector": { display: "block" },
					},
					borderTopLeftRadius: isFirst ? "0.5rem" : 0,
					borderTopRightRadius: isFirst ? "0.5rem" : 0,
					borderBottomLeftRadius: isLast ? "0.5rem" : 0,
					borderBottomRightRadius: isLast ? "0.5rem" : 0,
				}}
			>
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
					ml: 1,
					mr: -4
				}}>
					<Typography
						variant="h2"
						sx={{
							display: "flex",
							alignItems: "center",
							fontWeight: 500,
							fontSize: "1.15rem",
							mb: 0,
							pt: 3, px: { xs: 1, sm: 3 }
						}}
					>
						{page.title}
					</Typography>

					<Box sx={{
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
						borderBottomLeftRadius: "0.5rem",
						borderBottomRightRadius: "0.5rem",
						pt: 1, px: { xs: 1, sm: 3 }, pb: 3,
						"& > *": {
							mr: 0.5,
							mt: { xs: 0.5, sm: 0 }
						}
					}}>

						<Box sx={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap"
						}}>

							<Chip
								size="small"
								label={page.status}
								variant="contained"
								color={(page.status !== STATUS_FILTER.DRAFT)
									? "success"
									: "secondary"}
								sx={{ mr: 1, mb: 0.5 }}
							/>

							<TicketCreatedBy
								tooltip={"Page created by"}
								createdBy={page.createdBy}
							/>

							<TicketUser
								username={page.updatedBy}
								title={`Last Updated By ${page.updatedBy}`}
							/>

						</Box>

						<TicketDateTimeSmallScreen ticket={page} />
					</Box>

				</Box>

				<TicketDateTime ticket={page} />
			</Box>
		</Box >
	)
}
AdminPageListItem.propTypes = {
	page: PropTypes.object.isRequired,
	isFirst: PropTypes.bool,
	isLast: PropTypes.bool,
}

function useGetPages(selectedStatus) {
	const counter = useRef(0)
	const [filteredPages, setFilteredPages] = useState([])

	const {
		data: pages = EMPTY.ARRAY,
		isLoading
	} = useGetPagesQuery()

	useDeepCompareEffect(() => {
		let filtered
		if (selectedStatus === STATUS_FILTER.ALL)
			filtered = orderBy(pages, ["subject"])
		else
			filtered = orderBy(
				pages.filter(p => p.status === selectedStatus),
				["subject"]
			)
		counter.current = filtered.length
		const grouped = groupBy(filtered, ["status"])
		setFilteredPages(grouped)
	}, [selectedStatus, pages])

	return (
		{
			pages: filteredPages,
			counter: counter.current,
			isLoading,
		}
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function PageSettings() {
	const [selectedStatus, setSelectedStatus] = useState(STATUS_FILTER.ALL)

	const [
		MenuContainer, open, anchorRef, {
			handleToggle, handleClose, handleListKeyDown
		}
	] = useMenuContainer()

	const { pages, counter, isLoading } = useGetPages(selectedStatus)

	console.log({ pages })

	if (isLoading) return <CircularProgressBox minHeight="70%" />

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			minWidth: 0,
			height: "100%",
		}}>

			<Box sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				pl: { xs: 0, sm: 3 },
				pt: { xs: 3, sm: 6, md: 8, lg: 10 },
				pb: 2
			}}>
				<IconBreadcrumbs
					icon={null}
					title="Pages"
					items={[
						{
							icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Home",
							url: REDIRECT_URL.ADMIN.INDEX
						}
					]}
				/>

				<Box sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
					mt: 4,
				}}>
					<Box sx={{
						display: "flex",
						alignItems: "center",
						flexGrow: 1,
						ml: { xs: 0, sm: -3 }
					}}>
						{PAGE_STATUS[selectedStatus].icon}
						<Typography variant="h1" sx={{ flexGrow: 1, mb: 0, ml: 0.5 }}>
							{PAGE_STATUS[selectedStatus].title} ({counter})
						</Typography>
					</Box>

					<Link href={REDIRECT_URL.ADMIN.NEW_PAGE} passHref>
						<Button variant="outlined" sx={{ display: { xs: "none", sm: "block" } }}>
							New Page
						</Button>
					</Link>

					<Link href={REDIRECT_URL.ADMIN.NEW_PAGE} passHref>
						<Tooltip arrow title="Add new page" placement="top">
							<IconButton sx={{ display: { xs: "block", sm: "none" } }}>
								<AddIcon fontSize="medium" />
							</IconButton>
						</Tooltip>
					</Link>

					<Tooltip arrow title="Filter Pages" placement="top" >
						<IconButton
							ref={anchorRef}
							onClick={handleToggle}
							sx={{ ml: { xs: 0, md: 1 } }}
						>
							<FilterAltIcon />
						</IconButton>
					</Tooltip>

					<MenuContainer
						open={open}
						anchorRef={anchorRef}
						handleClose={handleClose}
						handleListKeyDown={handleListKeyDown}
						placement="bottom-end"
						transformOrigin="right top"
					>
						{[
							STATUS_FILTER.ALL,
							STATUS_FILTER.PUBLISHED,
							STATUS_FILTER.DRAFT,
						].map((newStatus) => (
							<MenuItem
								key={newStatus}
								onClick={() => { setSelectedStatus(newStatus) }}
								sx={{ minWidth: "160px" }}
							>
								{(newStatus === selectedStatus)
									? <>
										<ListItemIcon>
											<Check />
										</ListItemIcon>
										{newStatus}
									</>
									: <ListItemText inset>{newStatus}</ListItemText>}
							</MenuItem>
						))}
					</MenuContainer>
				</Box>
			</Box>

			{(counter === 0) &&
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "200px",
					backgroundColor: "grey.100",
					textAlign: "center",
					p: 2
				}}>

					<Typography variant="h2">
						There are no pages that matched your criteria
					</Typography>

					<Typography variant="body" sx={{
						display: "flex",
						alignItems: "center",
						color: "grey.500"
					}}>
						Click <FilterAltIcon /> on the top-right corner to change the page&apos;s group.
					</Typography>

				</Box>}

			{(counter > 0)
				? Object.values(pages).map((group) => (
					<Box key={group[0].status} sx={{ mb: 4 }}>

						<Paper elevation={2} >
							{group.map((page, idx) => (
								<AdminPageListItem
									key={page.pid}
									page={page}
									isFirst={idx === 0}
									isLast={idx === group.length - 1}
								/>
							))}
						</Paper>

					</Box>
				)) : null}

		</Box>
	)
}

PageSettings.getLayout = getLayout

export default PageSettings