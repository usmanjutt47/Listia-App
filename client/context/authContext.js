import React, {createContext, useState, useEffect} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  axios.defaults.baseURL = "http://192.168.100.175:1000/api/v1";
  useEffect(() => {
    const getLocalStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
 
      let SignInData = JSON.parse(data);
      setState({...state, user: SignInData?.user, token: SignInData?.token});
    };
    getLocalStorage();
  }, []);
  

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
