'use client'

import { Authentication } from "../_context/Authentication"
import {Favorites} from '@/app/_context/Favorites'
interface IProps {
    children: React.ReactNode
}

export function App({ children }: IProps) {
    return (
        <Authentication>
            <Favorites>
            {children}
            </Favorites>
        </Authentication>
    )
}