import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { AuthTokenContext } from '../store/auth';

export const AuthRedirect: React.FC = () => {
    const [searchParams] = useSearchParams()
    const { setAccessToken, setRefreshToken } = useContext(AuthTokenContext)
    const navigate = useNavigate()

    useEffect(() => {
        const accesstoken = searchParams.get("access_token")
        const refreshtoken = searchParams.get("refresh_token")
        if (accesstoken && refreshtoken) {
            setAccessToken(accesstoken ?? "")
            setRefreshToken(refreshtoken ?? "")
            navigate("/")
        }
    }, [])
    return null;
}
