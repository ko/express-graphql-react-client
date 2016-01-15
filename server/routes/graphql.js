'use strict';

var express = require('express');
var graphqlHTTP = require('express-graphql');

var schema = require('../data/schema.js');

let graphqlServer = graphqlHTTP({ schema: schema, pretty: true });

module.exports = graphqlServer;
