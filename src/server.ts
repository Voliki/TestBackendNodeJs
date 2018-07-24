import * as Hapi from 'hapi';
import { sequelize } from './db/sequelize';

import { UserService } from './db/models/User';

import { hello } from './server/routes/hello';
import { baseUrl } from './server/routes/baseUrl';
import { getSpecialty } from './server/routes/specialty';

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
    const user: UserService = new UserService();
    
    this.server.route({...baseUrl(user)});
    this.server.route({...hello(user)});
    this.server.route({...getSpecialty(user)});
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
