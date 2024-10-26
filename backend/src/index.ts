import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
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
}).catch((error) => {
  console.error('Error starting Apollo Server:', error);
  process.exit(1);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

pm2.connect((err) => {
  if (err) {
    console.error('Error connecting to PM2:', err);
    process.exit(2);
  }

  pm2.start({
    script: 'src/index.ts',
    name: 'acudwa-backend',
  }, (err) => {
    if (err) {
      console.error('Error starting PM2 process:', err);
      pm2.disconnect();
      process.exit(2);
    }
    pm2.disconnect();
  });
});
