import React from "react"
import Reply from "./Reply"
import { Box } from "@mui/material"


function Replies() {
	return (
		<Box
			sx={{
				border: "1px solid",
				borderRadius: "0.5rem",
				borderColor: "divider",
				margin: { xs: "1.625rem 0 0", md: "2.625rem 0 0" },
			}}
		>
			<Reply isFirst={true} />
			<Reply />
			<Reply />
			<Reply />
			<Reply />
		</Box>
	)
}

export default Replies