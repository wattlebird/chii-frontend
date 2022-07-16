import React, { FC } from 'react'
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: 'light'
})

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#82c91e'
    },
    secondary: {
      main: '#209fe2'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      '"Noto Sans"',
      '"Helvetica Neue"',
      'Helvetica',
      '"Nimbus Sans L"',
      'Arial',
      '"Liberation Sans"',
      '"PingFang SC"',
      '"Hiragino Sans GB"',
      '"Noto Sans CJK SC"',
      '"Source Han Sans SC"',
      '"Source Han Sans CN"',
      '"Microsoft YaHei"',
      '"Wenquanyi Micro Hei"',
      '"WenQuanYi Zen Hei"',
      '"ST Heiti"',
      'SimHei',
      '"WenQuanYi Zen Hei Sharp"',
      'sans-serif'
    ].join(',')
  },
  shape: {
    borderRadius: 0
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        height: '100%'
      }
    }
  }
}

export const ChiiThemeProvider: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = React.useState<PaletteMode>(() => (prefersDarkMode ? 'dark' : 'light'))
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
      mode
    }),
    []
  )
  const theme = React.useMemo(
    () =>
      createTheme({
        ...themeOptions,
        palette: {
          ...themeOptions.palette,
          mode
        }
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
