'use client'
import { createContext, useState, useEffect } from 'react';
import { reject, some, countBy, forEach } from 'lodash'

import { IDog } from '@/_types/sharedTypes'

export interface IFavorites {
    favorites: IDog[]
    favoriteBreeds: string[]
    onToggleFavorite: (IDog) => void
}

const defaultContext: IFavorites = {
    favorites: [] ,
    onToggleFavorite: () => {}
}

interface IProps {
    children: React.ReactNode
}

export const FavoritesContext = createContext(defaultContext);

export function Favorites({ children }: IProps) {
    const [favorites, setFavorites] = useState([]);
    const [favoriteBreeds, setFavoriteBreeds] = useState([])

    useEffect(() => {
        const tally = countBy(favorites, 'breed')
        const newList = []
        forEach(tally, (value, key) => {
            if (value > 1) {
                newList.push(key)
            }
        })
        setFavoriteBreeds(newList)
    }, [favorites])

    const onToggleFavorite = (dog:IDog) => {
        
        const shouldBeAdded = !some(favorites, ['id', dog.id])
        let newList = [...favorites]
        if (shouldBeAdded) {
            newList.push(dog)
        } else {
            newList = reject(favorites, ['id', dog.id])
        }
        setFavorites(newList)
    }

    const contextValue: IFavorites = {
        favorites,
        favoriteBreeds,
        onToggleFavorite,
    }

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
}