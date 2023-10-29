import React from 'react'
import ItemList from './ItemList'

const content = ({ items, handleCheck, handleDelete }) => {
    return (
        <>
            {items.length ? (
                <ItemList 
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ) : (
                <p>Your list is empty</p>
            )
            }
        </>
    )
}

export default content