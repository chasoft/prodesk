/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║      DomainHub - Your Trusted Domain Partner (SaaS Platform)      ║ *
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
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

//THIRD-PARTY
import AvatarList from "../../common/AvatarList"
import { SettingsContent, SettingsContentHelper, SettingsContentHelperText } from "../../common/SettingsPanel"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
	},
}))

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DepartmentsOverview = ({ dataDepartments, callback }) => {
	const classes = useStyles()

	if (dataDepartments.length === 0) {
		return (
			<SettingsContent>
				<div style={{ display: "flex", alignItems: "center" }} >
					<Typography>
						You have no department at the moment.
					</Typography>
				</div>
			</SettingsContent >
		)
	}

	return (
		<SettingsContent>

			<SettingsContentHelper>
				<SettingsContentHelperText>
					Department Overview
				</SettingsContentHelperText>
			</SettingsContentHelper>

			{
				dataDepartments.map((item) => {
					return (
						<div
							key={item.id}
							className={classes.item}
							onClick={() => callback(item.id)}
						>

							<div className={classes.itemContent}>

								<Typography variant="h3" style={{ margin: 0 }}>{item.department}</Typography>
								<div style={{ display: "flex", alignItems: "center" }}>
									<Typography variant="caption">{item.description}</Typography>
									{item.description ? <>&nbsp; |&nbsp; </> : null}
									<Typography variant="caption" style={{ margin: 0 }}>
										{item.members.length} members
									</Typography>
								</div>

							</div>

							<div className={classes.itemExtraContent}>
								<div style={{ display: "flex", alignItems: "center" }}>

									<AvatarList dataSource={item.members} />

								</div>
							</div>

						</div>
					)
				})
			}




		</SettingsContent>
	)
}

DepartmentsOverview.propTypes = {
	dataDepartments: PropTypes.array,
	callback: PropTypes.func,
}

export default DepartmentsOverview