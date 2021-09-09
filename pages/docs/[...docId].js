/*
	`...docId`
this will display Articles and Category for DOCS
*/


import React from "react"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { getLayout } from "../../layout/BlankLayout"
import Article from "../../components/Article"
import MainNav from "../../components/common/frontend/MainNav"
import Category from "../../components/Category"

import { useRouter } from "next/router"
/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * MAIN RENDER                                                   *
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

			<MainNav borderBottom={true} />
			<Category />
		</>
	)
}

AnArticle.getLayout = getLayout
export default AnArticle