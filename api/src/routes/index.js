const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const CountriesRouter = require("./countries.js");
// const ActivitiesRouter = require("./activities.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", CountriesRouter);
// router.use("/activities", ActivitiesRouter);

module.exports = router;
