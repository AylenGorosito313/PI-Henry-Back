const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const {Actividad , conn } = require('../../src/db.js');

const agent = session(app);

const ActNSearch = {
    name: 'Ski',
    }

  const activiSearch= {
      name:"Colombia",
    }
const actividad= {
    countryId:"ARG",
    name:"Colombia",
    dificultad:1,
    duracion:"30 min",
    temporada:"Invierno",
};

describe('Actividads routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() =>Actividad.sync({ force: true })
    .then(() => Actividad.create(actividad)));


  describe('GET /actividades', () => {
    it('should get 200', () =>
      agent.get('/actividades').expect(200)
    );
  });
});



describe('GET  activities with query', () => {
  it('should get 200', () =>
    agent.get(`/actividades?name=${activiSearch}`).expect(200)
  );
});


const actividadArray= {
    countryId:["ARG","URU","BRZ","NZL"],
    name:"Ski",
    dificultad:1,
    duracion:"30 min",
    temporada:"Invierno",
};

describe('Actividads routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() =>Actividad.sync({ force: true })
    .then(() => Actividad.create( actividadArray)));




  describe('GET  activities with query', () => {
    it('should get 200', () =>
      agent.get(`/actividades?name=${ActNSearch}`).expect(200)
    );
  });
});



describe("should fail to get ID and Query", () => {
  it("should get 404", () => agent.get(`/actividadess/${ActNSearch}`).expect(404));
  it("should get 404", () => agent.get(`/actividadess?name=${ActNSearch}`).expect(404));
});

    