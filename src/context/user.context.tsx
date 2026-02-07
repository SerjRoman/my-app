import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { User } from "../shared/types";
import { useGetMe } from "../shared/api";


interface UserContextContract {
    user: User | null
    setUser: (newUser: User) => void
    token: string | null;
    setToken: (token: string | null) => void
}

const UserContext = createContext<UserContextContract | null>(null)


export function UserContextProvider({children}: PropsWithChildren){
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [getMe] = useGetMe()

    async function setUserFromServer() {
        if( !token) return;

        const userData = await getMe(token)
        if ("id" in userData) setUser(userData)
    }
    useEffect( () => {
        const token = localStorage.getItem('token')
        if (!token) return;
        setToken(token)
    },[])

    useEffect( () => {
        if (!token) return
        setUserFromServer()
    }, [token])

    return <UserContext value = {{user, setUser, token, setToken}}>
        {children}
    </UserContext>
}

export function useUserContext(): UserContextContract {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error("Provider must wrap your App component!!!!!!!!!!!")
    return ctx
}