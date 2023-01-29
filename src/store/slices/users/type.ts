import { User } from 'services/user/type';

import { StateWithRequestStatus } from '../type';

export interface UserState extends StateWithRequestStatus {
  selectedUser: User | null;
  users: User[];
}
