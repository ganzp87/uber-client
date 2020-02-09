import React from "react"
import ReactDOM from "react-dom"
import App from "./Components/App"
import client from "./apollo"
import { ApolloProvider } from "react-apollo" // react용 apollo
import GlobalStyle from "./global-styles"

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
		<GlobalStyle />
	</ApolloProvider>,
	document.getElementById("root")
)
