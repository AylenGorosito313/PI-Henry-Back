//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const axios = require("axios");
const server = require("./src/app.js");
const { conn,Countries } = require("./src/db.js");
const {
 PORT
} = process.env;

const getCountriesDB = async () =>{
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
 
 await Countries.bulkCreate(ApiContries);
}







conn.sync({ force: true }).then(() => {
  getCountriesDB().then(() => console.log("Countries loaded"));
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`, ); // eslint-disable-line no-console
  });
});
