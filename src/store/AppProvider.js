import { useReducer } from "react"
import AppContext from "./app-context"

const appReducer = (state,action) =>{
    switch(action.type){
        case "AUTHENTICATE":{
            return{
                initialtoken:action.payload,
                token:'',
                isLogged:false,
                sessionId:state.sessionId
                }
            }
        case "LOGIN":{
        return{
                initialtoken:'',
                token:action.payload,
                isLogged:false,
                sessionId:state.sessionId
            }
        }
        case "SIGN_IN":{
        return{
                isLogged:true,
                sessionId:action.payload,
                initialtoken:'',
                token:''
            }
        }
        case "SIGN_OUT": {      
            return {
                isLogged:false,
                token:'',
                initialtoken:'',
                sessionId:''
            }
        }     
      
    }
    return defaultAppState
}

const defaultAppState = {
    isLogged:false,
    token:'',
    initialtoken:'',
    sessionId:''
}

const AppProvider=(props)=>{
    const [appState,dispatchAppAction]=useReducer(appReducer,defaultAppState)
    
    const logingInHandler = (value) =>{
        dispatchAppAction({
            type:"LOGIN",
            payload:value
        })
    }
    const authenticatingInHandler = (value) =>{
        dispatchAppAction({
            type:"AUTHENTICATE",
            payload:value
        })
    }

    const signInHandler = (value) =>{

        dispatchAppAction({
            type:"SIGN_IN",
            payload:value
        })
    }

    const signOutHandler = () =>{
        dispatchAppAction({
            type:"SIGN_OUT"
        })
    }

    const appContext = {
        initialtoken:appState.initialtoken,
        token:appState.token,
        isLogged:appState.isLogged,
        sessionId:appState.sessionId,
        logingIn:logingInHandler,
        signingOut:signOutHandler,
        signningIn:signInHandler,
        authenticate:authenticatingInHandler
    }
    return (<AppContext.Provider value={appContext}>
        {props.children}
    </AppContext.Provider>
    )
}

export default AppProvider