import { getStates } from "../../IBGE";

export const REQUEST_STARTED = 'STATE_REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'STATE_REQUEST_SUCESSFUL';
export const REQUEST_FAILED = 'STATE_REQUEST_FAILED';


function requestStarted() {
    return { type: REQUEST_STARTED }
}

function requestSuccessful(payload) {
    return {
        type: REQUEST_SUCCESSFUL,
        payload,
    }
}

function requestFailed(error) {
    return {
        type: REQUEST_FAILED,
        payload: error,
    }
}

export function fetchStates() {    
    return async (dispatch) => {        
        dispatch(requestStarted());
        try {
            const OK = await getStates();                       
            dispatch(requestSuccessful(OK))
        } catch(error) {
            dispatch(requestFailed(error))
        }
    }
}
