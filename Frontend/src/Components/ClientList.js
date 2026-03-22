import React, { useEffect, useState } from "react";
import api from "../api";

function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get("/clients").then(res => setClients(res.data));
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      {clients.map(client => (
        <div key={client.id}>
          {client.name} - {client.business}
        </div>
      ))}
    </div>
  );
}

export default ClientList;