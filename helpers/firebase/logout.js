//THIRD-PARTY
import { batch as reduxBatch } from "react-redux"

//PROJECT IMPORT
import { logoutSuccess } from "./../../redux/slices/auth"
import { setRedirect } from "./../../redux/slices/redirect"
import { auth } from "."


export const signOut = ({ enqueueSnackbar, dispatch }) => {
	auth.signOut()
	reduxBatch(() => {
		dispatch(logoutSuccess())
		dispatch(setRedirect(""))
	})
	enqueueSnackbar("Signed out successfully!", { variant: "success" })
}
