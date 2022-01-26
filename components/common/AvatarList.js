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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Avatar, AvatarGroup } from "@mui/material"

//THIRD-PARTY
import { useDeepCompareEffect } from "react-use"

//PROJECT IMPORT
import { EMPTY, USERGROUP } from "@helpers/constants"
import { CircularProgressBox } from "@components/common"
import useProfilesGroup from "@helpers/useProfilesGroup"

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

/* members is just array of usernames */
function AvatarList({ members }) {
	const [membersProfile, setMembersProfile] = useState([])
	const {
		userList: staffList = EMPTY.ARRAY,
		isLoading: isLoadingStaffList
	} = useProfilesGroup([USERGROUP.STAFF.code])

	useDeepCompareEffect(() => {
		const verifiedList = members.map(u => staffList.find(i => i.username === u)).filter(i => i !== undefined)
		setMembersProfile(verifiedList)
	}, [staffList, members])

	if (isLoadingStaffList)
		return <CircularProgressBox minHeight="50px" />

	return (
		<AvatarGroup max={3}>
			{membersProfile.map((item) =>
				<Avatar
					key={item.username}
					alt={item.displayName}
					src={item.photoURL}
				/>
			)}
		</AvatarGroup>
	)
}
AvatarList.propTypes = { members: PropTypes.array }

export default AvatarList
