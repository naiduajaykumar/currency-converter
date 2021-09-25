import {BrowserRouter, Route, Switch} from 'react-router-dom'

import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
import ForgotPassword from './components/ForgotPassword'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App
