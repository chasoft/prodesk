import React, { useRef } from "react"
import PropTypes from "prop-types"
import { TransitionGroup, Transition as ReactTransition } from "react-transition-group"

const TIMEOUT = 200

const getTransitionStyles = {
	entering: {
		position: "absolute",
		opacity: 0,
	},
	entered: {
		transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
		opacity: 1,
		animation: "blink .3s linear 2",
	},
	exiting: {
		transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
		opacity: 0,
	},
}

const PageTransition = ({ children, location }) => {
	const nodeRef = useRef(null)
	return (
		<TransitionGroup style={{ position: "relative" }}>
			<ReactTransition nodeRef={nodeRef} key={location} timeout={{ enter: TIMEOUT, exit: TIMEOUT }}>
				{
					(status) => (
						<div ref={nodeRef} style={{ ...getTransitionStyles[status] }}>
							{children}
						</div>
					)
				}
			</ReactTransition>
		</TransitionGroup >
	)
}
PageTransition.propTypes = { children: PropTypes.node, location: PropTypes.string }

export default PageTransition