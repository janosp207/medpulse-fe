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
  return (
    <Container maxWidth='xl'>
      <Component {...pageProps} />
    </Container>
  )
}
