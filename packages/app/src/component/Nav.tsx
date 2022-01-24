import React, { useContext, useState } from 'react'
import { Flex, Checkbox, Menu, MenuButton, Button } from '@fluentui/react-northstar'
import { MenuIcon } from '@fluentui/react-icons-northstar'
import { useNavigate } from 'react-router-dom'
import ThemeContext from '../context'
import { useWindowSize } from './lib/Hooks'
import logo from '../assets/logo.png'

function Nav() {
  const { updateTheme, mode } = useContext(ThemeContext)
  const [themeLabel, setThemeLabel] = useState(() => (mode === 'dark' ? '黑夜模式' : '普通模式'))
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const onChangeTheme = () => {
    if (mode === 'dark') setThemeLabel('普通模式')
    else setThemeLabel('黑夜模式')
    updateTheme()
  }
  const items = [
    {
      key: 'rank',
      content: '排行榜',
      onClick: () => navigate('/')
    },
    {
      key: 'tags',
      content: '标签搜索',
      onClick: () => navigate('/tags')
    },
    {
      key: 'about',
      content: '关于本站',
      onClick: () => navigate('/about')
    }
  ]

  return (
    <Flex hAlign='start' style={{ padding: '1rem 2rem' }}>
      <img src={logo} alt='Bangumi Research Logo' height='48px' />
      <Flex.Item push align='center'>
        <Checkbox checked={mode === 'dark'} onClick={onChangeTheme} label={themeLabel} toggle />
      </Flex.Item>
      {width >= 769 ? (
        <Menu defaultActiveIndex={0} items={items} iconOnly />
      ) : (
        <MenuButton menu={items} trigger={<Button icon={<MenuIcon />} title='Open MenuButton' iconOnly />} />
      )}
    </Flex>
  )
}

export default Nav
