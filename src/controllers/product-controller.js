const mongoose = require('mongoose')
const Product = require('../models/product')
const validator = require('../validator/validator.js')

exports.show = (req, res, next) => {
  const { id } = req.params

  Product
      .findById(id)
      .then(data => 
        {
          res.status(200).send(data || `${id} não encontrado`)
      })
      .catch(e => {
        res.status(400).send(e)
      });
};

exports.list = async (req, res, next) => {
  const products = await Product.find({active:true}, 'title slug description price tags')
      if (!products) {
        return res.status(200).json(products)
      }
        return res.status(401).json({error: 'Product not found'})
};

exports.listSlugs = (req, res, next) => {
  const { slug } = req.params;
  
    Product
      .findOne({slug:slug, active:true}, 'title slug description price tags')
      .then(data => 
        {
          res.status(200).send(data || `${slug} não encontrada`);
      })
      .catch(e => {
        res.status(400).send(e);
      });
};

exports.listTags = (req, res, next) => {
  const { tags } = req.params;
  
    Product
      .find({tags:tags, active:true})
      .then(data => 
        {
          res.status(200).send(data || `${tags} não encontrada`);
      })
      .catch(e => {
        res.status(400).send(e);
      });
};

exports.create = (req, res, next) => {

  const { title, description } = req.body;

  let check = new validator();

  check.hasMinLen(title, 3, 'O título deve ter pelo menos 3 caracteres');
  check.hasMinLen(description, 8, 'A descrição deve ter pelo menos 8 caracteres');
  
  if (!check.isValid()) {
    res.status(400).send(check.errors()).end();
    return ;
  }

  const product = new Product(req.body);

    product
      .save()
      .then(x =>
        {
          res.status(201).send({message: 'product criado com sucesso'});
      })
      .catch(e => {
        res.status(400).send({errr: 'erro ao criar o produto', data: e});
      });
};

exports.update = (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, tags, slug, active} = req.body;
  
  Product
    .findByIdAndUpdate({_id:id}, {title, description, slug, tags, price, active})
    .then(r =>{
        res.status(201).send({message: 'product alterado com sucesso'});    
    })
    .catch(e => {
        res.status(400).send({errr: 'erro ao atualizar o produto', data: e});
    });
};

exports.destroy = (req, res, next) => {
  const { id } = req.params;

  Product
    .findByIdAndDelete({_id:id})
    .then(r => {
        res.status(200).send({ message: `O product was deleted of id: ${id}`});
    })
    .catch(e => {
        res.status(400).send({errr: 'erro ao deletar o produto', data: e});
    });    
};