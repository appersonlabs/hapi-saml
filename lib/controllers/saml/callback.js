'use strict';

const Boom = require('boom');

/**
 * @description
 * Receive SAML data
 */
module.exports = {
    auth: false,
    pre: [
        {
            method: (req, reply) => {
                const plugin = req.server.plugins['hapi-saml-sso'];
                const saml = plugin && plugin['saml-instance'];
                if (saml) {
                    if (req.payload.SAMLRequest) {
                        // TODO Not supported
                        return reply(Boom.notAcceptable('SAMLRequest not supported'));
                    }
                    if (req.payload.SAMLResponse) {
                        saml.validatePostResponse(req.payload, (err, profile) => {

                            if (err !== null) {
                                return reply(Boom.wrap(err, 500));
                            }
                            return reply(profile.nameID);
                        });
                    }
                    else {
                        return reply(Boom.notAcceptable('Invalid SAML format'));
                    }
                }
                else {
                    reply(Boom.badImplementation('SAML instance not exist'));
                }
            },
            assign: 'userIdentifier'
        },
        {
            method: (req, reply) => {
                // You have to implement this server method in your system
                const identifier = req.pre.userIdentifier;
                if (req.server.methods.login) {
                    req.server.methods.login(identifier, (err, user) => {

                        if (err) {
                            return reply(Boom.wrap(err, 500));
                        }
                        if (!user) {
                            return reply(new Boom.unauthorized('User not found'));
                        }

                        reply(user);
                    });
                }
                else {
                    reply({ token: null });
                }
            },
            assign: 'user'
        }
    ],

    handler: (req, reply) => {

        const user = req.pre.user;
        const setToken = 'localStorage.setItem("SAMLLoggedIn", true);';
        const reloadPage = 'window.location.replace("/");';
        reply(`<script>${setToken}${reloadPage}</script>`).header('access_token', user.token);
    },
    tags: ['api'],
    description: 'SAML SP callback',
    notes: 'SAML SP callback'
};
