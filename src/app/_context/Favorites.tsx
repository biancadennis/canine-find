'use client'
import { createContext, useState, useEffect } from 'react';
import { reject, some, countBy, forEach } from 'lodash'

import { IDog } from '@/app/_types/sharedTypes'

export interface IFavorites {
    favorites: IDog[]
    favoriteBreeds: string[]
    onToggleFavorite: (dog: IDog) => void
}

const defaultContext: IFavorites = {
    favorites: [],
    favoriteBreeds: [],
    onToggleFavorite: () => {}
}

interface IProps {
    children: React.ReactNode
}

export const FavoritesContext = createContext(defaultContext);

export function Favorites({ children }: IProps) {
    const [favorites, setFavorites] = useState<IDog[]>([]);
    const [favoriteBreeds, setFavoriteBreeds] = useState<string[]>([])

    useEffect(() => {
        const tally = countBy(favorites, 'breed')
        const newList: string[] = []
        forEach(tally, (value, id) => {
            if (value > 1) {
                newList.push(id)
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