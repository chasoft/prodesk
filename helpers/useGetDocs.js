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

import { useRef } from "react"

//THIRD-PARTY
import { isEqual } from "lodash"
import { usePrevious } from "react-use"

//PROJECT IMPORT
import { useGetDocsQuery } from "@redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useGetDoc(docId) {
	const {
		data: docs = [],
		isLoading: isLoadingDocs
	} = useGetDocsQuery(undefined)

	const foundDoc = useRef(undefined)
	const prevDocs = usePrevious(docs)
	const prevDocId = usePrevious(docId)

	if (isLoadingDocs) return {
		data: foundDoc.current,
		isLoading: true
	}

	if (isEqual(prevDocs, docs) === false || docId !== prevDocId) {
		foundDoc.current = docs.find((doc) => doc.docId === docId)
		console.log("useGetDoc => changed", { prevDocId, docId })
	}

	return {
		data: foundDoc.current,
		isLoading: false
	}
}

// export default function useGetDoc(docId) {
// 	const [foundDoc, setFoundDoc] = useState(undefined)

// 	const {
// 		data: docs = [],
// 		isLoading: isLoadingDocs
// 	} = useGetDocsQuery(undefined)

// 	useDeepCompareEffect(() => {
// 		setFoundDoc(docs.find((doc) => doc.docId === docId))
// 		console.log("useGetDoc - changed", { docId, docs })

// 	}, [docId, docs])

// 	if (isLoadingDocs) return {
// 		data: undefined,
// 		isLoading: true
// 	}

// 	return {
// 		data: foundDoc,
// 		isLoading: false
// 	}
// }