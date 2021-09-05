import React from "react"
import Container from "@material-ui/core/Container"
import PropTypes from "prop-types"

function FrontLayout({ children }) {
	return (
		<Container>
			{children}
		</Container>
	)
}
FrontLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => <FrontLayout>{page}</FrontLayout>

export default FrontLayout