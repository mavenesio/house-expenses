// @ts-nocheck
import React, {useReducer} from 'react';

import {
    SET_MODE,
    TOGGLE_MODE,
} from '../../types';
import UserReducer from './UserReducer';
import UserContext from './UserContext';

const UserState = ({children}) => {

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        mode: 'dark',
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const setMode = mode => {
        dispatch({
            type:SET_MODE,
            payload: mode
        })
    };
    const toggleMode = modeValue => {
        dispatch({
            type: TOGGLE_MODE,
            payload: modeValue
        });
    }


    return (
        <UserContext.Provider
            value={{
                mode: state.mode,
                toggleMode,
                setMode
            }}
        >
            {children}
        </UserContext.Provider>

    )


}
export default UserState;