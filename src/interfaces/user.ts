import { string } from "yup";
import { IWorkerDetailsForStore } from "./worker";

export interface IUserCredentials {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
}
export interface ILoginData {
  email: string;
  password: string;
}
export interface IAddress {
  houseName: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
}
export interface IUserDetailsForStore {
  id: string;
  address: IAddress;
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
}
export interface IBooking {
  id: string;
  user: IUserDetailsForStore;
  worker: IWorkerDetailsForStore;
  workDescription: string;
  bookingDate: Date;
  workDate: Date;
  status: string;
  serviceCharge: number;
  cancellationReason: string;
  cancelledBy: string;
  workLocationAddress: IAddress;
  reasonForRejection: string;
  rescheduleRequestedBy: string;
  rescheduleRequestedDate: Date;
}
export interface DecodedToken {
  name: string;
  email: string;
}
export interface IResult {
  error: string;
}

export interface IMessage {
  id: string;
  senderId: number;
  receiverId: number;
  senderRole: string;
  content: string;
  read: boolean;
  timestamp: Date;
}
export interface IPersonInfoForChat {
  id: string;
  name: string;
  profileImageUrl: string;
  partnerRole: string;
  lastTimestamp: Date;
  lastMessageContent: string;
}
