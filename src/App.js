import React, { useEffect, Suspense, useState } from 'react';
import { connect } from 'react-redux';
import { fetchStates } from './redux/actions/state';
import Loading from './components/Loading';
import { Map, GeoJson, ZoomControl } from 'pigeon-maps';
import { osm } from 'pigeon-maps/providers';

const Inputs = React.lazy(() => import('./components/Inputs'));


function App(props) {
  const { dispatch, county, coordinates, zoom, geoJson } = props;  

  useEffect(() => {
  dispatch(fetchStates())
}, [])  


  return (
    <>
      <main className='home'>
        <h1>IBGE INFO</h1>
        <section className='infoBoard'>
          <div className='infoBoard__inputs'>
            <Suspense fallback={<Loading />}>              
              <Inputs />
            </Suspense>
          </div>
          <div className='infoBoard__map'>
            <div className='infoBoard__map-img'>
              <Map 
              provider={osm} 
              center={coordinates} 
              zoom={zoom}
              animate={true}              
              >
                <ZoomControl />
                { geoJson.type && 
                  <GeoJson 
                    data={geoJson} 
                    styleCallback={() => {                     
                      return {
                        fill: "#55c57a99",
                        strokeWidth: "1",
                        stroke: "white",
                        r: "20",
                      };
                    }}
                  />          
                 }                 
              </Map>
            </div>
            <div className='infoBoard__map-text'>
              { 
              county && (
              <>
                <h3>{ county.municipio.nome }</h3>
                <p><strong>Microregião: </strong>{ county.municipio.microrregiao.nome }</p>
                <p><strong>Mesorregiao: </strong>{ county.municipio.microrregiao.mesorregiao.nome}</p>                
              </>
              )
              }
            </div>
          </div>          
        </section>              
      </main>    
    </>
  );
}

const mapStateToProps = (state) => ({  
  statesLoading: state.statesReducer.loading,
  county: state.countiesReducer.countyInfo[0],
  coordinates: state.countiesReducer.coordinates,
  zoom: state.countiesReducer.zoom,
  geoJson: state.countiesReducer.geoJson
})

export default connect(mapStateToProps)(App);
