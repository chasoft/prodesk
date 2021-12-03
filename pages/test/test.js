/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useState } from "react"

// MATERIAL-UI
import { Button, Box, TextField, Container, Autocomplete, Chip, Checkbox } from "@mui/material"

//THIRD-PARTY
import nanoid from "@helpers/nanoid"
import { filter } from "lodash"

//PROJECT IMPORT

//ASSETS
import dayjs from "dayjs"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"

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
	const [inputText, setInputText] = useState("")

	/*
		{
			key: <nanoid()>
			name: <string>
		}
	*/
	const [availableTags, setAvailableTags] = useState([])

	const [onChangeValue, setOnChangeValue] = useState("")

	const [onInputChangeValue, setOnInputChangeValue] = useState("")

	const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
	const checkedIcon = <CheckBoxIcon fontSize="small" />

	return (
		<Container sx={{ marginTop: 10 }}>
			<Autocomplete
				id="tags-input"
				multiple
				disableCloseOnSelect
				limitTags={4}
				options={availableTags}
				getOptionLabel={(option) => option.name}
				renderOption={(props, option, { selected }) => {
					console.log({ props })
					return (
						<li {...props}>
							<Checkbox
								icon={icon}
								checkedIcon={checkedIcon}
								style={{ marginRight: 8 }}
								checked={selected}
							/>
							{option.name}
						</li>
					)
				}}
				renderInput={(params) => {
					console.log("renderInput", { params })
					return (
						<TextField
							{...params}
							variant="standard"
							label="Tags"
							value={inputText}
							onChange={(e) => { setInputText(e.target.value) }}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									setAvailableTags(p => {
										if (p.findIndex(i => i.name === inputText) !== -1) return p
										return [...p, { name: inputText, key: nanoid() }]
									})
									setInputText("")
								}
							}}
							placeholder="Enter your tag"
						/>
					)
				}}

				renderTags={(tagValue, getTagProps) =>
					tagValue.map((option, index) => (
						<Chip
							key={index}
							label={option.name}
							{...getTagProps({ index })}
							onDelete={(e) => {
								console.log({ e })
								setAvailableTags(p => {
									console.log({ p })
									const a = filter(p, i => i.name !== option.name)
									return a
								})
							}}
						/>
					))
				}

				onInputChange={(event, value, reason) => {
					setOnInputChangeValue({ value, reason })
				}}

				onChange={(event, value, reason) => {
					setAvailableTags(value)
				}}

				value={availableTags}
			/>
			<Box sx={{ mt: 25, p: 5, backgroundColor: "silver" }}>
				onInputChangeValue: {JSON.stringify(onInputChangeValue)}
			</Box>
			<Box sx={{ p: 5, backgroundColor: "blue", color: "white" }}>
				onChangeValue: {JSON.stringify(onChangeValue)}

			</Box>
			<Box sx={{ p: 5, backgroundColor: "blue", color: "white" }}>
				TextField (onChange): {JSON.stringify(inputText)}
			</Box>


			<Button onClick={() => {
				setAvailableTags(["hello", "world"])
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

			</Box>


		</Container >
	)
}
