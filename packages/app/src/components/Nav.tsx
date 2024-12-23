import React, { useCallback, useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Setting } from './Setting'
import { SearchBar } from './advancedSearch'

const StyledAppBarBox = styled(Box)(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',
  maxHeight: 96,
  alignItems: 'flex-start',
  padding: '12px 24px 12px',
}))

const LogoBox = styled(Box)(() => ({
  whiteSpace: 'nowrap',
  flexBasis: '175px',
  flexShrink: 0,
}))

const StyledSearchBarBox = styled(Box)(() => ({
  marginLeft: 12,
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}))

const StyledIconWrapper = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}))

const StyledMobileHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledIconButtonGroup = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  [theme.breakpoints.up('md')]: {
    marginLeft: 'auto',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
  },
  [theme.breakpoints.down('md')]: {
    position: 'absolute',
    top: '5px',
    right: '5px',
  },
}))

export const Nav = () => {
  const theme = useTheme()
  const { pathname } = useLocation()
  const matchDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuEl, setmenuEl] = React.useState<null | HTMLElement>(null)
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
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setmenuEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setmenuEl(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      {!matchDesktop && (
        <StyledMobileHeader>
          <LogoBox>
            <Link component={RouterLink} to='/' underline='none' color='text.primary'>
              <Typography variant='h6' component='div' sx={{ lineHeight: '50px' }}>
                Bangumi Research
              </Typography>
            </Link>
          </LogoBox>
          <StyledIconButtonGroup>
            <StyledIconWrapper
              onClick={handleOpenMenu}
              aria-controls={menuEl ? 'navbar-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={menuEl ? 'true' : undefined}
            >
              <MenuIcon />
            </StyledIconWrapper>
            <StyledIconWrapper onClick={toggleDrawer(true)}>
              <SettingsIcon />
            </StyledIconWrapper>
          </StyledIconButtonGroup>
        </StyledMobileHeader>
      )}
      <StyledAppBarBox>
        {matchDesktop && (
          <LogoBox>
            <Link component={RouterLink} to='/' underline='none' color='text.primary'>
              <Typography variant='h6' component='div' sx={{ lineHeight: '50px' }}>
                Bangumi Research
              </Typography>
            </Link>
          </LogoBox>
        )}
        {pathname.startsWith('/search') && (
          <StyledSearchBarBox>
            <SearchBar />
          </StyledSearchBarBox>
        )}
        {matchDesktop && (
          <StyledIconButtonGroup>
            <Link component={RouterLink} to='/rank' underline='none' color='text.primary'>
              <Typography>排行榜</Typography>
            </Link>
            <StyledIconWrapper onClick={toggleDrawer(true)}>
              <SettingsIcon />
            </StyledIconWrapper>
          </StyledIconButtonGroup>
        )}
      </StyledAppBarBox>
      <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
        <Setting />
      </Drawer>
      <Menu
        anchorEl={menuEl}
        id='navbar-menu'
        open={!!menuEl}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Link component={RouterLink} to='/rank' underline='none' color='text.primary'>
            <Typography>排行榜</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  )
}
