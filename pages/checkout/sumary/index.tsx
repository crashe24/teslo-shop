import CartList from '@/components/cart/CartList'
import OrdenSummary from '@/components/cart/OrdenSummary'
import ShopLayout from '@/components/layouts/ShopLayout'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'



const SumaryPage = () => {
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