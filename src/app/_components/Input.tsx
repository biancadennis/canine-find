import cn from 'classnames'
interface IProps {
    label: string
    value: string
    onChange: (text: string) => void
    type: 'text'
    className?: string
}

export default function Input({ onChange, value, label, className }: IProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        onChange(e.target.value)
    }
    return (
        <div className={cn(className)}>
            <label>
              {label}
              <input type="text" name={label} value={value} onChange={handleChange} />
            </label>
        </div>
    );
}
