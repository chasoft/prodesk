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

import React, { useMemo, useEffect } from "react"
import PropTypes from "prop-types"

//MATERIAL-UI
import { useKBar, VisualState } from "kbar"
import { Box, InputBase, Paper } from "@mui/material"

//PROJECT IMPORT
import { RenderResults } from "@components/common/kbar/kbar"
import { SearchButton } from "@components/Themes/Simplicity/Buttons/Search"
import usePopupContainer from "@components/common/usePopupContainer"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const KBAR_LISTBOX = "kbar-listbox"
export const getListboxItemId = (id) => `kbar-listbox-item-${id}`

export function FrontSearchBox(props) {

	const [
		PopupContainer, open, anchorRef, {
			handleOpen, handleClose
		}
	] = usePopupContainer()

	const {
		query,
		search,
		actions,
		currentRootActionId,
		activeIndex,
		showing,
		options,
	} = useKBar((state) => ({
		search: state.searchQuery,
		currentRootActionId: state.currentRootActionId,
		actions: state.actions,
		activeIndex: state.activeIndex,
		showing: state.visualState === VisualState.showing,
	}))

	useEffect(() => {
		query.setSearch("")
		return () => query.setSearch("")
	}, [currentRootActionId, query])

	const placeholder = useMemo(
		() =>
			currentRootActionId
				? actions[currentRootActionId].name
				: "Type a command or search…",
		[actions, currentRootActionId]
	)

	return (
		<>
			<Box id="search-wrapper" sx={{
				display: "flex",
				alignItems: "center",
				position: "relative",
				justifyContent: "center",
				marginTop: "0",
				width: "100%",
			}}>
				<Box
					component="form"
					onSubmit={(e) => {
						e.preventDefault()
						console.log("Submitted")
					}}
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						width: { xs: "100%", md: "670px" },
						maxWidth: "670px",
					}}
				>
					<Paper sx={{
						padding: 1.5,
						flexGrow: 1,
						marginBottom: { xs: 2, md: 0 },
						border: "3px solid #000000",
						borderTopLeftRadius: "10px",
						borderBottomLeftRadius: "10px",
						borderBottomRightRadius: { xs: "10px", md: 0 },
						borderTopRightRadius: { xs: "10px", md: 0 },
					}}>

						<InputBase
							ref={anchorRef}
							autoComplete="off"
							role="combobox"
							spellCheck="false"
							aria-expanded={showing}
							aria-controls={KBAR_LISTBOX}
							aria-activedescendant={getListboxItemId(activeIndex)}
							value={search}
							placeholder={placeholder}
							onChange={(event) => {
								props.onChange?.(event)
								query.setSearch(event.target.value)
								options?.callbacks?.onQueryChange?.(event.target.value)
								handleOpen()
							}}
							onKeyDown={(event) => {
								if (currentRootActionId && !search && event.key === "Backspace") {
									const parent = actions[currentRootActionId].parent
									query.setCurrentRootAction(parent)
								}
							}}
							onFocus={() => { handleOpen() }}
							{...props}
							sx={{
								width: "100%",
								fontSize: "1.2em",
							}}
						/>

					</Paper>
					<SearchButton
						type="submit"
						value="Search"
					>
						Search
					</SearchButton>

				</Box>
			</Box>

			<PopupContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				placement="bottom-end"
				transformOrigin="top right"
				elevation={0}
				sx={{
					overflow: "visible",
					filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
					marginTop: 1.5,
					padding: 0,
					width: anchorRef?.current?.parentNode?.clientWidth
						? anchorRef?.current?.parentNode?.clientWidth - 24
						: "514px",
					"&:before": {
						content: "\"\"",
						display: "block",
						position: "absolute",
						top: 0,
						right: 18,
						width: 10,
						height: 10,
						bgcolor: "background.paper",
						transform: "translateY(-50%) rotate(45deg)",
						zIndex: 0,
					}
				}}
			>
				<RenderResults />
			</PopupContainer>
		</>
	)
}
FrontSearchBox.propTypes = {
	onChange: PropTypes.func
}