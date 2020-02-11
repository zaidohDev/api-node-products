const express = require('express');
const Product = require('../models/product')
const router = express.Router();

exports.list = (req, res, next) => {
  Product
      .find()
      .then(data =>
        {
          res.status(200).send(data)
      })
      .catch(e => {
        res.status(400).send(e)
      });
}

module.exports = router;