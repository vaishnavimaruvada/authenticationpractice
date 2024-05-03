import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: ''}

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePass = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.push('/')
  }

  submitForms = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdata = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdata),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    }
  }

  render() {
    const {username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h1>Please Login</h1>
        <form className="form-control" onSubmit={this.submitForms}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={this.onChangeName}
          />
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            value={password}
            id="pass"
            onChange={this.onChangePass}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}
export default Login
