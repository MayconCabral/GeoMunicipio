import { REQUEST_STARTED, REQUEST_SUCCESSFUL, REQUEST_FAILED, SUCCESSFUL_COUNTY_INFO, SUCCESSFUL_COORDINATES, SUCCESFUL_GEOJSON } from '../actions/county';

const INITIAL_STATE = {
    loading: false,
    data: [],
    countyInfo: [],
    coordinates:[-14.2350, -52.9253],
    zoom:3.3,
    geoJson:[],
    error: ''
}

function countiesReducer( state = INITIAL_STATE, action) {
    switch(action.type) {
        case REQUEST_STARTED:
            return {
                ...state,
                loading: true,                
            }
        case REQUEST_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case SUCCESSFUL_COUNTY_INFO:
            return {
                ...state,                 
                loading: false,
                countyInfo: action.payload,
                error: ''                
            }
        case SUCCESSFUL_COORDINATES:
            return {
                ...state,
                loading: false,
                coordinates: action.payload,
                zoom: 10
            }
        case SUCCESFUL_GEOJSON:
            return {
                ...state,
                loading: false,
                geoJson: action.payload,
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

export default countiesReducer;
