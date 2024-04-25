import { AuthActionEnum, SetAuthAction, SetErrorAction, SetUserAction, SetIsLoadingAction } from "./types";
import { jwtDecode } from "jwt-decode";
import {IUser} from "../../../models/IUser";
import { AppDispatch } from "../../index";
import { getRoleByValue } from "../../../http/userAPI";
import { login, registration, createRole } from "../../../http/userAPI";

export const AuthActionCreators = {
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    login: (email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await login({ email: email, password: password })
            const mockUser = jwtDecode(response.token) as { email: string; }; 
            if (mockUser) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('email', mockUser.email)
                dispatch(AuthActionCreators.setUser({email: email, password: password}))
                dispatch(AuthActionCreators.setIsAuth(true));
            } else {
                dispatch(AuthActionCreators.setError('Incorrect login or password'))
            }
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch(e) {
            dispatch(AuthActionCreators.setError('Login error'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('email')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    },
    registration: (email: string, password: string) => async (dispatch: AppDispatch) => {
        const admin = await getRoleByValue('ADMIN')
        const user = await getRoleByValue("USER")
        if (!admin || !user) {
            createRole({value:"ADMIN", description:"Admin"})
            createRole({value:"USER", description:"User"}) 
        }

        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await registration({ email: email, password: password })
            console.log(response)
            const mockUser = jwtDecode(response.token) as { email: string; }; 
            console.log(mockUser)
            if (mockUser) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('email', mockUser.email)
                dispatch(AuthActionCreators.setUser({email: email, password: password}))
                dispatch(AuthActionCreators.setIsAuth(true));
            } else {
                dispatch(AuthActionCreators.setError('Incorrect email or password'))
            }
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch(e) {
            dispatch(AuthActionCreators.setError('Registration error'))
        }
    },
} 

