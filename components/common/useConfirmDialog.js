/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.0     ║ *
 * ╠═══════════════════════════════════════════════════════════════════╣ *
 * ║                                                                   ║ *
 * ║   @author     A. Cao <cao@anh.pw>                                 ║ *
 * ║   @copyright  Chasoft Labs © 2021                                 ║ *
 * ║   @link       https://chasoft.net                                 ║ *
 * ║                                                                   ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║ @license This product is licensed and sold at CodeCanyon.net      ║ *
 * ║ If you have downloaded this from another site or received it from ║ *
 * ║ someone else than me, then you are engaged in an illegal activity.║ *
 * ║ You must delete this software immediately or buy a proper license ║ *
 * ║ from http://codecanyon.net/user/chasoft/portfolio?ref=chasoft.    ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║      THANK YOU AND DON'T HESITATE TO CONTACT ME FOR ANYTHING      ║ *
 * ╚═══════════════════════════════════════════════════════════════════╝ *
 ************************************************************************/

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function ConfirmDialog({
	title,
	onClose,
	defaultValue,
	value,
	setValue,
	open,
	nodeRef,
	children,
	...other
}) {
	useEffect(() => {
		if (!open) {
			setValue(defaultValue)
		}
	}, [defaultValue, open, setValue])

	const handleEntering = () => {
		if (nodeRef.current != null) {
			nodeRef.current.focus()
		}
	}

	const handleCancel = () => { onClose() }
	const handleOk = () => { onClose(value) }

	return (
		<Dialog
			sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
			maxWidth="xs"
			TransitionProps={{ onEntering: handleEntering }}
			open={open}
			{...other}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent dividers>
				{/* <RadioGroup
					ref={nodeRef}
					aria-label="ringtone"
					name="ringtone"
					value={value}
					onChange={handleChange}
				>
					{options.map((option) => (
						<FormControlLabel
							value={option}
							key={option}
							control={<Radio />}
							label={option}
						/>
					))}
				</RadioGroup> */}
				{children}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel}>Cancel</Button>
				<Button onClick={handleOk}>Ok</Button>
			</DialogActions>
		</Dialog>
	)
}
ConfirmDialog.propTypes = {
	title: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	defaultValue: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	nodeRef: PropTypes.node,
	children: PropTypes.node.isRequired,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//This is used for Confirmation with input value,
//for yes/no, (no need to request any input from user), please use useConfirmDialogYesNo

const useConfirmDialog = (defaultValue) => {
	const nodeRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(defaultValue)

	const handlers = useMemo(
		() => ({
			handleOpen: () => { setOpen(true) },
			handleClose: (newValue) => {
				setOpen(false)
				if (newValue) {
					setValue(newValue)
				}
			},
			handleChange: (e) => { setValue(e.target.value) }
		}),
		[]
	)

	useEffect(() => {
		if (!open) {
			setValue(defaultValue)
		}
	}, [defaultValue, open])

	return [ConfirmDialog, nodeRef, value, setValue, handlers]
}

export default useConfirmDialog