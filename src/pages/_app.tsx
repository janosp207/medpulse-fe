import '@/styles/globals.css';
import { Container } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  BarElement,
);


export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('id'); // Replace 'token' with your authentication token key

    if (router.pathname !== '/login' && !isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <Container maxWidth='xl'>
      <Component {...pageProps} />
    </Container>
  )
}
