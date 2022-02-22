import React from "react";

const AppContext =React.createContext({
    initialtoken:'',
    token:'',
    sessionId:'',
    isLogged:false,
    authenticate:(value)=>{},
    logingIn:(value)=>{},
    signningIn:(value)=>{},
    signingOut:()=>{}
});

export default AppContext;