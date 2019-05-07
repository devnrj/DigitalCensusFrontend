import { UUID } from 'angular2-uuid';
import { Citizen } from './Citizen';
export enum OwnerShipStatus{
    Owned,
    Rented
}

export class House{
    ID:number;
    apartmentNumber:number;
    streetName:string;
    city:string;
    state:string;
    houseHeadPerson:string;
    roomQuantity:number;
    ownerShip:OwnerShipStatus;
    uniqueKey:UUID;
    citizens :Citizen[];
}