'use client'

interface IProps {
    onClick: () => void
    disabled?: false
    children: React.ReactNode
}

export function Button ({onClick, disabled, children}: IProps) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }
    return (
        <div disabled={!onClick || disabled} role="button" tabIndex="0" onClick={onClick} onKeyDown={handleKeyDown}>
            {children}
        </div>
    )
}