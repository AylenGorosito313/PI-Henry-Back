const { Router } = require("express");

const { Op } = require("sequelize");
const { Countries } = require("../db");
const { Actividad } = require("../db");
const countriesRouter = Router();

countriesRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {

      const resultsDb = await Countries.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: { model: Actividad },
      });

      res.status(200).send(resultsDb);
    } else {
      const resultAll = await Countries.findAll();
      res.status(200).send(resultAll);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

countriesRouter.get("/:idPais", async (req, res) => {
  try {
    const { idPais } = req.params;
    if (idPais) {
      const resultsDb = await Countries.findAll({
        where: {
          id: {
            [Op.iLike]: `%${idPais}%`,
          },
        },

        include: { model: Actividad },
      });

      res.status(200).send(resultsDb);
    }
  } catch (error) {
    res.status(402).send({ error: error.message });
  }
});

module.exports = countriesRouter;
