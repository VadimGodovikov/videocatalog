import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserMovie from './movie/UserMovie';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Context.Provider value={{
        user: new UserMovie()
      }}>
        <App />
      </Context.Provider>
);
