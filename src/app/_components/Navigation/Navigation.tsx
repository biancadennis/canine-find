'use client'
import { useContext} from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/app/_components/Button'

import { AuthenticationContext } from '@/app/_context/Authentication'

import styles from './Navigation.module.css'


export default function Navigation() {
    const { onLogout } = useContext(AuthenticationContext)
    const pathName = usePathname()
    const isLogin = pathName === '/'

    return (
        <div className={styles.navigation}>
            <Link className={cn(styles.link, styles.company)} href={isLogin ? '' : "/dashboard"}>CanineFind</Link>
            
                {!isLogin && (
                    <div className={styles.mainNav}>
                    <Link className={styles.link} href="/favorites">Favorites</Link>
                    <Link className={styles.link} href="/match">Find a match</Link>
                    <Button className={styles.logout} onClick={onLogout}>Logout</Button>
                    </div>
                )}
            
        </div>
    )
}