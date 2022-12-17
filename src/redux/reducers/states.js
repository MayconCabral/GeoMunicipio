import { REQUEST_STARTED, REQUEST_SUCCESSFUL, REQUEST_FAILED } from '../actions/state';

const INITIAL_STATE = {
    loading: false,
    data: [],
    error: ''
}

function statesReducer( state = INITIAL_STATE, action) {
    switch(action.type) {
        case REQUEST_STARTED:
            return {
                ...state,
                loading: true,
                data: []
            }
        case REQUEST_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: []
            }
        default:
            return state;
    }
}

export default statesReducer;
