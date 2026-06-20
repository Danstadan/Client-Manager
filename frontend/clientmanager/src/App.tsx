import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import './App.css'

import AddClient from "./AddClient"
import ClientList from "./ClientList"
import UpdateClientList from "./UpdateClientList"

const API_URL = import.meta.env.VITE_API_URL;

type Client = {
  id: number;
  name: string;
  business: string;
  phone: string;
  email: string;
  service: string;
};

function App() {
  const [clients, setClients] = useState<Client[]>([]);

  // 🔵 Fetch clients once (shared state)
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${API_URL}/clients`);
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };

    fetchClients();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">

        <aside className="sidebar">
          <div className="sidebar-brand">
            <span className="sidebar-brand-mark">CM</span>
            <span className="sidebar-brand-name">Client Manager</span>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/" className="sidebar-link" end>
              <span className="sidebar-link-icon">+</span>
              Add Client
            </NavLink>
            <NavLink to="/clients" className="sidebar-link">
              <span className="sidebar-link-icon">≡</span>
              View Clients
            </NavLink>
            <NavLink to="/update" className="sidebar-link">
              <span className="sidebar-link-icon">✎</span>
              Update Clients
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<AddClient />} />
            <Route path="/clients" element={<ClientList clients={clients} setClients={setClients} />} />
            <Route path="/update" element={<UpdateClientList clients={clients} setClients={setClients} />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App