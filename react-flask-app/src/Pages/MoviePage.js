import React from 'react'

import { Card } from '../Components/Card/card'

const MoviePage = ( { name })=> {
    return (
        <>
            {res.map(res_=> {
                return (
                    <div>
                        <p>{res_.name}</p>
                        <p>{res_.blurb}</p>
                        <p>{res_.director}</p>
                        <p>{res_.leadactors}</p>
                        <p>{res_.releasedate}</p>
                        <p>{res_.certificate}</p>
                    </div>
                )
            })}
        </>
    )
}