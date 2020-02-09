import ApolloClient, { Operation } from "apollo-boost"

const client = new ApolloClient({
	clientState: {
		defaults: {
			// auth에 대한 내용 기본값 설정
			auth: {
				__typename: "Auth",
				isLoggedIn: Boolean(localStorage.getItem("jwt"))
			}
		},
		resolvers: {
			Mutation: {
				logUserIn: (_, { token }, { cache }) => {
					localStorage.setItem("jwt", token)
					cache.writeData({
						data: {
							auth: {
								__typename: "Auth",
								isLoggedIn: true
							}
						}
					})
					return null
				},
				logUserOut: (_, __, { cache }) => {
					// User 로그아웃 시키는 방법
					localStorage.removeItem("jwt")
					cache.writeData({
						data: {
							auth: {
								__typename: "Auth",
								isLoggedIn: false
							}
						}
					})
					return null
				}
			}
		}
	},
	request: async (operation: Operation) => {
		// 모든 오퍼레이션에 접근
		// 매번 생성되는 쿼리를 캐치 및 변경 가능
		operation.setContext({
			// 로컬저장소에 있는 jwt를 header에 삽입
			header: {
				"X-JWT": localStorage.getItem("jwt") || ""
			}
		})
	},
	uri: "http://localhost:4000/graphql"
})

export default client
