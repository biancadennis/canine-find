'use client'

import { useState, useEffect } from 'react'
import cn from 'classnames'

import { map, take, takeRight } from 'lodash'

import { Button } from '@/app/_components/Button'
import { DogTile, Dog } from '@/app/_components/DogTile'

import styles from './DogGallery.module.css'

export interface IProps {
    dogs: Array<Dog>
    onPage?: (from:number) => void
    total?: number
}

export default function DogGallery({dogs, total, onPage}: IProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const handleClick = (fn) => {
        fn()
        window.scrollTo('0', '0')
    }
    const showNavigation = total && total > 25
    const numPages = !!total ? Math.ceil(total / 25) : 0
    console.log('num pages', numPages)

    const handleNextOrPrev = (isNext) => {
        const nextPage = isNext ? currentPage + 1 : currentPage - 1
        if (nextPage > 0 && nextPage <= numPages) {
            setCurrentPage(nextPage)
            setCurrentPage(nextPage)
            handleClick(() => onPage(nextPage))
        }
        
    }

    const getStartAndEnd = () => {
        const end = currentPage * 25
        const start = (currentPage - 1) * 25 + 1
        return ({start, end})
    }

    const {start, end} = getStartAndEnd()

    return (
        <div>
            <div className={styles.dogGallery}>
            {map(dogs, (dog:Dog) => <DogTile key={dog.id} dog={dog} /> )}
            </div>
            {showNavigation && (
                <div className={styles.paginationWrapper}>
                    <div className={styles.pagination}>
                    <Button onClick={() => handleNextOrPrev(false)}>Prev</Button>
                    <Button onClick={() => handleNextOrPrev(true)}>Next</Button>
                    </div>
                    {total && <span className={styles.resultsInfo}>{start}-{end} of {total}</span>}
                </div>
            )}
        </div>
    )
}