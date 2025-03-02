'use client'
import { useContext, useState} from 'react'
import Link from 'next/link'
import { isEmpty, map } from 'lodash'

import { Button } from '@/app/_components/Button'
import { DogTile } from '@/app/_components/DogTile'

import {FavoritesContext} from '@/app/_context/Favorites'

import { getMatch, getDogsByIds } from '@/app/_requests'

import styles from './MatchFinder.module.css'

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
            <div className={styles.matchWrapper}>
                <DogTile dog={match} />
            </div>
        )
    }

    const findMatch = async () => {
        const favIds = map(favorites, dog => dog.id)
        const { match } = await getMatch(favIds)
        const doggos = await getDogsByIds([match])
        if(doggos.length > 0) {
            setMatch(doggos[0])
        }
    }

    return (
        <div className={styles.findMatch}>
            <Button type="primary" onClick={findMatch}>Find Your Match</Button>
        </div>
    )
}