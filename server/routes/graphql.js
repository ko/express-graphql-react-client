'use strict';

var express = require('express');
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');

var data = require('../../data/data.json');


// Define our user type, with two string fields; `id` and `name`
var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
    }
});

// Define our schema, with one top level field, named `user`, that
// takes an `id` argument and returns the User with that ID.
var schema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: userType,
                args: {
                    id: { type: graphql.GraphQLString }
                },
                resolve: function (_, args) {
                    return data[args.id];
                }
            }
        }
    })
});

let graphqlServer = graphqlHTTP({ schema: schema, pretty: true });

module.exports = graphqlServer;
