import { UUID } from 'angular2-uuid';

export enum Gender {
    Male='Male',
    Female='Female', 
    Transgender='Transgender'
}
export namespace Gender {
    export function values() {
      return Object.keys(Gender).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
}
export enum Relation {
    Self='Self',
    Spouse='Spouse', 
    Son='Son', 
    Daughter='Daughter', 
    Sibling='Sibling', 
    Grandson='Grandson', 
    Granddaughter='Granddaughter'
}
export namespace Relation {

    export function values() {
      return Object.keys(Relation).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
}
export enum MaritalStatus {
    Single='Single', 
    Married='Married', 
    Divorced='Married'
}
export namespace MaritalStatus {

    export function values() {
      return Object.keys(MaritalStatus).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
}
export enum Occupation {
    Employeed, Selfemployeed, Student
}
export namespace Occupation {

    export function values() {
      return Object.keys(Occupation).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
}
export enum IndustryNature {
    Engineering, Medical, Pharmacy, Accounting, HumanResources
}
export namespace IndustryNature {

    export function values() {
      return Object.keys(IndustryNature).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
}
export class Citizen {
    UniqueKey: UUID;
    PersonName: string;
    RelationWithHead: Relation;
    Gender: Gender;
    DateOfBirth: Date;
    MaritalStatus: MaritalStatus;
    MarriageAge: number;
    OccupationType: Occupation;
    IndustryNature: IndustryNature;
    CitizenHouseNumberRefID: number;
}