import React from "react"
import { Breadcrumbs, Link, Typography } from "@mui/material"

import NavigateNextIcon from "@mui/icons-material/NavigateNext"


const ProBreadcrumbs = () => {
	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
			sx={{
				pl: { xs: 1, sm: 2 },
				pt: 5
			}}
		>

			<Link
				underline="hover"
				color="inherit"
				href="/"
				onClick={() => { }}
			>
				MUI
			</Link>

			<Link
				underline="hover"
				color="inherit"
				href="/getting-started/installation/"
				onClick={() => { }}
			>
				Core
			</Link>

			<Typography color="text.primary">
				Breadcrumb
			</Typography>
		</Breadcrumbs>
	)
}

export default ProBreadcrumbs