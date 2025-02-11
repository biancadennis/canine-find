'use client'

import { useState } from 'react'

import { map } from 'lodash'

import { Button } from '@/app/_components/Button'
import { DogTile } from '@/app/_components/DogTile'

import { IDog } from '@/app/_types/sharedTypes'

import styles from './DogGallery.module.css'

export interface IProps {
    dogs: Array<IDog>
    onPage?: (from:number) => void
    total?: number
}

export default function DogGallery({dogs, total, onPage}: IProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const showNavigation = total && total > 25
    const numPages = !!total ? Math.ceil(total / 25) : 0

    const handleNextOrPrev = (isNext: boolean) => {
        const nextPage = isNext ? currentPage + 1 : currentPage - 1
        if (nextPage > 0 && nextPage <= numPages) {
            setCurrentPage(nextPage)
            setCurrentPage(nextPage)
            if (onPage) {
                onPage(nextPage)
                 window.scrollTo(0, 0)
            }
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
            {map(dogs, (dog:IDog) => <DogTile key={dog.id} dog={dog} /> )}
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