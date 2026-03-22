import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'

import AddClient from "./AddClient"
import ClientList from "./ClientList"
import UpdateClientList from "./UpdateClientList"

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
        const res = await fetch("http://localhost:5000/clients");
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="container">
    <BrowserRouter>

        <h1>Client Manager</h1>

       <nav>
         <Link to="/">Add Client</Link> |{" "}
         <Link to="/clients">View Clients</Link>
         <Link to ="/update">Update Clients</Link>
       </nav>

       <Routes>
         <Route path="/" element={<AddClient />} />
         <Route path="/clients" element={<ClientList clients={clients} setClients={setClients} />} />
        <Route  path="/update"   element={ <UpdateClientList clients={clients} setClients={setClients} />
  }
/> 
      </Routes>

    </BrowserRouter>
    </div>
  )
 }
  
export default App