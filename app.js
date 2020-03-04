const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Case = require("./models/Case");
const User = require("./models/User");

// bring in graphql-express middleware
const {graphiqlExpress, graphqlExpress} = require("apollo-server-express");
const {makeExecutableSchema} = require("graphql-tools");

const {typeDefs} = require("./schema");
const {resolvers} = require("./resolvers");

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

mongoose.connect(`mongodb+srv://divakaivan:${process.env.DB_PASS}@cluster0-cniio.mongodb.net/judgement?retryWrites=true&w=majority`)
    .then(console.log('DB connected'))
    .catch(err=>console.log(err));

const app = express();

// create graphiql application
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));


// connect schemas with graphql
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    context: {
        Case,
        User
    }
}));

const PORT = 4444;

app.listen(PORT, () => {
    console.log("Server listening...")
});