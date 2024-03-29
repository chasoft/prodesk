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

//PROJECT IMPORT

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Avatar, Box, Button, Checkbox, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Popover, Typography } from "@mui/material"

//THIRD-PARTY
import PerfectScrollbar from "react-perfect-scrollbar"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function AddMemberList({ departmentName, children }) {

	const [anchorEl, setAnchorEl] = React.useState(null)

	// const [open, setOpen] = useState(false)
	const [checked, setChecked] = useState([1])

	const open = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}


	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]

		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}

		setChecked(newChecked)
	}


	return (
		<div>
			<Box onClick={() => handleClick()}>{children}</Box>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<div style={{ padding: "1rem" }}>
					<Typography variant="button">Department: {departmentName}</Typography>
				</div>

				<List dense sx={{
					width: "360px",
					borderTop: "1px solid",
					borderBottom: "1px solid",
					borderColor: "divider"
				}}>
					<PerfectScrollbar
						component="div"
						suppressScrollX={true}
						style={{ height: "100%", maxHeight: "240px" }}
					>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
							const labelId = `checkbox-list-secondary-label-${value}`
							return (
								<ListItem
									button
									key={value}
									sx={{
										backgroundColor: (checked.indexOf(value) !== -1)
											? "#F5F5F5"
											: ""
									}}>
									<ListItemAvatar>
										<Avatar
											alt={`Avatar n°${value + 1}`}
											src={`/avatar/${value}.png`} />
									</ListItemAvatar>
									<ListItemText
										id={labelId}
										primary={`Line item ${value + 1}`}
										secondary="email@yourdomain.com" />
									<ListItemSecondaryAction style={{ marginRight: "0.75rem" }}>
										<Checkbox
											edge="end"
											onChange={handleToggle(value)}
											checked={checked.indexOf(value) !== -1}
											inputProps={{ "aria-labelledby": labelId }} />
									</ListItemSecondaryAction>
								</ListItem>
							)
						})}
					</PerfectScrollbar>
				</List>
				<div style={{
					display: "flex", alignItems: "center", justifyContent: "space-between",
					padding: "0.5rem 1rem 0.5rem 1rem"
				}}>
					<div>
						{checked.filter(item => !!item).length} members are selected
					</div>
					<Button variant="contained" color="primary">Confirm</Button>
				</div>

			</Popover>

		</div>
	)
}
AddMemberList.propTypes = {
	departmentName: PropTypes.string,
	children: PropTypes.node
}

export default AddMemberList