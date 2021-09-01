import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Paper } from "@material-ui/core"
import Footer from "../components/Footer"

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		display: "flex"
	},
	decoration: {
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
		width: "500px",
		height: "100vh",
		[theme.breakpoints.down("md")]: { width: "40%" },
		[theme.breakpoints.down("sm")]: { display: "none" },
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		[theme.breakpoints.down("md")]: { width: "60%" },
		[theme.breakpoints.down("sm")]: { width: "100%" },
	},
	paper: {
		maxWidth: "400px"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	hideAtSmallScreen: {
		[theme.breakpoints.down("sm")]: { display: "none" },
	},
	hideAtBigScreen: {
		[theme.breakpoints.up("md")]: { display: "none" },
	},
	topSection: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(0, 0, 4)
	}
}))

const SignInLink = () => <Typography>Already a member? <Link href="#">Sign in</Link></Typography>

export default function SignupHome() {
	const classes = useStyles()

	return (
		<main className={classes.root}>
			<div className={classes.decoration} />
			<Container className={classes.content} >

				<div
					className={classes.hideAtSmallScreen}
					style={{ width: "100%", textAlign: "right", paddingRight: "3rem", paddingTop: "2rem" }}
				>
					<SignInLink />
				</div>

				<div style={{ height: "100%", display: "flex", alignItems: "center" }}>
					<Paper className={classes.paper} elevation={0}>
						<div className={classes.topSection}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h1">
								Sign up
							</Typography>
						</div>

						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="name"
										name="name"
										variant="outlined"
										required
										fullWidth
										id="name"
										label="Name"
										autoFocus
										margin="dense"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="userName"
										label="Username"
										name="username"
										autoComplete="username"
										margin="dense"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										margin="dense"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
										margin="dense"
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel
										control={<Checkbox value="allowExtraEmails" color="primary" />}
										label="I want to receive inspiration, marketing promotions and updates via email."
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Create Account
							</Button>
							<Grid container justifyContent="flex-end" className={classes.hideAtBigScreen}>
								<Grid item>

									<SignInLink />

								</Grid>
							</Grid>
						</form>
					</Paper>
				</div>

				<Footer />



			</Container>
		</main >
	)
}