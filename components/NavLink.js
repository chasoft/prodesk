/*****************************************************************
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import PropTypes from "prop-types"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

export default function NavLink({ children, href }) {
	const child = React.Children.only(children)
	const router = useRouter()

	return (
		<Link href={href} passHref>
			{React.cloneElement(child, {
				"aria-current": router.pathname === href ? "page" : null
			})}
		</Link>
	)
}
NavLink.propTypes = { href: PropTypes.node, children: PropTypes.node }