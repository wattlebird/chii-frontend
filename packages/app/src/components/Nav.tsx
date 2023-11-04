import React, { useCallback, useState } from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import Divider from '@mui/material/Divider'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import { Setting } from './Setting'
import { Menu } from './Menu'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export const Nav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setDrawerOpen(open)
    },
    [setDrawerOpen]
  )
  const toggleMenu = useCallback((open: boolean) => () => setMenuOpen(open), [])

  return (
    <>
      <AppBar position='static' open={menuOpen}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={toggleMenu(true)}
            edge='start'
            sx={{ mr: 2, ...(menuOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ minWidth: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Link component={RouterLink} to='/' underline='none' color='text.primary'>
              <Typography variant='h6' noWrap component='div'>
                Bangumi Research
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={toggleDrawer(true)} sx={{ ml: 1 }}>
            <SettingsIcon />
          </IconButton>
          <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
            <Setting />
          </Drawer>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={menuOpen}
      >
        <DrawerHeader>
          <IconButton onClick={toggleMenu(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Menu />
      </Drawer>
    </>
  )
}
