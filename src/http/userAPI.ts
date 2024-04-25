import { $authHost, $host } from ".";
import { IEvent } from "../models/IEvent";
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
    const response = await $host.post<any>('zct-app.azurewebsites.net/auth/registration', data);
    return response.data; 
};

export const login = async (data: LoginData) => {
    const response = await $host.post<any>('zct-app.azurewebsites.net/auth/login', data);
    return response.data 
};

export const getAllUsers = async () => {
    const response = await $host.get<IUser[]>('zct-app.azurewebsites.net/users');
    return response.data; 
};

export const getAllEvents = async () => {
    const response = await $host.get<any[]>('zct-app.azurewebsites.net/posts');
    return response.data; 
};

export const createEventDb = async (data: EventData) => {
    const response = await $host.post<any>('zct-app.azurewebsites.net/posts', data);
    return response.data;
};

export const getIdByEmail = async (value: string) => {
    const response = await $host.get<UserResponse[]>('zct-app.azurewebsites.net/users');
    const users = response.data
    const user = users.find(user => user.email === value);
    if (user) {
        return user.id
      }
      return undefined;
};

export const createRole = async (data: RoleData) => {
    const response = await $host.post<any>('zct-app.azurewebsites.net/roles', data);
    return response.data;
}

export const getRoleByValue = async (value: string) => {
    const response = await $host.get<RoleData>('zct-app.azurewebsites.net/roles/'+value);
    return response.data.value
}
