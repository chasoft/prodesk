/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import Link from "next/link"
import React, { useCallback, useState } from "react"

// MATERIAL-UI
import { Button, Grid, Typography, Box, TextField, Container, Autocomplete, CircularProgress } from "@mui/material"

//THIRD-PARTY
import { serverTimestamp } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { forEach, groupBy, filter, sortBy, cloneDeep, uniqueId, update, findKey, omit, size } from "lodash"

//PROJECT IMPORT
import { getLayout } from "./../../layout/BlankLayout"
import ColorPicker from "./../../components/common/ColorPicker"
import { getPlainTextFromMarkDown } from "./../../helpers/utils"

//ASSETS
import { ImportIcon, ExportPdfIcon, NewDocIcon } from "./../../components/common/SvgIcons"
import { nanoid } from "nanoid"
import { DOC_TYPE } from "../../helpers/constants"
import { db } from "../../helpers/firebase"
import { doc, getDoc } from "@firebase/firestore"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const top100Films = [
	{ title: "The Shawshank Redemption", year: 1994 },
	{ title: "The Godfather", year: 1972 },
	{ title: "The Godfather: Part II", year: 1974 },
	{ title: "The Dark Knight", year: 2008 },
	{ title: "12 Angry Men", year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: "Pulp Fiction", year: 1656 }
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function TestPage() {
	const [value, setValue] = useState("")
	const [selected, setSelected] = useState([])


	const [onInputChangeValue, setOnInputChangeValue] = useState("")
	const [onChangeValue, setOnChangeValue] = useState("")
	return (
		<Container sx={{ marginTop: 10 }}>
			<Autocomplete
				multiple
				options={top100Films}
				getOptionLabel={(option) => option.title}
				id="tags-standard"
				renderInput={(params) => (
					<TextField
						{...params}
						variant="standard"
						label="Multiple values"
						value={value}
						onChange={(e) => { setValue(e.target.value) }}
						placeholder="Favorites"
					/>
				)}

				onInputChange={(event, value, reason) => {
					setOnInputChangeValue({ value, reason })
				}}

				onChange={(event, value, reason) => {
					setOnChangeValue({ value, reason })
				}}
				value={selected}
			/>
			<Box sx={{ mt: 25, p: 5, backgroundColor: "silver" }}>
				onInputChangeValue: {JSON.stringify(onInputChangeValue)}
			</Box>
			<Box sx={{ p: 5, backgroundColor: "blue", color: "white" }}>
				onChangeValue: {JSON.stringify(onChangeValue)}
			</Box>

			<Button onClick={() => {
				setSelected(["hello", "world"])
			}}>
				Set Default Value
			</Button>


			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "200px",
				backgroundColor: "red"
			}}>
				<CircularProgress />
			</Box>

		</Container >
	)
}
