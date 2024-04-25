import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { getAllUsers } from "../http/userAPI";

export default class UserService {
    static async getUsers(): Promise<IUser[]> {
        return await getAllUsers()
    }
}