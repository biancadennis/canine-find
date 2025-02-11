'use client'

import cn from 'classnames'

import styles from './Button.module.css'

interface IProps {
    onClick: () => void
    disabled?: false
    children: React.ReactNode
    className?: string
    type: 'primary' | 'secondary'
}

export function Button ({onClick, disabled, children, className, type = 'secondary'}: IProps) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }
    return (
        <div className={cn(className, {
            [styles[type]]: type,
        })} disabled={!onClick || disabled} role="button" tabIndex="0" onClick={onClick} onKeyDown={handleKeyDown}>
            {children}
        </div>
    )
}