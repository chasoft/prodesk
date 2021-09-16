import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { AvatarGroup } from "@material-ui/lab"
import { Avatar } from "@material-ui/core"
import SettingsPanel, { ContentHelper, ContentHelperLearnMore, ListItem, ListTitle } from "../../components/common/SettingsPanel"

import { getLayout } from "./../../components/Settings/InnerLayoutTickets"
import updateUiSettings from "../../helpers/updateUiSettings"
import FolderIcon from '@material-ui/icons/Folder';

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
}


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}))

const DUMMY_DEPARTMENT = [
	{
		id: 1, link: "/", department: "Sales", members: [
			{ displayName: "Brian", photoURL: "/img/default-avatar.png" },
			{ displayName: "Cao Anh", photoURL: "/img/default-avatar.png" },
			{ displayName: "Phu", photoURL: "/img/default-avatar.png" }
		]
	},
	{
		id: 2, link: "/", department: "Accounts", members: [
			{ displayName: "Brian", photoURL: "/img/default-avatar.png" },
		]
	},
	{
		id: 3, link: "/", department: "Complain", members: [
		]
	},
	{
		id: 4, link: "/", department: "Technical", members: [
			{ displayName: "Brian", photoURL: "/img/default-avatar.png" },
			{ displayName: "Cao Anh", photoURL: "/img/default-avatar.png" },
			{ displayName: "Phu", photoURL: "/img/default-avatar.png" },
			{ displayName: "Tai", photoURL: "/img/default-avatar.png" },
			{ displayName: "WhoAmI", photoURL: "/img/default-avatar.png" }
		]
	},

]

export default function testtest() {
	const classes = useStyles()
	updateUiSettings({
		background: {
			height: "132px",
			backgroundImage: ""
		}
	})
	return (
		<div className={classes.root}>


			<SettingsPanel
				list={
					<>
						<ListItem
							icon={<FolderIcon fontSize="small" />}
							onClick={() => { }}
						>
							Database secrets
						</ListItem>
						<ListTitle>Legacy credentials</ListTitle>
						<ListItem
							icon={<FolderIcon fontSize="small" />}
							onClick={() => { }}
						>
							Database secrets
						</ListItem>
						<ListItem
							icon={<FolderIcon fontSize="small" />}
							onClick={() => { }}
						>
							Database secrets
						</ListItem>
					</>
				}
				helper={
					<ContentHelper title="Firebase Admin SDK">
						<div>
							Your Firebase service accrebase features, such as Database, Storage and Auth, programmatically via the unified Admin SDK.
						</div>
						<div>
							Your Firebase service accrebase features, such as Database, Storage and Auth, programmatically via the unified Admin SDK.
							<ContentHelperLearnMore onClick={() => { alert("hello") }}>Learn more</ContentHelperLearnMore>
						</div>
					</ContentHelper>
				}
			>

				sdfsdfd

			</SettingsPanel >


		</div >
	)
}

testtest.getLayout = getLayout