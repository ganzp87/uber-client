import React from "react"
import SocialLoginPresenter from "./SocialLoginPresenter"
import { Mutation, MutationFunction } from "react-apollo"
import { facebookConnect, facebookConnectVariables } from "../../types/api"
import { FACEBOOK_CONNECT } from "./SocialLoginQueries.q"
import { RouteComponentProps } from "react-router-dom"
import { toast } from "react-toastify"
import { LOGUSER_IN } from "src/sharedQueries.local"

interface IState {
	firstName: string
	lastName: string
	email?: string
	fbId: string
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
	public state = {
		email: "",
		fbId: "",
		firstName: "",
		lastName: ""
	}
	public facebookMutation!: MutationFunction<
		facebookConnect,
		facebookConnectVariables
	>
	public render() {
		return (
			<Mutation mutation={LOGUSER_IN}>
				{(logUserIn) => (
					<Mutation<facebookConnect, facebookConnectVariables>
						mutation={FACEBOOK_CONNECT}
						onCompleted={(data) => {
							const { FacebookConnect } = data
							if (FacebookConnect.ok) {
								logUserIn({
									variables: {
										token: FacebookConnect.token
									}
								})
							} else {
								toast.error(FacebookConnect.error)
							}
						}}
					>
						{(facebookMutation, { loading }) => {
							this.facebookMutation = facebookMutation
							return (
								<SocialLoginPresenter
									loginCallback={this.loginCallback}
								/>
							)
						}}
					</Mutation>
				)}
			</Mutation>
		)
	}
	public loginCallback = (response) => {
		const { name, first_name, last_name, email, id, accessToken } = response
		if (accessToken) {
			toast.success(`Welcome ${name}!`)
			this.facebookMutation({
				variables: {
					email,
					fbId: id,
					firstName: first_name,
					lastName: last_name
				}
			})
		} else {
			toast.error("Could not log you in 😔")
		}
	}
}

export default SocialLoginContainer
