import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import './index.css'

const LoginForm = () => {
  const history = useHistory()
  const [user, setUser] = useState({email: '', password: ''})
  const [isError, showSubmitError] = useState(false)

  const handleInput = e => {
    const {name} = e.target
    const {value} = e.target
    setUser({...user, [name]: value})
  }

  const responseGoogle = resp => {
    console.log(resp)
    console.log(resp.profileObj)
  }

  const submitForm = event => {
    event.preventDefault()

    const records = JSON.parse(localStorage.getItem('records'))

    let exists

    /** Here we check the user given {name,password} with the same with data that is present in the localStorage  */
    records.forEach(ele => {
      if (user.email === ele.email && user.password === ele.password) {
        exists = ele
      }
    })

    if (exists !== undefined) {
      Object.keys(exists).forEach(element => {
        if (element === 'password') {
          exists[element] = user.password
          exists.isLogged = true
        }
      })
      localStorage.setItem('records', JSON.stringify(records))
      showSubmitError(false)
      setUser({email: '', password: ''})
      history.push('/')
    } else {
      showSubmitError(true)
    }
  }

  const onClickHaveAccount = () => {
    history.push('/signup')
  }
  const onClickForgot = () => {
    history.push('/forgot-password')
  }

  return (
    <div className="main-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <h1 className="title">Login</h1>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            EMAIL
          </label>
          <input
            type="text"
            id="email"
            className="input-field"
            value={user.email}
            name="email"
            onChange={handleInput}
            placeholder="Email"
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={user.password}
            onChange={handleInput}
            placeholder="Password"
          />
        </div>

        {isError && (
          <p className="error-message">*Entered details not matched</p>
        )}
        <button type="submit" className="button">
          Login
        </button>

        <div className="span-login">
          <h1 className="input-label">Don't have an account?</h1>
          <h1 onClick={onClickHaveAccount} className="input-label span-btn">
            Sign Up
          </h1>
        </div>
        <div className="span-login">
          <h1 className="input-label">Forgot Password?</h1>
          <h1 onClick={onClickForgot} className="input-label span-btn">
            Click here
          </h1>
        </div>
        <div>
          <GoogleLogin
            clientId="248356830259-h9ilb1hth6bct1lj9m0gcs2q9p5tentt.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
