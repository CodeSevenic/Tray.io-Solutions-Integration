import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './Router';
// import registerServiceWorker from './registerServiceWorker';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore();

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <div className="index-wrapper">
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
