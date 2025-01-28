import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';  // Import custom theme
import { NotificationProvider } from './pages/NotificationContext'; // Import the provider

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
