import * as React from "react"
import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { getUiSettings } from "@redux/selectors"
import useAdmin from "@helpers/useAdmin"

interface Props {
	children: React.ReactNode;
	className?: string;
}

const defaultStyle: React.CSSProperties = {
	position: "fixed",
	display: "flex",
	alignItems: "flex-start",
	justifyContent: "center",
	width: "100%",
	inset: "0px",
	padding: "14vh 16px 16px",
	backgroundColor: "rgba(0,0,0,0.5)",
	zIndex: 9999
};

export default function KBarPositioner(props: Props) {
	const { isAdminURL } = useAdmin()
	const { isSideBarExpanded } = useSelector(getUiSettings)
	// const isSideBarExpanded = useSelector(s => s.uiSettingsState.isSideBarExpanded)
	return (
		<Box
			style={{
				...defaultStyle,
				...(
					isAdminURL
						? isSideBarExpanded
							? { paddingLeft: "128px" }
							: { paddingLeft: "34px" }
						: {}
				)
			}}
			{...props}
		>
			{props.children}
		</Box>
	);
}