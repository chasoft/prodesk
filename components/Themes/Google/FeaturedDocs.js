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
import PostListItem from "./../../Post/PostListItem"
import ListGroup from "./../../common/ListGroup"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DummyData = [
	{
		docId: 1,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: ["d"]
	},
	{
		docId: 2,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: ["d"]
	},
	{
		docId: 3,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: []
	},
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const FeaturedDocs = () => {
	return (
		<ListGroup
			title="Featured Docs"
			viewAllText="View all featured docs"
			viewAllLink="/docs/featured"
		>
			{
				DummyData.map((item, idx) => {
					return (
						<PostListItem
							key={item.docId}
							isFirst={idx === 0} isLast={idx === DummyData.length - 1}
							subject={item.subject}
							excerpt={item.excerpt}
							link={item.link}
							metaData={item.metaData}
						/>
					)
				})
			}
		</ListGroup>
	)
}

export default FeaturedDocs