import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router';
import { MAIN_ROUTE } from './utils/consts';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


export default App;
