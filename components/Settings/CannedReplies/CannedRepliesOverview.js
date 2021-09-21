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

//PROJECT IMPORT

import React from "react"
import PropTypes from "prop-types"

import { Box, Container, Typography } from "@mui/material"

//THIRD-PARTY
import AvatarList from "../../common/AvatarList"
import { SettingsContent, SettingsContentHeader, SettingsContentHelper, SettingsContentHelperText } from "../../common/SettingsPanel"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesOverview = ({ dataCannedReplies, callback }) => {
	if (dataCannedReplies.length === 0) {
		return (
			<SettingsContent>
				<SettingsContentHeader>
					Canned replies overview
				</SettingsContentHeader>

				<Container sx={{ pt: { xs: 3, sm: 2 } }}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
						<Typography>
							You have no canned replies at the moment.
						</Typography>
					</div>
				</Container>
			</SettingsContent >
		)
	}

	return (
		<SettingsContent>

			<SettingsContentHeader>
				Departments overview
			</SettingsContentHeader>

			<SettingsContentHelper>
				<SettingsContentHelperText>
					Department Overview Department Overview Department Overview Department Overview Department Overview
					Department Overview Department Overview Department Overview Department Overview Department Overview
				</SettingsContentHelperText>
				<SettingsContentHelperText>
					Department Overview Department Overview Department Overview Department Overview Department Overview
					Department Overview
				</SettingsContentHelperText>
			</SettingsContentHelper>

			{dataCannedReplies.map((item) => (
				<Box
					key={item.id}
					onClick={() => callback(item.id)}
					sx={{
						display: "flex",
						p: 3,
						":hover": {
							cursor: "pointer",
							bgcolor: "action.hover",
						},
						":last-child:hover": {
							borderBottomRightRadius: "0.5rem",
						},
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
						<Typography variant="h3" style={{ margin: 0 }}>{item.department}</Typography>
						<Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
							<Typography variant="caption" sx={{ margin: 0 }}>
								{item.description}
								{item.description ? <>&nbsp; | &nbsp; </> : null}
							</Typography>

							<Typography variant="caption" style={{ margin: 0 }}>
								{item.members.length} members
							</Typography>
						</Box>
					</Box>

					<Box sx={{ display: "flex", alignItems: "center" }}>
						<AvatarList dataSource={item.members} />
					</Box>

				</Box>
			))}

		</SettingsContent>
	)
}

CannedRepliesOverview.propTypes = {
	dataCannedReplies: PropTypes.array,
	callback: PropTypes.func,
}

export default CannedRepliesOverview