'use client'

import { useState, useEffect } from 'react'
import { sampleSize, map, includes, pull } from 'lodash'

import { DogGallery } from '@/app/_components/DogGallery'
import { Checkbox } from '@/app/_components/Checkbox'

import { searchForDogs, getDogsByIds, getDogBreeds } from '@/app/_requests'

export default function Search() {
    const [breedsToSearchFor, setBreedsToSearchFor] = useState([])
    const [availableBreeds, setAvailableBreeds] = useState([])
    const [dogs, setDogs] = useState([])
    const [nextUrl, setNextUrl] = useState(undefined)
    const [prevUrl, setPrevUrl] = useState(undefined)
    const [total, setTotal] = useState()
    const [from, setFrom] = useState()

    const toggleBreed = (shouldBeAdded: boolean, breed: string) => {
        const newList = [...breedsToSearchFor]
        if (shouldBeAdded) {
            newList.push(breed)
        } else {
            pull(newList, breed)
        }
        setBreedsToSearchFor(newList)
    }

    const queryDogs = async (searchString) => {
        const fetchedDogs = await searchForDogs(searchString)
        const { resultIds, total, next, prev } = fetchedDogs
        const res = await getDogsByIds(resultIds)
        
        setNextUrl(next)
        setPrevUrl(prev)
        setTotal(total)
        setDogs(res)
        setFrom()
    }

    const getFilters = (from) => {
        let searchString = ''
        const queryArray = [...breedsToSearchFor.map(s=>['breeds',s])]
        if (from) {
            queryArray.push(['from', from])
        }
            const  stringData = new URLSearchParams(queryArray)
            searchString = stringData.toString()
        return searchString
    }

    const getDogs = async (getByFullQueryString) => {
        const searchString = getByFullQueryString ?  getByFullQueryString :  getFilters()
        
        await queryDogs(searchString)
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

    const handleNext = () => getDogs(nextUrl)
    const handlePrev = () => getDogs(prevUrl)
    const onHandleSpecificPage = async (num) => {
        const fromNum = num * 25
        const searchString = getFilters(fromNum)
        
        await queryDogs(searchString)

    }
    
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
            <DogGallery dogs={dogs} total={total} onNextPage={!!nextUrl ? handleNext : undefined} onPrevPage={!!prevUrl ? handlePrev : undefined} onPage={onHandleSpecificPage} />
        </div>
    )
}