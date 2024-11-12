import Layout from '../components/Layout';
import { SWRConfig } from 'swr';
import '../styles/flatly-bootstrap.min.css';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function MyApp({ Component, pageProps }) {
  return (
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
  );
}
