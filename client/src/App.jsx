import { useEffect, useState } from 'react'
import { itemsApi } from './api'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadItems() {
    try {
      setLoading(true)
      const { data } = await itemsApi.list()
      setItems(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    try {
      await itemsApi.create({ name, description })
      setName('')
      setDescription('')
      await loadItems()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await itemsApi.remove(id)
      await loadItems()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <h1>MERN Boilerplate</h1>
      <p className="subtitle">MongoDB · Express · React · Node</p>

      <form className="item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading…</p>
      ) : items.length === 0 ? (
        <p className="empty">No items yet. Add one above.</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item._id}>
              <div>
                <strong>{item.name}</strong>
                {item.description && <span> — {item.description}</span>}
              </div>
              <button className="delete" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
