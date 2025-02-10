'use client'

import { useState, useEffect } from 'react'
import { sample, map, includes, pull } from 'lodash'

import { DogGallery } from '@/app/_components/DogGallery'
import { Checkbox } from '@/app/_components/Checkbox'


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

    const getDogs = async (queryParams) => {
        const fetchedDogs = await new Array(26).fill().map((e, i) => {
            return {...defaultDog, id: i, name: defaultDog.name + i, breed: sample(defaultBreeds)}
        })
        
        setDogs(fetchedDogs)
    }

    const getBreeds = async (queryParams) => {
        setAvailableBreeds(defaultBreeds)
    }

    useEffect(() => {
        getBreeds()
    }, [])
    
    useEffect(() => {
        getDogs()
    }, [])
    return (
        <div>
            <fieldset>
                <legend>Search by breed:</legend>
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