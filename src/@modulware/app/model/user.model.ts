import { Authority } from './authority.model';
import { Privilege } from './privilege.model';

export interface User {
    id: string;
    email: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    authorities?: Authority[];
    privileges?: Privilege[];
    enabled?: boolean;
    defaultAuthority?: Authority;
}
