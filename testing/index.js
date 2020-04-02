const chai = require("chai");
const path = require("path");
const fs = require("fs");
const url = `http://localhost:3000`;
const request = require("supertest")(url);
const ws = require("ws");
const { SubscriptionClient } = require("subscriptions-transport-ws");
const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { WebSocketLink } = require("apollo-link-ws");
const gql = require("graphql-tag");
const { ApolloLink } = require("apollo-link");
const { split } = require("apollo-link");
const { HttpLink } = require("apollo-link-http");
const chaiSubset = require("chai-subset");
chai.use(chaiSubset);
let { expect, assert } = chai;
chai.use(require("chai-like"));
chai.use(require("chai-things")); // Do not swap these two
global.waitUntil = require("wait-until");
global.expect = expect;
global.request = request;
global.gql = gql;
global.fs = fs;
global.path = path;
global.step = step;
global.it = it;
const GRAPHQL_ENDPOINT = "ws://localhost:3000/graphql";

const Logout = require("./stages/logout/index.js.js");
const Login = require("./stages/login/index.js.js");
const ExpiredToken = require("./stages/expiredToken/index.js.js");
const GetProfile = require("./stages/getProfile/index.js.js");
const CreateUser = require("./stages/createUser/index.js.js");
const CreateDocuments = require("./stages/createDocuments/index.js.js");
const UpdateDocuments = require("./stages/updateDocuments/index.js.js");
const CreateTask = require("./stages/createTask/index.js.js");
const GetAllDocuments = require("./stages/getAllDocuments/index.js.js");
const RestoreAccount = require("./stages/restoreAccount/index.js.js");

let AccessKey = {
  token: null,
  refreshToken: null
};
let payloads = {};

const client = new SubscriptionClient(
  GRAPHQL_ENDPOINT,
  { reconnect: true },
  ws
);
const apolloClient = new ApolloClient({
  networkInterface: client,
  link: new WebSocketLink(client),
  cache: new InMemoryCache()
});

describe("Test GraphQL API", function() {
  this.timeout(10000 * 60); //wait maximum 10 minutes
  describe("Test Authoririzacion", () => {
    Login.stages.forEach(({ name, handler }) =>
      step(`Test: Iniciar sesion: ${name}`, done => handler(AccessKey, done))
    );

    GetProfile.stages.forEach(({ name, handler }) =>
      step(`Test: Obtener Perfil: ${name}`, done => handler(AccessKey, done))
    );
    /*
    ExpiredToken.stages.forEach(({ name, handler }) =>
      step(`Test ExpiredToken: ${name}`, done => handler(AccessKey, done))
    ) 
    */

    /*
    step(`Test login: success (login again)`, done => {
      let { handler } = Login.stages[Login.stages.length - 1];//success stage
      return handler(AccessKey, done)
    })
   */
    /* 
     CreateUser.stages.forEach(({ name, handler }) =>
       step(`Test: Crear usuario: ${name}`, done => handler(AccessKey, done))
     ) 
     */
    CreateTask.stages.forEach(({ name, handler }) =>
      step(`Test: ${name}`, done =>
        handler(AccessKey, apolloClient, payloads, done)
      )
    );

    CreateDocuments.stages.forEach(({ name, handler }) =>
      step(`Test: ${name}`, done =>
        handler(AccessKey, apolloClient, payloads, done)
      )
    );

    UpdateDocuments.stages.forEach(({ name, handler }) =>
      step(`Test: ${name}`, done =>
        handler(AccessKey, apolloClient, payloads, done)
      )
    );
    /*
    GetAllDocuments.stages.forEach(({ name, handler }) =>
      step(`Test: ${name}`, done => handler(AccessKey, done))
    )
    */

    /* 
      RestoreAccount.stages.forEach(({ name, handler }) =>
        step(`Test: ${name}`, done => handler(AccessKey, done))
      )
    */
    //step(`Test: Actualizar datos del documento`, done => done())

    //step(`Test: Actualizar datos del documento`, done => done())
    /*  
    Logout.stages.forEach(({ name, handler }) =>
      it(`Test: Cerrar sesion ${name}`, done => handler(AccessKey, done))
    )
    */
  });
});
