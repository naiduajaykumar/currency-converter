import {useState} from 'react'
import {useHistory} from 'react-router-dom'

import './index.css'

const ForgotPassword = () => {
  const history = useHistory()
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isExists, showSubmitError] = useState(false)
  const [notSame, showPasswordError] = useState(false)
  const [success, showSuccess] = useState(false)

  const handleInput = e => {
    const {name} = e.target
    const {value} = e.target
    setUser({...user, [name]: value})
  }

  const submitForm = event => {
    event.preventDefault()

    const records = JSON.parse(localStorage.getItem('records'))

    /** Finding the index of the given user in the local storage */
    const index = records.findIndex(ele => ele.email === user.email)

    /** Find the user details in local storage */
    const exists = records[index]

    if (exists !== undefined) {
      showSubmitError(false)

      if (user.password !== user.confirmPassword || user.password === '') {
        showPasswordError(true)
        showSuccess(false)
      } else {
        /** Here we got particular user details(exists) loop through that array and update the password using keys */
        Object.keys(exists).forEach(element => {
          if (element === 'password') {
            exists[element] = user.password
          }
        })
        setUser({email: '', password: '', confirmPassword: ''})
        showPasswordError(false)
        showSuccess(true)
      }
      records.splice(index, 1, exists)
      localStorage.setItem('records', JSON.stringify(records))
    } else {
      showSubmitError(true)
      showSuccess(false)
    }
  }

  const onClickHaveAccount = () => {
    history.push('/login')
  }

  return (
    <div className="main-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <h1 className="title">Reset Password</h1>
        {success && <p className="success-message">*Successfully reset</p>}
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
            RESET PASSWORD
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="input-field"
            value={user.password}
            onChange={handleInput}
            placeholder="Password"
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="password">
            CONFORM PASSWORD
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="input-field"
            value={user.confirmPassword}
            onChange={handleInput}
            placeholder="Password"
          />
        </div>

        {isExists && <p className="error-message">*Email does not exists</p>}
        {notSame && <p className="error-message">*Passwords did not match</p>}
        <button type="submit" className="button">
          Reset
        </button>

        <div className="span-login">
          <h1 onClick={onClickHaveAccount} className="input-label span-btn">
            Login here
          </h1>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
