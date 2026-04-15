import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from "antd";
import store from './redux/store'; // Assuming you have a Redux store set up
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Message } from './components/Message/Message';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <StyleProvider layer>
            <ConfigProvider
              theme={{
                token: {
                  colorSuccess: "#52c41a",
                  colorError: "#ff4d4f",
                  colorWarning: "#faad14",
                },
              }}
            >
              <Message>
                <App />
              </Message>
            </ConfigProvider>
          </StyleProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
