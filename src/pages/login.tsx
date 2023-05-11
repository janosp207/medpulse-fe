import { useDoctorsLogin } from '@/hooks/doctors';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginScreen = (): JSX.Element => {
  const { login } = useDoctorsLogin();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await login(name, password);
    if (response.message === 'Login successful') {
      localStorage.setItem('token', response.message);
      router.push('/');
    }
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Grid container spacing={2} direction="column">
              <Typography variant="h3" gutterBottom textAlign={'center'}>Log in</Typography>
              <Grid item>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginScreen;
