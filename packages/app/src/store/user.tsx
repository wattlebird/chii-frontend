import React from 'react'
import { BangumiUser } from '../graphql/index.generated'

export interface IUserContext {
  user: BangumiUser | null
  setUser: (user: BangumiUser | null) => void
}

export const UserContext = React.createContext<IUserContext>({
  user: null,
  setUser: (user: BangumiUser | null) => {},
})

export function useUser(): IUserContext {
  const [user, setUser] = React.useState<BangumiUser | null>(null)
  return {
    user,
    setUser,
  }
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const values = useUser()
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}