import React from "react"
import { RouteComponentProps } from "react-router-dom"
import VerifyPhonePresenter from "./VerifyPhonePresenter"
import { Mutation, MutationFunction } from "react-apollo"
import { verifyPhone, verifyPhoneVariables } from "src/types/api"
import { VERIFY_PHONE } from "./VerifyPhoneQueries.q"
import { toast } from "react-toastify"
import { LOGUSER_IN } from "src/sharedQueries.local"

interface IState {
	verifiedKey: string
	phoneNumber: any
}

interface IProps extends RouteComponentProps<any> {
	logUserIn: MutationFunction
}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props)
		if (!props.location.state) {
			props.history.push("/")
			console.log(props.history)
		}
		this.state = {
			verifiedKey: "",
			phoneNumber: props.location.state!["phone"] as any
		}
	}
	public render() {
		const { verifiedKey, phoneNumber } = this.state
		return (
			<Mutation mutation={LOGUSER_IN}>
				{(logUserIn) => (
					<Mutation<verifyPhone, verifyPhoneVariables>
						mutation={VERIFY_PHONE}
						variables={{ key: verifiedKey, phoneNumber }}
						onCompleted={(data) => {
							const { CompletePhoneVerification } = data
							if (CompletePhoneVerification.ok) {
								if (CompletePhoneVerification.token) {
									logUserIn({
										variables: {
											token:
												CompletePhoneVerification.token
										}
									})
								}
								console.log(CompletePhoneVerification)
								toast.success("You're verified, loggin in now")
								return
							} else {
								toast.error(CompletePhoneVerification.error)
							}
						}}
					>
						{(mutation, { loading }) => (
							<VerifyPhonePresenter
								onSubmit={mutation}
								onChange={this.onInputChange}
								verifiedKey={verifiedKey}
								loading={loading}
							/>
						)}
					</Mutation>
				)}
			</Mutation>
		)
	}

	public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		const {
			target: { name, value }
		} = event
		this.setState({
			[name]: value
		} as any)
	}
}

export default VerifyPhoneContainer
