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