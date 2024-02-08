import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from 'style/GlobalStyle';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle />
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>

    {/* </React.StrictMode> */}
  </>
);
