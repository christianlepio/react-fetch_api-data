import React from 'react'
import LineItem from './LineItem'

const ItemList = ({ items, handleCheck, handleDelete }) => {
    return (
        <ul className='list-group' style={{width: '72vmin'}}>
            {items.map(item => (
                <LineItem
                    key={item.id}
                    item={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ))}
        </ul>
    )
}

export default ItemList