import AuthLayout from "@/components/layouts/AuthLayout";
import {Link, Box, Button, Grid, TextField, Typography } from "@mui/material";
import NextLink from 'next/link'


const LoginPage = () => {
  return (
    <AuthLayout title={'Log in'}>
        <Box sx={{width:350, padding:'20px 20px', marginTop:25}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h1" component={'h1'}>
                        Log In
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField  label={'email'} variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField  label={'password'} type = 'password' variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Button color='secondary' className='circular-btn' size= 'large' fullWidth>
                           Enter 
                    </Button>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                   <NextLink passHref legacyBehavior href={'/auth/register'}>
                        <Link underline="always" >Create a Count</Link>
                   </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default LoginPage;
