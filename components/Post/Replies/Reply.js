import React from "react"
import { Box } from "@mui/material"
import ReplyHeader from "./ReplyHeader"
import ReplyPayload from "./ReplyPayload"
import ReplyNotice from "./ReplyNotice"
import PropTypes from "prop-types"

function Reply({ isFirst = false }) {
	return (
		<Box component="main"
			sx={{
				px: { xs: 3, md: 3 },
				py: { xs: 3, md: 2 },
				...(!isFirst && { borderTop: "1px solid", borderColor: "divider" })
			}}
		>
			<ReplyHeader />
			<ReplyPayload />
			<ReplyNotice />
		</Box>
	)
}
Reply.propTypes = { isFirst: PropTypes.bool }

export default Reply