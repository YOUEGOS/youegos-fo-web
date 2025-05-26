import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
