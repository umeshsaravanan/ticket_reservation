import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AllContext from './context/AllContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AllContext>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </AllContext>
    </Provider>
  </React.StrictMode>
);

