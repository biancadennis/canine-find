'use client'
import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation'

import { login, logout } from '@/app/_requests'

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

    const onLogin = async (body: TLoginBody) => {
        try {
            await login({
                name: body.firstName,
                email: body.email,
            })
            router.push('/dashboard')
        } catch (e) {
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