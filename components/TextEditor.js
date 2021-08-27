/*****************************************************************
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import PropTypes from "prop-types"
import React from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

export default function TextEditor({ data, handleData }) {
	return (
		<>

			<CKEditor
				editor={ClassicEditor}
				data={data}
				onChange={(event, editor) => { handleData(editor.getData()) }}
				config={{
					toolbar: ["heading", "|", "bold", "italic", "numberedList", "bulletedList", "blockQuote", "|", "outdent", "indent", "|", "link", "|", "undo", "redo"]  //"uploadImage",
				}}
			/>
		</>
	)
}
TextEditor.propTypes = { data: PropTypes.string, handleData: PropTypes.func }