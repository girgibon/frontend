import { $host } from ".";
import { IUser } from "../models/IUser";

interface RegistrationData {
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface EventData {
    title: string;
    description: string;
    date: string;
    userId: number;
}

interface RoleData {
    value: string;
    description: string;
}

interface UserResponse {
    id: number;
    email: string;
}

export const registration = async (data: RegistrationData) => {
    const response = await $host.post<any>('https://zct-app.azurewebsites.net/auth/registration:5000', data);
    return response.data; 
};

export const login = async (data: LoginData) => {
    const response = await $host.post<any>('https://zct-app.azurewebsites.net/auth/login:5000', data);
    return response.data 
};

export const getAllUsers = async () => {
    const response = await $host.get<IUser[]>('https://zct-app.azurewebsites.net/users:5000');
    return response.data; 
};

export const getAllEvents = async () => {
    const response = await $host.get<any[]>('https://zct-app.azurewebsites.net/posts:5000');
    return response.data; 
};

export const createEventDb = async (data: EventData) => {
    const response = await $host.post<any>('https://zct-app.azurewebsites.net/posts:5000', data);
    return response.data;
};

export const getIdByEmail = async (value: string) => {
    const response = await $host.get<UserResponse[]>('https://zct-app.azurewebsites.net/users:5000');
    const users = response.data
    const user = users.find(user => user.email === value);
    if (user) {
        return user.id
      }
      return undefined;
};

export const createRole = async (data: RoleData) => {
    const response = await $host.post<any>('https://zct-app.azurewebsites.net/roles:5000', data);
    return response.data;
}

export const getRoleByValue = async (value: string) => {
    const response = await $host.get<RoleData>('https://zct-app.azurewebsites.net/roles/'+value);
    return response.data.value
}
