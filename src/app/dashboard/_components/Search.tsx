'use client'

import { useState, useEffect } from 'react'
import { sampleSize, map, includes, pull, join } from 'lodash'

import { DogGallery } from '@/app/_components/DogGallery'
import { Checkbox } from '@/app/_components/Checkbox'

import { searchForDogs, getDogsByIds, getDogBreeds } from '@/app/_requests'


const defaultBreeds = ['hound', 'pug', 'pit']
const defaultDog = {
    img: 'https://pettownsendvet.com/wp-content/uploads/2023/01/iStock-1052880600.jpg',
    name: 'good boy',
    age: 2,
    zip_code: 19129,
    breed: 'pit',
}

export default function Search() {
    const [breedsToSearchFor, setBreedsToSearchFor] = useState([])
    const [availableBreeds, setAvailableBreeds] = useState([])
    const [dogs, setDogs] = useState([])

    const toggleBreed = (shouldBeAdded: boolean, breed: string) => {
        const newList = [...breedsToSearchFor]
        if (shouldBeAdded) {
            newList.push(breed)
        } else {
            pull(newList, breed)
        }
        setBreedsToSearchFor(newList)
    }

    const getDogs = async () => {
        const  stringData = new URLSearchParams(breedsToSearchFor.map(s=>['breeds',s]))
        const searchString = stringData.toString()
        const fetchedDogs = await searchForDogs(searchString)
        const { resultIds, total, next, prev } = fetchedDogs
        const res = await getDogsByIds(resultIds)
        
        setDogs(res)
    }

    const getBreeds = async () => {
        const res = await getDogBreeds()
        setAvailableBreeds(sampleSize(res, 5))
    }

    useEffect(() => {
        getDogs()
    }, [breedsToSearchFor])

    useEffect(() => {
        getBreeds()
    }, [])
    
    // useEffect(() => {
    //     getDogs()
    // }, [])
    // TODO: handle no dogs coming back from search
    return (
        <div>
            <fieldset>
                <legend>Search by a popular breed:</legend>
            {map(availableBreeds, breed => {
                const isChecked = includes(breedsToSearchFor, breed)
                return (
                    <Checkbox key={breed} isChecked={isChecked} label={breed} onChange={(shouldBeChecked) => toggleBreed(shouldBeChecked, breed)} />
                )
            })}
                </fieldset>
            <DogGallery dogs={dogs} />
        </div>
    )
}