import { tesloapi } from "@/apis";
import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import {Link, Box, Button, Grid, TextField, Typography, Chip } from "@mui/material";
import axios from "axios";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";


type formData = {
    email: string,
    password: string
}

const LoginPage = () => {

    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<formData>();

    const [showError, setshowError] = useState(false);
    const [destination, setdestination] = useState('/');
    
    const { loginUser } = useContext(AuthContext)

    const onLoginUser = async (  {email, password}: formData) => {
       
        setshowError(false)

        const isValidLogin = await loginUser(email, password)

        if(!isValidLogin) {
            setshowError(true)
            setTimeout(() => {
                setshowError(false)
            }, 3000);
            return
        }

    
            // todo navegar en que el usuario se encontraba
            setdestination(router.query.p?.toString() || '/')
            router.replace(destination)
    }

   

  return (
    <AuthLayout title={'Log in'}>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>

       
           <Box sx={{width:350, padding:'20px 20px', marginTop:25}}>

           <Grid item xs={12} >
                    <Typography variant="h1" component={'h1'} sx={{textAlign:'center'}}>
                        Log In
                    </Typography>
                    <Chip label='User/password incorrect' color="error" icon={<ErrorOutline/>}
                    className="fadeIn"
                    sx={{display: showError?'flex':'none'}}
                    ></Chip>
           </Grid>
          <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                        type="email" 
                        label={'email'} 
                        variant="filled" 
                        fullWidth 
                            {
                                ...register('email',
                                { required:'value is required!',
                                  validate: (val:string) => validations.isEmail(val)
                                }
                                )
                            }
                            error = {!!errors.email}
                            helperText = { errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField  label={'password'} type = 'password' variant="filled" fullWidth
                        {...register('password',
                            { required: 'pass is required!',
                              minLength: { value: 6, message: 'min 6 letter'}  
                                })
                        }
                        error = {!!errors.password}
                        helperText = {errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='secondary' className='circular-btn' size= 'large' fullWidth type="submit">
                            Enter 
                        </Button>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                    <NextLink passHref legacyBehavior href={router.query.p ?`/auth/register?p=${router.query.p}`:'/auth/register' }>
                            <Link underline="always" >Create a Count</Link>
                    </NextLink>
                    </Grid>

          </Grid>
          </Box>
          </form>
    </AuthLayout>
  )
}

export default LoginPage;
