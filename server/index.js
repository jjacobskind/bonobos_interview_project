import http from 'http';
import expressInstance from './expressInstance';
const webServer = http.createServer(expressInstance);


webServer.listen(expressInstance.get('port'), () => {
  console.info('*******************************************************');
  console.info('Bonobos homework assignment running on port ' + expressInstance.get('port'));
  console.info("*******************************************************\n");
});
