import React from "react"

//PROJECT IMPORT

import { FRONT_PAGE_TABS_NAME, getLayout } from "../../layout/EntryLayout"
import Article from "../../components/Article"
import { useRouter } from "next/router"
import updateUiSettings from "../../helpers/updateUiSettings"
import ProBreadcrumbs from "../../components/FrontEnd/ProBreadcrumbs"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/




function AnArticle() {
	const router = useRouter()
	const { docId } = router.query

	updateUiSettings({
		activeTab: FRONT_PAGE_TABS_NAME.DOCS + "@note:" + "a single article",
	})

	return (
		<>
			<Article />
		</>
	)
}

AnArticle.getLayout = getLayout
export default AnArticle