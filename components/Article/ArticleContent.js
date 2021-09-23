import React from "react"
import Link from "next/link"
import { Box, Typography } from "@mui/material"
import HelpfulSurvey from "./HelpfulSurvey"

function ArticleContent() {
	return (
		<Box
			component="main"
			sx={{
				border: "1px solid",
				borderRadius: "0.5rem",
				borderColor: "divider",
				margin: "1rem 0 0"
			}}
		>
			<Box
				sx={{
					padding: { xs: 3, md: 8 },
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
				}}
			>
				<Typography variant="h1">
					Listen to music, calls &amp; more on your Pixel phone
				</Typography>

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
			</Box>
			<Box sx={{ borderTop: "1px solid", borderColor: (theme) => theme.palette.divider }}></Box>

			<HelpfulSurvey />
		</Box>
	)
}

export default ArticleContent