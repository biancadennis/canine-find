'use client'

interface IProps {
    onClick: () => void
    children: React.ReactNode
}

export function Button ({onClick, children}: IProps) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }
    return (
        <div role="button" tabIndex="0" onClick={onClick} onKeyDown={handleKeyDown}>
            {children}
        </div>
    )
}