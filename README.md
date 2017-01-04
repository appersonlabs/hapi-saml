# hapi-saml-sso

![Logo]()

> hapi-saml-sso is a [hapi.js](https://hapijs.com/) plugin, it will use the [passport-saml](https://github.com/bergie/passport-saml) library and provide possibility to implement Single Sign On in your app using SAML protocol


## Notes

This plugin based on [passport-saml](https://github.com/bergie/passport-saml).

Please, check original repository and specs for clear understanding


## Getting Started

```
npm install hapi-saml-sso --save
```

Add the plugin into your app and set following options

```javascript
const Hapi = require('hapi');
const server = new Hapi.Server();

const plugins = [
    {
        register: require('hapi-saml-sso'),
        options: {
            callbackUrl: 'https://your-app.com/callback',
            host: 'your-app.com',
            protocol: 'https',
            path: '/callback',
            signatureAlgorithm: 'sha1',
            entryPoint: 'https://your-saml-identity-provider',
            issuer: 'https://your-saml-service-provider',
            cert: 'yourCertificate',
            decryptionCert: 'test',
            decryptionPvk: true

        }
    }
];

server.connection({ port: 8000 });

server.register(plugins, (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    });
});

```

For understanding options check following links:

+ [SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)
+ [IDP](https://en.wikipedia.org/wiki/Identity_provider)
+ [Web Browser SSO](https://en.wikipedia.org/wiki/Single_sign-on)


## Credits

+ [Peter Loer](https://github.com/ploer/passport-saml)

## Spec references

* [OASIS](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)
* [SAML](saml.xml.org)

## License
Copyright (c) 2016 archik
Licensed under the MIT license.
