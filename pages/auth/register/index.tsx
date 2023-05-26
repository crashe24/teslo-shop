import { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";

import NextLink from 'next/link'
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { ErrorOutline } from "@mui/icons-material";
import {Link, Box, Button, Grid, TextField, Typography, Chip } from "@mui/material";
import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthContext } from "@/context";
import { validations } from "@/utils";


type formData = {
    name: string,
    email: string,
    password: string
}

const RegisterPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<formData>();

    const [showError, setshowError] = useState(false);
    const [errorMessage, seterrorMessage] = useState('');
    const [destination, setdestination] = useState('/');
    const router = useRouter()
    const {registerUser} = useContext(AuthContext)

    const onRegisterForm = async ( {name, email,password}: formData) => {
        setshowError(false)
       // console.log('password', password)
        const resp = await registerUser(name,email,password)
       // console.log('resp -->', resp)
        if (resp.hasError) {
            setshowError(true)
            seterrorMessage( resp.message!)
            setTimeout(() => {
                setshowError(false)
            }, 3000);
            return
        }


        // todo navegar en que el usuario se encontraba
        await signIn('credentials', { email, password })
        //setdestination(router.query.p?.toString() || '/')
        //router.replace(destination)
    }

  return (
    <AuthLayout title={'Register'}>
        <form onSubmit={handleSubmit(onRegisterForm)} noValidate>

        <Box sx={{width:350, padding:'20px 20px', marginTop:25}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component={'h1'} sx={{textAlign:'center'}}>
                        Register
                    </Typography>
                    <Chip label='incorrect information' color="error" icon={<ErrorOutline/>}
                    className="fadeIn"
                    sx={{display: showError?'flex':'none'}}
                    ></Chip>
                </Grid>
                <Grid item xs={12}>
                    <TextField  label={'fullName'} variant="filled" fullWidth type="email"
                     {...register('name',
                     { required: 'name is required!',
                       minLength: { value: 3, message: 'min 6 letter'}  
                         })
                        }
                        error = {!!errors.name}
                        helperText = {errors.name?.message}
                    
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField  label={'email'} variant="filled" fullWidth     
                                 {
                                ...register('email',
                                { required:'value is required!',
                                  validate: (val:string) => validations.isEmail(val)
                                }
                                )
                            }
                            error = {!!errors.email}
                            helperText = { errors.email?.message}/>
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
                           Register 
                    </Button>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                   <NextLink passHref legacyBehavior href={router.query.p ?`/auth/login?p=${router.query.p}`:'/auth/login'}>
                  
                  
                        <Link underline="always" >Log in</Link>
                   </NextLink>
                </Grid>
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
 
    const session = await getSession({req})
    //console.log('session', session)
    const { p = '/' } = query

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: {
            
        }
    }
}
export default RegisterPage;
