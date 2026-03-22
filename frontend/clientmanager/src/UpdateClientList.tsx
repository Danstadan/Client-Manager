import { useState } from "react";

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
        `https://client-manager-xjkf.onrender.com/clients/${formData.id}`,
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
      <h2>Clients</h2>

      {clients.map((client) => (
        <div key={client.id} style={{ marginBottom: "10px" }}>
          {editingClient?.id === client.id ? (
            // ✏️ EDIT MODE
            <div>
              <input
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
              />
              <input
                name="business"
                value={formData?.business || ""}
                onChange={handleChange}
              />
              <input
                name="phone"
                value={formData?.phone || ""}
                onChange={handleChange}
              />
              <input
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
              />
              <input
                name="service"
                value={formData?.service || ""}
                onChange={handleChange}
              />
              <div className="actions">
              <button onClick={updateClient} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button onClick={handleCancel} disabled={loading}>
                Cancel
              </button>
              </div>
            </div>
          ) : (
            // 👁️ VIEW MODE
            <div>
              <p>
                {client.name} - {client.business}
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