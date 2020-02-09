import { gql } from "apollo-boost"

// 로그인 여부 확인
export const IS_LOGGED_IN = gql`
	{
		auth {
			isLoggedIn @client
		}
	}
`
