import express, { Express } from 'express';
import http from 'http';

const app: Express = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const httpServer = http.createServer(app);

httpServer.listen(3545, () => {
  console.log('listening on 3545');
});

export { app, httpServer };
