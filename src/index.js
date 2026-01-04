import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyleProvider } from '@ant-design/cssinjs';
import store from './redux/store'; // Assuming you have a Redux store set up
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <StyleProvider layer>
            <App />
          </StyleProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
