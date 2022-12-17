const { Router } = require("express");
const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Countries } = require("../db");

const bulkcountriesRouter = Router();

bulkcountriesRouter.get("/", async (req, res) => {

  const apiData = await axios.get("https://restcountries.com/v3.1/all");

  let ApiContries = apiData.data.map((contrie) => {
  

    return {
      id: contrie.cca3,
      name: contrie.name.official,
      capital:
      contrie?.capital?.length > 0 ? contrie.capital[0] : "Capital not found",
      continente: contrie.region,
      subregion: contrie.subregion,
      area: contrie.area,
      poblacion: contrie.population,
      flags: contrie.flags.png,
    };
  });
 
  let bulkCountry = await Countries.bulkCreate(ApiContries);

  res.status(200).send("La base de datos ha sido actualiza");
});

module.exports = bulkcountriesRouter;
