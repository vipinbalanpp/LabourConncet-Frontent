import { IWorkerDetailsForStore } from "./worker";

export interface IUserCredentials {
  fullName: string;
  email: string;
  password: string;
  role: string;
}
export interface ILoginData {
  email: string;
  password: string;
}
export interface IAddress {
  houseName:string
  street:string
  city:string
  state:string
  pincode:string

}
export interface IUserDetailsForStore {
  id:string
  address:IAddress ;
  email: string;
  fullName: string;
  profileImageUrl: string;
  role: string;
  blocked: boolean;
  createdAt: Date;
}
export interface UserListTableProps {
  users: IUserDetailsForStore[];
  onBlockUser: (email: string) => void;
  onUnBlockUser: (email: string) => void;
}
export interface IBooking {
  id:string
  user:IUserDetailsForStore
  worker:IWorkerDetailsForStore
  workDescription:string
  bookingDate:Date
  workDate:Date
  status:string
  serviceCharge:number
  cancellationReason:string
  cancelledBy:string
  workLocationAddress:IAddress
}
