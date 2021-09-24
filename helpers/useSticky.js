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

import { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI


//THIRD-PARTY


//PROJECT IMPORT


//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/



/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const useSticky = ({ offsetTop, scrollY }) => {
	const ref = useRef(null)
	const [isSticky, setIsSticky] = useState(false)

	const fixedPosition = () => {
		if (ref.current === null) return
		setIsSticky(
			((ref.current.clientHeight + offsetTop) < window.innerHeight)
				? (window.scrollY > scrollY) ? true : false
				: false
		)
	}

	/* Activate resize listener */
	useEffect(() => {
		fixedPosition()
		window.addEventListener("resize", fixedPosition)
		return () => window.removeEventListener("resize", fixedPosition)
	}, [])

	/* Activate resize listener */
	useEffect(() => {
		window.addEventListener("scroll", fixedPosition)
		return () => window.removeEventListener("scroll", fixedPosition)
	}, [])

	return [ref, isSticky]
}

useSticky.propTypes = {
	offsetTop: PropTypes.number,
	scrollY: PropTypes.number
}

export default useSticky