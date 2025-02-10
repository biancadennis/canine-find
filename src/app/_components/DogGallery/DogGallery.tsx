'use client'

import { map } from 'lodash'

import {DogTile, Dog } from '@/app/_components/DogTile'

import styles from './DogGallery.module.css'

export interface IProps {
    dogs: Array<Dog>
}

export default function DogGallery({dogs}: IProps) {
    return (
        <div className={styles.dogGallery}>
            {map(dogs, (dog:Dog) => <DogTile key={dog.id} dog={dog} /> )}
        </div>
    )
}