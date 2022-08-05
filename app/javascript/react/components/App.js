import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SauceShowPage from './SauceShowPage'
import UserShowPage from './UserShowPage'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/sauces/:id" component={SauceShowPage} />
        <Route exact path="/users/:id" component={UserShowPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
