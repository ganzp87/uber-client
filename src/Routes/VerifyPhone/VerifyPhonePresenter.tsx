import React from "react"
import Helmet from "react-helmet"
import styled from "src/typed-component"
import Input from "src/Components/Input"
import Header from "src/Components/Header"
import Button from "src/Components/Button"
import Form from "src/Components/Form"
import { MutationFunction } from "react-apollo"
import { verifyPhone, verifyPhoneVariables } from "src/types/api"

const Container = styled.div``

const ExtendedForm = styled(Form)`
	padding: 0px 40px;
`

const ExtendedInput = styled(Input)`
	margin-bottom: 20px;
`

interface IProps {
	verifiedKey: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onSubmit: MutationFunction<verifyPhone, verifyPhoneVariables>
	loading: boolean
}

const VerifyPhonePresenter: React.FC<IProps> = ({
	verifiedKey,
	onChange,
	onSubmit,
	loading
}) => (
	<Container>
		<Helmet>
			<title>Verify Phone | Uber</title>
		</Helmet>
		<Header backTo={"/phone-login"} title={"Verify Phone Number"}></Header>
		<ExtendedForm submitFn={onSubmit}>
			<ExtendedInput
				value={verifiedKey}
				placeholder={"Enter Verification Code"}
				onChange={onChange}
				name={"verifiedKey"}
			/>
			<Button
				disabled={loading}
				value={loading ? "Verifying" : "Submit"}
				onClick={null}
			/>
		</ExtendedForm>
	</Container>
)

export default VerifyPhonePresenter
