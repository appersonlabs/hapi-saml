'use strict';

const Saml = require('passport-saml/lib/passport-saml/saml');

/**
 * @description
 * create passport-saml instance
 * @type {{create: (function())}}
 */
module.exports = {
    create: (options) => {
        const instance = new Saml.SAML(options);
        instance.decryptionCert = options.decryptionCert; 
        return instance;
    }
};
