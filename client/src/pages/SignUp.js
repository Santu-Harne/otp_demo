import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/CopyRight';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const defaultTheme = createTheme();

const initialState = { name: '', email: '', mobile: '+91', password: '' }

export default function SignUp() {
  const [user, setUser] = useState(initialState)

  const navigate = useNavigate()

  const changeHandler = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(user);
    axios.post(`/api/users/register`, user)
      .then(res => {
        console.log(res.data);
        setUser(initialState)
        navigate(`/account-verify/${res.data.data._id}`)
      }).catch(err => {
        console.log(err)
        console.log(err.response.data)
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="User Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={user.name}
              onChange={changeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={user.email}
              onChange={changeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobile"
              autoComplete="mobile"
              value={user.mobile}
              onChange={changeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={user.password}
              onChange={changeHandler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}