import React from 'react'

export interface IAuthToken {
    accessToken: string
    setAccessToken: (token: string) => void
    refreshToken: string
    setRefreshToken: (token: string) => void
}

export const AuthTokenContext = React.createContext<IAuthToken>({
    accessToken: '',
    setAccessToken: (token: string) => {},
    refreshToken: '',
    setRefreshToken: (token: string) => {},
})

export function useAuthToken(): IAuthToken {
    const [accessToken, setAccessToken] = React.useState<string>('')
    const [refreshToken, setRefreshToken] = React.useState<string>('')
    return {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken
    }
}

export const AuthTokenProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const values = useAuthToken()
    return <AuthTokenContext.Provider value={values}>
        {children}
    </AuthTokenContext.Provider>
}
