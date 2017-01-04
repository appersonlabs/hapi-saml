'use strict';

const controller = require('./controllers');
const Saml = require('./saml/factory');

exports.register = (server, options, next) => {

    const samlInstance = Saml.create(options);
    server.expose('saml-instance', samlInstance);

    server.route({ method: 'GET', path: '/saml/metadata.xml', config: controller.metadata });
    server.route({ method: 'GET', path: '/saml/login', config: controller.login });
    server.route({ method: 'GET', path: '/saml/logout', config: controller.logout });
    server.route({ method: 'POST', path: '/saml/callback', config: controller.callback });

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};
