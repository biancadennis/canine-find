'use client'
import { useState, useContext } from 'react'

import Input from '@/app/_components/Input'
import { AuthenticationContext } from '@/app/_context/Authentication'


export default function Login() {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorCount, setErrorCount] = useState(0)

    const { onLogin } = useContext(AuthenticationContext);


    const tooManyErrors = errorCount >= 2

    const hasFirstName = firstName.length > 1
    const hasEmail = email.length > 1 // TODO: validate email formatted properly
    const submitDisabled = errorMessage || !hasEmail || !hasFirstName

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //TODO: increment error count when login fails
        e.preventDefault()
        onLogin({
            firstName,
            email,
        })
    }

    return (
        <div>
            {errorMessage && (
                <>
                    <span>
                        Oh no! We couldn&apos;t find you—please try again :(
                    </span>
                    {tooManyErrors && (
                        <span>
                            Oh dear! You&apos;ve tried too many times. Check your email to unlock your account (or refresh to try again).
                        </span>
                    )}
                </>
            )}
            <form onSubmit={onSubmit}>
                <Input type="text" value={firstName} label="First Name" onChange={(value) => setFirstName(value)} />\
                <Input type="text" value={email} label="Email" onChange={(value) => setEmail(value)} />
                <button type="submit" disabled={submitDisabled}>Find Your Canine</button>
            </form>
        </div>
    );
}
