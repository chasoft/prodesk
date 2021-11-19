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

import { useGetProfilesQuery } from "@redux/slices/firestoreApi"

//THIRD-PARTY

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/**
 * get profiles of a list of provided username
 * @param {array of username || username} username 
 * @returns array of profiles
 */
export default function useGetProfileByUsername(usernames) {
	const { data: profiles = [], isLoading } = useGetProfilesQuery()

	if (isLoading || usernames === undefined) return undefined

	let filteredProfiles = undefined

	if (Array.isArray(usernames)) {
		filteredProfiles = profiles.filter(profile => usernames.includes(profile.username))
	} else {
		filteredProfiles = profiles.find(profile => profile.username === usernames)
	}

	return filteredProfiles
}