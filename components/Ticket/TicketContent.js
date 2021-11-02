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

import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Chip, Popper, IconButton, MenuList, ClickAwayListener, Grow, MenuItem, Paper, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "../common/TextEditor"
import { getAuth } from "../../redux/selectors"
import ReplyDialog from "../Post/Replies/ReplyDialog"
import { setRedirect } from "../../redux/slices/redirect"
import { DATE_FORMAT, REDIRECT_URL, STATUS_FILTER } from "../../helpers/constants"
import { useUpdateTicketMutation } from "../../redux/slices/firestoreApi"

//ASSETS
import CloseIcon from "@mui/icons-material/Close"
import ReplyIcon from "@mui/icons-material/Reply"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ApartmentIcon from "@mui/icons-material/Apartment"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const MenuItemStyled = ({ ItemIcon, children, ...otherProps }) => {
	return (
		<MenuItem {...otherProps}>
			{<ItemIcon fontSize="small" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />}
			<Typography style={{ marginLeft: "0.5rem", marginRight: "3rem" }}>
				{children}
			</Typography>
		</MenuItem>
	)
}
MenuItemStyled.propTypes = {
	ItemIcon: PropTypes.object,
	children: PropTypes.node
}

const PopupMenu = ({ ticket }) => {
	const dispatch = useDispatch()
	const anchorRef = useRef(null)
	const { currentUser } = useSelector(getAuth)
	const [open, setOpen] = useState(false)
	const { enqueueSnackbar } = useSnackbar()

	const [updateTicket] = useUpdateTicketMutation()

	const handleToggle = () => { setOpen((prevOpen) => !prevOpen) }

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}
		setOpen(false)
	}

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault()
			setOpen(false)
		} else if (event.key === "Escape") {
			setOpen(false)
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open)
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus()
		}
		prevOpen.current = open
	}, [open])

	return (
		<>
			<IconButton
				size="large"
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<MoreVertIcon />
			</IconButton>

			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-end"
				transition
				disablePortal
				style={{ zIndex: 1 }}
			>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
						<Paper elevation={4}>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>
									<ReplyDialog
										ticketId={ticket.tid}
										ticketStatus={ticket.status}
										ticketUsername={ticket.username}
									>
										<MenuItem onClick={handleClose}>
											{<ReplyIcon fontSize="small" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />}
											<Typography style={{ marginLeft: "0.5rem", marginRight: "3rem" }}>
												Reply
											</Typography>
										</MenuItem>
									</ReplyDialog>
									<MenuItem
										disabled={ticket.status === STATUS_FILTER.CLOSED}
										onClick={async () => {
											enqueueSnackbar("Ticket closed successfully", { variant: "success" })
											await updateTicket([{
												username: currentUser.username,
												tid: ticket.tid,
												status: STATUS_FILTER.CLOSED
											}])
											dispatch(setRedirect(REDIRECT_URL.TICKETS))
										}}
									>
										{<CloseIcon fontSize="small" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />}
										<Typography style={{ marginLeft: "0.5rem", marginRight: "3rem" }}>
											Close
										</Typography>
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	)
}

PopupMenu.propTypes = {
	ticket: PropTypes.object
}

export const StatusChip = ({ status }) => {
	const chipColor = {
		[STATUS_FILTER.OPEN]: "primary",
		[STATUS_FILTER.PENDING]: "warning",
		[STATUS_FILTER.REPLIED]: "success",
		[STATUS_FILTER.CLOSED]: "secondary",
	}

	return <Chip
		size="small"
		color={chipColor[status]}
		label={status}
		sx={{ mr: 1, mb: 1 }}
	/>
}
StatusChip.propTypes = {
	status: PropTypes.string.isRequired,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketContent({ ticket }) {
	dayjs.extend(relativeTime)
	return (
		<Paper component="main" sx={{
			borderRadius: "0.5rem",
			mt: 2,
		}}>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				top: "28px",
				pl: { xs: 3, md: 6 },
				pt: { xs: 4, md: 4 },
				pr: { xs: 2, md: 3 }
			}}>

				<Box sx={{
					display: "flex",
					alignItems: "center",
				}}>
					<StatusChip status={ticket.status} />
					<Typography variant="h2" sx={{ fontWeight: 500, ml: 1, mb: 0 }} >
						{ticket.subject}
					</Typography>
				</Box>

				<Box sx={{
					display: { xs: "none", sm: "flex" },
					alignItems: "center"
				}}>
					<Box sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						alignItems: "flex-end"
					}}>
						<Typography noWrap>
							{dayjs(ticket.createdAt).format(DATE_FORMAT.LONG)} &nbsp;
						</Typography>
						<Typography noWrap sx={{ fontStyle: "italic", mr: 1 }} color="textSecondary">
							({dayjs(ticket.createdAt).fromNow()})
						</Typography>
					</Box>

					<PopupMenu ticket={ticket} />
				</Box>

			</Box>

			<Box sx={{
				px: { xs: 3, sm: 6 },
				pb: { xs: 2, sm: 4 },
				"&>p": { lineHeight: "1.5rem" }
			}}>
				<TextEditor
					value={ticket.content}
					readOnly={true}
				/>
			</Box>

			<Box sx={{
				display: "flex",
				px: { xs: 3, md: 6 },
				py: { xs: 2, md: 2 },
				backgroundColor: "#F8F9FA",
				borderBottomLeftRadius: "0.5rem",
				borderBottomRightRadius: "0.5rem",
				borderTop: "1px solid",
				borderTopColor: "divider"
			}}>
				<Tooltip arrow title="Department" placement="top">
					<Chip
						size="small"
						label={ticket.department}
						avatar={<ApartmentIcon />}
						sx={{ mr: 1 }}
					/>
				</Tooltip>

				<Tooltip arrow title="Category" placement="top">
					{ticket.category &&
						<Chip
							size="small"
							label={ticket.category + (ticket?.subCategory ? ("/" + ticket.subCategory) : "")}
						/>}
				</Tooltip>
			</Box>

		</Paper>
	)
}
TicketContent.propTypes = {
	ticket: PropTypes.object
}

export default TicketContent