import { Iservice } from "./admin";
import { IAddress } from "./user";

export interface IWorkerCredentials {
  fullName: string;
  username: string
  mobileNumber: string;
  email: string;
  password: string;
  houseName: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  serviceId: number;
  experience: number;
  serviceCharge: number;
  about: string;
  gender: string;
  dateOfBirth: string;
  profileImageUrl: string;
}
export interface IWorkerDetailsForStore {
  about: string;
  id:string
  address:IAddress

  email: string;

  experience: string;

  service: Iservice

  fullName: string;

  gender: string;

  mobileNumber: string;

  profileImageUrl: string;
  
  createdAt: Date;

  role: string;

  blocked: boolean;

  verified: boolean

  serviceCharge: string;

  works: {};
}
export interface WorkerListTableProps {
  workers: IWorkerDetailsForStore[];
}
export interface IEditWorkerDetails{
  fullName: string
  mobileNumber:string
  dateOfBirth: string
  expertiseIn: string
  experience: string
  serviceCharge: string
  about: string
}
