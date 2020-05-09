import React from 'react'
import clsx from 'clsx'

import {
  List,
  Drawer,
  Divider,
  IconButton
} from '@material-ui/core'
import {
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons'

import useStyles from './styles'
import { mainListItems } from './drawerList'

interface AppHeaderProps {
  readonly isDrawerOpen: boolean;
  onDrawerClose: () => void;
}

const Layout: React.FC<AppHeaderProps> = ({isDrawerOpen, onDrawerClose}) => {
  const classes = useStyles()

  return (
  <Drawer
    variant="permanent"
    classes={{
      paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
    }}
    open={isDrawerOpen}
  >
    <div className={classes.toolbarIcon}>
      <IconButton onClick={onDrawerClose}>
        <ChevronLeftIcon/>
      </IconButton>
    </div>
    <Divider />
    <List>{mainListItems}</List>
  </Drawer>
  )
}

export default Layout
