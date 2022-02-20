import React from "react";

const AppContext =React.createContext({
    token:'',
    isLogged:false,
    logingIn:(value)=>{},
    signingOut:()=>{}
});

export default AppContext