const { Sequelize } = require("sequelize");
const { Countries } = require("../db");
const { Actividad } = require("../db");
const { Router } = require("express");
const ActiviRouter = Router();

const { Op } = require("sequelize");


ActiviRouter.post("/", async (req, res) => {


  try {
    const { countryId, name, dificultad, duracion, temporada } = req.body;
  

    const act = await Actividad.create({
      name: name,
      dificultad: dificultad,
      duracion: duracion,
      temporada: temporada,
    });

    if (Array.isArray(countryId)) {


      for (let i = 0; i < countryId.length; i++) {
        const country = await Countries.findByPk(countryId[i]);
       
        await country.addActividad(act.id);
      }
      
    } else {
      const country = await Countries.findByPk(countryId);
      country.addActividad(act.id);
    }

    res.status(200).send("Actividad creada con exito!");
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});



ActiviRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const resultsDbName = await Actividad.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      res.status(200).send(resultsDbName);
      
    } else {
      const resultsDb = await Actividad.findAll();

      res.status(200).send(resultsDb);
    }
  } catch (error) {
    res.status(402).send({ error: error.message });
  }
});

module.exports = ActiviRouter;

