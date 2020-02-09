import { gql } from "apollo-boost"

export const LOGUSER_IN = gql`
	mutation logUserIn($token: string!) {
		logUserIn(token: $token) @client
	}
`
