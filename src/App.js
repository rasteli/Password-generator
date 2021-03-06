import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import useViewport from "./hooks/useViewport"
import { AuthProvider } from "./contexts/AuthContext"
import { DeleteProvider } from "./contexts/DeleteContext"

import Login from "./components/auth/Login"
import SignUp from "./components/auth/SignUp"
import Profile from "./components/auth/Profile"
import PasswordCard from "./components/PasswordCard"
import UpdateProfile from "./components/auth/UpdateProfile"
import ForgotPassword from "./components/auth/ForgotPassword"

import PrivateRoute from "./components/auth/PrivateRoute"
import NonPrivateRoute from "./components/auth/NonPrivateRoute"

function App() {
  const { innerWidth } = useViewport()

  const CustomRoute = props => (
    <>{innerWidth > 500 ? <PrivateRoute {...props} /> : <Route {...props} />}</>
  )

  return (
    <Router>
      <AuthProvider>
        <DeleteProvider>
          <Switch>
            <CustomRoute exact path="/" component={PasswordCard} />

            <NonPrivateRoute path="/login" component={Login} />
            <NonPrivateRoute path="/signup" component={SignUp} />
            <NonPrivateRoute
              path="/reset-password"
              component={ForgotPassword}
            />

            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
          </Switch>
        </DeleteProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
