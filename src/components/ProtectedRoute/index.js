import {Redirect, Route} from 'react-router-dom'
import Home from '../Home'

const ProtectedRoute = () => {
  const records = JSON.parse(localStorage.getItem('records'))

  /** Here we are using try block because if when ever a non logged user tries to get into the home,
   *then there will 'user' object, then will raise an error, in order to avoid that.
   */
  let checkLogged
  let user
  try {
    user = records.filter(ele => ele.isLogged === true)
    const {isLogged} = user[0]
    checkLogged = isLogged
  } catch (error) {
    return <Redirect to="/login" />
  }

  if (!checkLogged) {
    return <Redirect to="/login" />
  }

  return (
    <Route
      render={props => (
        <Home {...props} userDetails={user[0]} records={records} />
      )}
    />
  )
}

export default ProtectedRoute
