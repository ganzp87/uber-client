import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import AddPlace from "../../Routes/AddPlace"
import EditAccount from "../../Routes/EditAccount"
import Home from "../../Routes/Home"
import Login from "../../Routes/Login"
import PhoneLogin from "../../Routes/PhoneLogin"
import Places from "../../Routes/Places"
import Ride from "../../Routes/Ride"
import Settings from "../../Routes/Settings"
import VerifyPhone from "../../Routes/VerifyPhone"
import SocialLogin from "../../Routes/SocialLogin"
import FindAddress from "../../Routes/FindAddress"

interface IProps {
	isLoggedIn: boolean
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
	<BrowserRouter>
		{isLoggedIn ? (
			<LoggedInRoutes></LoggedInRoutes>
		) : (
			<LoggedOutRoutes></LoggedOutRoutes>
		)}
	</BrowserRouter>
)

const LoggedOutRoutes: React.FC = () => (
	<Switch>
		<Route path={"/"} exact={true} component={Login} />
		<Route path={"/phone-login"} component={PhoneLogin} />
		<Route path={"/verify-phone"} component={VerifyPhone} />
		<Route path={"/social-login"} component={SocialLogin} />
		{/* 위의 path에 해당 안되는 주소인 경우 홈으로 리다이렉트 */}
		<Redirect from={"*"} to={"/"} />
	</Switch>
)

const LoggedInRoutes: React.FC = () => (
	<Switch>
		<Route path={"/"} exact={true} component={Home} />
		<Route path={"/ride"} exact={true} component={Ride} />
		<Route path={"/edit-account"} exact={true} component={EditAccount} />
		<Route path={"/settings"} exact={true} component={Settings} />
		<Route path={"/places"} exact={true} component={Places} />
		<Route path={"/add-place"} exact={true} component={AddPlace} />
		<Route path={"/find-address"} exact={true} component={FindAddress} />
		{/* 위의 path에 해당 안되는 주소인 경우 홈으로 리다이렉트 */}
		<Redirect from={"*"} to={"/"} />
	</Switch>
)

AppPresenter.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired
}

export default AppPresenter
