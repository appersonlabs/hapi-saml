'use strict';

const Boom = require('boom');

/**
 * @description
 * Generate SAML Service Provider metadata
 */
module.exports = {
    auth: false,
    handler: (req, reply) => {

        const plugin = req.server.plugins['hapi-saml-sso'];
        const saml = plugin && plugin['saml-instance'];
        if (saml) {
            return reply(saml.generateServiceProviderMetadata(saml.decryptionCert)).type('application/xml');
        }
        reply(Boom.badImplementation('SAML instance not exist'));
    },
    tags: ['saml'],
    description: 'SAML SP metadata',
    notes: 'SAML SP metadata'
};