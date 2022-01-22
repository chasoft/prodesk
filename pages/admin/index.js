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

import React, { useCallback, useMemo, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, Container, Grid, IconButton, Stack, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material"
import { alpha } from "@mui/material/styles"


//THIRD-PARTY
import { Chart } from "react-charts"
import { useSelector } from "react-redux"
import { useTable, usePagination } from "react-table"
import { PieChart } from "react-minimal-pie-chart"

//PROJECT IMPORT
import { getLayout } from "@layout/AdminLayout"
import useUiSettings from "@helpers/useUiSettings"
import { TICKET_STATUS } from "@helpers/constants"
import usePopupContainer from "@components/common/usePopupContainer"
import { CircularProgressBox } from "@components/common"

//ASSETS
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import LastPageIcon from "@mui/icons-material/LastPage"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/
function BlockBase({
	title,
	isLoading = false,
	isLoadingHeight = 135,
	settingsPanel: SettingsPanel,
	quickSettingsPanel: QuickSettingsPanel,
	children,
	childrenProps,
	...otherProps
}) {
	const isSideBarExpanded = useSelector(s => s.uiSettingsState.isSideBarExpanded)
	const [
		PopupContainer, open, anchorRef, {
			handleToggle, handleClose
		}
	] = usePopupContainer()

	return (
		<Grid item xs={12} sm={isSideBarExpanded ? 6 : 3} md={3} {...otherProps}>
			<Box sx={{
				p: 2,
				pt: 1,
				boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
				":hover": {
					boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 30px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;",
				}
			}}>

				<Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					minHeight: "37px"
				}}>
					<Box sx={{
						flexGrow: 1,
						color: "text.secondary",
						whiteSpace: "nowrap",
						mr: 1,
					}}>
						{title}
					</Box>

					{QuickSettingsPanel &&
						<QuickSettingsPanel />}

					{SettingsPanel && <>
						<IconButton
							id="settingIcon"
							onClick={handleToggle}
							ref={anchorRef}
							size="small"
							sx={{ ml: 1, mr: -1 }}
						>
							<MoreVertIcon size="small" sx={{ color: "grey.500" }} />
						</IconButton>

						<PopupContainer
							open={open}
							anchorRef={anchorRef}
							handleClose={handleClose}
							placement="bottom-start"
							transformOrigin="top left"
							elevation={1}
						>
							<SettingsPanel />
						</PopupContainer>
					</>}

				</Box>

				<Box {...childrenProps}>
					{isLoading
						? <CircularProgressBox size={25} minHeight={isLoadingHeight} />
						: children}
				</Box>

			</Box>
		</Grid>
	)
}
BlockBase.propTypes = {
	title: PropTypes.string,
	isLoading: PropTypes.bool,
	isLoadingHeight: PropTypes.string,
	settingsPanel: PropTypes.any,	//TODO: Adjust the propTypes to be more specific
	quickSettingsPanel: PropTypes.any,
	children: PropTypes.node,
	childrenProps: PropTypes.object,
}

const configContent = [
	{
		title: "config 1",
		content: <Box>Hello</Box>,
		backgroundColor: "rgba(0,0,0,0.1)",
		completed: true,

	},
	{
		title: "config 2",
		content: <CircularProgressBox />,
		completed: false,
	},
	{
		title: "config 3",
		content: "content 3",
		backgroundColor: "rgba(0,0,0,0.1)",
		completed: true,
	},
	{
		title: "config 4",
		content: "content 4",
		completed: true,
	}
]

function ConfigurationGuideBox({ configContent }) {
	const [currentConfigIndex, setCurrentConfigIndex] = useState(0)

	const handleNextConfig = useCallback(() => {
		setCurrentConfigIndex(p => p + 1)
	}, [])

	const handlePrevConfig = useCallback(() => {
		setCurrentConfigIndex(p => p - 1)
	}, [])

	return (
		<Grid item xs={12}>
			<Box sx={{
				p: 2,
				pt: 1,
				boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
				":hover": {
					boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 30px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;",
				},
				backgroundColor: (theme) => {
					if (configContent[currentConfigIndex].completed)
						return alpha(theme.palette.success.light, 0.2)
					return alpha(theme.palette.warning.light, 0.2)
				},
			}}>

				<Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					minHeight: "37px"
				}}>
					<Box sx={{
						flexGrow: 1,
						color: "text.secondary",
						whiteSpace: "nowrap",
						mr: 1,
					}}>
						Setup Guide Box
					</Box>

					<Box>
						<Button
							disabled={currentConfigIndex === 0}
							size="small"
							sx={{ minWidth: "30px", p: "3px 8px", mr: 1, color: "black", borderRadius: "10px" }}
							startIcon={<KeyboardArrowLeftIcon />}
							onClick={handlePrevConfig}
						>
							Back
						</Button>

						{currentConfigIndex + 1} of {configContent.length}

						<Button
							disabled={currentConfigIndex === configContent.length - 1}
							size="small"
							sx={{ minWidth: "30px", p: "3px  8px", ml: 1, color: "black", borderRadius: "10px" }}
							endIcon={<KeyboardArrowRightIcon />}
							onClick={handleNextConfig}
						>
							Next
						</Button>
					</Box>


				</Box>

				<Stack direction="column" spacing={1}>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Typography
							color={configContent[currentConfigIndex].completed
								? "success" : "warning"}
							sx={{
								display: "flex",
								alignItems: "center",
								my: 1,
								fontWeight: "bold",
							}}>
							{configContent[currentConfigIndex].title}&nbsp;
							<Box component="span" sx={{ fontStyle: "italic", fontWeight: "normal" }}>
								{configContent[currentConfigIndex].completed
									? " - completed"
									: " - waiting for your action"
								}
							</Box>
						</Typography>

						<Box sx={{ flexGrow: 1 }}>
							{configContent[currentConfigIndex].content}
						</Box>
					</Box>
				</Stack>

			</Box >
		</Grid >
	)
}
ConfigurationGuideBox.propTypes = {
	configContent: PropTypes.array,
}
function BigNumber({ title, settingsPanel, number, isLoading }) {
	return (
		<BlockBase
			title={title}
			isLoading={isLoading}
			isLoadingHeight="73px"
			settingsPanel={settingsPanel}
		>

			<Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium", py: 2 }}>
				{number}
			</Box>
			<Box
				component={TrendingUpIcon}
				sx={{ color: "success.dark", fontSize: 16, verticalAlign: "sub" }}
			/>
			<Box
				sx={{
					color: "success.dark",
					display: "inline",
					fontWeight: "medium",
					mx: 0.5,
				}}
			>
				18.77%
			</Box>
			<Box sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}>
				vs. last week
			</Box>

		</BlockBase>
	)
}
BigNumber.propTypes = {
	title: PropTypes.string,
	settingsPanel: PropTypes.any,
	number: PropTypes.number,
	isLoading: PropTypes.bool
}

const groupButtonStyle = {
	fontSize: "12px",
	fontWeight: "normal",
	color: "grey",
	padding: "3px 8px"
}

function QuickSettingsPanel() {
	const [selectedTimePeriod, setSelectedTimePeriod] = useState("this-month")

	const timePeriods = [
		{
			value: "this-week",
			tooltip: "This Week",
			longName: "Week",
			shortName: "W"
		},
		{
			value: "this-month",
			tooltip: "This Month",
			longName: "Month",
			shortName: "M"
		},
		{
			value: "this-quater",
			tooltip: "This Quater",
			longName: "Quarter",
			shortName: "Q"
		}
	]

	const handleTimePeriod = (event, newTimePeriod) => {
		if (newTimePeriod !== null) {
			setSelectedTimePeriod(newTimePeriod)
		}
	}

	return (
		<Stack direction="row" spacing={4}>
			<ToggleButtonGroup
				value={selectedTimePeriod}
				exclusive
				onChange={handleTimePeriod}
				size="small"
			>
				{timePeriods.map((item) => (
					<ToggleButton key={item.value} value={item.value} aria-label="left aligned" sx={groupButtonStyle}>
						<Tooltip arrow title={item.tooltip} placement="top">
							<>
								<Box component="span" sx={{ display: { xs: "none", xss: "block" } }}>{item.longName}</Box>
								<Box component="span" sx={{ display: { xs: "block", xss: "none" } }}>{item.shortName}</Box>
							</>
						</Tooltip>
					</ToggleButton>
				))}
			</ToggleButtonGroup >
		</Stack >
	)
}

function TicketChartByCategory() {
	const isSideBarExpanded = useSelector(s => s.uiSettingsState.isSideBarExpanded)
	const [hovered, setHovered] = useState(undefined)
	const [selected, setSelected] = useState(0)

	const rawData = [
		{ title: "Sales", value: 10, color: "#E38627" },
		{ title: "Technical", value: 15, color: "#C13C37" },
		{ title: "Accounting", value: 20, color: "#6A2135" },
	]

	const data = rawData.map((entry, i) => {
		if (hovered === i) {
			return {
				...entry,
				color: "grey",
			}
		}
		return entry
	})

	return (
		<BlockBase
			title="Tickets by categories"
			isLoading={true}
			isLoadingHeight="200px"
			settingsPanel={S}
			childrenProps={{ sx: { height: "200px" } }}
			{...{ sm: isSideBarExpanded ? 12 : 4, md: 4 }}
		>

			<PieChart
				animate
				data={data}
				label={({ x, y, dx, dy, dataEntry }) => (
					<>
						<text
							x={x}
							y={y}
							dx={dx}
							dy={dy}
							dominantBaseline="central"
							textAnchor="middle"
							style={{
								fontSize: "7px",
								fontFamily: "sans-serif",
								fill: "white"
							}}
						>
							{dataEntry.title}
						</text>
						<text
							x={x}
							y={y + 9}
							dx={dx}
							dy={dy}
							dominantBaseline="central"
							textAnchor="middle"
							style={{
								fontSize: "7px",
								fontWeight: "bold",
								fontFamily: "sans-serif",
								fill: "white"
							}}
						>
							{dataEntry.value + "%"}
						</text>
					</>
				)}
				radius={PieChart.defaultProps.radius - 7}
				segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
				segmentsShift={(index) => (index === selected ? 7 : 1)}
				labelPosition={50}
				onClick={(_, index) => { setSelected(index === selected ? undefined : index) }}
				onMouseOver={(_, index) => { setHovered(index) }}
				onMouseOut={() => { setHovered(undefined) }}
			/>

		</BlockBase >
	)
}

function TicketChartActivities() {
	const isSideBarExpanded = useSelector(s => s.uiSettingsState.isSideBarExpanded)

	const data = useMemo(() => ([
		{
			label: "Open",
			data: [
				{
					date: "2022-01-14T00:00:00.000Z",
					quantity: 5,
				}, {
					date: "2022-01-15T00:00:00.000Z",
					quantity: 0,
				}, {
					date: "2022-01-16T00:00:00.000Z",
					quantity: 1,
				},
			]
		},
		{
			label: "Pending",
			data: [
				{
					date: "2022-01-14T00:00:00.000Z",
					quantity: 1,
				}, {
					date: "2022-01-15T00:00:00.000Z",
					quantity: 2,
				}, {
					date: "2022-01-16T00:00:00.000Z",
					quantity: 3,
				},
			]
		}
	]), [])

	const dateAxis = useMemo(() => ({ getValue: (datum) => new Date(datum.date) }), [])
	const quantityAxes = useMemo(() => [{ getValue: (datum) => datum.quantity, }], [])

	return (
		<BlockBase
			title="Tickets activities"
			isLoading={false}
			isLoadingHeight="200px"
			settingsPanel={S}
			quickSettingsPanel={QuickSettingsPanel}
			childrenProps={{ sx: { height: "200px", pb: 2 } }}
			{...{ sm: isSideBarExpanded ? 12 : 8, md: 8 }}
		>
			<Chart
				options={{
					data,
					primaryAxis: dateAxis,
					secondaryAxes: quantityAxes,
				}}
			/>
		</BlockBase>
	)
}

const S = () => <Typography sx={{ p: 5 }}>Hello World</Typography>

function TicketBigNumbers() {
	return (
		<>
			<BigNumber isLoading={false} title="Session" number={1} />
			<BigNumber isLoading={true} title="Has Settings" number={2} settingsPanel={S} />
			<BigNumber isLoading={false} title="Session" number={3} />
			<BigNumber isLoading={false} title="Session" number={3} />
		</>
	)
}

function TicketCharts() {
	return (
		<>
			<TicketChartActivities />
			<TicketChartByCategory />
		</>
	)
}

function TicketsQuickFilters() {
	const [selectedStatus, setSelectedStatus] = useState(TICKET_STATUS.OPEN)

	const handleStatus = (event, newStatus) => {
		if (newStatus !== null) {
			setSelectedStatus(newStatus)
		}
	}

	return (
		<Stack direction="row" spacing={4}>
			<ToggleButtonGroup
				value={selectedStatus}
				exclusive
				onChange={handleStatus}
				size="small"
			>
				{Object.values(TICKET_STATUS).map((status) => (
					<ToggleButton key={status} value={status} aria-label={status + " tickets"} sx={groupButtonStyle}>
						{status}
					</ToggleButton>
				))}
			</ToggleButtonGroup >
		</Stack >
	)
}

function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 2 },
		},
		usePagination
	)

	// Render the UI for your table
	return (
		<div>
			<div className="tableWrap">
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map(headerGroup => (
							<tr key="_" {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th key="_"
										{...column.getHeaderProps({
											className: column.collapse ? "collapse" : "",
										})}
									>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row)
							return (
								<tr key="_" {...row.getRowProps()}>
									{row.cells.map(cell => {
										return (
											<td key="_"
												{...cell.getCellProps({
													className: cell.column.collapse ? "collapse" : "",
												})}
											>
												{cell.render("Cell")}
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
				{/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
			</div>
			<div className="pagination">
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{"<<"}
				</button>{" "}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{"<"}
				</button>{" "}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>{" "}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{">>"}
				</button>{" "}
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{" "}
				</span>
				<span>
					| Go to page:{" "}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={e => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0
							gotoPage(page)
						}}
						style={{ width: "100px" }}
					/>
				</span>{" "}
				<select
					value={pageSize}
					onChange={e => {
						setPageSize(Number(e.target.value))
					}}
				>
					{[10, 20, 30, 40, 50].map(pageSize => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
Table.propTypes = {
	columns: PropTypes.array,
	data: PropTypes.array,
}

function TicketQuickList() {
	const columns = React.useMemo(
		() => [
			{
				Header: "Name",
				columns: [
					{
						Header: "First Name",
						accessor: "firstName",
					},
					{
						Header: "Last Name",
						accessor: "lastName",
					},
				],
			},
			{
				Header: "Info",
				columns: [
					{
						Header: "Age",
						accessor: "age",
						collapse: true,
					},
					{
						Header: "Visits",
						accessor: "visits",
						collapse: true,
					},
					{
						Header: "Status",
						accessor: "status",
					},
					{
						Header: "Profile Progress",
						accessor: "progress",
						collapse: true,
					},
				],
			},
		],
		[]
	)

	const data = React.useMemo(
		() => [{
			firstName: "drain",
			lastName: "punishment",
			age: 4,
			visits: 58,
			progress: 71,
			status: "complicated",
			subRows: undefined
		}], [])

	return (
		<BlockBase
			title="Tickets Quick List"
			quickSettingsPanel={TicketsQuickFilters}
			{...{ xs: 12, sm: 12, md: 12 }}
		>
			<Table columns={columns} data={data} />
		</BlockBase>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Admin() {
	useUiSettings({
		title: "Dashboard",
		background: {
			backgroundImage: "",
			backgroundColor: "transparent"
		}
	})

	return (
		<Container sx={{ flexGrow: 1, marginTop: 2, py: 1 }}>

			<Grid container spacing={2}>

				<ConfigurationGuideBox configContent={configContent} />

				<TicketBigNumbers />

				<TicketCharts />

				<TicketQuickList />

			</Grid>

		</Container>
	)
}

Admin.getLayout = getLayout
export default Admin