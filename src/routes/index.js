const { Router } = require('express');
const bulkcountriesRouter= require("./bulkRoutes")
const countriesRouter = require("./countRoutes")
const ActiviRouter = require("./ActRoutes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo:
 router.use('/bulkcountries', bulkcountriesRouter);
 router.use('/countries', countriesRouter );
 router.use('/actividades', ActiviRouter);

module.exports = router;
