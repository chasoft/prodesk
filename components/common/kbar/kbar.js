/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box } from "@mui/material"

//THIRD-PARTY
import {
	KBarAnimator, KBarPortal, KBarSearch, useMatches
} from "kbar"

//PROJECT IMPORT
import KBarResults from "@components/common/kbar/KBarResults"
import useDocsActions from "@components/common/kbar/useDocsActions"
import useAdminActions from "@components/common/kbar/useAdminActions"
import KBarPositioner from "@components/common/kbar/KBarPositioner"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export const searchStyle = {
	padding: "12px 16px",
	fontSize: "16px",
	width: "100%",
	boxSizing: "border-box",
	outline: "none",
	border: "none",
	background: "#FFF",
	color: "#000",
}

export const animatorStyle = {
	maxWidth: "600px",
	width: "100%",
	background: "#FFF",
	color: "#000",
	borderRadius: "8px",
	overflow: "hidden",
	boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
}

export const groupNameStyle = {
	padding: "8px 16px",
	fontSize: "10px",
	textTransform: "uppercase",
	opacity: 0.5,
}

export function ClientCommandBar() {
	useDocsActions()
	return (
		<KBarPortal>
			<KBarPositioner>
				<KBarAnimator style={animatorStyle}>
					<KBarSearch style={searchStyle} />
					<RenderResults />
				</KBarAnimator>
			</KBarPositioner>
		</KBarPortal>
	)
}

export function AdminCommandBar() {
	useAdminActions()
	return (
		<KBarPortal>
			<KBarPositioner>
				<KBarAnimator style={animatorStyle}>
					<KBarSearch style={searchStyle} />
					<RenderResults />
				</KBarAnimator>
			</KBarPositioner>
		</KBarPortal>
	)
}

export function RenderResults() {
	const { results, rootActionId } = useMatches()
	return (
		<KBarResults
			items={results}
			onRender={({ item, active }) =>
				typeof item === "string" ? (
					<div style={groupNameStyle}>{item}</div>
				) : (
					<ResultItem
						action={item}
						active={active}
						currentRootActionId={rootActionId}
					/>
				)
			}
		/>
	)
}

const ResultItem = React.forwardRef(({ action, active, currentRootActionId }, ref) => {
	const ancestors = React.useMemo(() => {
		if (!currentRootActionId) return action.ancestors
		const index = action.ancestors.findIndex(
			(ancestor) => ancestor.id === currentRootActionId
		)
		// +1 removes the currentRootAction; e.g.
		// if we are on the "Set theme" parent action,
		// the UI should not display "Set theme… > Dark"
		// but rather just "Dark"
		return action.ancestors.slice(index + 1)
	}, [action.ancestors, currentRootActionId])

	return (
		<Box
			ref={ref}
			sx={{
				padding: "12px 16px",
				background: active ? "rgba(0,0,0,0.08)" : "transparent",
				borderLeft: `3px solid ${active ? "#000" : "transparent"}`,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				cursor: "pointer",
			}}
		>
			<div
				style={{
					display: "flex",
					gap: "8px",
					alignItems: "center",
					fontSize: 14,
				}}
			>
				{action.emoji && action.emoji}
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div>
						{ancestors.length > 0 &&
							ancestors.map((ancestor) => (
								<React.Fragment key={ancestor.id}>
									<span
										style={{
											opacity: 0.5,
											marginRight: 8,
										}}
									>
										{ancestor.name}
									</span>
									<span
										style={{
											marginRight: 8,
										}}
									>
										&rsaquo;
									</span>
								</React.Fragment>
							))}
						<span>{action.name}</span>
					</div>
					{action.subtitle && (
						<span style={{ fontSize: 12 }}>{action.subtitle}</span>
					)}
				</div>
			</div>
			{action.shortcut?.length ? (
				<div
					aria-hidden
					style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}
				>
					{action.shortcut.map((sc) => (
						<kbd
							key={sc}
							style={{
								padding: "4px 6px",
								background: "rgba(0 0 0 / .1)",
								borderRadius: "4px",
								fontSize: 14,
							}}
						>
							{sc}
						</kbd>
					))}
				</div>
			) : null}
		</Box>
	)
}
)
ResultItem.displayName = "ResultItem"

ResultItem.propTypes = {
	action: PropTypes.any,
	active: PropTypes.any,
	currentRootActionId: PropTypes.any,
}