import store from '@/redux/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import PrivateRoutes from '@/Component/PrivateRoutes';
import ToastNotify from '@/Component/Generic/ToastNotify';
import AppLayout from '@/Component/Layout/AppLayout';

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PrivateRoutes>
        <ToastNotify />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </PrivateRoutes>
    </Provider>
  );
}

export default MyApp;
