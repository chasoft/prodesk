import React from "react"

//PROJECT IMPORT

import { FRONT_PAGE_TABS_NAME, getLayout } from "./../../layout/EntryLayout"
import Doc from "../../components/Doc"
// import { useRouter } from "next/router"
import updateUiSettings from "./../../helpers/updateUiSettings"
// import ProBreadcrumbs from "./../../components/FrontEnd/ProBreadcrumbs"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/




function ADoc() {
	// const router = useRouter()
	// const { docId } = router.query

	updateUiSettings({
		activeTab: FRONT_PAGE_TABS_NAME.DOCS + "@note:" + "a single article",
	})

	return (
		<>
			<Doc />
		</>
	)
}

ADoc.getLayout = getLayout
export default ADoc