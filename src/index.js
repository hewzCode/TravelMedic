import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { NotificationProvider } from './pages/NotificationContext';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    ReactDOM.render(
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ChakraProvider>
      </React.StrictMode>,
      rootElement
    );
  } else {
    console.error("Target container 'root' is not found in the DOM.");
  }
});
