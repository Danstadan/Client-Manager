const { supabase } = require('./supabaseclient.js');
const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clients.js");

const app = express();

require("dotenv").config();

const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"], // include OPTIONS for preflight
  credentials: true
}));
// app.use(cors());

app.use(express.json());

app.use("/clients", clientRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
