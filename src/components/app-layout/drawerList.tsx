
import React from 'react'
import { NavLink } from 'react-router-dom'

import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import {
  PhotoCamera as PhotoCameraIcon
} from '@material-ui/icons'

interface ListElement {
  text: string;
  to: string;
  icon: any;
}

const elementRenderer: React.FC<ListElement> = (item) => {
  return (
    <NavLink 
      to={item.to} key={item.text}
      style={{
        textDecoration: 'none',
        color: '#212121',
      }}
    >
      <ListItem button>
        <ListItemIcon style={{paddingLeft: '15px'}}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    </NavLink>
  )
}

export const mainListItems = (
  <div>
    {
      [
        {text: 'Camaras', to: '/app/cams', icon: <PhotoCameraIcon/>},
      ].map(elementRenderer)
    }
  </div>
)
