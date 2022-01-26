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

import React, { useCallback } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, InputBase, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { isEqual, trim } from "lodash"
import slugify from "react-slugify"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { AutoGenerateSlugSwitch } from "@components/Documentation/TocSideBar/TocSideBarDetails"
import { DOC_STATUS, DATE_FORMAT, SETTINGS_NAME } from "@helpers/constants"
import { getLayout } from "@layout/AdminLayout"
import { SettingsSwitch } from "@components/common/Settings"
import TextEditor from "@components/common/TextEditor"
import useAppSettings from "@helpers/useAppSettings"
import useLocalComponentCache from "@helpers/useLocalComponentCache"

//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function PropertyRow({ title, children }) {
	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			flexDirection: { xs: " column", md: "row" },
			minHeight: { xs: "80px", md: "50px" },
			p: 1,
			px: 2,
			mx: -2,
			":hover": {
				backgroundColor: "action.hover",
				borderRadius: 1,
				"div > .input": {
					borderBottom: "1px solid silver",
					boxSizing: "border-box"
				},
			}
		}}>
			<Typography
				sx={{
					minWidth: { xs: "100%", md: "100px" },
					color: "grey.500"
				}}
			>
				{title}
			</Typography>
			<Box sx={{
				display: "flex",
				width: "100%",
			}}>
				{children}
			</Box>
		</Box >
	)
}
PropertyRow.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
}


function PageTitle({ title, setLocalCache, autoGenerateSlugFromTitle }) {

	return (
		<PropertyRow title="Page title">
			<InputBase
				id="page-title"
				placeholder="Page title"
				variant="outlined"
				className="input"
				value={title}
				onChange={(e) => {
					setLocalCache(e.target.value, "title")
					if (autoGenerateSlugFromTitle) {
						setLocalCache(slugify(e.target.value), "slug")
					}
				}}
				sx={{
					fontSize: { xs: "1rem", md: "1.2rem" },
					fontWeight: "bold",
					color: "grey.800",
					flexGrow: 1,
					borderBottom: "1px solid transparent",
				}}
			/>
		</PropertyRow>
	)
}
PageTitle.propTypes = {
	title: PropTypes.string.isRequired,
	setLocalCache: PropTypes.func.isRequired,
	autoGenerateSlugFromTitle: PropTypes.bool.isRequired
}

function PageSlug({ title, slug, setLocalCache, autoGenerateSlugFromTitle }) {
	const handleUpdateSlug = useCallback((checked) => {
		if (checked && title) {
			setLocalCache(slugify(title), "slug")
		}
	}, [setLocalCache, title])
	return (
		<PropertyRow title="Slug">
			<InputBase
				id="doc-slug"
				className="input"
				placeholder="slug that can not be empty"
				value={slug}
				onChange={(e) => setLocalCache(e.target.value, "slug")}
				disabled={autoGenerateSlugFromTitle}
				sx={{
					borderBottom: "1px solid transparent",
					flexGrow: 1,
					...(autoGenerateSlugFromTitle && {
						backgroundColor: "action.hover",
						ml: -1, pl: 1,
						borderRadius: "0.25rem"
					})
				}}
			/>
			<AutoGenerateSlugSwitch callback={handleUpdateSlug} />
		</PropertyRow>
	)
}
PageSlug.propTypes = {
	title: PropTypes.string,
	slug: PropTypes.string.isRequired,
	setLocalCache: PropTypes.func.isRequired,
	autoGenerateSlugFromTitle: PropTypes.bool.isRequired
}

const PublishStatusSection = React.memo(function _PublishStatusSection({ isCreateNew, localCache, setLocalCache }) {
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	console.log("PublishStatusSection")
	return (
		<PropertyRow title="Status">
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<SettingsSwitch
					state={localCache.status === DOC_STATUS.PUBLISHED}
					setState={(status) => {
						if (status)
							setLocalCache(DOC_STATUS.PUBLISHED, "status")
						else
							setLocalCache(DOC_STATUS.DRAFT, "status")
					}}
					stateDescription={["DRAFT", "PUBLISHED"]} />

				{(localCache.status === DOC_STATUS.PUBLISHED) && !isCreateNew &&
					<Typography variant="caption" sx={{
						textAlign: "left",
						fontSize: "0.8rem",
						color: "text.secondary",
					}}>
						Published at {dayjs(localCache.publishedDate ? localCache.publishedDate : undefined).format(DATE_FORMAT.LONG)} by {localCache.publishedBy ? localCache.publishedBy : currentUser.username}
						<span style={{ fontStyle: "italic" }}> ({dayjs(localCache.publishedDate ? localCache.publishedDate : undefined).fromNow()})</span>
					</Typography>}
			</Box>
		</PropertyRow>
	)
}, (prevProps, nextProps) => prevProps.localCache.status === nextProps.localCache.status)
PublishStatusSection.propTypes = {
	isCreateNew: PropTypes.bool.isRequired,
	localCache: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function PageForm({ isCreateNew, page, onSave, onCancel }) {
	const {
		localCache, handlers: { setLocalCache }
	} = useLocalComponentCache(page)

	const {
		data: autoGenerateSlugFromTitle = false
	} = useAppSettings(SETTINGS_NAME.autoGenerateSlugFromTitle)

	const handleUpdateTextEditorContent = useCallback((data) => {
		setLocalCache(data, "content")
	}, [setLocalCache])

	const isModified =
		localCache.title
		&& localCache.slug
		&& trim(localCache.content) !== ""
		&& trim(localCache.content) !== "\\"
		&& (isCreateNew
			? true
			: !isEqual(page, localCache))

	console.log(!isEqual(page, localCache))
	console.log({ isModified })

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			width: "100%",
			mt: 4,
		}}>
			<PageTitle
				title={localCache.title}
				setLocalCache={setLocalCache}
				autoGenerateSlugFromTitle={autoGenerateSlugFromTitle}
			/>
			<PageSlug
				title={localCache.title}
				slug={localCache.slug}
				setLocalCache={setLocalCache}
				autoGenerateSlugFromTitle={autoGenerateSlugFromTitle}
			/>
			<PublishStatusSection
				isCreateNew={isCreateNew}
				localCache={localCache}
				setLocalCache={setLocalCache}
			/>

			<Box id="buttons" sx={{
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "center",
				py: 2
			}}>

				<Button
					disabled={!isModified}
					variant="contained"
					sx={{ minWidth: { xs: "50%", sm: "100px" } }}
					onClick={() => onSave(localCache)}
				>
					{isCreateNew ? "Add" : "Update"}
				</Button>

				<Button
					variant="outlined"
					sx={{ minWidth: { xs: "50%", sm: "100px" }, ml: 1 }}
					onClick={() => onCancel()}
				>
					Cancel
				</Button>

			</Box>

			<Box sx={{
				pl: { xs: 1, sm: 4 },
				py: 4, mb: 3,
				borderTop: "1px solid #F0F0F0",
				borderBottom: "1px solid #F0F0F0"
			}}>
				<TextEditor
					value={page.content}
					onChange={handleUpdateTextEditorContent}
					placeholder="Your content goes here..."
				/>
			</Box>

		</Box>
	)
}
PageForm.propTypes = {
	isCreateNew: PropTypes.bool.isRequired,
	page: PropTypes.object,
	onSave: PropTypes.func,
	onCancel: PropTypes.func,
}

PageForm.getLayout = getLayout

export default PageForm