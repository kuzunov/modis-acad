import * as yup from "yup";
import { USER_GENDER, USER_ROLE, USER_STATUS } from "./Components/model/sharedTypes"

export const AVATAR_FOLDER = '/avatars/'
export const DEFAULT_AVATAR = 'default_avatar_'
export const APP_URL = 'http://localhost:3000'
export const API_BASE_URL = 'http://localhost:4000'
export const API_ENDPOINT = `${API_BASE_URL}/api`


export const validation = {
                    firstName: new RegExp(/^[a-zA-Z]{2,12}$/),
                    lastName:new RegExp(/^[a-zA-Z]{2,12}$/),
                    username : new RegExp(/^[a-zA-Z]{5,15}$/),
                    password:new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
                    avatar:new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i),
                    description:new RegExp(/^.{1,512}$/)
                }
export const USER_FORM_SCHEMA = yup.object({
    id: yup.number(),
    username: yup.string().min(5).max(15).matches(/^[aA-zZ\s]+$/,"should only be letters").required(),
    password: yup.string().min(8).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*^#?&])[A-Za-z\d@$!%^*#?&]{8,}$/,"should contain letters, at least one number and at least one special character(!@#$%^&)").required(),
    firstName: yup.string().min(2).max(15).required(),
    lastName: yup.string().min(2).max(15).required(),
    description: yup.string().max(512).optional(),
    avatar: yup.string().url().optional(),
    role: yup.mixed<USER_ROLE>().oneOf([USER_ROLE.ADMIN,USER_ROLE.USER,USER_ROLE.GUEST]),
    gender: yup.mixed<USER_GENDER>().oneOf(['m','f']).required(),
    status: yup.mixed<USER_STATUS>().oneOf([USER_STATUS.ACTIVE,USER_STATUS.DEACTIVATED,USER_STATUS.SUSPENDED]),

}).required();  

export const USER_LOGIN_SCHEMA = yup.object({
    username: yup.string().min(5).max(15).required(),
    password: yup.string().min(8).required()

}).required();