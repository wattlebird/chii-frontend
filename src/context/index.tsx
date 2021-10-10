import React, {useContext} from 'react'
import { teamsTheme } from '@fluentui/react-northstar'

const ThemeContext = React.createContext({
  theme: teamsTheme,
  mode: "bright",
  updateTheme: () => {}
})

export { ThemeContext }