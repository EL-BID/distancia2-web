
import React from 'react'
import clsx from 'clsx'

import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Settings as SettingsIcon
} from '@material-ui/icons'

import useStyles from './styles'

interface AppHeaderProps {
  readonly isDrawerOpen: boolean;
  onDrawerOpen: () => void;
}

const Header: React.FC<AppHeaderProps> = ({isDrawerOpen, onDrawerOpen}) => {
  const classes = useStyles()
  const onSettingsOpen = () => window.open('/admin', "_blank") 

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            className={clsx(classes.menuButton, isDrawerOpen && classes.menuButtonHidden)}
          >
            <MenuIcon/>
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Distancia2
          </Typography>
          <Tooltip title="Panel de Administración">
            <IconButton
              color="inherit"
              edge="end"
              onClick={onSettingsOpen}
            >
              <SettingsIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
  )
}

export default Header
