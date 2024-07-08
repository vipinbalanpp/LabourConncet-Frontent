
export interface Iservice {
  serviceId?:number
    serviceName: string
    logo: string
    description: string
    workers?:{}[]
}

export interface IGetAllUsersParams {
    pageNumber: number;
    searchInput?: string;
    isBlocked?: boolean | null;
  }
  export interface IGetAllWorkersParams {
    pageNumber: number;
    pageSize?:number
    searchInput?: string;
    isBlocked?: boolean | null;
    serviceId?: number | null
  }