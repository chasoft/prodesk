import React, { useState } from "react"
import Box from "@mui/material/Box"
import { Button } from "@mui/material"

import { getLayout } from "./../../layout/BlankLayout"

import ColorPicker from "./../../components/common/ColorPicker"
import { getPlainTextFromMarkDown } from "../../helpers/utils"

const testss = () => {
	const a = '# yest please\n\n- [ ] item 1…2\n\n\\\n'
	return getPlainTextFromMarkDown(a)
}

export default function testtest() {
	const [color, setColor] = useState("")
	return (
		<div style={{ position: "absolute", top: "100px", left: "200px" }}>


			<ColorPicker getSelectedColor={(c) => setColor(c)} />

			you selected {color}

			{testss()}
			{console.log(testss())}

		</div>
	)
}
