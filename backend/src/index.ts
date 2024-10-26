import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServe.                                r } from 'http';
import { Server } from 'socket.io';
import { typeDefs, resolvers } from './graphql/schema';
import pm2 from 'pm2';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });

  httpServer.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

pm2.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.start({
    script: 'src/index.ts',
    name: 'acudwa-backend',
  }, (err) => {
    pm2.disconnect();
    if (err) throw err;
  });
});
