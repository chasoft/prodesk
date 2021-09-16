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
import { useRouter } from "next/router"

// MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles"
import { Button, FormControlLabel, IconButton, Link, Paper, Switch, TextField, Tooltip, Typography } from "@material-ui/core"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout, TICKET_SETTINGS_NAMES } from "../../../../../components/Settings/InnerLayoutTickets"
import updateUiSettings from "../../../../../helpers/updateUiSettings"
// import GeneralList from "../../../../../components/common/GeneralList"
// import GeneralListItem, { GeneralListItemEmpty } from "../../../../../components/common/GeneralList/GeneralListItem"
// import AvatarList from "../../../../../components/common/AvatarList"

//ASSETS
// import AddIcon from "@material-ui/icons/Add"
// import TicketDepartmentDetailsDialog from "../../../../../components/Settings/TicketDepartmentDetailsDialog"
// import AddMemberList from "../../../../../components/Settings/AddMemberList"
import DeleteIcon from "@material-ui/icons/Delete"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import LaunchIcon from "@material-ui/icons/Launch"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	// paper: {
	// 	marginTop: theme.spacing(8),
	// 	[theme.breakpoints.down("xs")]: {
	// 		marginTop: theme.spacing(3),
	// 	},
	// 	display: "flex",
	// 	flexDirection: "column",
	// 	alignItems: "center",
	// },
	helpBox: {
		padding: "1rem",
		borderBottom: `1px solid ${theme.palette.divider}`,
		fontSize: 16
	},
	group: {
		margin: "1.5rem 0",
		marginBottom: 0,
		[theme.breakpoints.down("xs")]: {
			margin: "1.625rem 0",
		},
	},
	content: {
		padding: "1rem",
	}


}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function DepartmentDetails() {
	const classes = useStyles()
	const router = useRouter()
	const { did } = router.query

	updateUiSettings({
		activeTab: TICKET_SETTINGS_NAMES.DEPARTMENT,
		background: {
			height: "132px",
			backgroundImage: ""
		}
	})

	return (
		<div className={classes.paper}>
			<div className={classes.root}>

				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Tooltip title="Go back to the departments list" placement="top">
							<IconButton onClick={() => router.back()}>
								<NavigateBeforeIcon />
							</IconButton>
						</Tooltip>
						<Typography variant="h2" style={{ margin: 0 }}>fdskfjlkjsdflkds</Typography>
					</div>
					<div>
						<Button
							variant="contained"
							color="secondary"
							className={classes.button}
							startIcon={<DeleteIcon />}
						>Delete Department</Button>
					</div>
				</div>

				<Paper elevation={2} className={classes.group}>

					<div className={classes.helpBox}>
						<Typography variant="button" style={{ display: "block" }}>Email address change</Typography>
						<Typography variant="caption">
							For security, when a user changes their email address, their original address so they can review the change
							<span style={{ display: "inline-block", marginLeft: "5px" }}>
								<Link href="https://support.chasoft.net">
									<a>
										<div style={{ display: "flex", alignItems: "center" }}>
											Learn more <LaunchIcon style={{ fontSize: 16 }} />
										</div>
									</a>
								</Link>
							</span>
						</Typography>
					</div>

					<div className={classes.content}>

						<div>
							<FormControlLabel
								control={
									<TextField label="Name of the department" placeholder="eg. Sales, Accounting..." />
								}
							/>
						</div>

						<div>
							<FormControlLabel
								control={
									<Switch
										// checked={state.checkedB}
										// onChange={handleChange}
										name="checkedB"
										color="primary"
									/>
								}
								label="Primary"
							/>

							<FormControlLabel
								control={
									<Switch
										// checked={state.checkedB}
										// onChange={handleChange}
										name="checkedB"
										color="primary"
									/>
								}
								label="Primary"
							/>

						</div>
					</div>

				</Paper>

			</div>
		</div>
	)
}
DepartmentDetails.propTypes = { dataSource: PropTypes.array }

DepartmentDetails.getLayout = getLayout

export default DepartmentDetails