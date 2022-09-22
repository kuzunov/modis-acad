import React, { useState } from "react";
import { Guest, IUser } from "../../model/user";
interface userState {
    isLoggedIn: boolean,
    isLoginPending: boolean,
    loginError: string|undefined,
    currentUser: IUser,
}

const userInitialState = {
        isLoggedIn: false,
        isLoginPending: false,
        loginError: undefined,
        currentUser: Guest,
}

interface userContextType {
  currentUserState:userState,
  login?: (email:string, password:string)=>IUser,
  logout?: () => void
} 
type ProviderProps = {children:React.ReactNode}
export const UserContext = React.createContext<userContextType>({currentUserState: userInitialState})

export const UserContextProvider:React.FC<ProviderProps> = (props: ProviderProps ) => {
    const [currentUserState,setCurrentUser] = useState<userState>(userInitialState);
    const setLoginPending = (isLoginPending:boolean) => setCurrentUser({...currentUserState,isLoginPending});
    const setLoginSuccess = (isLoggedIn:boolean) => setCurrentUser({...currentUserState,isLoggedIn});
    const setLoginError = (loginError?:string) => setCurrentUser({...currentUserState,loginError});

    const login = (email:string, password:string) => {
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
        return Guest;
      }
      const logout = () => {
        setLoginPending(false);
        setLoginSuccess(false);
        setLoginError(undefined);
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