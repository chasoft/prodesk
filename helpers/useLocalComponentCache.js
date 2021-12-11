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

import React, { useState } from "react"

//THIRD-PARTY
import { get, set, cloneDeep } from "lodash"
import { useDeepCompareEffect } from "react-use"

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useLocalComponentCache(_object = {}) {
	const [cache, setCache] = useState(_object)

	useDeepCompareEffect(() => {
		setCache(_object)
	}, [_object])

	const handlers = React.useMemo(
		() => ({
			setLocalCache: (value, path = "", toggle = false) => {
				if (path === "")
					setCache(value)
				else
					setCache(
						(prevState) => {
							let newCache = cloneDeep(prevState)
							set(
								newCache,
								path,
								toggle
									? !get(prevState, path)
									: value
							)
							return newCache
						}
					)
			}
		}), [])

	return {
		localCache: cache,
		handlers
	}
}