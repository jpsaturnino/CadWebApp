const { Router } = require('express');

const routes = Router();

const client = require('./controller/Clients');
routes.post('/clients', client.add);
routes.put('/clients', client.edit);
routes.get('/clients/list', client.list);
routes.get('/clients/byname/:nome/:sobrenome', client.search);
routes.get('/clients/byid/:id', client.searchId);
routes.get('/clients/bycpf/:cpf', client.searchCPF);

const phone = require('./controller/Phone');
routes.post('/phone', phone.add);
routes.put('/phone', phone.edit);
routes.get('/phone/:id', phone.listByClient);

const address = require('./controller/Address');
routes.post('/address', address.add);
routes.put('/address', address.edit);
routes.get('/address/:id', address.listByClient);


module.exports = routes;