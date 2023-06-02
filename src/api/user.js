import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";
import  jwt_decode  from 'jwt-decode';
export let userContext = createContext({});
export default function UserContextProvider(props) {
    let [user, setUser] = useState(null);
  let [userRegister, setUserRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });
  let [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  function addUser(e) {
    let myUser = { ...userRegister };
    myUser[e.target.name] = e.target.value;
    setUserRegister(myUser);
  }
  function checkUser(e) {
    let userCheck = { ...userLogin };
    userCheck[e.target.name] = e.target.value;
    setUserLogin(userCheck);
  }

  function logOut() {
    localStorage.clear("token");
    setUser(null);
    return <Navigate to={'/login'}/>;
  }


  return (
    <userContext.Provider value={{ setUserRegister, userRegister, addUser,userLogin ,checkUser, logOut, user}}>
      {props.children}
    </userContext.Provider>
  );
}
