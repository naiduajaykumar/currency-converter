import {useState} from 'react'
import {useHistory} from 'react-router-dom'

import GoogleLogin from 'react-google-login'

import useLocalStorage from '../../hooks/useLocalStorage'
import './index.css'

const SignupForm = () => {
  const history = useHistory()

  const [userRegistration, setUserRegistration] = useState({
    username: '',
    password: '',
    email: '',
    isLogged: false,
  })

  const [isError, showSubmitError] = useState(false)
  const [isExists, showExistsError] = useState(false)
  const [isSuccess, showSuccess] = useState(false)

  /** At first for records we will set the dummy data  */
  const [records, setRecords] = useLocalStorage('records', [
    {
      username: 'test',
      password: 'test@123',
      email: 'email@123',
      id: 1,
      isLogged: false,
    },
  ])

  const responseGoogle = resp => {
    console.log(resp)
    console.log(resp.profileObj)
  }

  const handleInput = e => {
    const {name} = e.target
    const {value} = e.target
    setUserRegistration({...userRegistration, [name]: value})
  }

  const onSubmitForm = event => {
    event.preventDefault()

    const {username, password, email} = userRegistration

    const exists = records.some(ele => email === ele.email)

    if (username === '' || password === '' || email === '') {
      showSubmitError(true)
      showSuccess(false)
    } else if (exists) {
      showSubmitError(false)
      showExistsError(true)
      showSuccess(false)
    } else {
      const newRecord = {
        ...userRegistration,
        id: new Date().getTime().toString(),
        isLogged: false,
      }

      setRecords([...records, newRecord])

      setUserRegistration({username: '', password: '', email: ''})
      showSubmitError(false)
      showExistsError(false)
      showSuccess(true)
    }
  }

  const onClickAlready = () => {
    history.push('/login')
  }

  return (
    <div className="main-form-container">
      <form className="form-container" onSubmit={onSubmitForm}>
        <h1 className="title">Sign Up</h1>
        {isExists && <p className="error-message">Email Already Exists</p>}
        {isSuccess && (
          <p className="success-message">Successfully Registered</p>
        )}
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-field"
            name="username"
            onChange={handleInput}
            placeholder="Username"
            value={userRegistration.username}
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="password">
            SET PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            onChange={handleInput}
            placeholder="Set Password"
            value={userRegistration.password}
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="email">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            onChange={handleInput}
            placeholder="Email"
            value={userRegistration.email}
          />
        </div>

        {isError && <p className="error-message">Please fill all the fields</p>}
        <button type="submit" className="button">
          Sign Up
        </button>

        <div className="span-login">
          <h1 className="input-label">Already have an account?</h1>
          <h1 onClick={onClickAlready} className="input-label span-btn">
            Login here
          </h1>
        </div>

        <div>
          <GoogleLogin
            clientId="248356830259-h9ilb1hth6bct1lj9m0gcs2q9p5tentt.apps.googleusercontent.com"
            buttonText="Sign Up"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      </form>
    </div>
  )
}

export default SignupForm
