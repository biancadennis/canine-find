'use client'

import cn from 'classnames'

import styles from './Button.module.css'

interface IProps {
    onClick: () => void
    children: React.ReactNode
    className?: string
    type?: 'primary' | 'secondary' | 'tertiary'
}

export function Button ({onClick, children, className, type = 'secondary'}: IProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }
    return (
        <div className={cn(className, {
            [styles[type]]: type,
        })} role="button" tabIndex={0} onClick={onClick} onKeyDown={handleKeyDown}>
            {children}
        </div>
    )
}