import React from "react"
// import { RouteComponentProps, Link } from "react-router-dom"
import Helmet from "react-helmet"
import styled from "../../typed-component"
import BackArrow from "src/Components/BackArrow/BackArrow"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

const Container = styled.div`
	margin-top: 30px;
	padding: 50px 20px;
`

const Title = styled.h2`
	font-size: 25px;
	margin-bottom: 40px;
`

const BackArrowExtended = styled(BackArrow)`
	position: absolute;
	top: 20px;
	left: 20px;
`

const Link = styled.span`
	display: flex;
	align-items: center;
	cursor: pointer;
`

const Icon = styled.span`
	margin-right: 10px;
`

interface IProps {
	loginCallback: (response: any) => void
}

const SocialLoginPresenter: React.FC<IProps> = ({ loginCallback }) => (
	<Container>
		<Helmet>
			<title>Social Login | Uber</title>
		</Helmet>
		<Title>Choose an account</Title>
		<BackArrowExtended backTo={"/"} />
		<FacebookLogin
			appId="250032782207799"
			autoLoad={false}
			fields="name, first_name,last_name, email"
			callback={loginCallback}
			render={(renderProps: {
				onClick:
					| ((
							event: React.MouseEvent<HTMLSpanElement, MouseEvent>
					  ) => void)
					| undefined
			}) => (
				<Link onClick={renderProps.onClick}>
					<Icon>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" />
						</svg>
					</Icon>
					{"Facebook"}
				</Link>
			)}
		/>
	</Container>
)

export default SocialLoginPresenter
