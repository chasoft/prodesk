import Link from "next/link"
import React, { useState } from "react"
import Box from "@mui/material/Box"
import { Button } from "@mui/material"

import { getLayout } from "./../../layout/BlankLayout"

import ColorPicker from "./../../components/common/ColorPicker"
import { getPlainTextFromMarkDown } from "./../../helpers/utils"
import { useDispatch } from "react-redux"

import { ImportIcon, ExportPdfIcon, NewArticleIcon } from "./../../components/common/SvgIcons"

export default function testtest() {
	const [color, setColor] = useState("")

	const dispatch = useDispatch()
	return (
		<div style={{ position: "absolute", top: "100px", left: "200px" }}>


			<ColorPicker getSelectedColor={(c) => setColor(c)} />

			<Link href="/docs">
				<div>you selected {color}</div>
			</Link>

			<ImportIcon />
			<ExportPdfIcon />
			<NewArticleIcon />
			<Link href="/" passHref>
				<div role="link">Go Home</div>
			</Link>





		</div>
	)
}
