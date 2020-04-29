// @ts-nocheck
import React, {useReducer} from 'react';
import ExpenseContext from './ExpenseContext';
import Reducer from './ExpenseReducer';

import {
    ADD_EXPENSE,
    SET_EXPENSE,
    UPDATE_EXPENSE,
    DELETE_EXPENSE
} from '../../types';
import ExpenseReducer from './ExpenseReducer';

const ExpenseState = ({children}) => {

    const initialState = {
        expenses: [],
    };

    const [state, dispatch] = useReducer(ExpenseReducer, initialState);

    const updateExpense = updatedExpense => {
        dispatch({
            type:UPDATE_EXPENSE,
            payload: updatedExpense

        })
    };
    const setExpenses = expenses => {
        dispatch({
            type:SET_EXPENSE,
            payload: expenses

        })
    };
    const addExpense = newExpense => {
        dispatch({
            type:ADD_EXPENSE,
            payload: newExpense
        })
    };
    const deleteExpense = expenseId => {
        dispatch({
            type:DELETE_EXPENSE,
            payload: expenseId
        })
    };

    return (
        <ExpenseContext.Provider
            value={{
                expenses: state.expenses,
                updateExpense,
                setExpenses,
                addExpense,
                deleteExpense
            }}
        >
            {children}
        </ExpenseContext.Provider>

    )


}
export default ExpenseState;