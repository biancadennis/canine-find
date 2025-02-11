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
    const [currentPage, setCurrentPage] = useState(1)
    const handleClick = (fn) => {
        fn()
        window.scrollTo('0', '0')
    }
    const showNavigation = total && total > 25
    const numPages = !!total ? Math.floor(total / 25) : 0
    const pagesArray = Array.from(Array(numPages).keys())
    
    const handlePage = (from) => {
        setCurrentPage(from)
        handleClick(() => onPage(from))
    }

    const handleNextOrPrev = (fn, isNext) => {
        if (isNext) {
            const nextPage = currentPage + 1
            setCurrentPage(nextPage)
            if (!!onNextPage) {
                handleClick(fn)
            } else {
                handlePage(nextPage)
            }
        } else {
            const nextPage = currentPage - 1
            setCurrentPage(nextPage)
            if (!!onPrevPage) {
                handleClick(fn)
            } else {
                handlePage(nextPage)
            }
        }
        
    }

    const renderPageButton = (page: number) => {
        const pageNum = page + 1
        return (
            <div key={page} className={cn(styles.pageButton)} >
                <Button 
                type={currentPage == pageNum ? 'primary' : 'secondary'}
                onClick={() => handlePage(pageNum)}>
                {pageNum}
            </Button>
            </div>
        )
    }

    return (
        <div>
            <div className={styles.dogGallery}>
            {map(dogs, (dog:Dog) => <DogTile key={dog.id} dog={dog} /> )}
            </div>
            {showNavigation && (
                <div>
                    <div className={styles.pagination}>
                    <Button onClick={() => handleNextOrPrev(onPrevPage)}>Prev</Button>
                        {numPages > 10 ? (
                            <div>
                            {map(take(pagesArray, 5), page => renderPageButton(page))}
                            <div>...</div>
                            {map(takeRight(pagesArray, 5), page => renderPageButton(page))}
                            </div>
                        ) : (
                         <>
                            {map(pagesArray, page => renderPageButton(page, false))}
                         </>
                        )}

                    <Button onClick={() => handleNextOrPrev(onNextPage, true)}>Next</Button>
                    </div>
                    {total && <span>{total}</span>}
                </div>
            )}
        </div>
    )
}