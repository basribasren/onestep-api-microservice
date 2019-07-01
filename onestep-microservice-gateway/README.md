#Airbnb JavaScript Style Guide(): A mostly reasonable approach to JavaScript
Airbnb has one of the most popular JavaScript style guides on the internet. It covers nearly every aspect of JavaScript as well. You can view Airbnb’s style guide on https://github.com/airbnb/javascript.

#LOGGER
##pino: Very low overhead Node.js logger, inspired by Bunyan.
🌲 super fast, all natural json logger 🌲 http://getpino.io

#Cache
##redis - a node.js redis client
This is a complete and feature rich Redis client for node.js. It supports all Redis commands and focuses on high performance.

#ORM
##Sequlize
Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

#API Documentation
##JSDocs
An API documentation generator for JavaScript.

##swagger
swagger-ui is a traditional npm module intended for use in single-page applications that are capable of resolving dependencies (via Webpack, Browserify, etc).

#Mailer
##twilio-node
A node.js Twilio helper library.

#Authentication
##passport
Passport is Express-compatible authentication middleware for Node.js. Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies. Passport does not mount routes or assume any particular database schema, which maximizes flexibility and allows application-level decisions to be made by the developer. The API is simple: you provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.

##jsonwebtoken
An implementation of JSON Web Tokens. This was developed against draft-ietf-oauth-json-web-token-08. It makes use of node-jws

##otplib
otplib is a JavaScript One Time Password (OTP) library. It provides both functional and class based interfaces for dealing with OTP generation and verification. It implements both HOTP - RFC 4226 and TOTP - RFC 6238, and are tested against the test vectors provided in their respective RFC specifications. These datasets can be found in the packages/tests folder.

#Limitter
##Express Rate Limit
Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. Plays nice with express-slow-down. Note: this module does not share state with other processes/servers by default. If you need a more robust solution, I recommend using an external store:

#ACL
##accesscontrol
Role and Attribute based Access Control for Node.js

Many RBAC (Role-Based Access Control) implementations differ, but the basics is widely adopted since it simulates real life role (job) assignments. But while data is getting more and more complex; you need to define policies on resources, subjects or even environments. This is called ABAC (Attribute-Based Access Control).

With the idea of merging the best features of the two (see this NIST paper); this library implements RBAC basics and also focuses on resource and action attributes.

#APM
##elastic-apm-node
This is the official Node.js agent for Elastic APM.

#Testing
##Jest
Jest is a delightful JavaScript Testing Framework with a focus on simplicity.