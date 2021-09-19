import React from "react"
import Link from "next/link"
import makeStyles from "@mui/styles/makeStyles"
import { Typography } from "@mui/material"
import HelpfulSurvey from "./HelpfulSurvey"


const useStyles = makeStyles((theme) => ({
	main: {
		border: "1px solid",
		borderRadius: "0.5rem",
		borderColor: theme.palette.divider,
		margin: "2.625rem 0 0"
	},
	content: {
		padding: theme.spacing(8),
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(3),
		},
		"& > h1": {
			fontSize: "2rem",
			lineHeight: "2.5rem",
			margin: "0 0 .5rem"
		},
		"& > h2": {
			fontSize: "1.5rem",
			lineHeight: "2rem",
			margin: "2rem 0 .5rem"
		}
	},
	spacer: {
		borderTop: "1px solid",
		borderColor: theme.palette.divider
	}
}))

function ArticleContent() {
	const classes = useStyles()
	return (
		<main className={classes.main}>
			<div className={classes.content}>
				<Typography variant="h1">Listen to music, calls &amp; more on your Pixel phone</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography variant="h2">
					You can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography variant="h2">
					You can listen to music.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
				<Typography paragraph={true}>
					You can listen to music, calls, videos, and other sounds on your phone. You can use your phone&apos;s built-in speakers or audio accessories like headphones, earbuds, and speakers.
				</Typography>
				<Typography paragraph={true}>
					On Pixel 4a (5G) and later, to improve sound quality from your phone’s speaker, you can turn on <Link href="#ss">Adaptive Sound</Link>.
				</Typography>
			</div>
			<div className={classes.spacer}></div>
			<HelpfulSurvey />
		</main>
	)
}

export default ArticleContent