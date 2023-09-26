import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/CopyRight';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const defaultTheme = createTheme();

export default function AccountVerify() {
  const [otp, setOtp] = useState({ emailOtp: '', smsOtp: '' })

  const navigate = useNavigate()
  const { id } = useParams()

  const changeHandler = (e) => {
    const { name, value } = e.target
    setOtp({ ...otp, [name]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(user);
    axios.post(`/api/users/verify-account/${id}`, otp)
      .then(res => {
        console.log(res);
        navigate(`/welcome-page/${id}`)
      }).catch(err => {
        console.log(err)
        // console.log(err.response.data)
      })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FingerprintIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="emailOtp"
              label="Email Otp"
              name="emailOtp"
              autoFocus
              value={otp.emailOtp}
              onChange={changeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="smsOtp"
              label="Sms Otp"
              name="smsOtp"
              value={otp.smsOtp}
              onChange={changeHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify Account
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}