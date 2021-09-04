import React from 'react'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import DataProvider from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  );
}

export default App;
