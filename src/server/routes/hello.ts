import * as Hapi from 'hapi';

import { UserService } from '../../db/models/User';

export const hello = (user: UserService) => {
  return {
    method: "POST",
    path: "/hello",
    handler: (request: Hapi.Request, reply: any) => {
      return user.setNewUser(request.payload);
    }
  }
};