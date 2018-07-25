import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'
import NavBarPanel from "./components/NavBarPanel";

logic.spotifyToken = 'BQCmdn6BnOw_CIfcGYEFOHz5AInnW94wYvyaqqn6JE1jprTjeZce2bnBDcR0-DPfhogQcoEGA0nC_qImIFusEuD8nDlTj1aEqdofmKkOxT6eOSLs_3gtDRhnO3gg5QIbKvZhlQHYSQIq'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn
  }

  // componentDidMount() {
  //   if (logic.checkLogin()){
  //     this.setState(
  //       {loggedIn:true}
  //     )
  //
  //   }
  // }

  goToRegister = () => this.setState({ registerActive: true })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(console.error)

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true, loginActive: false }))
      .catch(console.error)

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false })

  storeUserInfo = (userInfo) => {
    console.log(userInfo)
  }

  doLogout = () => {
    console.log("logging out")
    this.setState({loggedIn:false})
    logic.logout();
  }

  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn } } = this


    return (
      <div className="App">
     {/*   <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>*/}

        <NavBarPanel loggedIn={this.state.loggedIn} onLogout={this.doLogout}/>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={this.goToRegister} onLogin={this.goToLogin} />}

        {registerActive && <Register onRegister={this.registerUser} />}

        {loginActive && <Login onLogin={this.loginUser} />}

        {goToLoginActive && <GoToLogin onLogin={this.goToLogin} />}

        {loggedIn && <Main onStoreTrackInfo={this.storeTrackInfo}/>}
      </div>
    )
  }
}

export default App
