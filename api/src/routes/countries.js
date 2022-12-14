const { Router } = require('express');
const { getCountries, getCountryById, findCountries } = require('../controllers/Country.js');
const router = Router();
const { Country } = require('../db');

// router.get('/:id', getCountryById)

router.get("/", async (req, res) => {
    try {
      const { name } = req.query;
      if (name === undefined){
       const allCountries =  await getCountries();
        console.log(allCountries);
       res.json(allCountries);
        
      } else {
        const find = await findCountries(name);
        res.json(find);
      }
    } catch (e) {
      console.log(`error de ruta ${e}`);
    }
});


router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // once the DB has all API data, execute getCountryById
      res.json(await getCountryById(id.toUpperCase()));
    } catch (e) {
      // console.error(e.message)
      res.status(404).send(`Error ruta id ${e}`);
    }
  });

module.exports = router