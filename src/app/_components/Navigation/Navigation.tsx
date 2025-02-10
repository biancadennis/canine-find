'use client'
import { useContext} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/app/_components/Button'

import { AuthenticationContext } from '@/app/_context/Authentication'

import styles from './Navigation.module.css'


export default function Navigation() {
    const { onLogout } = useContext(AuthenticationContext)
    const pathName = usePathname()

    return (
        <div className={styles.navigation}>
            <Link className={styles.link} href="/dashboard">CanineFind</Link>
            
                {pathName !== '/' && (
                    <div className={styles.mainNav}>
                    <Link className={styles.link} href="/favorites">Favorites</Link>
                    <Link className={styles.link} href="/match">Find a match</Link>
                    <Button onClick={onLogout}>Logout</Button>
                    </div>
                )}
            
        </div>
    )
}