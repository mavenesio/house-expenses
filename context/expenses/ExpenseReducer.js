
import {
    ADD_EXPENSE,
    SET_EXPENSE,
    UPDATE_EXPENSE,
} from '../../types';


export default (state, action) => {
    switch (action.type) {
        case UPDATE_EXPENSE:
            console.log('update');
            return {
                ...state,
                expenses: state.expenses.map(
                    expense => {
                        if(expense.id === action.payload.id) return action.payload
                        else return expense;
                    })
            }
        case SET_EXPENSE:
            console.log('set');
            return {
                ...state,
                expenses: action.payload
            }
        case ADD_EXPENSE:
            console.log('add');
            return {
                ...state,
                expenses: state.expenses.concat(action.payload)
            }
    
        default:
            break;
    }
}