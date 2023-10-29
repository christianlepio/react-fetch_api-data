// before running this app, server should run first!
// type this command on terminal 'npx json-server -p 3500 -w data/db.json' to run the server...

import { useEffect, useRef, useState } from 'react'
import apiRequest from '../api/apiRequest'
import Content from './components/content'

function App() {
  const API_URL = 'http://localhost:3500/items'

  const inputRef = useRef()
  const [items, setItems] = useState([]) //storage for fetched data from api
  const [newItem, setNewItem] = useState('') //for adding item
  const [search, setSearch] = useState('') //for searching item
  const [fetchError, setFetchError] = useState(null) //error storage
  const [isLoading, setIsLoading] = useState(true) //for loading data

  useEffect(() => {
    //fetching data from api should be async function, once.
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL) //fetch Api with the declared api url
        
        if (!response.ok) {
          throw Error('Did not receive expected data!')
        } else {
          const listItems = await response.json()
          setItems(listItems) //set list of items that is fetch from api
          setFetchError(null) //set error to null
        }
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false) //after success fetch, do not load data
      }
    }

    setTimeout(() => fetchItems(), 2000) //2000 here is 2 seconds

  }, [])

  //add item to DB
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1 //get the last listed id from items, if none, then return value to 1
    const myNewItem = { id, checked: false, item } //set new item
    const listItems = [...items, myNewItem] //append new item to state variable 'items'

    setItems(listItems) //append new item to state variable 'items'

    const postOptions = {
      method: 'POST', //http method to submit new item to the DB
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions) //call api request function to apply post method request

    if (result) setFetchError(result) //apiRequest function will return error message if there is
  }

  //update item from DB
  const handleCheck = async (id) => {
    const listItems = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems)
    
    const myItem = listItems.filter(item => item.id === id)

    const updateOptions = {
      method: 'PATCH', //http method to update item from DB
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked }) //define which property should update
    }

    const reqUrl = `${API_URL}/${id}` //put the value of item.id in the url 
    const result = await apiRequest(reqUrl, updateOptions)

    if (result) setFetchError(result) //apiRequest function will return error message if there is

  }

  //delete item from DB
  const handleDelete = async (id) => {
    const listItems = items.filter(item => item.id !== id) //get all items exept for the item that has id equal to the function params
    setItems(listItems)

    const deleteOptions = { 
      method: 'DELETE' //http method to delete item from DB
    }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)

    if (result) setFetchError(result) //apiRequest function will return error message if there is

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!newItem) {
      return
    } else {
      addItem(newItem)
      setNewItem('')
    }
  }

  return (
    <>
      <header>
        <h1 className='fs-1 text-center my-3'>Grocery List</h1>
      </header>
      <main>
        <div className="d-flex justify-content-center">
          <form className='mb-2' onSubmit={handleSubmit}>
            <div className="input-group" style={{width: '75vmin'}}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Add Item" 
                aria-label="Add Item" 
                aria-describedby="button-addon2"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                ref={inputRef}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="submit" 
                id="button-addon2"
                onClick={() => inputRef.current.focus}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="d-flex justify-content-center">
          <form className='mb-2'>
            <input 
              style={{width: '75vmin'}}
              type="text" 
              className="form-control" 
              id="exampleFormControlInput1" 
              placeholder="Search Item" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        <div className='d-flex justify-content-center'>
          {isLoading && <p>Loading Items...</p>}
          {fetchError && <p className='text-danger'>{`Error: ${fetchError}`}</p>}
          {!fetchError && !isLoading && 
            <Content 
              items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          }
        </div>
      </main>
    </>
  )
}

export default App
