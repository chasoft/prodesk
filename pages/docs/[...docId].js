import React from "react"

//THIRD-PARTY
// import { useDispatch } from "react-redux"

//PROJECT IMPORT
import Doc from "@components/Doc"
import useUiSettings from "@helpers/useUiSettings"
import { FRONT_PAGE_TABS_NAME, getLayout } from "@layout/EntryLayout"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/




function ADoc() {
	// const router = useRouter()
	// const { docId } = router.query
	// const dispatch = useDispatch()
	useUiSettings({
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