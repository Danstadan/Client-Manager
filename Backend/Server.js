const { supabase } = require('./supabaseclient.js');
const express = require("express");
const cors = require("cors");
const clientRoutes = require("./Routes/Clients.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/clients", clientRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
