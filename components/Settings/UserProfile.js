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

import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Avatar, Box, Button, Grid, TextField, Tooltip, Typography, IconButton, Autocomplete, Collapse, CircularProgress } from "@mui/material"

//THIRD-PARTY
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "../../redux/selectors"
import TimezoneSelect from "../common/TimezoneSelect"
import { getLayout } from "./../../layout/ClientLayout"
import { changePassword } from "../../helpers/firebase/user"
import { DefaultAvatarPanel, SimpleTogglePanel } from "../../components/common"
import { SettingsContainer, SettingsContent, SettingsHeader } from "../../components/Settings/SettingsPanel"


//ASSETS
import EditIcon from "@mui/icons-material/Edit"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { loginSuccess } from "../../redux/slices/auth"
import { useUpdateProfileMutation } from "../../redux/slices/firestoreApi"
import { useSnackbar } from "notistack"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ContentGroup = ({ title, children }) => {
	return (
		<Box sx={{
			borderBottom: "1px solid transparent",
			borderColor: "divider",
			py: 4,
		}}>
			<Typography variant="button" sx={{ display: "block", px: 4 }}>{title}</Typography>
			{children}
		</Box>
	)
}
ContentGroup.propTypes = { title: PropTypes.node, children: PropTypes.node }

const ContentDescription = ({ children }) => {
	return (
		<Typography variant="caption" sx={{
			display: "block",
			px: 4,
			py: 2,
			color: "grey.600"
		}}>
			{children}
		</Typography>
	)
}
ContentDescription.propTypes = { children: PropTypes.node }

const ContentRow = ({ title, tooltip, removePadding = false, children }) => {
	return (
		<Box sx={{
			display: "flex",
			flexDirection: { xs: "column", sm: "row" },
			px: 4,
			py: { xs: 2, sm: removePadding ? 0 : 1 },
			":hover": {
				backgroundColor: "action.hover"
			},
			transition: "height .3s cubic-bezier(0.4, 0, 0.2, 1)",
		}}>
			<Box sx={{
				width: "201px",
				display: "flex",
				alignItems: "center"
			}}>
				<Typography variant="caption" color="grey.600">
					{title}
				</Typography>
				{tooltip &&
					<Tooltip arrow title={tooltip} placement="top">
						<HelpOutlineIcon
							sx={{
								ml: 0.5,
								cursor: "pointer",
								fill: (theme) => theme.palette.grey[600],
								fontSize: "1rem"
							}}
						/>
					</Tooltip>}
			</Box>
			<Box sx={{ width: "100%" }}>
				{children}
			</Box>
		</Box>
	)
}
ContentRow.propTypes = {
	title: PropTypes.node,
	tooltip: PropTypes.string,
	removePadding: PropTypes.bool,
	children: PropTypes.node
}

const EditButton = ({ defaultState, saveAction, cancelAction = () => { }, isUpdating = false, canSave = true, children }) => {
	const [isEditMode, setIsEditMode] = useState(false)
	return (
		<>
			<Collapse in={!isEditMode}>
				<Box sx={{
					display: "flex",
					alignItems: "center"
				}}>
					{defaultState}
					<IconButton onClick={() => { setIsEditMode(true) }} disabled={isUpdating}>
						<EditIcon fontSize="small" />
					</IconButton>
					{isUpdating && <CircularProgress size={16} />}
				</Box>
			</Collapse>

			<Collapse in={isEditMode}>
				<Box sx={{ width: "100%" }}>
					<Box sx={{ pt: 3 }}>
						{children}
					</Box>
					<Box sx={{
						display: "flex",
						justifyContent: "flex-end",
						pb: 3, pt: 2, mt: 2,
						borderTop: "1px solid transparent",
						borderColor: "divider",
					}}>
						<Button
							onClick={() => {
								cancelAction()
								setIsEditMode(false)
							}}
							variant="outlined"
							color="primary"
							size="small"
							sx={{ px: 3 }}
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								saveAction()
								setIsEditMode(false)
							}}
							type="submit"
							variant="contained"
							color="primary"
							size="small"
							sx={{ px: 3, ml: 2 }}
							disabled={!canSave}
						>
							Save
						</Button>
					</Box>
				</Box>
			</Collapse>
		</>
	)
}
EditButton.propTypes = {
	defaultState: PropTypes.node,
	saveAction: PropTypes.func,
	cancelAction: PropTypes.func,
	isUpdating: PropTypes.bool,
	canSave: PropTypes.bool,
	children: PropTypes.node
}

const countries = [
	{ code: "CN", label: "China" },
	{ code: "US", label: "United States", suggested: true, },
	{ code: "VN", label: "Vietnam" },
]

const CountrySelect = () => {
	return (
		<Autocomplete
			id="language-select"
			sx={{ width: 300 }}
			options={countries}
			autoHighlight
			getOptionLabel={(option) => option.label}
			renderOption={(props, option) => (
				<Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
					<img
						loading="lazy"
						width="20"
						src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
						srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
						alt=""
					/>
					{option.label} ({option.code})
				</Box>
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Choose a language"
					inputProps={{
						...params.inputProps,
						autoComplete: "new-password", // disable autocomplete and autofill
					}}
				/>
			)}
		/>
	)
}

const validationChangePassword = yup.object({
	currentPassword: yup
		.string("Enter your current password")
		.required("Current password is required"),
	newPassword: yup
		.string("Enter your new password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("New password is required"),
	confirmPassword: yup
		.string("Confirm your password")
		.oneOf([yup.ref("newPassword"), null], "Passwords must match")
		.required("Confirm your password"),
})

const ChangePasswordForm = () => {

	const { currentUser } = useSelector(getAuth)
	const { enqueueSnackbar } = useSnackbar()
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

	const formik = useFormik({
		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: ""
		},
		validationSchema: validationChangePassword,
		onSubmit: async (values) => {
			setIsUpdatingPassword(true)
			const res = await changePassword({
				email: currentUser.email,
				password: values.currentPassword,
				newPassword: values.newPassword
			})
			if (res?.error) enqueueSnackbar(res.error, { variant: "error" })
			setIsUpdatingPassword(false)
		}
	})

	return (
		<EditButton
			defaultState="Username and password"
			saveAction={() => {
				if (!formik.isValid) return false
				formik.handleSubmit()
			}}
			cancelAction={formik.handleReset}
			isLoading={isUpdatingPassword}
			canSave={formik.isValid}
		>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							id="currentPassword"
							label="Current password"
							value={formik.values.currentPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
							helperText={formik.touched.currentPassword && formik.errors.currentPassword}
							type="password"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="newPassword"
							label="New password"
							value={formik.values.newPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
							helperText={formik.touched.newPassword && formik.errors.newPassword}
							type="password"
						/>
					</Grid>
					<Grid item xs={12} >
						<TextField
							id="confirmPassword"
							label="Confirm new password"
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
							helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
							type="password"
						/>
					</Grid>
				</Grid>
			</form>

		</EditButton>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function UserProfile() {
	const { currentUser } = useSelector(getAuth)
	const dispatch = useDispatch()
	const [displayName, setDisplayName] = useState(currentUser.displayName)
	const [avatar, setAvatar] = useState(currentUser.photoURL ?? "/avatar/default.png")
	const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false)
	const [isUpdatingDisplayName, setIsUpdatingDisplayName] = useState(false)

	//
	const [updateProfile] = useUpdateProfileMutation({ uid: currentUser.uid })

	const handleSaveAvatar = async () => {
		setIsUpdatingAvatar(true)
		await updateProfile({
			uid: currentUser.uid,
			photoURL: avatar
		})
		dispatch(loginSuccess({ photoURL: avatar }))
		setIsUpdatingAvatar(false)
	}

	const handleCancelAvatar = () => {
		//revert any changes made to avatar
		setAvatar(currentUser.photoURL ?? "/avatar/default.png")
	}

	const handleSaveDisplayName = async () => {
		setIsUpdatingDisplayName(true)
		await updateProfile({
			uid: currentUser.uid,
			displayName
		})
		dispatch(loginSuccess({ displayName }))
		setIsUpdatingDisplayName(false)
	}

	const handleCancelDisplayName = () => {
		setDisplayName(currentUser.displayName)
	}

	return (
		<>
			<SettingsHeader>
				<Typography variant="h1" color="white">Your Account Settings</Typography>
			</SettingsHeader>

			<SettingsContainer>
				<SettingsContent>

					<ContentGroup title="Profile">
						<ContentRow title="Avatar">
							<EditButton
								defaultState={<Avatar variant="square" src={avatar} sx={{ width: 64, height: 64 }} />}
								saveAction={handleSaveAvatar}
								cancelAction={handleCancelAvatar}
								isUpdating={isUpdatingAvatar}
							>
								<Grid container spacing={2}>
									<Grid item>
										<Avatar src={avatar} sx={{ width: 128, height: 128 }} />
									</Grid>
									<Grid item>
										<Button variant="outlined" color="secondary">Choose Image</Button>
										<SimpleTogglePanel title="or choose one of our defaults" isExpanded={true}>
											<DefaultAvatarPanel
												callback={setAvatar}
												defaultAvatar={avatar}
											/>
										</SimpleTogglePanel>
									</Grid>
								</Grid>
							</EditButton>
						</ContentRow>
						<ContentRow title="Username">
							{currentUser.username}
						</ContentRow>
						<ContentRow tooltip="For decoration only" title="Display name" removePadding>
							<EditButton
								defaultState={displayName}
								saveAction={() => { handleSaveDisplayName() }}
								cancelAction={() => { handleCancelDisplayName() }}
								isUpdating={isUpdatingDisplayName}
							>
								<TextField
									label="Display name"
									value={displayName}
									onChange={(e) => { setDisplayName(e.target.value) }}
								/>
							</EditButton>
						</ContentRow>
						<ContentRow title="User type">
							Customer
						</ContentRow>
						<ContentRow title="Description">
							You are currently an customer
						</ContentRow>
					</ContentGroup>

					<ContentGroup title="Login">
						<ContentDescription>
							You can change your password by click on the edit icon below
						</ContentDescription>
						<ContentRow title="Login method" removePadding>

							<ChangePasswordForm />

						</ContentRow>
					</ContentGroup>

					<ContentGroup title="Preferences">
						<ContentRow title="Language" removePadding>
							<EditButton
								defaultState="United States"
								saveAction={() => { }}
							>
								<CountrySelect />
							</EditButton>
						</ContentRow>
						<ContentRow title="Timezone" removePadding>

							<EditButton
								defaultState="(UTC+07:00) Bangkok, Hanoi, Jakarta"
								saveAction={() => { }}
							>
								<TimezoneSelect />
							</EditButton>
						</ContentRow>
					</ContentGroup>

				</SettingsContent>
			</SettingsContainer>
		</>
	)
}

UserProfile.getLayout = getLayout

export default UserProfile