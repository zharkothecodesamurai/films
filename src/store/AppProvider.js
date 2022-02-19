import { useReducer } from "react"
import AppContext from "./app-context"

const appReducer = (state,action) =>{
    switch(action.type){
        case "LOGIN":{
        return{
                isLogged:true
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
    isLogged:false
}

const AppProvider=(props)=>{
    const [appState,dispatchAppAction]=useReducer(appReducer,defaultAppState)
    
    const logingInHandler = () =>{
        dispatchAppAction({
            type:"LOGIN"
        })
    }

    const signOutHandler = () =>{
        dispatchAppAction({
            type:"SIGN_OUT"
        })
    }

    const appContext = {
        isLogged:appState.isLogged,
        logingIn:appState.logingInHandler,
        signingOut:appState.signOutHandler
    }
    return (<AppContext.Provider value={appContext}>
        {props.children}
    </AppContext.Provider>
    )
}

export default AppProvider