import cn from 'classnames'

import styles from "./Checkbox.module.css";

interface IProps {
    label: string
    isChecked: boolean
    onChange: (value: boolean) => void
    className?: string
}

export default function Input({ onChange, isChecked, label, className }: IProps) {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
        if (e.key === 'Space' || e.key === 'Enter') {
            onToggle(e)
        }
    }

    const onToggle = (e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLImageElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        onChange(!isChecked)
    }
    return (
       <div className={cn(className, styles.checkbox, {
        [styles.checked]: isChecked,
        [styles.unchecked]: !isChecked,
       })} role="checkbox" aria-checked={isChecked} tabIndex={0} onKeyDown={handleKeyDown} onClick={onToggle}>
        {label}
       </div>
    );
}
