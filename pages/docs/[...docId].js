/*
	`...docId`
this will display Articles and Category for DOCS
*/


import React from "react"

//PROJECT IMPORT

import { getLayout } from "../../layout/BlankLayout"
import Article from "../../components/Article"
import MainNav from "../../components/common/frontend/MainNav"
import Category from "../../components/Category"

import { useRouter } from "next/router"
/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/




function AnArticle() {
	const router = useRouter()
	const { docId } = router.query

	return (
		<>
			{
				JSON.stringify(docId)
			}
			<MainNav borderBottom={true} />
			<Article />
		</>
	)
}

AnArticle.getLayout = getLayout
export default AnArticle