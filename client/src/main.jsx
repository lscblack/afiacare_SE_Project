import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store'; // Import both store and persistor
import { BrowserRouter } from 'react-router-dom';

const RootComponent = () => {


  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={"loading..."} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<RootComponent />);
