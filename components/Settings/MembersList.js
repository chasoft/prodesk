/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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
import { Avatar, Button, IconButton, Tooltip, Typography } from "@mui/material"

import makeStyles from "@mui/styles/makeStyles"

//THIRD-PARTY


//PROJECT IMPORT
import AddMemberList from "./AddMemberList"


//ASSETS
import AddIcon from "@mui/icons-material/Add"
import MoreVertIcon from "@mui/icons-material/MoreVert"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	action: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: theme.spacing(2)
	},
	icons: {
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
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const MembersList = ({ dataSource, addMemberCallback }) => {
	const classes = useStyles()
	return <>
		<Typography variant="caption">There are {dataSource.length} members</Typography>
		<div className={classes.action}>
			<div className={classes.icons}>
				{
					dataSource.map((item) => {
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
			</div>
		</div>

	</>
}
MembersList.propTypes = {
	dataSource: PropTypes.array,
	addMemberCallback: PropTypes.func
}

export default MembersList