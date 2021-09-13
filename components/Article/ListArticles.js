import React, { useEffect, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "2.625rem 0 0"
	},
	nav: {
		display: "flex",
		flexDirection: "column",
		marginLeft: "3.125rem",
		[theme.breakpoints.down("xs")]: {
			marginLeft: "1.125rem"
		},
	},
	list: {
		display: "flex",
		flexDirection: "column",
		listStyle: "none",
		paddingLeft: 0,
		"& > li": {
			display: "flex",
			flexDirection: "row",
			"& > :first-child": {
				marginTop: ".7rem",
				height: "1.25rem",
				width: "1.25rem",
				minWidth: "1.25rem"
			},
			"& > :last-child": {
				padding: ".625rem 0 .625rem .875rem"
			}

		}
	},
}))


const ItemIcon = (props) => {
	return <svg {...props} viewBox="0 0 24 24">
		<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path>
	</svg>

}

function ListArticles() {
	const classes = useStyles()
	const [fixed, setFixed] = useState(false)
	const listRef = useRef(null)

	const fixedPosition = () => {
		// setFixed(((listRef.current.clientHeight + 110) < window.innerHeight) ? (window.scrollY > 20) ? true : false : false)
		setFixed(((listRef.current.clientHeight + 110) < window.innerHeight) ? true : false)
	}

	/* Activate resize listener */
	useEffect(() => {
		fixedPosition()
		window.addEventListener("resize", fixedPosition)
		return () => window.removeEventListener("resize", fixedPosition)
	}, [])

	/* Activate resize listener */
	useEffect(() => {
		window.addEventListener("scroll", fixedPosition)
		return () => window.removeEventListener("scroll", fixedPosition)
	}, [])

	return (
		<div ref={listRef} className={classes.root} style={{ position: fixed ? "fixed" : "static" }}>
			<nav className={classes.nav}>
				<Typography variant="h2">Google services &amp; your child&apos;s Google Account</Typography>
				<ul className={classes.list}>
					<li>
						<ItemIcon />
						<Typography>Chrome &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Maps &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default ListArticles