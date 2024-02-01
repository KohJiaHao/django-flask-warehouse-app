import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// // Function to retrieve CSRF token from cookie
// function getCookie(name) {
//   const cookieValue = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name + '='));
//   if (cookieValue) {
//     return cookieValue.split('=')[1];
//   }
//   return null;
// }

// // Function to fetch CSRF token from Django
// const fetchCSRFToken = async () => {
//   try {
//     const response = await axios.get('/csrf-cookie/');
//     return response.data.csrftoken;
//   } catch (error) {
//     console.error('Failed to fetch CSRF token:', error);
//     return null;
//   }
// };

// fetchCSRFToken().then(csrftoken => {
//   if (csrftoken) {
//     // Set X-CSRFToken header in Axios's default headers
//     axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
//   } else {
//     console.error('CSRF token not available.');
//   }
// });


