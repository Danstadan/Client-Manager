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

    await fetch(`${API_URL}/clients/${id}`, {
      method: "DELETE",
    });

    // update UI immediately (better UX)
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h2>Clients</h2>
        <p>{clients.length} {clients.length === 1 ? "client" : "clients"} on record.</p>
      </div>

      {clients.length === 0 ? (
        <div className="empty-state">No clients yet. Add your first one to get started.</div>
      ) : (
        <div className="client-list">
          {clients.map((client) => (
            <div key={client.id} className="card">
              <div className="card-info">
                <p className="card-name">{client.name}</p>
                <p className="card-meta">
                  {client.business} · {client.phone} · {client.email}
                </p>
              </div>

              <button className="btn btn-danger" onClick={() => deleteClient(client.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientList;