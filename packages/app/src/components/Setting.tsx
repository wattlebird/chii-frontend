import React, { useContext, useCallback } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Switch from '@mui/material/Switch'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { SettingsContext, BgmPrefix } from '../store/setting'

export const Setting = () => {
  const { mode, toggleColorMode, bgmPrefix, setBgmPrefix } = useContext(SettingsContext)
  const onChangePrefix = useCallback(
    (e: SelectChangeEvent) => {
      setBgmPrefix(e.target.value as BgmPrefix)
    },
    [setBgmPrefix]
  )
  const onChangeDarkMode = useCallback(() => {
    toggleColorMode()
  }, [toggleColorMode])
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, minWidth: 240, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemText id='site-prefix-label' primary='Bangumi URL' />
        <Select
          labelId='site-prefix-label'
          id='site-prefix'
          label='Bangumi URL'
          sx={{ minWidth: 120 }}
          value={bgmPrefix}
          onChange={onChangePrefix}
          variant='standard'
        >
          <MenuItem value={'https://bangumi.tv'}>bangumi.tv</MenuItem>
          <MenuItem value={'https://bgm.tv'}>bgm.tv</MenuItem>
          <MenuItem value={'https://chii.in'}>chii.in</MenuItem>
        </Select>
      </ListItem>
      <ListItem>
        <ListItemText id='nightmode-switch-label' primary='夜间模式' />
        <Switch
          edge='end'
          checked={mode === 'dark'}
          onChange={onChangeDarkMode}
          inputProps={{
            'aria-labelledby': 'nightmode-switch-label',
          }}
        />
      </ListItem>
    </List>
  )
}
