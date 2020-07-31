const express = require('express');
const stackController = require('../controllers/stack-controller.js');

const stackRouter = express.Router();

//populates a 'stack' with stored technology cards

stackRouter.get('/', stackController.getStack, (req, res) => {
  return res.status(200).json(res.locals.output);
});

module.exports = stackRouter;
