'use client'
import { useContext} from 'react'
import Link from 'next/link'

import { Button } from '@/app/_components/Button'

import { AuthenticationContext } from '@/app/_context/Authentication'

import styles from './Navigation.module.css'


export default function Navigation() {
    const {isAuthenticated, onLogout } = useContext(AuthenticationContext)

    return (
        <div className={styles.navigation}>
            <Link className={styles.link} href="/dashboard">CanineFind</Link>
            
                {isAuthenticated && (
                    <div className={styles.mainNav}>
                    <Link className={styles.link} href="/favorites">Favorites</Link>
                    <Link className={styles.link} href="/match">Find a match</Link>
                    <Button onClick={onLogout}>Logout</Button>
                    </div>
                )}
            
        </div>
    )
}