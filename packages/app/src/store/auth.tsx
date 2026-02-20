import React from 'react'

export interface IAuthToken {
    accessToken: string
    setAccessToken: (token: string) => void
    refreshToken: string
    setRefreshToken: (token: string) => void
    expirationTime: number
    setExpirationTime: (expirationTime: number) => void
}

export const AuthTokenContext = React.createContext<IAuthToken>({
    accessToken: '',
    setAccessToken: (token: string) => {},
    refreshToken: '',
    setRefreshToken: (token: string) => {},
    expirationTime: 0,
    setExpirationTime: (expirationTime: number) => {},
})

export function useAuthToken(): IAuthToken {
    const [accessToken, setAccessToken] = React.useState<string>(() => {
        const storedToken = localStorage.getItem("_CHII_AI_ACCESSTOKEN")
        const storedExpiration = localStorage.getItem("_CHII_AI_EXPIRATIONTIME")
        const now = Date.now()
        
        if (storedToken && storedExpiration) {
            const expirationMs = parseInt(storedExpiration, 10)
            // Check if token is still valid (current time does not exceed expiration)
            if (now < expirationMs) {
                return storedToken
            }
        }
        return ''
    })
    
    const [refreshToken, setRefreshToken] = React.useState<string>(() => {
        const storedToken = localStorage.getItem("_CHII_AI_REFRESHTOKEN")
        const storedExpiration = localStorage.getItem("_CHII_AI_EXPIRATIONTIME")
        const now = Date.now()
        
        if (storedToken && storedExpiration) {
            const expirationMs = parseInt(storedExpiration, 10)
            // Check if token is still valid (current time does not exceed expiration)
            if (now < expirationMs) {
                return storedToken
            }
        }
        return ''
    })
    
    const [expirationTime, setExpirationTime] = React.useState<number>(() => {
        const storedExpiration = localStorage.getItem("_CHII_AI_EXPIRATIONTIME")
        const now = Date.now()
        
        if (storedExpiration) {
            const expirationMs = parseInt(storedExpiration, 10)
            // Check if token is still valid (current time does not exceed expiration)
            if (now < expirationMs) {
                return expirationMs
            }
        }
        return 0
    })
    
    return {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        expirationTime,
        setExpirationTime
    }
}

export const AuthTokenProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const values = useAuthToken()
    return <AuthTokenContext.Provider value={values}>
        {children}
    </AuthTokenContext.Provider>
}
