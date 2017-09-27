import express from 'express';
import renderReact from '../middleware/renderReact';
import App from '../../client/react/containers/App';

const router = express.Router();

router.get('/', renderReact(App), (req, res, next) => {
  res.render('reactTemplate.ejs');
});

export default router;
