import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export const Setting = () => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemText id="site-prefix-label" primary="Bangumi site preference" />
        <Select
          labelId="site-prefix-label"
          id="site-prefix"
          label="Site prefix"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value={'https://bangumi.tv'}>bangumi.tv</MenuItem>
          <MenuItem value={'https://bgm.tv'}>bgm.tv</MenuItem>
          <MenuItem value={'https://chii.in'}>chii.in</MenuItem>
        </Select>
      </ListItem>
      <ListItem>
        <ListItemText id="nightmode-switch-label" primary="Night mode" />
        <Switch
          edge="end"
          inputProps={{
            'aria-labelledby': 'nightmode-switch-label',
          }}
        />
      </ListItem>
    </List>
  )
}