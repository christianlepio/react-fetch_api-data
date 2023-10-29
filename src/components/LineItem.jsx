import React from 'react'

const LineItem = ({ item, handleCheck, handleDelete }) => {
    return (
        <li className='list-group-item'>
            <div className="d-flex justify-content-between">
                <div className='align-self-center'>
                    <input 
                        className="form-check-input"
                        type="checkbox" 
                        onChange={() => handleCheck(item.id)}
                        checked={item.checked}
                    />
                    <label
                        className='mx-3'
                        style={(item.checked) ? { textDecoration: 'line-through' } : null}
                        onDoubleClick={() => handleCheck(item.id)}
                    >
                        {item.item}
                    </label>
                </div>
                <button
                    type='button'
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDelete(item.id)}
                    aria-label={`Delete ${item.item}`}
                >
                    Delete
                </button>
            </div>
        </li>
    )
}

export default LineItem