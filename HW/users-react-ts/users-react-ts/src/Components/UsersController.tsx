import React, { useEffect, useState } from "react";
import { FilterT, UserListener } from "./model/sharedTypes";
import { UserT } from "./model/UserT";
import { UsersApi } from "./rest-api-client";
import { Routes, Route, useNavigate } from "react-router-dom";
import SearchField from "./Search";
import UsersList from "./UsersList";
import UserForm from "./UserForm";
import LogIn from "./LogIn";
import Filter from "./Filter";

type Props = {
  children?: JSX.Element | JSX.Element[];
  setCurrentUser: (user: UserT) => void;
  currentUser: UserT;
};

const UsersController: React.FC<Props> = ({ setCurrentUser, currentUser }) => {
  // const currentUser = useContext(UserContext);
  const [users, setUsers] = useState([] as UserT[]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterT>({ role: 0, status: 0 });
  const navigate = useNavigate();
  //fetch all users
  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const usrs = await UsersApi.findAll();
        setUsers(usrs);
      };
      fetchUsers();
      const sessUser = localStorage.getItem("user");
      if (sessUser) {
        const loggedUser = JSON.parse(sessUser);
        setCurrentUser(loggedUser);
      }
    } catch (err: any) {
      setError(err);
    }
  }, []);
  //edit user and return to /
  const onEditUser: UserListener = (user: UserT) => {
    try {
      const newUser = { ...user, modified: Date.now() };
      UsersApi.update(newUser);
      setUsers(users.map((currU) => (currU.id === user.id ? newUser : currU)));
      navigate("/");
    } catch (err: any) {
      setError(err);
    }
  };
  //register user (check valid username), log the new user and return to /
  const onRegisterUser: UserListener = async (user: UserT) => {
    const newUser = {
      ...user,
      description: user.description ? user.description : "",
      avatar: user.avatar ? user.avatar : "",
      role: 1,
      status: 1,
      registered: Date.now(),
      modified: Date.now(),
    };
    try {
      let userNameFree = await UsersApi.checkUsernameUniqueness(
        newUser.username
      );
      if (userNameFree) {
        const loggedUser = await UsersApi.create(newUser);
        setError("");
        //noId?!
        setCurrentUser(loggedUser);
        navigate("/");
      } else setError(`User with username ${newUser.username} already exists.`);
    } catch (error: any) {
      setError(error);
    }
  };
  //login -> check pass match (puke) and set in localStorage(incl pass :@)
  const handleLogin = async (user: Partial<UserT>) => {
    try {
      //feeling dirty doing this
      if (user.username && user.password) {
        let dbUser = await UsersApi.login(user.username);
        if (dbUser[0]) {
          if (dbUser[0].password === user.password) {
            setCurrentUser(dbUser[0]);
            navigate("/");
            localStorage.setItem("user", JSON.stringify(dbUser[0]));
            setError("");
          } else {
            setError("Credentials do not match.");
          }
        } else setError("No such user in DB");
      } else {
        setError("Type in your username and password");
      }
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
  };

  const handleSearch = async (term: string) => {
    try {
      const user = await UsersApi.findByName(term);
      if (user.length > 0) {
        setError("");
      } else {
        setError("Found nothing :C");
      }
      setUsers(user);
    } catch (err: any) {
      setError(err);
    }
  };
  const handleDelete = async (user: UserT) => {
    if (user.id === currentUser.id) {
      setError("You cant delete yourself");
    } else {
      try {
        await UsersApi.deleteById(user.id);
        setUsers([...users].filter((userC) => userC.id !== user.id));
      } catch (err: any) {
        setError(err);
      }
    }
    navigate("/");
  };
  return (
    <>
      {error && <div className="error">{error.toString()}</div>}
      <Routes>
        <Route
          path="/"
          element={ <> 
            <div className="search-filter">
              <SearchField searchFn={handleSearch} />
              <Filter filter={filter} handleFilterChange={setFilter} />
              </div>
              <UsersList
                filter={filter}
                users={users}
                handleDelete={handleDelete}
              />
            
            </>
          }
        />
        <Route
          path="register"
          element={
            <UserForm
              onEditUser={onEditUser}
              onRegisterUser={onRegisterUser}
              currentUser={currentUser}
              setError={setError}
            />
          }
        />
        <Route path="login" element={<LogIn handleLogin={handleLogin} />} />
        <Route
          path="users"
          element={<>
          <div className="search-filter">
              <SearchField searchFn={handleSearch} />
              <Filter filter={filter} handleFilterChange={setFilter} />
              </div>
            <UsersList
              filter={filter}
              users={users}
              handleDelete={handleDelete}
            /></>
          }
        />
        <Route
          path="search"
          element={<>   <SearchField searchFn={handleSearch} /><UsersList
            filter={filter}
            users={users}
            handleDelete={handleDelete}
          /></>}
        />
        <Route
          path="edit"
          element={
            <UserForm
              setError={setError}
              onEditUser={onEditUser}
              onRegisterUser={onRegisterUser}
              currentUser={currentUser}
            />
          }
        />
      </Routes>
    </>
  );
};

export default UsersController;
