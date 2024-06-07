export interface IWorkerCredentials {
  fullname: string;
  mobileNumber: string;
  email: string;
  password: string;
  houseName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  expertiseIn: string;
  experience: string;
  serviceCharge: string;
  about: string;
  gender: string;
  dateOfBirth: string;
  profileImageUrl: string;
}
export interface IWorkerDetailsForStore {
  about: string;

  address: {
    houseName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };

  email: string;

  experience: string;

  expertiseIn: string;

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
