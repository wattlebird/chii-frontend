import React, { useState, useCallback } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { PaletteMode } from '@mui/material'

export type BgmPrefix = 'https://bangumi.tv' | 'https://bgm.tv' | 'https://chii.in'

export interface ISettings {
  toggleColorMode: () => void
  mode: PaletteMode
  bgmPrefix: BgmPrefix
  setBgmPrefix: (value: BgmPrefix) => void
}

export const SettingsContext = React.createContext<ISettings>({
  toggleColorMode: () => {
    return
  },
  mode: 'light',
  bgmPrefix: 'https://bgm.tv',
  setBgmPrefix: () => {
    return
  },
})

export function useSettings(): ISettings {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<PaletteMode>(() => (prefersDarkMode ? 'dark' : 'light'))
  const [prefix, setPrefix] = useState<BgmPrefix>('https://bgm.tv')
  const toggleColorMode = useCallback(() => {
    setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }, [setMode])
  const setBgmPrefix = useCallback((value: BgmPrefix) => setPrefix(value), [setPrefix])
  return {
    mode,
    toggleColorMode,
    bgmPrefix: prefix,
    setBgmPrefix,
  }
}
