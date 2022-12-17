import { getCoordinates, getCounties, getCountyInfo, getGeoJson } from "../../IBGE";

export const REQUEST_STARTED = 'COUNTY_REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'COUNTY_REQUEST_SUCESSFUL';
export const SUCCESSFUL_COUNTY_INFO = 'SUCCESSFUL_COUNTY_INFO';
export const SUCCESSFUL_COORDINATES = 'SUCESSFUL_COORDINATES';
export const SUCCESFUL_GEOJSON = 'SUCCESFUL_GEOJSON';
export const REQUEST_FAILED = 'COUNTY_REQUEST_FAILED';


function requestStarted() {
    return { type: REQUEST_STARTED }
}

function requestSuccessful(payload) {
    return {
        type: REQUEST_SUCCESSFUL,
        payload,
    }
}

function successfulCountyInfo(payload) {
    return {
        type: SUCCESSFUL_COUNTY_INFO,
        payload,
    }
}

function successfulCoordinates(payload) {
    return {
        type: SUCCESSFUL_COORDINATES,
        payload,
    }
}

function successfulGeoJson(payload) {
    return {
        type: SUCCESFUL_GEOJSON,
        payload,
    }
}

function requestFailed(error) {
    return {
        type: REQUEST_FAILED,
        payload: error,
    }
}

export function fetchCounties(UF) {    
    return async (dispatch) => {
        dispatch(requestStarted());
        try {
            const OK = await getCounties(UF);                       
            dispatch(requestSuccessful(OK))
        } catch(error) {
            dispatch(requestFailed(error))
        }
    }
}

export function fetchCountyInfo(id) {
    return async (dispatch) => {
        dispatch(requestStarted()); 
        try {
            const OK = await getCountyInfo(id);
            dispatch(successfulCountyInfo(OK))
        } catch(error) {
            dispatch(requestFailed(error))
        }      
    }
}

export function fetchCoordinates(id) {
    return async (dispatch) => {
        dispatch(requestStarted());
        try {
            const OK = await getCoordinates(id);
            dispatch(successfulCoordinates(OK))
        } catch(error){
            dispatch(requestFailed(error))
        }
    }
}

export function fetchGeoJson(id) {
    return async (dispatch) => {
        dispatch(requestStarted());
        try {
            const OK = await getGeoJson(id);
            dispatch(successfulGeoJson(OK))
        } catch(error){
            dispatch(requestFailed(error))
        }
    }
}
