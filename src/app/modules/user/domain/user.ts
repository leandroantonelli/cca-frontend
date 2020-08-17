import { Perfil } from '../../perfil/domain/perfil';
import { UserAddress } from './user-address';

export class User {
  idUser: number;
  dsName: string;
  dsEmail: string;
  dsPassword: string;
  dsCellPhone: string;
  dsCpf: string;
  fgActive: boolean;
  perfil: Perfil;
  address: UserAddress;
}

