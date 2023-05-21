import React, { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'

import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'

import { CartContext } from '@/context'
import ShopLayout from '@/components/layouts/ShopLayout'
import CartList from '@/components/cart/CartList'
import OrdenSummary from '@/components/cart/OrdenSummary'
import { countries } from '@/utils'



const SumaryPage = () => {

 const {shippingAdress, numberOfItems} = useContext(CartContext)

 if ( !shippingAdress) {
     return (<></>)
    }
    
    const {firstName,lastName, address, address2 = '', city, country, zip, phone} = shippingAdress
    

  return (
    <ShopLayout title={'Summary Shop'} 
    pageDescription='orden summary'>
        <Typography variant='h1' component={'h1'}>Summary Page </Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                       <CartList editable={false} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                       <CardContent>
                            <Typography variant='h2'>
                                Summary ({numberOfItems} {numberOfItems ===1? 'product': 'products'})
                            </Typography>
                            <Divider sx={{my:1}} />
                            <Typography variant='subtitle1'>Address </Typography>
                            <Box display={'flex'} justifyContent={'end'}>
                                <NextLink legacyBehavior href={'/checkout/address'} passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography >{firstName} {lastName} </Typography>
                            <Typography >{ address} {address2} </Typography>
                            <Typography >{ city } </Typography>
                            <Typography >{ countries.find(c => c.code === country)?.name } </Typography>
                            <Typography >{ zip } {phone} </Typography>
                          
                            <Divider sx={{my:1}} />
                           
                            <Box display={'flex'} justifyContent={'end'}>
                                <NextLink legacyBehavior href={'/cart'} passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                          
                            <OrdenSummary />
                            <Box sx={{ mt:3}}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirm
                                </Button>
                            </Box>
                        
                       </CardContent>
                            
                        
                    </Card>
                </Grid>
                
            </Grid>
       
    </ShopLayout>
  )
}

export default SumaryPage