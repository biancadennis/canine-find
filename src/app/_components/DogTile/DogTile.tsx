'use client'
import { useContext} from 'react'
import { some, includes } from 'lodash'

import { Button } from '@/app/_components/Button'

import {FavoritesContext} from '@/app/_context/Favorites'

import { IDog } from '@/app/_types/sharedTypes'

import styles from './DogTile.module.css'


export interface IProps {
    dog: IDog
}

export default function DogTile({dog}: IProps) {
    const { favorites, favoriteBreeds, onToggleFavorite } = useContext(FavoritesContext)
    const {id, img, name, age, zip_code, breed} = dog
    const isFavoriteBreed = includes(favoriteBreeds, breed)


    const isFavorite = some(favorites, ['id', id])
    // TODO: call out if breed is a favorite
    // Add way to favorite dog

    return (
        <div className={styles.dogTile}>
            <div>
            <img className={styles.img} alt="" src={img} />
            <h2>{name}</h2>
            <span>
                Breed: {breed}
            </span>
           <span> Age: {age}</span>
            <span>Location: {zip_code}</span>
            </div>
            <div>
            {isFavoriteBreed && (
                    <span>(You Love this Breed!)</span>
                )}
                <Button onClick={() => onToggleFavorite(dog) }>
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Button>
            </div>
        </div>
    )
}