'use strict';

const callback = require('./saml/callback');
const login = require('./saml/login');
const logout = require('./saml/logout');
const metadata = require('./saml/metadata');

/**
 * @description
 * Entry point from which you should import all controller methods
 */
module.exports = {
    callback: callback,
    login: login,
    logout: logout,
    metadata: metadata
};