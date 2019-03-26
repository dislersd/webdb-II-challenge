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
    const bears = await db("bears");
    res.status(200).json(bears);
  } catch (error) {
    res.status(500).json({ message: "error retrieving bears" });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where({ id })
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json({ message: "error getting bear" });
    });
});

router.post("/", (req, res) => {
  db("bears")
    .insert(req.body)
    .then(bear => {
      res.status(201).json(bear);
    })
    .catch(err => {
      res.status(500).json({ message: "error posting" });
    });
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const count = await db("bears")
      .update(req.body)
      .where({ id });
    if (count > 0) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ message: "error cannot find" });
    }
  } catch (error) {
    res.status(500).json({ message: "error updating" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .delete()
    .where({ id })
    .then(fasho => {
      if (fasho > 0) {
        res.status(200).json({ message: "successfully deleted" });
      } else {
        res.status(404).json({ message: "bear not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting" });
    });
});

module.exports = router;
