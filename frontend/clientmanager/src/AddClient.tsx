import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

export default function AddClient() {
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    const client = { name, business, phone, email, service }
    console.log('Sending client:', client)

    try {
      const res = await fetch(`${API_URL}/clients`, {
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
        setEmail('')
        setService('')
      } else {
        alert('Error adding client: ' + data.error)
        console.log(res.status)
        console.log(data)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      alert('Error connecting to backend')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2>Add Client</h2>
        <p>Add a new client to your records.</p>
      </div>

      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Jane Wanjiru"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="business">Business</label>
          <input
            id="business"
            type="text"
            placeholder="e.g. PharmaPlus"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            placeholder="e.g. 0712 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="e.g. jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="service">Service</label>
          <input
            id="service"
            type="text"
            placeholder="e.g. Web design"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Adding…' : 'Add Client'}
          </button>
        </div>
      </form>
    </div>
  )
}