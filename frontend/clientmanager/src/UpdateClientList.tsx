import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

type Client = {
  id: number;
  name: string;
  business: string;
  phone: string;
  email: string;
  service: string;
};

type Props = {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
};

const UpdateClientList = ({ clients, setClients }: Props) => {
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);

  // 🟡 Start editing
  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({ ...client }); // ✅ clone to avoid mutation
  };

  // 🟡 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 🟡 Cancel editing
  const handleCancel = () => {
    setEditingClient(null);
    setFormData(null);
  };

  // 🔵 PUT request
  const updateClient = async () => {
    if (!formData) return;

    // ✅ basic validation
    if (!formData.name || !formData.email) {
      alert("Name and email are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/clients/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update client");

      const updatedClient = await res.json();

      // 🔥 Update UI instantly
      setClients((prev) =>
        prev.map((c) =>
          c.id === updatedClient.id ? updatedClient : c
        )
      );

      handleCancel(); // ✅ clean reset
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Update Clients</h2>
        <p>Click edit to update a client's details.</p>
      </div>

      {clients.map((client) => (
        <div key={client.id} className="update-item">
          {editingClient?.id === client.id ? (
            // ✏️ EDIT MODE
            <div>
              <label htmlFor={`name-${client.id}`}>Name</label>
              <input
                id={`name-${client.id}`}
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
              />

              <label htmlFor={`business-${client.id}`}>Business</label>
              <input
                id={`business-${client.id}`}
                name="business"
                value={formData?.business || ""}
                onChange={handleChange}
              />

              <label htmlFor={`phone-${client.id}`}>Phone</label>
              <input
                id={`phone-${client.id}`}
                name="phone"
                value={formData?.phone || ""}
                onChange={handleChange}
              />

              <label htmlFor={`email-${client.id}`}>Email</label>
              <input
                id={`email-${client.id}`}
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
              />

              <label htmlFor={`service-${client.id}`}>Service</label>
              <input
                id={`service-${client.id}`}
                name="service"
                value={formData?.service || ""}
                onChange={handleChange}
              />

              <div className="actions">
                <button className="btn btn-primary" onClick={updateClient} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
                <button className="btn btn-secondary" onClick={handleCancel} disabled={loading}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // 👁️ VIEW MODE
            <div className="update-item-view">
              <p>
                <strong>{client.name}</strong> — {client.business}
              </p>
              <button className="btn btn-success" onClick={() => handleEdit(client)}>
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UpdateClientList;