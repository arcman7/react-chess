import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Board } from './features/board/Board'
import { Navbar } from './app/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/game"
            component={Board}
          />
          <Redirect to="/game" />
        </Switch>
      </div>
    </Router>
  )
}

export default App