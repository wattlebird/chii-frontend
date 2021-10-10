import React, {useContext, useState} from 'react'
import { Flex, Text, Checkbox, Menu, MenuButton, Button  } from '@fluentui/react-northstar'
import { MenuIcon } from '@fluentui/react-icons-northstar'
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../context'
import { useWindowSize } from './lib/Hooks';

function Nav() {
  const {updateTheme, mode} = useContext(ThemeContext)
  const [themeLabel, setThemeLabel] = useState(() => mode === "dark" ? "黑夜模式" : "普通模式")
  let history = useHistory();
  let { width } = useWindowSize();
  const onChangeTheme = () => {
    if (mode === "dark") setThemeLabel("普通模式")
    else setThemeLabel("黑夜模式")
    updateTheme()
  }
  const items = [
    {
      key: 'rank',
      content: '排行榜',
      onClick: () => history.push('/') 
    },
    {
      key: 'tags',
      content: '标签搜索',
      onClick: () => history.push('/tags') 
    },
    {
      key: 'about',
      content: '关于本站',
      onClick: () => history.push('/about') 
    },
  ]

  return <Flex hAlign="start" style={{ padding: "1rem 2rem"}}>
    <Flex.Item align="baseline">
      <Text>Bangumi Research</Text>
    </Flex.Item>
    <Flex.Item push align='end'>
      <Checkbox checked={mode === "dark"} onClick={onChangeTheme} label={themeLabel} toggle />
    </Flex.Item>
    {width >= 769
    ? <Menu defaultActiveIndex={0} items={items} iconOnly />
    : <MenuButton menu={items} trigger={<Button icon={<MenuIcon />} title="Open MenuButton" iconOnly/>}/>}
    

  </Flex>
}

export default Nav;