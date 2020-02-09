import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import { IS_LOGGED_IN } from "./AppQueries.local"
import AppPresenter from "./AppPresenter"
import { graphql } from "react-apollo"
import { ThemeProvider, createGlobalStyle } from "src/typed-component"
import theme from "src/theme"
import reset from "styled-reset"

// tslint:disable-next-line
createGlobalStyle`
	${reset}
`

const AppContainer = ({ data }) => (
	<React.Fragment>
		<ThemeProvider theme={theme}>
			<AppPresenter isLoggedIn={data.auth.isLoggedIn} />
		</ThemeProvider>
		<ToastContainer draggable={true} position={"bottom-center"} />
	</React.Fragment>
)

// @ts-ignore
export default graphql(IS_LOGGED_IN)(AppContainer)
