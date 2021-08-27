const { Router } = require('express');

const routes = Router();

const client = require('./controller/Clients');
routes.post('/clients', client.add);
routes.get('/clients/list', client.list);
routes.get('/clients/:nome', client.search);

const phone = require('./controller/Phone');
routes.post('/phone', phone.add);
routes.get('/phone', phone.listByClient);

const address = require('./controller/Address');
routes.post('/endereco', address.add);

module.exports = routes;