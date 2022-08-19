import React, { useContext, useEffect, useState } from "react";
import { UserListener, USER_GENDER, Guest } from "../sharedTypes";
import { UserT } from "./model/UserT";
import { UsersApi } from "./rest-api-client";
import { UserContext } from "../App";
import {Routes, Route} from "react-router-dom";
import SearchField from "./Search";
import UsersList from "./UsersList";
import RegisterForm from "./RegisterForm";
import LogIn from "./LogIn";


type Props = {
  children?: JSX.Element | JSX.Element[];
};

const UsersController: React.FC<Props> = ({ children }) => {
    const currentUser = useContext(UserContext);
    const [users,setUsers] = useState([] as UserT[]);
    const [error,setError] = useState('');
    const [filter, setFilter] = useState();
    useEffect(() => {
        try{
        const fetchUsers = async () => {
            const usrs = await UsersApi.findAll();
            setUsers(usrs);
        };
        fetchUsers();
    }
        catch (err:any) {
        setError(err);}
    },[]);
  const emptyUser:UserT = {
    id: undefined,
    firstName: "Gosho",
    lastName: "Mosho",
    username: "Gosho69",
    password: "1234",
    gender: "f" as USER_GENDER,
    role: 1,
    status: 1,
    avatar: undefined,
    registered: 123,
    modified: 321,
  }

  const onEditUser:UserListener = (user:UserT) => {
    UsersApi.update(user);
  }
  const onRegisterUser:UserListener = (user:UserT) => {
    const newUser = {...user,
        role: 1,
        status: 1,
        registered: Date.now(),
        modified: Date.now()
    }
    UsersApi.create(newUser);
  }

  const handleLogin = async (user:Partial<UserT>) => {
    try {
    const dbUser = await UsersApi.findByUsername(user.username!);
        currentUser.setCurrentUser(dbUser)
        if (currentUser.user.password !== user.password) {
            currentUser.setCurrentUser(Guest as UserT);
            setError("invalid login");
        } 
        
    }
    catch(err:any) {
        setError(err);
    }
  }; 

  const handleSearch = async (term:string) => {
    const user = await UsersApi.findByName(term);
    setUsers([user]);
  };

  return (
    <>
     <Routes >
        <Route path="/" element={<> <SearchField searchFn={handleSearch}/>
                                    <UsersList users={users}/>
                                 </>} />
        <Route path="register" element={<RegisterForm
                                            onEditUser={onEditUser}
                                            onRegisterUser={onRegisterUser}
                                            userP={emptyUser}
                                        />} />
        <Route path= "login" element = {<LogIn handleLogin={handleLogin} />} />
        <Route path= "users" element = {<UsersList users = {users}/>} />
        <Route path= "search" element = {<SearchField searchFn={handleSearch}/>}/>
      </Routes>
    </>
  );
};

export default UsersController;
