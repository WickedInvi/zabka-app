import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { resolvers } from '../../graphql/Resolvers';
import { typeDefs } from '../../graphql/Schema';
import connectDb from '../../db/config/dbConnection';

connectDb();

const cors = Cors({
  origin: 'https://studio.apollographql.com',
  allowMethods: ['GET', 'POST'],
  allowHeaders: [
    'Access-Control-Allow-Credentials',
    'true',
    'Content-Type',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
  ],
});

// const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

const startSever = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startSever;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
