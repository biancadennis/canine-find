import Image from "next/image";

import cn from 'classnames'

import styles from "./Checkbox.module.css";

interface IProps {
    label: string
    isChecked: boolean
    onChange: (text: string) => void
}

export default function Input({ onChange, isChecked, label }: IProps) {

    const handleKeyDown = (e) => {
        if (e.key === 'Space' || e.key === 'Enter') {
            onToggle(e)
        }
    }

    const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        onChange(!isChecked)
    }
    return (
       <div className={cn(styles.checkbox, {
        [styles.checked]: isChecked,
        [styles.unchecked]: !isChecked,
       })} role="checkbox" aria-checked={isChecked} tabIndex="0" onKeyDown={handleKeyDown} onClick={onToggle}>
        {label}
       </div>
    );
}
