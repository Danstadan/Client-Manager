# Client Manager App

A full-stack CRUD application for managing clients, built with React, Node.js, Express, and Supabase.

---

## 🚀 Features

- Add new clients
- View all clients
- Update client information
- Delete clients
- Real-time UI updates without page refresh

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite + TypeScript)
- CSS (custom styling)

**Backend**
- Node.js
- Express

**Database**
- Supabase (PostgreSQL)

---

## 📂 Project Structure

client-manager/
│
├── backend/
│   ├── routes/
│   │   └── clients.js
│   ├── db/
│   │   └── supabase.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddClient.tsx
│   │   │   ├── ClientList.tsx
│   │   │   └── UpdateClientList.tsx
│   │   │
│   │   ├── types/
│   │   │   └── Client.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── vite.config.ts
│   └── package.json
│
├── README.md
└── .gitignore 

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | /clients     | Get all clients |
| POST   | /clients     | Add a client    |
| PUT    | /clients/:id | Update a client |
| DELETE | /clients/:id | Delete a client |


🧠 What I Learned
Managing state across multiple React components
Handling async API calls and errors
Structuring a full-stack project
Debugging React runtime and Vite issues
Integrating Supabase with Express

📌 Future Improvements
Better UI/UX (forms, validation)
Toast notifications instead of alerts
Authentication (login system)
Search and filtering

## 📸 Screenshots

### Add Client
![Add Client](./screenshots/add-client.png)

### Client List
![Client List](./screenshots/client-list.png)

### Update Client
![Update Client](./screenshots/update-client.png)

