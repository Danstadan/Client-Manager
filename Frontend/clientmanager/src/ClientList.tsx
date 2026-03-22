import { useEffect } from "react";

interface Client {
  id: number;
  name: string;
  business: string;
  phone: string;
  email: string;
  service: string;
}

type Props = {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
};

function ClientList({ clients, setClients }: Props) {

  const fetchClients = async () => {
    const res = await fetch("http://localhost:5000/clients");
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const deleteClient = async (id: number) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    await fetch(`http://localhost:5000/clients/${id}`, {
      method: "DELETE",
    });

    // update UI immediately (better UX)
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2>Clients</h2>

      {clients.map((client) => (
        <div key={client.id} className="card">
          <p>
            {client.name} - {client.business} - {client.phone}
          </p>

          <button className="btn btn-danger" onClick={() => deleteClient(client.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ClientList;

// import { useEffect, useState } from "react"

// interface Client {
//     id: number
//   name: string
//   business: string
//   phone: string
//   email: string
//   service: string
// }

// function ClientList() {
//   const [clients, setClients] = useState<Client[]>([])

//   const fetchClients = async () => {
//     const res = await fetch("http://localhost:5000/clients")
//     const data = await res.json()
//     setClients(data)
//   }

//     useEffect(() => {
//     fetchClients()
//   }, [])

//   const deleteClient = async (name: string) => {
//     await fetch(`http://localhost:5000/clients/${name}`, {
//       method: "DELETE",
//     })

//     fetchClients()
//   }

//   return (
//     <div>
//       <h2>Clients</h2>

//       {clients.map((client) => (
//         <div key={client.id}>
//           <p>
//             {client.name} - {client.business} - {client.phone}
//           </p>

//           <button onClick={() => deleteClient(client.name)}>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ClientList