const { supabase } = require('./supabaseclient.js');
const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clients.js");

const app = express();

app.use(cors({origin :"https://client-manager-xjkf.onrender.com/clients"}));
app.use(express.json());

app.use("/clients", clientRoutes);

// backend/server.js
app.get("/", (req, res) => {
  res.json({ message: "Backend is live!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
