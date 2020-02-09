import React from "react"
import PhoneLoginPresenter from "./PhoneLoginPresenter"
import { RouteComponentProps } from "react-router-dom"
import { toast } from "react-toastify"
import { PHONE_SIGN_IN } from "./PhoneQueries.q"
import { Mutation, MutationFunction } from "react-apollo"
import {
	startPhoneVerificationVariables,
	startPhoneVerification
} from "src/types/api"

interface IState {
	countryCode: string
	phoneNumber: string
}

class PhoneLoginContainer extends React.Component<
	RouteComponentProps<any>,
	IState
> {
	public phoneMutation!: MutationFunction<
		startPhoneVerification,
		startPhoneVerificationVariables
	>
	public state = {
		countryCode: "+82",
		phoneNumber: "12345"
	}
	public render() {
		const { history } = this.props
		const { countryCode, phoneNumber } = this.state
		const phone = `${countryCode}${phoneNumber}`
		return (
			<Mutation<startPhoneVerification, startPhoneVerificationVariables>
				mutation={PHONE_SIGN_IN}
				variables={{
					phoneNumber: phone
				}}
				onCompleted={(data) => {
					const { StartPhoneVerification } = data
					if (StartPhoneVerification.ok) {
						toast.success("SMS Sent! Redirecting you...")
						setTimeout(() => {
							history.push({
								pathname: "/verify-phone",
								state: {
									phone
								}
							})
						}, 2000)
					} else {
						toast.error(StartPhoneVerification.error)
					}
				}}
			>
				{(phoneMutation, { loading }) => {
					this.phoneMutation = phoneMutation
					return (
						<PhoneLoginPresenter
							countryCode={countryCode}
							phoneNumber={phoneNumber}
							onInputChange={this.onInputChange}
							onSubmit={this.onSubmit}
							loading={loading}
						/>
					)
				}}
			</Mutation>
		)
	}
	public onInputChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLSelectElement
	> = (event) => {
		const {
			target: { name, value }
		} = event
		this.setState({
			[name]: value
		} as any)
	}

	public onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		const { countryCode, phoneNumber } = this.state
		const phone = `${countryCode}${phoneNumber}`
		const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone)
		if (isValid) {
			this.phoneMutation()
		} else {
			toast.error("Please write a valid phone number")
		}
	}
}

export default PhoneLoginContainer
