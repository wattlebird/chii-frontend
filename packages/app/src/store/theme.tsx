import React, { FC } from 'react'
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SettingsContext, useSettings } from './setting'

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#82c91e',
    },
    secondary: {
      main: '#209fe2',
    },
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
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        height: '100%',
      },
    },
  },
}

export const ChiiThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const settings = useSettings()
  const theme = React.useMemo(
    () =>
      createTheme({
        ...themeOptions,
        palette: {
          ...themeOptions.palette,
          mode: settings.mode,
        },
      }),
    [settings.mode]
  )

  return (
    <SettingsContext.Provider value={settings}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  )
}
