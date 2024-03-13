import { createContext, useContext, useState } from "react";

export const authContext = createContext();

export const useAuthContext = () => {
  return useContext(authContext);
};

const AuthContextProvider = ({children}) => {
  const [authUser, setauthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <authContext.Provider value={{ authUser, setauthUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider