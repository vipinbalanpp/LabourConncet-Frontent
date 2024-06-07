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
export interface IUserDetailsForStore {
  address: {};
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
