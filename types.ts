export type ResponseData = Record<string, any> | Record<string, any>[];

export interface IUser {
    user: any;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    provider: string;
    token?: string;
    last_login?: string;
}
