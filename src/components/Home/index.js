/* eslint-disable react/no-array-index-key */
import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Axios from 'axios'

import {FormControl, Select, TextField} from '@material-ui/core'

import './index.css'

const Home = props => {
  const history = useHistory()
  const {userDetails} = props
  const {username} = userDetails

  const [text1, setText1] = useState()
  const [text2, setText2] = useState()
  const [text3, setText3] = useState()
  const [text4, setText4] = useState()

  const [country, setCountry] = useState([])
  const [country1, setCountry1] = useState([])
  const [country2, setCountry2] = useState([])
  const [country3, setCountry3] = useState([])

  const [value1, setValue1] = useState(1)
  const [value2, setValue2] = useState(1)
  const [value3, setValue3] = useState(1)
  const [value4, setValue4] = useState(1)

  const getData = async () => {
    const res = await Axios.get(
      'http://data.fixer.io/api/latest?access_key=8c0bfdbc40cb66b1bc66b8e5bb897cc2',
    )
    setCountry(res.data.rates)
    setCountry1(res.data.rates)
    setCountry2(res.data.rates)
    setCountry3(res.data.rates)
  }

  useEffect(() => {
    getData()
  }, [])

  const convert = e => {
    e.preventDefault()
    const num1 = (value2 / value1) * text1
    setText2(num1)
    const num2 = (value3 / value1) * text1
    setText3(num2)
    const num3 = (value4 / value1) * text1
    setText4(num3)
  }

  /** Logout button */
  const onClickLogout = () => {
    const {records} = props
    Object.keys(userDetails).forEach(element => {
      if (element === 'isLogged') {
        userDetails.isLogged = false
      }
    })
    localStorage.setItem('records', JSON.stringify(records))
    history.push('/login')
  }

  return (
    <>
      <nav className="nav-header">
        <div className="nav-content">
          <h1 className="text">Hi, {username}</h1>
          <button className="btn-logout" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="app-container">
        <h1 className="head">Currency Converter</h1>
        <form onSubmit={convert}>
          <div className="form-container1">
            <div className="source-sec">
              <TextField
                variant="outlined"
                type="number"
                className="input"
                value={text1 || ''}
                onChange={e => setText1(e.target.value)}
              />
              <FormControl
                variant="outlined"
                className="dropdown"
                onChange={e => setValue1(e.target.value)}
              >
                <Select native>
                  {Object.keys(country).map((value, index) => (
                    <option key={index} value={country[value]}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="target-sec">
              <div className="target">
                <TextField
                  variant="outlined"
                  type="number"
                  className="input"
                  value={text2 || ''}
                />
                <FormControl
                  className="dropdown"
                  variant="outlined"
                  onChange={e => setValue2(e.target.value)}
                >
                  <Select native>
                    {Object.keys(country1).map((value, index) => (
                      <option key={index} value={country1[value]}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="target">
                <TextField
                  variant="outlined"
                  type="number"
                  className="input"
                  value={text3 || ''}
                />
                <FormControl
                  className="dropdown"
                  variant="outlined"
                  onChange={e => setValue3(e.target.value)}
                >
                  <Select native>
                    {Object.keys(country2).map((value, index) => (
                      <option
                        variant="inline"
                        key={index}
                        value={country2[value]}
                      >
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="target">
                <TextField
                  variant="outlined"
                  type="number"
                  className="input"
                  value={text4 || ''}
                />
                <FormControl
                  className="dropdown"
                  variant="outlined"
                  onChange={e => setValue4(e.target.value)}
                >
                  <Select native>
                    {Object.keys(country3).map((value, index) => (
                      <option
                        variant="inline"
                        key={index}
                        value={country3[value]}
                      >
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <button className="button convert-btn" type="submit">
              Convert
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Home
