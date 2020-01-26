import React from 'react'

export default function ItemService({icon, title, info}) {
    return (
        <article className="service">
            <span>{icon}</span>
            <h6>{title}</h6>
            <p>{info}</p>
        </article>
    )
}
