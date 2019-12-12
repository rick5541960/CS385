import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import FirebaseContextProvider from './contexts/FirebaseContext'

ReactDOM.render(
    <FirebaseContextProvider>
        <App />
    </FirebaseContextProvider>, document.getElementById('root'));
registerServiceWorker();
