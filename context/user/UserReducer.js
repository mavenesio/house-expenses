
import {
    SET_MODE,
    TOGGLE_MODE,
} from '../../types';


export default (state, action) => {
    switch (action.type) {

        case SET_MODE: {
            return {
                ...state,
                mode: action.payload
            }
        }
        case TOGGLE_MODE: {
            return {
                ...state,
                mode: action.payload
            }
        }
        
        default:
            break;
    }
}