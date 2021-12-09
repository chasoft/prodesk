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

import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"

//MATERIAL-UI
import { Box, Typography } from "@mui/material"

//THIRD-PARTY
import { findKey } from "lodash"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { DOC_TYPE, DOC_STATUS, RESERVED_KEYWORDS } from "@helpers/constants"
import SimplicityLayout from "@components/Themes/Simplicity/layout"
import { CircularProgressBox } from "@components/common"
import { useGetDocsGrouped } from "@helpers/useGetDocs"
import { getAuth } from "@redux/selectors"
import { docItemNewCategory, docItemNewSubCategory } from "@helpers/firebase/docs"

//ASSETS
import LaunchIcon from "@mui/icons-material/Launch"
import ThemeSimplicity404 from "@components/Themes/Simplicity/404"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function CategoryListing({ docItem, children }) {
	return (
		<Box id="category-content" sx={{
			padding: { xs: "20", xss: "32px", md: "48px" },
			marginTop: { xs: "-50px", smm: 0 },
			"& #article-item > a": {
				color: "primary.main"
			},
			"& #article-item > a:hover": {
				textDecoration: "underline"
			}
		}}>
			<Box component="header">

				<Typography variant="h1" sx={{
					fontWeight: 700,
					margin: "10px 0 32px 0",
					fontSize: "32px",
					lineHeight: "48px"
				}}>
					<div style={{ display: "flex", alignItems: "center" }}>
						{docItem.emoji
							? <>{docItem.emoji} &nbsp;</>
							: (docItem.type === DOC_TYPE.EXTERNAL)
								? <LaunchIcon style={{ fontSize: 18, marginRight: "4px" }} />
								: null}

						<Link href={"/categories/" + docItem.docId + "-" + docItem.slug} passHref>
							<a href="just-a-placeholder">
								{docItem.title}
							</a>
						</Link>
					</div>
				</Typography>

				{docItem.description ?
					<Typography sx={{ mb: 2 }}>
						{docItem.description}
					</Typography>
					: null}
			</Box>

			{children}
		</Box>
	)
}
CategoryListing.propTypes = {
	docItem: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
}

export function SubCategoriesList({ children }) {
	return (
		<Box component="ul" sx={{
			listStyle: "none",
			margin: "0",
			padding: "0"
		}}>
			{children}
		</Box>
	)
}
SubCategoriesList.propTypes = {
	children: PropTypes.node.isRequired
}

export function SubCategoryItem({ docItem, children }) {
	return (
		<li id="sub-category">
			<div style={{ display: "flex", alignItems: "center" }}>
				{docItem.emoji
					? <Typography sx={{
						marginBottom: "12px",
						marginTop: "24px",
						fontSize: "24px",
					}}>
						{docItem.emoji}
					</Typography>
					: (docItem.type === DOC_TYPE.EXTERNAL)
						? <LaunchIcon style={{ fontSize: 18, marginRight: "4px" }} />
						: null}

				<Link href={"/categories/" + docItem.docId + "-" + docItem.slug} passHref>
					<a href="just-a-placeholder">
						<Typography variant="h2" sx={{
							marginBottom: "12px",
							marginTop: "24px",
							fontSize: "24px",
							fontWeight: 700,
							"&>a": {
								borderBottom: "3px solid transparent",
								paddingBottom: "2px"
							}
						}}>

							{docItem.title}
						</Typography>
					</a>
				</Link>
			</div>

			{docItem.description ?
				<Typography sx={{ mt: 1, mb: 2 }}>
					{docItem.description}
				</Typography> : null}

			{children}
		</li>
	)
}
SubCategoryItem.propTypes = {
	docItem: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
}

export function ArticleItem({ docItem }) {
	return (
		<li id="article-item">
			{docItem.emoji
				? <Typography sx={{ mr: 0.5 }}>{docItem.emoji}</Typography>
				: (docItem.type === DOC_TYPE.EXTERNAL)
					? <LaunchIcon sx={{ fontSize: 18, mr: 1 }} />
					: null}

			<Link
				href={(docItem.type === DOC_TYPE.EXTERNAL)
					? docItem.url ? docItem.url : "/you-have-not-provide-an-external-link"
					: "/articles/" + docItem.docId + "-" + docItem.slug}
				passHref
			>
				<a href="just-a-placeholder">
					<Typography>
						{docItem.title}
					</Typography>
				</a>
			</Link>
		</li>
	)
}
ArticleItem.propTypes = {
	docItem: PropTypes.object.isRequired,
}

export function ArticlesList({ children }) {
	return (
		<Box component="ul" id="articles-list" sx={{
			listStyle: "none",
			margin: "0",
			padding: "0",
			display: "flex",
			flexWrap: "wrap",
			paddingTop: "12px",
			paddingBottom: "10px",
			"&>li": {
				flex: "1 0 390px",
				maxWidth: "100%",
				marginBottom: "21px"
			},
			"&>li>a": {
				fontSize: "16px",
				lineHeight: "140%"
			},
			"& #article-item": {
				display: "flex",
				alignItems: "center"
			}
		}}>
			{children}
		</Box>
	)
}
ArticlesList.propTypes = {
	children: PropTypes.node.isRequired,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ThemeSimplicityCategories({ slug }) {
	const { currentUser } = useSelector(getAuth)

	const {
		data: docs = [], isLoading: isLoadingDocs
	} = useGetDocsGrouped(slug)

	if (isLoadingDocs)
		return (
			<SimplicityLayout>
				<CircularProgressBox minHeight="70vh" />
			</SimplicityLayout>
		)

	if (docs.length === 0)
		return <ThemeSimplicity404 />

	//if the very first element is not Array,
	//it mean, this is list docs in subCategory
	if (Array.isArray(docs[0]) === false) {
		const subCatDetails = docs.find(doc => doc.type === DOC_TYPE.SUBCATEGORY)

		if (!subCatDetails)
			return <ThemeSimplicity404 />

		return (
			<SimplicityLayout>
				<CategoryListing
					key={subCatDetails.docId}
					docItem={subCatDetails}
				>
					<SubCategoriesList>
						<ArticlesList>
							{docs.map(doc => {
								if (doc.status === DOC_STATUS.DRAFT)
									return null
								if (doc.docId === subCatDetails.docId)
									return null
								return (
									<ArticleItem
										key={doc.docId}
										docItem={doc} />
								)
							})}
						</ArticlesList>
					</SubCategoriesList>
				</CategoryListing>
			</SimplicityLayout>
		)
	}

	return (
		<SimplicityLayout>

			{isLoadingDocs
				? null
				: docs.map((cat) => {
					/* Category Level */
					const catDetail = cat[1]["undefined"][0] ?? docItemNewCategory(currentUser.username, "Missing category")

					if (catDetail.status === DOC_STATUS.DRAFT)
						return null

					return (
						<CategoryListing
							key={catDetail.docId}
							docItem={catDetail}
						>
							<SubCategoriesList>
								{Object.entries(cat[1]).map((subCat) => {

									if (subCat[0] === RESERVED_KEYWORDS.CAT)
										return null

									//Draw items at root level of Category
									if (subCat[0] === RESERVED_KEYWORDS.CAT_CHILDREN) {
										return (
											<ArticlesList key={catDetail.slug + "root"}>
												{subCat[1].map((item) => {
													if (item.status === DOC_STATUS.DRAFT)
														return null
													return (
														<ArticleItem
															key={item.docId}
															docItem={item} />
													)
												})}
											</ArticlesList>
										)
									}

									//position of Sub-Category in the list
									const subCatIndex = findKey(subCat[1], { type: DOC_TYPE.SUBCATEGORY })
									const subcatDetail = subCat[1][subCatIndex] ?? docItemNewSubCategory(currentUser.username, "Missing subcategory")

									if (subcatDetail.status === DOC_STATUS.DRAFT)
										return null

									return (
										<SubCategoryItem
											key={subcatDetail.docId}
											docItem={subcatDetail}
										>
											<ArticlesList>
												{subCat[1].map((item, idx) => {
													if (idx == subCatIndex)
														return null
													if (item.status === DOC_STATUS.DRAFT)
														return null
													return (
														<ArticleItem
															key={item.docId}
															docItem={item} />
													)
												})}
											</ArticlesList>

										</SubCategoryItem>
									)
								})}
							</SubCategoriesList>
						</CategoryListing>
					)
				})}

		</SimplicityLayout>
	)
}
ThemeSimplicityCategories.propTypes = {
	slug: PropTypes.string
}

export default ThemeSimplicityCategories