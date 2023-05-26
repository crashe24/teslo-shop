import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import {  useEffect, useState } from "react";
//import axios from "axios";
import { getSession, signIn, getProviders } from "next-auth/react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { ErrorOutline } from "@mui/icons-material";
import {Link, Box, Button, Grid, TextField, Typography, Chip, Divider } from "@mui/material";
//import { tesloapi } from "@/apis";
import AuthLayout from "@/components/layouts/AuthLayout";
//import { AuthContext } from "@/context";
import { validations } from "@/utils";


type formData = {
    email: string,
    password: string
}

const LoginPage = () => {

    const router = useRouter()
    const { register, handleSubmit,  formState: { errors } } = useForm<formData>();

    const [showError, setshowError] = useState(false);
    const [providers, setproviders] = useState<any>({});

    useEffect(() => {
        getProviders().then( p => {
            setproviders(p)
        })
    }, []);


    //const [destination, setdestination] = useState('/');
    
    //const { loginUser } = useContext(AuthContext)

    const onLoginUser = async (  {email, password}: formData) => {
       
        setshowError(false)

        await signIn('credentials', { email, password })

        /** autenticacion personalizada sin next auth */
        // const isValidLogin = await loginUser(email, password)

        // if(!isValidLogin) {
        //     setshowError(true)
        //     setTimeout(() => {
        //         setshowError(false)
        //     }, 3000);
        //     return
        // }

    
        //     // todo navegar en que el usuario se encontraba
        //     setdestination(router.query.p?.toString() || '/')
        //     router.replace(destination)
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
                    {/* para las redes  sociales */}
                    <Grid item xs={12} display={'flex'} flexDirection={'column'} justifyContent={'end'}>
                        <Divider sx={{ width: '100%', mb: 2}} />
                        {
                            Object.values(providers).map( (pr:any) => {

                                // eliminamos el de credential
                                if(pr.id === 'credentials') return (<div key={'credentials'}></div>)

                                    return (
                                        <Button
                                            key={pr.id}
                                            variant='outlined'
                                            fullWidth
                                            color= "primary"
                                            sx={{mb:1}}
                                            onClick={ ()=> signIn( pr.id )}
                                        >
                                               {pr.name} 
                                        </Button>
                                    )
                            })
                        
                        }
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

export default LoginPage;
