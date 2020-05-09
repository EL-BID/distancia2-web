import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import AppLayout from 'components/app-layout'


const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/cams" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/cams" />} />
        <Route path="/app" component={AppLayout} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
