import * as Hapi from 'hapi';

import { UserService } from '../../db/models/User';

export const baseUrl = (user: UserService) => {
  return {
    method: "GET",
    path: "/",
    handler: (request: Hapi.Request, reply: any) => {
      /*request.url.pathname*/ 
      return user.getUsers();
    }
  }
};