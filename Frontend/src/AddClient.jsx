// src/AddClient.jsx
import { useState } from 'react'

export default function AddClient() {
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [phone, setPhone] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const client = { name, business, phone }
    console.log('Sending client:', client)

    try {
      const res = await fetch('http://localhost:5000/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      })

      const data = await res.json()
      console.log('Response from backend:', data)

      if (res.ok) {
        alert('Client added successfully!')
        setName('')
        setBusiness('')
        setPhone('')
      } else {
        alert('Error adding client: ' + data.error)
      }
    } catch (err) {
      console.error('Fetch error:', err)
      alert('Error connecting to backend')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Client</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />

      <input
        type="text"
        placeholder="Business"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        required
      />
      <br />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <br />

      <button type="submit">Add Client</button>
    </form>
  )
}