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

import React from "react"
import { PostListItemShorten } from "./../Post/PostListItem"
import CategoryGroupItem from "./CategoryGroupItem"


const DummyData = [
	{
		id: 1,
		subject: "i m facing problem in my pixel 4a 5g phone the problem is touch sensitiveness that while scrolling i",
		link: "/faqs/some-faqs-1"
	},
	{
		id: 2,
		subject: "i m facing problem in my pixel 4a 5g phone the problem is touch sensitiveness that while scrolling i",
		link: "/faqs/some-faqs-2"
	},
]


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function CategoryGroupLatestFAQs() {
	return (
		<CategoryGroupItem
			header="Frequently Asked Questions"
			viewAllText="View all FAQs"
			viewAllLink="/faqs"
		>
			{DummyData.map((item) => {
				return (
					<PostListItemShorten
						key={item.id}
						subject={item.subject}
						link={item.link} />
				)
			})}
		</CategoryGroupItem>
	)
}

export default CategoryGroupLatestFAQs