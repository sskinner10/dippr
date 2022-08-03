import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SauceShowPage from './SauceShowPage'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/sauces/:id" component={SauceShowPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
