import * as Hapi from 'hapi';

import { UserService } from '../../db/models/User';

export const getSpecialty = (user: UserService) => {
  return {
    method: "GET",
    path: "/specialty",
    handler: (request: Hapi.Request, reply: any) => {
      return user.getSpecialtyUser();
    }
  }
};