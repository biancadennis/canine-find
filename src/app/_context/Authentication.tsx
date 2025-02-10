'use client'
import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation'

type TLoginBody = {
    firstName: string
    email: string
}

interface IAuthentication {
    isAuthenticated: boolean
    onLogin: (loginBody: TLoginBody) => void
    onLogout: () => void
}

const defaultContext: IAuthentication = {
    isAuthenticated: false,
    onLogin: () => { },
    onLogout: () => { },
}

interface IProps {
    children: React.ReactNode
}

export const AuthenticationContext = createContext(defaultContext);

export function Authentication({ children }: IProps) {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onLogin = (body: TLoginBody) => {
        setIsAuthenticated(true)
        router.push('/dashboard')
    }

    const onLogout = () => {
        setIsAuthenticated(false)
    }

    const contextValue: IAuthentication = {
        isAuthenticated,
        onLogin,
        onLogout,
    }

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    );
}