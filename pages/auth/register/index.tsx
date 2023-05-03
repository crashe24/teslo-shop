import AuthLayout from "@/components/layouts/AuthLayout";
import {Link, Box, Button, Grid, TextField, Typography } from "@mui/material";
import NextLink from 'next/link'


const RegisterPage = () => {
  return (
    <AuthLayout title={'Register'}>
        <Box sx={{width:350, padding:'20px 20px', marginTop:25}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component={'h1'} sx={{textAlign:'center'}}>
                        Register
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField  label={'fullName'} variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField  label={'email'} variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField  label={'password'} type = 'password' variant="filled" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Button color='secondary' className='circular-btn' size= 'large' fullWidth>
                           Register 
                    </Button>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                   <NextLink passHref legacyBehavior href={'/auth/login'}>
                        <Link underline="always" >Log in</Link>
                   </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage;
