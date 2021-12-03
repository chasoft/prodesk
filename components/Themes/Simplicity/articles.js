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

import React, { forwardRef, useState } from "react"
import Link from "next/link"
import PropTypes from "prop-types"

//MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import { Box, Breadcrumbs, Typography } from "@mui/material"

//THIRD-PARTY
import { size } from "lodash"

//PROJECT IMPORT
import { useGetDoc } from "@helpers/useGetDocs"
import SimplicityLayout from "@components/Themes/Simplicity/layout"
import { CustomButtonContained } from "@components/Themes/Simplicity/Buttons/Contained"
import { CircularProgressBox } from "@components/common"
import ThemeSimplicity404 from "@components/Themes/Simplicity/404"
import TextEditor from "@components/common/TextEditor"
import { useGetDocContentQuery } from "@redux/slices/firestoreApi"

//ASSETS
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


const TocItem = forwardRef(({ sx, anchor, active, children }, ref) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				borderRadius: "8px",
				alignItems: "center",
				px: 2, py: 0.5,
				cursor: "pointer",
				backgroundColor: active ? "#000" : "#FFF",
				":hover > svg": {
					fill: "#FFF"

				},
				...sx
			}}
			onClick={(e) => {
				e.preventDefault()
				let navbar = document.getElementById("pageHeader")
				let navbarheight = parseInt(window.getComputedStyle(navbar).height, 10)

				console.log({ navbarheight })
				const offsetTop = document.querySelector(`#${anchor}`).offsetTop + navbarheight + 50
				scroll({
					top: offsetTop,
					behavior: "smooth"
				})
			}}
		>
			<Typography noWrap sx={{ p: "7px", fontSize: "0.95rem" }}>
				{children}
			</Typography>

			<CollapseIconButton
				expanded={true}
				onClick={() => { }}
			/>
		</Box>
	)
})

TocItem.displayName = "TocItem"

TocItem.propTypes = {
	sx: PropTypes.object,
	anchor: PropTypes.string,
	active: PropTypes.bool,
	children: PropTypes.node
}


function CollapseIconButton({ expanded, onClick }) {
	if (expanded) {
		return (
			<KeyboardArrowDownIcon
				sx={{
					mr: 1.5, p: 0.25,
					fill: "#000",
					cursor: "pointer",
					":hover": { fill: "#FFF" },
				}}
				onClick={onClick}
			/>
		)
	}

	return (
		<ChevronRightIcon
			sx={{
				mr: 1.5, p: 0.25,
				fill: "#000",
				cursor: "pointer",
				":hover": { fill: "#FFF" },
			}}
			onClick={onClick}
		/>
	)
}
CollapseIconButton.propTypes = {
	expanded: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

export function BreadcrumbsBox({ docItem }) {
	const {
		data: catItem,
		isLoading: isLoadingCatItem
	} = useGetDoc(docItem?.categoryId)

	const {
		data: subCatItem,
		isLoading: isLoadingSubCatItem
	} = useGetDoc(docItem?.subCategoryId)

	return (
		<Breadcrumbs aria-label="breadcrumb" sx={{
			"& li>a,li>p": {
				fontSize: "0.95rem"
			}
		}}>
			<Link underline="hover" href="/">
				Home
			</Link>

			{(!isLoadingCatItem && !!catItem)
				? <Link
					underline="hover"
					href={`/categories/${catItem?.docId}-${catItem?.slug}`}
					passHref
				>
					<a href="just-a-placeholder">{catItem.title}</a>
				</Link> : null}

			{(!isLoadingSubCatItem && !!subCatItem)
				? <Link
					underline="hover"
					href={`/categories/${subCatItem?.docId}-${subCatItem?.slug}`}
					passHref
				>
					<a href="just-a-placeholder">{subCatItem.title}</a>
				</Link> : null}

			<Typography color="text.primary">{docItem.title}</Typography>
		</Breadcrumbs>
	)
}
BreadcrumbsBox.propTypes = {
	docItem: PropTypes.object
}

function Article({ docItem }) {

	const {
		data: docItemContent = {},
		isLoading: isLoadingDocItemContent
	} = useGetDocContentQuery(docItem?.docId)

	if (!isLoadingDocItemContent && size(docItemContent) === 0)
		return (
			<div>Article not found</div>
		)

	return (
		<Box id="article" sx={{
			flex: { xs: "1 0 auto", mdd: "1 0 32%" },
			minWidth: { xs: 0, mdd: "400px" },
			marginRight: { xs: 0, mdd: "66px" },
			"& *>a": { color: "primary.main" },
			"& *>h1, h2, h3": { fontWeight: 700 }
		}}>

			{isLoadingDocItemContent
				? <CircularProgressBox />
				: <>
					<Box component="nav" sx={{
						marginBottom: "24px"
					}}>
						<BreadcrumbsBox docItem={docItem} />
					</Box>

					<Box component="header">
						<Typography variant="h1" sx={{
							flexBasis: "100%",
							fontSize: { xs: "24px", sm: "32px" },
							lineHeight: { xs: "28px", sm: "36px" },
							marginBottom: "24x"
						}}>
							{docItem.title}
						</Typography>
					</Box>

					<Box id="article-info">
						<TextEditor
							value={docItemContent?.text ?? ""}
							readOnly={true}
						/>
					</Box>

					<Box component="footer">
						<Box id="article-votes" sx={{
							padding: "0 0 10px",
							textAlign: "center",
							marginTop: "100px",
							marginBottom: "100px"
						}}>
							<Box component="span" sx={{
								color: "#282828",
								fontSize: "18px",
								lineHeight: "19px",
								fontWeight: "500"
							}}>
								Was this article helpful?
							</Box>
							<Box id="article-votes-controls" sx={{
								marginTop: "20px",
								"&button": {
									background: "#fff",
									margin: "10px 5px",
									minWidth: "125px",
									width: "auto",
									padding: "2px 16px",
									border: "2px solid #000",
									borderRadius: "8px"
								},
								"&button:hover": {
									backgroundColor: "#efefef"
								}
							}}>
								<CustomButtonContained variant="outlined">
									Yes, thanks!
								</CustomButtonContained>
								<CustomButtonContained variant="outlined">
									Not really
								</CustomButtonContained>
							</Box>

						</Box>

					</Box>
				</>}

		</Box>
	)
}
Article.propTypes = {
	docItem: PropTypes.object.isRequired,
	editorRef: PropTypes.object
}

function SideBarFloatButton({ handleShowFloatButton }) {
	return (
		<Box
			onClick={() => handleShowFloatButton(p => !p)}
			sx={{
				marginBottom: 0,
				display: { xs: "flex", mdd: "none" },
				cursor: "pointer",
				position: "relative",
				fontWeight: "500",
				borderWidth: "2px 0 2px 2px",
				borderStyle: "solid",
				borderColor: "#000",
				padding: "5px",
				borderRadius: "6px 0 0 6px",
				backgroundColor: "#fff"
			}}>
			<MoreVertIcon />
		</Box>
	)
}
SideBarFloatButton.propTypes = {
	handleShowFloatButton: PropTypes.func.isRequired
}

function SideBarContent({ showFloatButton, docItem }) {
	const theme = useTheme()

	const {
		data: docItemContent = { headings: [], text: "" },
		isLoading: isLoadingDocItemContent
	} = useGetDocContentQuery(docItem?.docId)

	if (isLoadingDocItemContent) return null

	//TODO: group headings lại... để làm cái sổ xuống
	// docItemContent.headings.reduce((res, curItem, idx) => {



	// 	if (curItem.level === 1)
	// 		res.push([curItem])


	// }

	// }, [])

	return (
		<Box component="ol" sx={{
			listStyle: "none",
			marginTop: "0",
			paddingLeft: "0px",
			border: "1px solid #000",
			borderRadius: "8px",
			[theme.breakpoints.down("mdd")]: {
				display: showFloatButton ? "block" : "none",
				position: "fixed",
				right: "39px",
				zIndex: "1",
				top: "200px",
				maxWidth: "331px",
				border: "2px solid #000",
				borderRadius: 0,
				backgroundColor: "#fff",
				padding: "15px",
				margin: "0 0 0 20px",
				maxHeight: "50vh",
				overflow: "scroll"
			}
		}}>

			{docItemContent.headings.map((item) => {
				if (item.level > 2) return null
				return (
					<TocItem
						key={item.id}
						anchor={item.id}
						sx={{
							py: 0.5,
							ml: (item.level === 2) ? 2.5 : 0,
							":hover": {
								backgroundColor: "#000",
								fontWeight: 500,
								color: "#FFF",
								borderRadius: "4px"
							}
						}}
					>
						{item.title}
					</TocItem>
				)
			})}

		</Box >
	)
}
SideBarContent.propTypes = {
	docItem: PropTypes.object,
	showFloatButton: PropTypes.bool,
}

function ArticleSideBar({ docItem }) {
	const theme = useTheme()
	const [showFloatButton, setShowFloatButton] = useState(false)

	return (
		<Box component="section" id="collapsible-sidebar" sx={{
			flex: 1,
			marginLeft: "0px",
			position: "sticky",
			right: 0,
			top: "200px",
			zIndex: 9,
			padding: 0,
			[theme.breakpoints.up("mdd")]: {
				position: "sticky",
				right: "auto",
				top: "180px",
				zIndex: "0",
			},
		}}>

			<Box component="section" sx={{
				flex: { xs: 1, mdd: "0 0 20%" },
				margin: 0,
				zIndex: 1,
				maxHeight: { xs: "45px", mdd: "none" },
				[theme.breakpoints.up("mdd")]: {
					position: "sticky",
					right: "auto",
					top: "180px",
					zIndex: 0,
				},
			}}>
				<Box id="article-toc" sx={{
					[theme.breakpoints.down("mdd")]: {
						position: "fixed",
						right: 0,
						top: "200px"
					}
				}}>
					<SideBarFloatButton handleShowFloatButton={setShowFloatButton} />
					<Box component="h3" sx={{
						display: { xs: "none", mdd: "block" },
					}}>
						Article outline
					</Box>
					<SideBarContent
						docItem={docItem}
						showFloatButton={showFloatButton}
					/>
				</Box>

			</Box>

		</Box >
	)
}
ArticleSideBar.propTypes = {
	docItem: PropTypes.object
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ThemeSimplicityArticles({ slug }) {
	const {
		data: docItem = {},
		isLoading: isLoadingDoc
	} = useGetDoc(undefined, slug)

	if (isLoadingDoc)
		return (
			<SimplicityLayout>
				<CircularProgressBox minHeight="70vh" />
			</SimplicityLayout>
		)

	if (size(docItem) === 0) return <ThemeSimplicity404 />

	return (
		<SimplicityLayout>

			<Box id="article-content-area" sx={{
				display: "flex",
				marginLeft: "auto",
				marginRight: "auto",
				maxWidth: "1024px",
				flexDirection: { xs: "column", mdd: "row-reverse" }
			}}>

				<ArticleSideBar docItem={docItem} />

				<Article docItem={docItem} />

			</Box>

		</SimplicityLayout >
	)
}
ThemeSimplicityArticles.propTypes = {
	slug: PropTypes.string
}

export default ThemeSimplicityArticles