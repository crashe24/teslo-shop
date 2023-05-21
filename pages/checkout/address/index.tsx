
import React, { useContext } from 'react';
import ShopLayout from '@/components/layouts/ShopLayout';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { countries } from '@/utils';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie'

import { GetServerSideProps } from 'next'
import { jwtUtil } from '@/utils';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';

type FormData = {
    firstName:string;
    lastName:string;
    address:string;
    address2?:string;
    zip:string;
    city:string;
    country:string;
    phone:string;
}

const AddressPage = () => {

    const router = useRouter()
        

    const {updateAddress} = useContext(CartContext)
   
    const getAddressFromData = ():FormData => {
        return {
        firstName: Cookies.get('firstName') || '',
        lastName : Cookies.get('lastName')|| '',
        address  : Cookies.get('address')|| '',
        address2 : Cookies.get('address2')|| '',
        zip      : Cookies.get('zip')|| '',
        city     : Cookies.get('city')|| '',
        country  : Cookies.get('country')|| '',
        phone    : Cookies.get('phone')|| ''
        }

    }

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        defaultValues: getAddressFromData()
    })

    const onRegisterForm = (data: FormData) => {
    //    console.log('data', data)
       updateAddress( {...data} )
       router.push('/checkout/summary')
    }

  return (
    <ShopLayout title='Chechout' pageDescription='Confirm address'>
        <form onSubmit={handleSubmit(onRegisterForm)} noValidate>

      
                <Typography variant='h1' component={'h1'}>Address</Typography>
                <Grid container spacing={2} sx={{mt:2}}>
                    <Grid item xs={12} sm={6}>
                        <TextField label= 'Name' variant='filled' fullWidth 
                        {
                            ...register('firstName',
                            { required:'Fullname is required!',
                            }
                            )
                        }
                        error = {!!errors.firstName}
                        helperText = { errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label= 'LastName' variant='filled' fullWidth 
                        {
                            ...register('lastName',
                            { required:'Lastname  is required!',
                            }
                            )
                        }
                        error = {!!errors.lastName}
                        helperText = { errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label= 'Address' variant='filled' fullWidth 
                        {
                            ...register('address',
                            { required:'address is required!',
                            }
                            )
                        }
                        error = {!!errors.address}
                        helperText = { errors.address?.message}
                        
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label= 'Address2' variant='filled' fullWidth 
                        {
                            ...register('address2'
                            )
                        }
                        error = {!!errors.address}
                        helperText = { errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label= 'Code Postal' variant='filled' fullWidth 
                        {
                            ...register('zip',
                            { required:'zip is required!',
                            }
                            )
                        }
                        error = {!!errors.zip}
                        helperText = { errors.zip?.message}
                      
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label= 'City' variant='filled' fullWidth
                          {
                            ...register('city',
                            { required:'city is required!',
                            }
                            )
                        }
                        error = {!!errors.city}
                        helperText = { errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                        <TextField select 
                        defaultValue={ Cookies.get('country') || countries[0].code}
                        variant='filled' label='Country' 
                          {
                            ...register('country',
                            { required:'country is required!',
                            }
                            )
                        }
                        error = {!!errors.country}
                        helperText = { errors.country?.message}
                        >
                            {countries.map(c => (
                                <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                            ))}
                            
                                
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label= 'Phone' variant='filled' fullWidth 
                         {
                            ...register('phone',
                            { required:'phone is required!',
                            }
                            )
                        }
                        error = {!!errors.phone}
                        helperText = { errors.phone?.message}
                        />
                    </Grid>
             </Grid>
            <Box sx={{ mt: 5}} display={'flex'} justifyContent={'center'}>
                <Button type="submit" color='secondary' className='circular-btn' size='large'>Check item</Button>
            </Box>
        </form>
    </ShopLayout>
  );
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req}) => {
    
    const { token = ''} = req.cookies
    let userId = ''
    let isValidToken = false
    try {
        userId = await jwtUtil.isValidToken(token)
        isValidToken = true
    } catch (error) {
        isValidToken = false
    }

    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    } 

    return {
        props: {
            
        }
    }
}
export default AddressPage;
