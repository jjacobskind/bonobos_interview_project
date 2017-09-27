import path from 'path';
import express from 'express';
import {ejs} from 'consolidate';
import routes from './controllers';

const expressInstance = express();
expressInstance.set('port', 3000);

expressInstance.set('view engine', 'ejs');
expressInstance.engine('ejs', ejs);

const projectRootPath = path.resolve();
expressInstance.set('views', path.join(projectRootPath, 'server', 'viewTemplates'));

expressInstance.use(express.static(path.join(projectRootPath, 'public')));
expressInstance.use(express.static(path.join(projectRootPath, 'public/build')));

expressInstance.use(routes);

expressInstance.use('*', (req, res, next) => {
  next({ status: 404 });
});

expressInstance.use((err, req, res, next) => {
  if(err.status !== 404) { return next(err); }
  res.status(404).render('error.ejs', { status: 404 });
});

// TODO: Add bug reporting here

expressInstance.use((err, req, res, next) => {
  console.error(`\n${err.stack}\n`);

  if (res.headersSent) { return next(err); }
  const status = err.status || 500;
  res.status(status).render('error.ejs', { status });
});


export default expressInstance;
