import { UUID } from 'angular2-uuid';
import { UserAccount } from './UserAccount';

export enum VolunteerRequest{
    Pending,
    Approved,
    Rejected
}

export class User {
    guid:UUID;
    firstName: string;
    lastName: string;
    ProfilePictureAddress:string;
    aadharNumber:string;
    isAppover:boolean;
    userAccount:UserAccount;
    requestStatus:VolunteerRequest;
    token: string;
}