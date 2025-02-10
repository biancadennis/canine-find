'use client'
import { useContext, useState} from 'react'
import Link from 'next/link'
import { isEmpty } from 'lodash'

import { Button } from '@/app/_components/Button'
import { DogTile } from '@/app/_components/DogTile'

import {FavoritesContext} from '@/app/_context/Favorites'

const defaultDog = {
    id: 0,
    img: 'https://pettownsendvet.com/wp-content/uploads/2023/01/iStock-1052880600.jpg',
    name: 'good boy',
    age: 2,
    zip_code: 19129,
    breed: 'pit',
}

export default function MatchFinder() {
    const [match, setMatch] = useState()
    const { favorites } = useContext(FavoritesContext)
    if (isEmpty(favorites)) {
        return (
            <>
                <h1>No Matches</h1>
                <p><Link href="/dashboard">Search</Link> for dogs and add them to your list of favorites to find your match</p>
            </>
        )
    }

    if (match) {
        return (
            <div>
                <DogTile dog={match} />
            </div>
        )
    }

    const findMatch = () => {
        setMatch(defaultDog)
    }

    return (
        <Button onClick={findMatch}>Find Your Match</Button>
    )
}