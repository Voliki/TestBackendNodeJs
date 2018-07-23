import { ServerHapi } from '../src/server';

export const server: ServerHapi = new ServerHapi();

server.route();

server.startServer();
