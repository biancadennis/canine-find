'use client'
import { createContext } from 'react';
import { useRouter } from 'next/navigation'

import { login, logout } from '@/app/_requests'

type TLoginBody = {
    firstName: string
    email: string
}

interface IAuthentication {
    onLogin: (loginBody: TLoginBody) => Promise<boolean>
    onLogout: () => void
}

const defaultContext: IAuthentication = {
    onLogin: () => Promise.resolve(false),
    onLogout: () => { },
}

interface IProps {
    children: React.ReactNode
}

export const AuthenticationContext = createContext(defaultContext);

export function Authentication({ children }: IProps) {
    const router = useRouter()

    const onLogin = async (body: TLoginBody) => {
        try {
            await login({
                name: body.firstName,
                email: body.email,
            })
            router.push('/dashboard')
            return true
        } catch {
            return false
        }
    }

    const onLogout = () => {
        logout()
        router.push('/')
    }

    const contextValue: IAuthentication = {
        onLogin,
        onLogout,
    }

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    );
}