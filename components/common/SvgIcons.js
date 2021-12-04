import React from "react"
import { SvgIcon } from "@mui/material"

export function DocumentIcon(props) {
	return (
		<SvgIcon {...props} viewBox="0 0 24 24">
			<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path>
		</SvgIcon>
	)
}

export function NewDocIcon(props) {
	return (
		<SvgIcon {...props} viewBox="0 0 24 24" stroke="none">
			<path d="M10 15H8c-1.654 0-3-1.346-3-3V5a1 1 0 0 0-2 0v7c0 2.757 2.243 5 5 5h2a1 1 0 1 0 0-2m11 1a1 1 0 0 1-1 1h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 1 1 2 0v2h2a1 1 0 0 1 1 1" fillRule="evenodd"></path>
		</SvgIcon>
	)
}

export function ImportIcon(props) {
	return (
		<SvgIcon
			{...props}
			sx={{ "&.MuiSvgIcon-root": { fill: "none" } }}
			fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
		</SvgIcon >
	)
}

export function ExportPdfIcon(props) {
	return (
		<SvgIcon {...props} viewBox="0 0 24 24" stroke="none">
			<path d="M21.9 7.6c-.1-.1-.1-.2-.2-.3l-7-7c-.1-.1-.2-.2-.3-.2-.1-.1-.3-.1-.4-.1H5C3.3 0 2 1.3 2 3v9c0 .6.4 1 1 1s1-.4 1-1V3c0-.6.4-1 1-1h8v6c0 .6.4 1 1 1h6v3c0 .6.4 1 1 1s1-.4 1-1V8c0-.1 0-.3-.1-.4zM15 3.4L18.6 7H15V3.4zM5 15H3c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1s1-.4 1-1v-2h1c1.6 0 3-1.3 3-3s-1.3-3-3-3zm0 4H4v-2h1c.5 0 1 .4 1 1s-.4 1-1 1zm5.5-4H10c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h.5c2.5 0 4.5-2 4.5-4.5S13 15 10.5 15zm2.5 4.5c0 1.2-.9 2.2-2 2.4V17c1.1.3 2 1.3 2 2.5zm5-2.5v2h3c.6 0 1 .4 1 1s-.4 1-1 1h-3v2c0 .6-.4 1-1 1s-1-.4-1-1v-7c0-.6.4-1 1-1h4c.6 0 1 .4 1 1s-.4 1-1 1h-3z"></path>
		</SvgIcon>
	)
}