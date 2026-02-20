import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { AuthTokenContext } from '../store/auth';

export const AuthRedirect: React.FC = () => {
    const [searchParams] = useSearchParams()
    const { setAccessToken, setRefreshToken, setExpirationTime } = useContext(AuthTokenContext)
    const navigate = useNavigate()

    useEffect(() => {
        const accesstoken = searchParams.get("access_token")
        const refreshtoken = searchParams.get("refresh_token")
        const lifetime = searchParams.get("expires_in")
        const now = Date.now() // UNIX epoch in milliseconds
        if (accesstoken && refreshtoken) {
            const expirationTime = lifetime ? parseInt(lifetime, 10) * 1000 + now : now
            
            // Save to context
            setAccessToken(accesstoken ?? "")
            setRefreshToken(refreshtoken ?? "")
            setExpirationTime(expirationTime)
            
            // Save to localStorage
            localStorage.setItem("_CHII_AI_ACCESSTOKEN", accesstoken)
            localStorage.setItem("_CHII_AI_REFRESHTOKEN", refreshtoken)
            localStorage.setItem("_CHII_AI_EXPIRATIONTIME", expirationTime.toString())
            
            navigate("/")
        }
    }, [])
    return null;
}
