import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongo from './mongo';
import * as db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Message from './resolvers/Message';
import ChatBox from './resolvers/ChatBox';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Message,
    ChatBox,
  },
  context: { 
    db,
    pubsub
  },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});

mongo();
