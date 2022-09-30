import React, { useState } from "react";
import { Location, Navigate, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { mock_user } from "../../mock-data";
import { Guest, IUser, USER_ROLE } from "../../model/user";
interface userState {
    isLoggedIn: boolean,
    isLoginPending: boolean,
    loginError: string|undefined,
    isAdmin:boolean,
    currentUser: IUser,
}

const userInitialState = {
        isLoggedIn: false,
        isLoginPending: false,
        loginError: undefined,
        isAdmin: false,
        currentUser: Guest,
}

interface userContextType {
  currentUserState:userState,
  login?: (user:Partial<IUser>)=>void,
  logout?: (from?:Location) => void
} 
type ProviderProps = {children:React.ReactNode}
const UserContext = React.createContext<userContextType>({currentUserState: userInitialState})

export const UserContextProvider:React.FC<ProviderProps> = (props: ProviderProps ) => {
    const [currentUserState,setCurrentUser] = useState<userState>(userInitialState);
    const setLoginPending = (isLoginPending:boolean) => setCurrentUser({...currentUserState,isLoginPending});
    const setLoginSuccess = (isLoggedIn:boolean) => setCurrentUser({...currentUserState,isLoggedIn});
    const setLoginError = (loginError?:string) => setCurrentUser({...currentUserState,loginError});
    let location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    const login = (user:Partial<IUser>) => {
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(undefined);
    
        // fetchLogin( email, password, error => {
        //   setLoginPending(false);
    
        //   if (!error) {
        //     setLoginSuccess(true);
        //   } else {
        //     setLoginError(error);
        //   }
        // })
        //if (retUser.role === USER_ROLE.ADMIN) {setCurrentUser({...currentUserState, isAdmin:true})}
        setCurrentUser({...currentUserState, isLoggedIn: true, isAdmin: true, currentUser:mock_user});
        navigate(from, {replace:true});
      }
      const logout = (fromImp?:Location) => {
        setLoginPending(false);
        setLoginSuccess(false);
        setLoginError(undefined);
        setCurrentUser(userInitialState);
        navigate((fromImp)?fromImp:from, {replace:true})
      };
      return (
        <UserContext.Provider value={{
          currentUserState,
          login,
          logout,
        }}>
          {props.children}
        </UserContext.Provider>
      );

}
export function useAuth() {
  return React.useContext(UserContext);
}