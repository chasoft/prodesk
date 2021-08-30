import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"
import { LINK_TYPE } from "../constants"


const useStyles = makeStyles((theme) => ({
	main: {
		border: "1px solid",
		borderRadius: "0.5rem",
		borderColor: theme.palette.divider,
		margin: "2.625rem 0 0"
	},
	content: {
		padding: theme.spacing(8),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(3),
		},
	},
	block: {
		marginTop: theme.spacing(4),
		"& > h2": {
			fontSize: "1rem"
		}
	},
	list: {
		listStyle: "none",
		padding: 0,
		"& li": {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
			[theme.breakpoints.down("xs")]: {
				marginBottom: theme.spacing(2),
			},
		}
	}

}))

const DummyData = [
	{
		cat: "Communication apps",
		items: [
			{ subject: "Phone app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Messages app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Contacts app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Google Duo app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" }
		]
	},
	{
		cat: "Tool apps",
		items: [
			{ subject: "Camera app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Clock app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Calculator  app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Gboard  app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" }
		]
	},
	{
		cat: "Google app",
		items: [
			{ subject: "Get help from your Google Assistant", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Get info before you ask in Discover", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Search the Web with Google", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		]
	},
	{
		cat: "Other Google apps on your phone",
		items: [
			{ subject: "Android Auto app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Family Link app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Gmail app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Google Docs app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Google Earth app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Google Keep app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		]
	}
]

function CategoryContent() {
	const classes = useStyles()
	return (
		<main className={classes.main}>
			<div className={classes.content}>
				<Typography variant="h1" style={{ marginBottom: "1rem" }}>
					Article ContentGet help with apps on your phone
				</Typography>
				<Grid container spacing={2}>

					{
						DummyData.map(((block, idx) => {
							return (
								<Grid item key={idx} className={classes.block} xs={12} sm={6} >
									<Typography variant="h2">{block.cat}</Typography>
									<ul className={classes.list}>
										{
											block.items.map((link, idx) => {
												return <li key={idx}>{link.subject}</li>
											})
										}
									</ul>
								</Grid>
							)
						}))
					}

				</Grid>
			</div>
		</main>
	)
}

export default CategoryContent