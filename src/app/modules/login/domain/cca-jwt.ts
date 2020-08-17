import { User } from '../../user/domain/user';

export class CcaJwt {

  // tslint:disable-next-line:variable-name
  access_token: string;
  // tslint:disable-next-line:variable-name
  token_type: string;
  // tslint:disable-next-line:variable-name
  refresh_token: string;
  // tslint:disable-next-line:variable-name
  expires_in: number;
  scope: string;
  authorities: [];
  user: User;
  jti: string;
}
