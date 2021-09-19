import React from "react"
import PropTypes from "prop-types"
import { Avatar } from "@mui/material"
import { AvatarGroup } from "@mui/material"

function AvatarList({ dataSource }) {

	if (dataSource.length === 1)
		return (<Avatar alt={dataSource[0].displayName} src={dataSource[0].photoURL} />)

	if (dataSource.length > 1) {
		return (
			<AvatarGroup>
				{console.log({ dataSource })}
				{
					dataSource.map((item) => {
						return <Avatar key={item.username} alt={item.displayName} src={item.photoURL} />
					})
				}
			</AvatarGroup>
		)
	}

	return null
}
AvatarList.propTypes = { dataSource: PropTypes.array }

export default AvatarList
