const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

const db = knex(knexConfig);

router.get("/", async (req, res) => {
  try {
    const zoos = await db("zoos");
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json({ message: "error retrieving zoos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const zoo = await db("zoos").where({ id });
    res.status(200).json(zoo);
  } catch (error) {
    res.status(500).json({ message: "error getting zoo" });
  }
});

router.post("/", async (req, res) => {
  try {
    await db("zoos").insert(req.body);
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "error posting" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const count = await db('zoos').where({id}).update(req.body);
    if (count > 0) {
      res.status(200).json(count);
    } else {
      res.status(404).json({ message: 'cannot find that zoo' })
    }
  } catch (error) {
    res.status(500).json({ message: 'error updating' })
  }
});

module.exports = router;
