const { Router } = require('express');
const { getCountries, getCountryById, findCountries } = require('../controllers/Country.js');
const router = Router();
const { Country } = require("../db");

router.get("/", async (req, res) => {
  try {
    let { name } = req.query;
    if (name) name = name.trim();
    const count = await Country.count();
    if (!count) await getCountries();
    const find = await findCountries(name);
    return res.json(find);
  } catch (e) {
    console.error(`Error ruta countries ${e}`);
  }
});

router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // cuando cargo la db, ejecuto getCountryById
      res.json(await getCountryById(id.toUpperCase()));
    } catch (e) {
      // console.error(e.message)
      res.status(404).send(`Error ruta id ${e}`);
    }
  });

module.exports = router