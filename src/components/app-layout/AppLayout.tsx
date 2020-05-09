import React from 'react'
import { useObserver } from 'mobx-react-lite'
import { Route, Switch } from 'react-router-dom'

import {
  Container
} from '@material-ui/core'

import useStyles from './styles'
import Header from './AppHeader'
import Drawer from './AppDrawer'

import CamsTable from 'pages/cams/table'
import CamDetail from 'pages/cams/detail'

const Layout: React.FC = () => {
  const classes = useStyles()

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  return useObserver( () => (
  <div className={classes.root}>
    <Header isDrawerOpen={isDrawerOpen} onDrawerOpen={handleDrawerOpen} />
    <Drawer isDrawerOpen={isDrawerOpen} onDrawerClose={handleDrawerClose} />

    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <Switch>
          <Route exact path="/app/cams" component={CamsTable} />
          <Route exact path="/app/cams/:camId" component={CamDetail} />
        </Switch>
      </Container>
    </main>
  </div>
  ))
}

export default Layout
