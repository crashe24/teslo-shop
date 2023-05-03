import CartList from '@/components/cart/CartList'
import OrdenSummary from '@/components/cart/OrdenSummary'
import ShopLayout from '@/components/layouts/ShopLayout'
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'
import { CreditCardOutlined } from '@mui/icons-material'



const OrderPage = () => {
  return (
    <ShopLayout title={'Summary Order 122222'} 
    pageDescription='orden: ADC123'>
        <Typography variant='h1' component={'h1'}>Order 123456 </Typography>
        {/* <Chip 
            sx={{ my:2}}
            label={'Pending pay'}
            variant='outlined'
            color='error'
            icon={<CreditCardOffOutlined />}

        ></Chip> */}
        <Chip 
            sx={{ my:2}}
            label={'Order Payed'}
            variant='outlined'
            color='success'
            icon={<CreditCardOutlined />}

        ></Chip>
            <Grid container>
                <Grid item xs={12} sm={7}>
                       <CartList editable={false} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                       <CardContent>
                            <Typography variant='h2'>
                                Summary ( 3 products)
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
                            <Typography >Jorge Leon </Typography>
                            <Typography >3232 anyplace </Typography>
                            <Typography >StillBill, hya 235 </Typography>
                            <Typography >Ecuador </Typography>
                            <Typography >+593 0987033788 </Typography>
                          
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
                                <Typography>Pay</Typography>
                            </Box>
                            <Chip 
                                sx={{ my:2}}
                                label={'Order Payed'}
                                variant='outlined'
                                color='success'
                                icon={<CreditCardOutlined />}

                            ></Chip>
                        
                       </CardContent>
                            
                        
                    </Card>
                </Grid>
                
            </Grid>
       
    </ShopLayout>
  )
}

export default OrderPage