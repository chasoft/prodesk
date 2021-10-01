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

import PropTypes from "prop-types"
import React, { useCallback, useEffect, useRef, useState } from "react"

// MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import TextEditor from "./../../common/TextEditor"
import { LearnMoreAdvancedTextEditor } from "./../../common"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ReplyDialog = ({ children }) => {
	const [textEditorData, setTextEditorData] = useState("")
	const [open, setOpen] = useState(false)
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const handleClose = useCallback(() => { setOpen(false) }, [])
	const handleClickOpen = useCallback(() => { setOpen(true) }, [])
	const loadLocalStorage = useCallback(() => { return localStorage.getItem("NewReply") ?? "" }, [])

	const handleGetEditorData = useCallback((data) => {
		setTextEditorData(data)
		localStorage.setItem("NewReply", data)
		console.log(data)
	}, [])

	const handleSubmitReply = () => {
		console.log("Submit new reply")
		localStorage.removeItem("NewReply")
	}

	const descriptionElementRef = useRef(null)
	useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef
			if (descriptionElement !== null) {
				descriptionElement.focus()
			}
		}
	}, [open])

	return (
		<>
			<span onClick={handleClickOpen}>{children}</span>
			<Dialog
				open={open}
				onClose={handleClose}
				fullScreen={fullScreen}
				maxWidth="md"
				scroll="paper"
			>

				<DialogTitle sx={{
					bgcolor: "primary.dark",
					color: "#FFF",
					typography: "h3",
					mt: 0,
				}}>
					Create Reply
				</DialogTitle>

				<DialogContent sx={{ mt: 2 }}>
					<Box sx={{
						pl: 4, py: 3, border: "1px solid #FAFAFA",
						width: { sm: "500px", md: "650px", lg: "700px" }
					}}>
						<TextEditor
							defaultValue={loadLocalStorage()}
							placeholder="Provides as many details as possible..."
							pullEditorData={handleGetEditorData}
						/>
					</Box>
				</DialogContent>

				<DialogActions sx={{ justifyContent: "flex-end", pr: 3, mb: 2 }}>
					<Button
						size="small" variant="outlined"
						onClick={handleSubmitReply}
						sx={{ px: 3, minWidth: "100px" }}
					>
						Cancel
					</Button>

					<Button
						size="small" variant="contained"
						onClick={handleSubmitReply}
						sx={{ px: 4, minWidth: "100px" }}
					>
						Post
					</Button>
				</DialogActions>

				<Box
					sx={{
						display: "flex",
						px: 3, py: 2,
						backgroundColor: "#F8F9FA",
						borderBottomLeftRadius: "0.5rem",
						borderBottomRightRadius: "0.5rem",
						borderTop: "1px solid",
						borderTopColor: "divider"
					}}
				>
					<LearnMoreAdvancedTextEditor />
				</Box>

			</Dialog>
		</>
	)
}
ReplyDialog.propTypes = { children: PropTypes.node }

export default ReplyDialog