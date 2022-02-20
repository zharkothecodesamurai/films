import { useReducer } from "react"
import AppContext from "./app-context"

const appReducer = (state,action) =>{
    switch(action.type){
        case "LOGIN":{
        return{
                isLogged:true,
                token:action.payload
            }
        }
        case "SIGN_OUT": {      
            return {
                isLogged:false,
            }
        }
      
    }
    return defaultAppState
}

const defaultAppState = {
    isLogged:false,
    token:''
}

const AppProvider=(props)=>{
    const [appState,dispatchAppAction]=useReducer(appReducer,defaultAppState)
    
    const logingInHandler = (value) =>{
        console.log(value)
        dispatchAppAction({
            type:"LOGIN",
            payload:value
        })
    }

    const signOutHandler = () =>{
        dispatchAppAction({
            type:"SIGN_OUT"
        })
    }

    const appContext = {
        token:appState.token,
        isLogged:appState.isLogged,
        logingIn:logingInHandler,
        signingOut:signOutHandler
    }
    return (<AppContext.Provider value={appContext}>
        {props.children}
    </AppContext.Provider>
    )
}

export default AppProvider