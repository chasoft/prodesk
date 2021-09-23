import dynamic from "next/dynamic"
import React, { useState } from "react"
import { TabPanel, Tab, Tabs, Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import Skeleton from "@mui/material/Skeleton"
import { getNewTicket } from "./../../redux/selectors"
import { setMessage } from "./../../redux/slices/newTicket"
import TicketUploader from "../Gallery/TicketUploader"

const TextEditor = dynamic(() => import("./../BackEnd/TextEditor"), {
	ssr: false,
	loading: function pleaseWait() { return <Skeleton variant="rectangular" width="100%" height={85} /> }
})

function a11yProps(index) {
	return {
		id: `wrapped-tab-${index}`,
		"aria-controls": `wrapped-tabpanel-${index}`,
	}
}

const NewTicketStep3 = () => {
	const dispatch = useDispatch()
	const { newTicket } = useSelector(getNewTicket)
	const { message } = newTicket

	const [value, setValue] = useState("one")

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	//https://stackoverflow.com/questions/57899608/how-to-make-my-custom-tab-component-work-with-passing-index-to-children-and-hidi

	return (
		<div>
			<Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
				<Tab
					value="one"
					label="New Arrivals in the Longest Text of Nonfiction"
					wrapped
					{...a11yProps("one")}
				/>
				<Tab value="two" label="Item Two" {...a11yProps("two")} />
				<Tab value="three" label="Item Three" {...a11yProps("three")} />
			</Tabs>

			<TabPanel value={value} index="one">
				<TextEditor data={message} handleData={(data) => { dispatch(setMessage(data)) }} />
				<Typography variant="caption">Please describe your issue in detail.</Typography>
			</TabPanel>
			<TabPanel value={value} index="two">
				<TicketUploader />
			</TabPanel>
			<TabPanel value={value} index="three">
				Secret Sharing!!!
			</TabPanel>

		</div>
	)
}

export default NewTicketStep3