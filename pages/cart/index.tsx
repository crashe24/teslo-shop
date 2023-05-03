import CartList from '@/components/cart/CartList'
import OrdenSummary from '@/components/cart/OrdenSummary'
import ShopLayout from '@/components/layouts/ShopLayout'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React from 'react'

const CartPage = () => {
  return (
    <ShopLayout title={'Shhopping cart -3'} pageDescription='Shopping cart'>
        <Typography variant='h1' component={'h1'}>Shopping Cart </Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                       <CartList editable={true} />
                </Grid>
                <Grid item xs={12} sm={5}>
                   
                        <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>
                                Orden
                            </Typography>
                            <Divider sx={{my:1}} />
                            <OrdenSummary />
                            <Box sx={{ mt:3}}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    CheckOut
                                </Button>
                            </Box>                                
                        </CardContent>
                            
                        </Card>

                </Grid>
                
            </Grid>
       
    </ShopLayout>
  )
}

export default CartPage