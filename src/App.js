import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'



import { Board } from './features/board/Board'
import { Navbar } from './app/Navbar'
import { Facebook } from './features/users/facebook/App'
import { FacebookLogin } from './features/users/FacebookLogin'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/test"
            component={FacebookLogin}
          />
          <Route
            exact
            path="/game"
            component={Board}
          />
          <Redirect to="/test" />
        </Switch>
      </div>
    </Router>
  )
}

export default App