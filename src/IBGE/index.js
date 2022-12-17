import axios from "axios";
import { removeObjKey, alphabeticalOrder } from "./helpers";



export const getStates = () => {
    const data = axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(({data}) => {
            const result = removeObjKey(data)            
            return result;
        }).catch((error) => {
            throw error.message;
        });
    
    return data;
};

export const getCounties = (state) => {      
    const UF = state.toLowerCase();
    const data = axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`)
                    .then(({data}) => {                        
                        const result = data.map((e) => (
                            { id: e.id, value: e.nome }
                            ));                            
                        const orderList = alphabeticalOrder(result) 
                        
                        return orderList;    

                    }).catch((error) => {
                        throw error.message;
                    });                    
    return data;
    
}

export const getCountyInfo = (county) => {
    const id = county.toString();
    const countyInfo = axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${id}/distritos`)
                        .then(({data}) => {
                            return data
                        })
    return countyInfo;
}

export const getCoordinates = (id) => {
    const coordinates = axios.get(`https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${id}/metadados`)
                            .then((response) => {  
                                const coordinates = Object.values(response.data[0].centroide)                                
                                return coordinates.reverse()
                            })
    return coordinates;
}

export const getGeoJson = (id) => {
    const geoJson = axios.get(`https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${id}?formato=application/vnd.geo+json`)
                        .then((response) => {
                            return response.data
                        })
    return geoJson;
}