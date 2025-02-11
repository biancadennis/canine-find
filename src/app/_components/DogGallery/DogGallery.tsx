'use client'

import { useState, useEffect } from 'react'
import cn from 'classnames'

import { map, take, takeRight } from 'lodash'

import { Button } from '@/app/_components/Button'
import { DogTile, Dog } from '@/app/_components/DogTile'

import styles from './DogGallery.module.css'

export interface IProps {
    dogs: Array<Dog>
    onPrevPage?: () => void
    onNextPage?: () => void
    onPage?: (from:number) => void
    total?: number
}

export default function DogGallery({dogs, total, onPage, onPrevPage, onNextPage}: IProps) {
    const [currentPage, setCurrentPage] = useState()
    const handleClick = (fn) => {
        fn()
        window.scrollTo('0', '0')
    }
    const showNavigation = total && total > 25
    const numPages = !!total ? Math.ceil(total / 25) : 0
    const pagesArray = Array.from(Array(numPages).keys())
    
    const handlePage = (from) => {
        setCurrentPage(from)
        handleClick(() => onPage(from))
    }

    const renderPageButton = (page: number) => {
        const pageNum = page + 1
        return (
            <div key={page} className={cn({[styles.currentPage]: currentPage == pageNum})} >
                <Button 
                onClick={() => handlePage(page+1)}>
                {pageNum}
            </Button>
            </div>
        )
    }

    useEffect(() => {
        setCurrentPage(undefined)
    }, [total])

    return (
        <div>
            <div className={styles.dogGallery}>
            {map(dogs, (dog:Dog) => <DogTile key={dog.id} dog={dog} /> )}
            </div>
            {showNavigation && (
                <div>
                    {!!onPrevPage && (
                <Button onClick={() => handleClick(onPrevPage)}>Prev</Button>
            )}
            {numPages > 20 ? (
                <div>
                    {map(take(pagesArray, 10), page => renderPageButton(page))}
                    <div>...</div>
                    {map(takeRight(pagesArray, 10), page => renderPageButton(page))}
                </div>
            ) : (
                <>
                {map(pagesArray, page => renderPageButton(page))}
                </>
            )}

            {!!onNextPage && (
                <Button onClick={() => handleClick(onNextPage)}>Next</Button>
            )}
             {total && <span>{total}</span>}
                </div>
            )}
        </div>
    )
}