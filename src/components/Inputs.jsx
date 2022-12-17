import { useState } from 'react';
import { connect } from 'react-redux';

import DatalistInput, { useComboboxControls, startsWithValueFilter } from 'react-datalist-input';
import { fetchCounties, fetchCountyInfo, fetchCoordinates, fetchGeoJson } from '../redux/actions/county';


function Inputs(props) {
    const [countyId, setCountyId] = useState(0) 
    const { 
        setValue: setCountyValue, 
        value: countyValue 
    } = useComboboxControls({ initialValue: ''})
    const {
        setValue: setStateValue,
        value: stateValue
    } = useComboboxControls({ initialValue: ''})     

    const { states, counties, dispatch } = props;

    const state = ( target ) => { 
        dispatch(fetchCounties(target.sigla));
        setCountyValue('');
    }

    const getCountyId = ({id}) => {
        setCountyId(id) 
    }

    const countyInfo = () => {
        setStateValue('')
        setCountyValue('')
        dispatch(fetchCountyInfo(countyId))
        dispatch(fetchCoordinates(countyId))
        dispatch(fetchGeoJson(countyId))      
    }
        
    return (
        <>
        <DatalistInput 
           placeholder="Estado"
           label="Selecione um Estado"
           onSelect={ (inputValue) => state(inputValue) }
           items={ states }
           value= { stateValue }
           setValue= { setStateValue }
           filters={[ startsWithValueFilter ]}
        />         
        <DatalistInput 
           placeholder="Município"
           label="Selecione um Município"
           onSelect={ (inputValue) => getCountyId(inputValue) }
           items={ counties }  
           value={ countyValue }  
           setValue={ setCountyValue } 
           filters={[ startsWithValueFilter ]}     
        />
        <button className='btn' onClick={ countyInfo }>Pesquisar</button>          
        </>
    )
}

const mapStateToProps = (state) => ({
    states: state.statesReducer.data, 
    counties: state.countiesReducer.data,   
})

export default connect(mapStateToProps)(Inputs);
