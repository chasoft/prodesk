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
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import AddMemberList from "./AddMemberList"

//ASSETS
import AddIcon from "@mui/icons-material/Add"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const MembersList = ({ dataSource, addMemberCallback }) => {
	return <>
		<Typography variant="caption">There are {dataSource?.length} members</Typography>
		<Box sx={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			mt: 2
		}}>
			<Box sx={{
				display: "flex",
				justifyContent: "center",
				alignContent: "flex-start",
				alignItems: "center",
				"& > *": {
					marginRight: "5px",
				},
				"& > *:last-child": {
					marginRight: 0,
				}
			}}>
				{
					dataSource?.map((item) => {
						return (
							<Tooltip key={item.username} title={item.displayName} placement="bottom">
								<Avatar
									alt={item.displayName}
									src={item.photoURL}
								/>
							</Tooltip>
						)
					})
				}

				{/* TODO!: Implement add members feature */}

				<AddMemberList
					department=""
					members={dataSource}
					addMemberCallback={addMemberCallback}
				>
					<Tooltip title="Add members" placement="bottom">
						<IconButton color="primary" size="large">
							<AddIcon />
						</IconButton>
					</Tooltip>
				</AddMemberList>
			</Box>
		</Box>

	</>
}
MembersList.propTypes = {
	dataSource: PropTypes.array,
	addMemberCallback: PropTypes.func
}

export default MembersList