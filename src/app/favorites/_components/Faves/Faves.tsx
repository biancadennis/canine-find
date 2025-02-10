'use client'
import { useContext } from 'react'
import Link from 'next/link'
import { isEmpty } from 'lodash'

import { DogGallery } from '@/app/_components/DogGallery'

import { FavoritesContext } from '@/app/_context/Favorites'


export default function Faves() {
    const { favorites } = useContext(FavoritesContext)
    if (isEmpty(favorites)) {
        return (
            <>
                <h1>No Favorites</h1>
                <p><Link href="/dashboard">Search</Link> for dogs and add them to your list of favorites to find your match</p>
            </>
        )
    }

    return (
       <>
        <h1>Favorites</h1>
        <DogGallery dogs={favorites} />
       </>
    )
}