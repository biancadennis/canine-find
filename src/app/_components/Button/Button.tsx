'use client'

import cn from 'classnames'

interface IProps {
    onClick: () => void
    disabled?: false
    children: React.ReactNode
    className?: string
}

export function Button ({onClick, disabled, children, className}: IProps) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }
    return (
        <div className={cn(className)} disabled={!onClick || disabled} role="button" tabIndex="0" onClick={onClick} onKeyDown={handleKeyDown}>
            {children}
        </div>
    )
}