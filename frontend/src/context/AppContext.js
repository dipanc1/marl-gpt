import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const INITIAL_STATE = {
    messages: []
};

export const AppContext = createContext(INITIAL_STATE);

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);

    return (
        <AppContext.Provider value={
            {
                messages: state.messages,
                dispatch
            }
        }>
            {children}
        </AppContext.Provider>
    );
}