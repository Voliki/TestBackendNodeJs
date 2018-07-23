import * as Hapi from 'hapi';
import { sequelize } from './db/sequelize';

import { UserService } from './db/models/User';

export class ServerHapi {
  constructor() { }
  corsHeaders: object = {
    origin: ["*"],
    headers: [
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "CORELATION_ID",
      "Accept",
      "Accept-language"
    ],
    credentials: true,
  };

  server: Hapi.Server = new Hapi.Server({
    host: 'localhost',
    port: 3001,
    routes: { cors: this.corsHeaders },
  });
  
  route() {
    this.server.route({
      method: "GET",
      path: "/",
      handler: (request: Hapi.Request, reply: any) => {
        const user: UserService = new UserService();
        return user.getUsers();
      }
    });
  }

  startServer() {
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');

        this.server.start();
        console.log(`Server running at: ${this.server.info.uri}`);
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }
}
