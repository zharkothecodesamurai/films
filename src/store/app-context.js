import React from "react";

const AppContext =React.createContext({
    isLogged:false,
    login:()=>{},
    signOut:()=>{}
});

export default AppContext