/*
	`...docId`
this will display Articles and Category for DOCS
*/


import React from "react"

//PROJECT IMPORT

import { getLayout } from "../../layout/BlankLayout"
import Article from "../../components/Article"

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
			<Article />
		</>
	)
}

AnArticle.getLayout = getLayout
export default AnArticle