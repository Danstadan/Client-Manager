import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

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
    const res = await fetch(`${API_URL}/clients`);
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const deleteClient = async (id: number) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    await fetch(`https://client-manager-xjkf.onrender.com/${id}`, {
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


