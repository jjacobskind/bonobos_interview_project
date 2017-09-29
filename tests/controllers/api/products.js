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

    it('primarily sorts inventory alphabetically by style', done => {
      expect(response.body.data[0].inventories).to.be.ascendingBy('style');
      done();
    });

    it('secondarily sorts inventory by ascending waist', done => {
      const firstProductInventories = response.body.data[0].inventories;
      let style = firstProductInventories[0].style;
      let styleInventories = [];;
      for(let i=0, len=firstProductInventories.length; i < len; i++) {
        let isStyleDifferent = style !== firstProductInventories[i].style;
        if(!isStyleDifferent) {
          styleInventories.push(firstProductInventories[i]);
          continue;
        }
        expect(styleInventories).to.be.ascendingBy('waist');
        styleInventories = [];
        style = firstProductInventories[i].style;
      }
      done();
    });

    it('tertiarily sorts inventory by ascending length', done => {
      const firstProductInventories = response.body.data[0].inventories;
      let style = firstProductInventories[0].style, waist = firstProductInventories[0].waist;
      let styleWaistInventories = [];;
      for(let i=0, len=firstProductInventories.length; i < len; i++) {
        let isStyleOrWaistDifferent = style !== firstProductInventories[i].style || waist !== firstProductInventories[i].waist;
        if(!isStyleOrWaistDifferent) {
          styleWaistInventories.push(firstProductInventories[i]);
          continue;
        }
        expect(styleWaistInventories).to.be.ascendingBy('length');
        styleWaistInventories = [];
        style = firstProductInventories[i].style;
        waist = firstProductInventories[i].waist;
      }
      done();
    });

  });
});

export default expressInstance;
