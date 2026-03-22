const express = require("express");
const router = express.Router();
const supabase = require("../supabaseclient")
//const db = require("../db");

router.get("/", async (req, res) => {
  try {
  const { data, error } = await supabase
  .from("clients")
  .select("*");

if (error) throw error;

res.json(data);
  // res.json(clients.rows);
  // res.json({ message: "Clients route working" })

} catch(err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
}
});

router.post("/", async (req, res) => {
  try {
    const { name, business, phone, email, service } = req.body

    console.log("Received body:", req.body)

    const { data, error } = await supabase
      .from("clients")
      .insert([{ name, business, phone, email, service }])
      .select()

    if (error) throw error

    console.log("Inserted client:", data)

    res.status(201).json(data)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, business, phone, email, service } = req.body;

    const { data, error } = await supabase
      .from("clients")
      .update({ name, business, phone, email, service })
      .eq("id", id)
      .select(); // ✅ returns updated row

    if (error) throw error;

    res.json(data[0]); // ✅ send updated client object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
  const { id } = req.params;

  const {error} =  await supabase
  .from ("cllients")  
  .delete()
  .wq("id",id)

  if(error) throw error
  // ("DELETE FROM clients WHERE id=$1", [id]);

    res.json("Client deleted");

  } catch(err) {
    console.error(err)
  res.status(500).json({error:"server error"})
}

});

module.exports = router;