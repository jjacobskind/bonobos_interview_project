import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiSorted from 'chai-sorted';
import expressInstance from '../../../server/expressInstance';
import sequelize from '../../../server/models';
import seedDb from '../../../db/seeder/seedDb';
const {expect} = chai;

chai.use(chaiHttp);
chai.use(chaiSorted);

describe('GET /api/products', () => {
  describe('no query parameters passed', () => {
    let response;

    before(done => {
      sequelize.sync({force: true})
        .then(() => {
          return seedDb();
        })
        .then(() => {
          chai.request(expressInstance)
            .get('/api/products')
            .end((err, res) => {
              response = res;
              done(err);
            });
        });
    });

    it('responds with status 200', (done) => {
      expect(response).to.have.status(200);
      done();
    });

    it('responds with JSON', done => {
      expect(response).to.be.json;
      done();
    });

    it('returns an array of products', done => {
      expect(response.body).to.have.property('data');
      expect(response.body.data.length).to.be.above(0);
      done();
    });

    it('sorts products by name', done => {
      expect(response.body.data).to.be.ascendingBy('name');
      done();
    });

    it('does not return the associated inventory records', done => {
      expect(response.body.data[0]).to.not.have.property('inventories');
      done();
    });

  });


  describe('?include=inventory', () => {
    let response;

    before(done => {
      chai.request(expressInstance)
        .get('/api/products?include=inventory')
        .end((err, res) => {
          response = res;
          done(err);
        });
    });

    it('responds with status 200', (done) => {
      expect(response).to.have.status(200);
      done();
    });

    it('responds with JSON', done => {
      expect(response).to.be.json;
      done();
    });

    it('returns an array of products', done => {
      expect(response.body).to.have.property('data');
      expect(response.body.data.length).to.be.above(0);
      done();
    });

    it('sorts products by name', done => {
      expect(response.body.data).to.be.ascendingBy('name');
      done();
    });

    it('returns the associated inventory records', done => {
      expect(response.body.data[0]).to.have.property('inventories');
      expect(response.body.data[0].inventories.length).to.be.above(0);
      done();
    });

  });
});

export default expressInstance;
