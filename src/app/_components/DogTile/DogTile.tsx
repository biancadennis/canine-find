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

    return (
        <div className={styles.dogTile}>
            <div>
                <img className={styles.img} alt="" src={img} />
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.infoWrapper}>
                    <h2 className={styles.name}>{name}</h2>
                    <span>
                        Breed: {breed}
                    </span>
                    <span> Age: {age}</span>
                    <span>Location: {zip_code}</span>
                    {isFavoriteBreed && (
                        <span>(You Love this Breed!)</span>
                    )}
                </div>
                <Button type="tertiary" onClick={() => onToggleFavorite(dog) }>
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Button>
            </div>
        </div>
    )
}