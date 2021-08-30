/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React from "react"
import { Avatar, Chip, makeStyles, Typography } from "@material-ui/core"

import FaceIcon from "@material-ui/icons/Face"
import DoneIcon from "@material-ui/icons/Done"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2)
	},
	content: {
		display: "flex",
		justifyContent: "flex-start",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(0.5),
		},
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const ThreadMessageDetails = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Typography style={{ fontWeight: "500" }}>Details</Typography>
			<div className={classes.content}>
				<Chip size="small" avatar={<Avatar>M</Avatar>} label="Clickable" onClick={() => { }} />
				<Chip size="small" label="Deletable Primary" onDelete={() => { }} color="primary" />
				<Chip
					size="small"
					icon={<FaceIcon />}
					label="Clickable Deletable"
				// onClick={handleClick}
				// onDelete={handleDelete}
				/>
				<Chip
					size="small"
					icon={<FaceIcon />}
					label="Primary Clickable"
					clickable
					color="primary"
					// onDelete={handleDelete}
					deleteIcon={<DoneIcon />}
				/>
			</div>
		</div>
	)
}

export default ThreadMessageDetails