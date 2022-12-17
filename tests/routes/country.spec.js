/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Countries, conn } = require("../../src/db.js");

const agent = session(app);

const countryNameSearch = {
  name: "Argentina",
};
const countryID = {
  idPais: "ARG",
};


const country = {
  id: "ARGasdasd",
  name: "dasd",
  poblacion: 4649660,
  capital: "Nouakchott",
  continente: "Africa",
  area: 29458,
  flags: "//flagcdn.com/w320/ax.png"
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach( () =>
 Countries.sync({ force: true }).then(() => Countries.create(country))
  );


  describe("GET /countries", () => {
    it("should get 200",() =>  agent.get("/countries").expect(200));
  });
});


  describe("GET /countries  by query", () => {
    it("should get 200", () =>
      agent.get(`/countries?name=${countryNameSearch}`).expect(200));
  });
  
 




describe("GET /countries by id", () => {
  it("should get 200", () => agent.get(`/countries/${countryID}`).expect(200));
});





describe("should fail to get ID and Query", () => {
  it("should get 200", () => agent.get(`/countris/${countryID}`).expect(404));
  it("should get 200", () => agent.get(`/countris?name=${countryID}`).expect(404));
});





