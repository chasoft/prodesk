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

import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { onChildAdded, onChildChanged, onChildRemoved, onValue, ref, remove, runTransaction, set, update } from "firebase/database"

//MATERIAL-UI
import { Box, IconButton } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import nanoid from "@helpers/nanoid"
import { usePrevious } from "react-use"
import { useSelector } from "react-redux"
import { countBy, forEach, filter, size, orderBy, random, isEqual } from "lodash"

//PROJECT IMPORT
import useAdmin from "./useAdmin"
import { realtimeDB } from "./firebase"
import { getUiSettings } from "@redux/selectors"
import { CODE, STATUS_FILTER } from "@helpers/constants"
import { useRequestRefetchingMutation } from "@redux/slices/firestoreApi"
import { ACTIONS } from "@redux/slices/firestoreApiConstants"

//ASSETS
import CloseIcon from "@mui/icons-material/Close"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { replyLinkBuilder } from "@helpers/utils"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const STRINGS = {
	notifications: "notifications",
	invalidatesTags: "invalidatesTags",
	//
	REMOVE_ONE_NOTIFICATION: "removeOneNotification",
	READ_ONE_NOTIFICATION: "readOneNotification"
}

function throwError(statusCode, action, e, data) {
	console.log(e.message)
	return {
		error: {
			status: statusCode,
			data: {
				action: action,
				message: e.message,
				data: data
			}
		}
	}
}

export const useNotificationsBase = (username, enqueueSnackbar, closeSnackbar) => {
	const [notis, setNotis] = useState([])
	const [requestRefetching] = useRequestRefetchingMutation()

	const { isAdminURL } = useAdmin()

	useEffect(() => {
		let startup = true
		let didCancel = false
		const notisRef = ref(realtimeDB, `${username}/${STRINGS.notifications}`)
		const unsubscribeOnValue = onValue(
			notisRef,
			async (snapshot) => {
				let res = []
				snapshot.forEach((childSnapshot) => {
					res.push(childSnapshot.val())
				})
				if (!didCancel) {
					setNotis(res)
					startup = false
				}
				console.log("get all notifications")
			},
			{ onlyOnce: true }
		)

		const unsubscribeOnChildAdded = onChildAdded(
			notisRef,
			async (data) => {
				if (data.val().hasBeenShowed === false) {
					const link = replyLinkBuilder(isAdminURL, data.val().content)
					enqueueSnackbar(
						data.val().content.title,
						{
							variant: "info",
							autoHideDuration: 3000,
							action: key => (
								<Box
									sx={{ display: "flex", alignItems: "center" }}
									onClick={() => { closeSnackbar(key) }}
								>
									{!!data.val().content.link &&
										<Link
											passHref
											scroll={data.val().content.actionType !== ACTIONS.ADD_TICKET_REPLY}
											href={link}
										>
											<a href="just-a-placeholder">
												<VisibilityIcon sx={{ ":hover": { color: "#F9B100" } }} />
											</a>
										</Link>}
									<IconButton
										size="small"
										sx={{ ml: 1, borderColor: "#FFFFFF" }}
									>
										<CloseIcon sx={{
											fill: "#FFF",
											":hover": { fill: "#F9B100" }
										}} />
									</IconButton>
								</Box>
							),
						}
					)
				}

				//update local
				if (!didCancel && !startup) {
					setNotis(prev => {
						console.log("onChildAdded executed")
						let updatedData = prev
						let existed = updatedData.find(i => i.nid === data.key)
						if (existed) {
							Object.assign(existed, { ...data.val(), hasBeenShowed: true })
						} else {
							updatedData = [...prev, { ...data.val(), hasBeenShowed: true }]
						}
						return updatedData
					})
				}

				//update remote db
				if (data.val().hasBeenShowed === false) {
					set(ref(realtimeDB, `${username}/${STRINGS.notifications}/${data.key}`), {
						...data.val(),
						hasBeenShowed: true
					})
				}
			})

		const unsubscribeOnChildChanged = onChildChanged(
			notisRef,
			async (data) => {
				if (!didCancel && !startup)
					setNotis(prev => {
						console.log("onChildChanged executed")
						const obj = prev.find(i => i.nid === data.key)
						Object.assign(obj, data.val())
						return prev
					})
			})

		const unsubscribeOnChildRemoved = onChildRemoved(
			notisRef,
			(data) => {
				if (!didCancel && !startup)
					setNotis(prev => {
						console.log("onChildRemoved executed")
						const updatedData = prev.filter(i => {
							return i.nid !== data.key
						})
						return updatedData
					})
			})

		return () => {
			didCancel = true
			unsubscribeOnValue()
			unsubscribeOnChildAdded()
			unsubscribeOnChildChanged()
			unsubscribeOnChildRemoved()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username, enqueueSnackbar, closeSnackbar])

	useEffect(() => {
		/**
		 * 	FOR AUTO DATA-FETCHING
		 *	{
		 *		tag: invalidatesTags,
		 *		target: {
		 *			isForUser: bool,
		 *			isForAdmin: bool,
		 *		},
		 *		randomId: random(1000)
		 *	}
		 */
		const unsubscribeFetchingOnChildChanged = onChildChanged(
			ref(realtimeDB, STRINGS.invalidatesTags),
			async (data) => {
				//only trigger refetching if currentUser is not the trigger
				//this is to prevent unnecessary double fetching data
				if (username !== data.val().trigger || data.val()?.forceRefetch) {
					if (data.val().target.isForAdmin && isAdminURL) {
						await requestRefetching(data.val().tag)
					}

					if (data.val().target.isForUser && isAdminURL === false) {
						await requestRefetching(data.val().tag)
					}
				}
			}
		)
		return () => {
			unsubscribeFetchingOnChildChanged()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return orderBy(notis, ["createdAt"], ["desc"])
}

export const useNotifications = (username, enqueueSnackbar, closeSnackbar) => {
	const { notificationInbox, forceRefreshId } = useSelector(getUiSettings)
	const notis = useNotificationsBase(username, enqueueSnackbar, closeSnackbar)

	const filteredList = useRef([])
	const prevNotis = usePrevious(notis)
	const prevInbox = usePrevious(notificationInbox)
	const prevForceRefreshId = usePrevious(forceRefreshId)
	const counter = useRef({ true: 0, false: 0 })

	if (!isEqual(prevNotis, notis)
		|| prevInbox !== notificationInbox
		|| prevForceRefreshId !== forceRefreshId) {
		switch (notificationInbox) {
			case STATUS_FILTER.ALL:
				filteredList.current = notis
				break
			case STATUS_FILTER.READ:
				filteredList.current = filter(notis, i => i.hasBeenRead === true)
				break
			case STATUS_FILTER.UNREAD:
				filteredList.current = filter(notis, i => i.hasBeenRead === false)
				break
			default:
				console.log("useNotifications - default switch => ", { notificationInbox })
		}
		counter.current = countBy(notis, "hasBeenRead")
	}

	return {
		notis: filteredList.current,
		counter: {
			allCount: size(filteredList.current),
			readCount: counter.current.true ?? 0,
			unreadCount: counter.current.false ?? 0,
		}
	}
}

export const removeNotifications = async (username, nid) => {
	console.log("removeNotifications => nid =", nid ?? "null")
	try {
		const notisRef = nid
			? ref(realtimeDB, `${username}/${STRINGS.notifications}/${nid}`)
			: ref(realtimeDB, `${username}/${STRINGS.notifications}`)
		await remove(notisRef)
		return {
			username,
			nid,
			message: "Notification(s) removed successfully",
		}
	} catch (e) {
		return throwError(CODE.FAILED, STRINGS.REMOVE_ONE_NOTIFICATION, e, { username, nid })
	}
}

export const readAllNotifications = async (username) => {
	try {
		const notisRef = ref(realtimeDB, `${username}/${STRINGS.notifications}`)
		runTransaction(notisRef, (notifications) => {
			if (notifications) {
				forEach(notifications, notification => {
					notifications[notification.nid] = {
						...notification,
						hasBeenRead: true
					}
				})
			}
			return notifications
		})
	} catch (e) {
		return throwError(CODE.FAILED, STRINGS.REMOVE_ONE_NOTIFICATION, e, { username })
	}
}

export const readNotification = async (username, nid) => {
	try {
		const notisRef = ref(realtimeDB, `${username}/${STRINGS.notifications}/${nid}`)
		runTransaction(notisRef, (notification) => {
			return ({
				...notification,
				hasBeenRead: true
			})
		})
	} catch (e) {
		return throwError(CODE.FAILED, STRINGS.READ_ONE_NOTIFICATION, e, { username })
	}
}

/**
 * Request to refetch data, isLoading
 * invalidatesTags: {
 * 						trigger: currentUser.username
						tag: [{type, id}],
						target: {
							isForUser: boolean,
							isForAdmin: boolean,
						}
					}
 * @param {object} invalidatesTags
 * @returns
 */
export const requestSilentRefetching = async (invalidatesTags) => {
	try {
		const updates = {}
		updates["invalidatesTags/details"] = {
			...invalidatesTags,
			randomId: random(1000)
		}
		await update(ref(realtimeDB), updates)
		return {
			data: {
				code: CODE.SUCCESS,
				message: "Silent refetching request sent successfully"
			}
		}
	} catch (e) {
		return throwError(CODE.FAILED, "requestSilentRefetching", e, null)
	}
}

/**
 * Send a SINGLE notification to a list of users
 * @param {array} receivers
 * @param {object} notisData
 * @returns
 */
export const addNewNotification = async (receivers, notisData = {}, invalidatesTags = {}) => {
	try {
		const nid = nanoid()
		const createdAt = dayjs().valueOf()
		const updates = {}

		receivers.forEach(username => {
			updates[username + "/" + STRINGS.notifications + "/" + nid] = {
				nid,
				hasBeenRead: false,
				hasBeenShowed: false,
				createdAt,
				content: notisData,
			}
		})

		//update invalidatesTags
		updates["invalidatesTags/details"] = {
			...invalidatesTags,
			randomId: random(1000)
		}

		await update(ref(realtimeDB), updates)

		return {
			data: {
				code: CODE.SUCCESS,
				message: "Send notification to users successfully"
			}
		}
	} catch (e) {
		return throwError(CODE.FAILED, "addNewNotification", e, null)
	}
}

/**
 * add many notifications to many users
 * @param {array of object} notisGroup
 * @param {object} invalidatesTags
 * @returns
 * Note: notisGroup : [
		{
			receivers: array of usernames
			notisData: {}
		},
		{
			receivers: array of usernames
			notisData: {}
		},
	]
 */
export const addNewNotifications = async (notisGroup = [], invalidatesTags = {}) => {
	try {
		const createdAt = dayjs().valueOf()
		const updates = {}

		forEach(notisGroup,
			(notisItem) => {
				forEach(
					notisItem.receivers,
					(username) => {
						const nid = nanoid()
						updates[username + "/" + STRINGS.notifications + "/" + nid] = {
							nid,
							hasBeenRead: false,
							hasBeenShowed: false,
							createdAt,
							content: notisItem.notisData,
						}
					}
				)
			}
		)

		//update invalidatesTags
		updates["invalidatesTags/details"] = {
			...invalidatesTags,
			randomId: random(1000)
		}

		await update(ref(realtimeDB), updates)

		return {
			data: {
				code: CODE.SUCCESS,
				message: "Send notifications to users successfully"
			}
		}
	} catch (e) {
		return throwError(CODE.FAILED, "addNewNotifications", e, null)
	}
}