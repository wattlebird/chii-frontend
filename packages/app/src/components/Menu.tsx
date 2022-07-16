import React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import InfoIcon from '@mui/icons-material/Info';

export const Menu = () => {
  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListItemButton
        selected={false}
        onClick={() => {}}
      >
        <ListItemIcon>
          <FormatListNumberedIcon />
        </ListItemIcon>
        <ListItemText primary="Anime Ranking" />
      </ListItemButton>
      <ListItemButton
        selected={false}
        onClick={() => {}}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
    </List>
  )
}