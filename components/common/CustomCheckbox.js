import React from "react"
import { Checkbox } from "@mui/material"
import { CheckBoxNewIcon } from "../svgIcon"
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp"

function CustomCheckbox(props) {
	return (
		<Checkbox
			sx={{
				padding: "0.25rem",
				marginLeft: "0.25rem"
			}}
			color="primary"
			icon={<CheckBoxOutlineBlankSharpIcon />}
			checkedIcon={<CheckBoxNewIcon />}
			{...props} />
	)
}

export default CustomCheckbox