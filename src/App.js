import React, { Suspense } from 'react';
import LoadingHome from './components/LoadingHome';

const Home = React.lazy(() => import('./pages/home'));


function App() {  
  return (
    <>
      <Suspense fallback={ <LoadingHome />}>
        <Home />
      </Suspense>    
    </>
  );
}

export default App;
