import React from "react";
import Login from "../pages/Login";
import Event from "../pages/Event";
import ActiveTask from "../pages/ActiveTask";

import RegisterForm from "../components/RegisterForm";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}


export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
    REGISTRATION = '/registration',
    ACTIVE_TASKS = '/ActiveTask'
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, exact: true, component: Login },
    { path: RouteNames.REGISTRATION, exact: true, component: RegisterForm }
];
export const privateRoutes: IRoute[] = [
    { path: RouteNames.EVENT, exact: true, component: Event },
    { path: RouteNames.ACTIVE_TASKS, exact: true, component: ActiveTask }
];