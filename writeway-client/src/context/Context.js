import {createContext, useEffect, useReducer} from "react";
import Reducer from "./Reducer";

//initial
const INITIAL_STATE = { 

    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false 
};
 
export const Context = createContext(INITIAL_STATE);


//wrapper
export const ContextProvider = ({children}) => {

    const[state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {  
        localStorage.setItem("user", JSON.stringify(state.user))  //converts JavaScript Object to a JSON String

    },[state.user])

    return(
        <Context.Provider value = {{
            user: state.user, 
            isFetching: state.isFetching, 
            error: state.error,
            dispatch,
            }}>

            {children}

        </Context.Provider>
    )
}
