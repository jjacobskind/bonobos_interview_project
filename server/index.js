import http from 'http';
import expressInstance from './expressInstance';
const webServer = http.createServer(expressInstance);
import sequelize from './models';

sequelize.sync({ force: true }) // TODO: remove IMMEDIATELY once database is seeded
  .then(() => {
    webServer.listen(expressInstance.get('port'), () => {
      console.info('*******************************************************');
      console.info('Bonobos homework assignment running on port ' + expressInstance.get('port'));
      console.info("*******************************************************\n");
    });
    require('../db/seeder/seedDb')(); // TODO: remove IMMEDIATELY once database is seeded
  });
