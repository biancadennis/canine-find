'use client'

import { useState, useEffect } from 'react'
import { map, includes, pull, difference } from 'lodash'

import { Button } from '@/app/_components/Button'
import { DogGallery } from '@/app/_components/DogGallery'
import { Checkbox } from '@/app/_components/Checkbox'

import { searchForDogs, getDogsByIds, getDogBreeds } from '@/app/_requests'

import styles from './Search.module.css'

export default function Search() {
    const [breedsToSearchFor, setBreedsToSearchFor] = useState([])
    const [availableBreeds, setAvailableBreeds] = useState([])
    const [dogs, setDogs] = useState([])
    const [total, setTotal] = useState()
    const [sortByAsc, setSortByAsc] = useState(true)

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
        
        setTotal(total)
        setDogs(res)
    }

    const getFilters = (from) => {
        let searchString = ''
        const queryArray = [...breedsToSearchFor.map(s=>['breeds',s])]
        if (from) {
            queryArray.push(['from', from])
        }
        queryArray.push(['sort', `breed:${sortByAsc ? 'asc' : 'desc'}`])
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
        setAvailableBreeds(res)
    }

    useEffect(() => {
        getDogs()
    }, [breedsToSearchFor, sortByAsc])

    useEffect(() => {
        getBreeds()
    }, [])

    const onHandleSpecificPage = async (num) => {
        const fromNum = (num - 1) * 25
        const searchString = getFilters(fromNum)
        
        await queryDogs(searchString)

    }
    
    // TODO: handle no dogs coming back from search
    return (
        <div className={styles.searchWrapper}>
            <label htmlFor="pet-select">Choose a pet: </label>

            <select name="breeds" id="pet-select" onChange={(e) => toggleBreed(true, e.target.value)}>
            <option value={undefined}>add breed to list</option>
            {map(difference(availableBreeds, breedsToSearchFor), breed => {
                return (
                    <option key={breed} value={breed}>{breed}</option>
                )
            })}
            
            </select>
            {map(breedsToSearchFor, breed => {
                    return (
                        <Checkbox className={styles.checkbox} key={breed} isChecked={true} label={breed} onChange={(shouldBeChecked) => toggleBreed(shouldBeChecked, breed)} />
                    )
                })}
                <div className={styles.sorter}>
                 <span className={styles.label}>Sort by: </span> Breed:
                 <Button onClick={() => setSortByAsc(true)}>Asc</Button>
                 <Button onClick={() => setSortByAsc(false)}>Desc</Button>
                </div>
            <DogGallery dogs={dogs} total={total} onPage={onHandleSpecificPage} />
        </div>
    )
}