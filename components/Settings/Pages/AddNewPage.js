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

// MATERIAL-UI
import { Box } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"
import { isEqual } from "lodash"
import dayjs from "dayjs"

//PROJECT IMPORT
import IconBreadcrumbs from "@components/BackEnd/IconBreadcrumbs"
import { getLayout } from "@layout/AdminLayout"
import PageForm from "./PageForm"
import { setRedirect } from "@redux/slices/redirect"
import { DOC_STATUS, REDIRECT_URL } from "@helpers/constants"
import nanoid from "@helpers/nanoid"
import { useAddPageMutation } from "@redux/slices/firestoreApi"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined"


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AddNewPage() {
	const dispatch = useDispatch()
	const [addPage] = useAddPageMutation()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const handleOnAddNewPage = async (data) => {
		const pid = nanoid()
		await addPage({
			pid,
			title: data.title,
			slug: data.slug,
			status: data.status,
			content: data.content,
			createdBy: currentUser.username,
			updatedBy: currentUser.username,
			createdAt: dayjs().valueOf(),
			updatedAt: dayjs().valueOf(),
		})
	}

	const handleOnCancel = () => {
		dispatch(setRedirect(REDIRECT_URL.ADMIN.PAGES))
	}

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			minWidth: 0,
			height: "100%",
		}}>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				pl: { xs: 0, sm: 3 },
				pt: { xs: 3, sm: 6, md: 8, lg: 10 },
				pb: 2
			}}>
				<IconBreadcrumbs
					icon={null}
					title="Add New Page"
					items={[
						{
							icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Home",
							url: REDIRECT_URL.ADMIN.INDEX
						},
						{
							icon: <LayersOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Pages",
							url: REDIRECT_URL.ADMIN.PAGES
						}
					]}
				/>
			</Box>

			<PageForm
				isCreateNew={true}
				page={{
					title: "",
					slug: "",
					content: "",
					status: DOC_STATUS.DRAFT,
				}}
				onSave={handleOnAddNewPage}
				onCancel={handleOnCancel}
			/>
		</Box>
	)
}

AddNewPage.getLayout = getLayout

export default AddNewPage