import '@/styles/globals.css'
import { Container } from '@mui/material'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Container maxWidth='xl'>
      <Component {...pageProps} />
    </Container>
  )
}
