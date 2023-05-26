import CartList from '@/components/cart/CartList'
import OrdenSummary from '@/components/cart/OrdenSummary'
import ShopLayout from '@/components/layouts/ShopLayout'
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'
import { CreditCardOffOutlined, CreditCardOutlined } from '@mui/icons-material'

import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { dbOrders } from '@/database'
import { IOrder } from '@/interfaces'

interface Props {
    order: IOrder
 
}

const OrderPage: NextPage<Props> = ({ order }) => {

  return (
    <ShopLayout title={`Summary Order ${order._id}`} 
    pageDescription={`orden: ${order._id}`}>
        <Typography variant='h1' component={'h1'}>Order {order._id} </Typography>
       
           {
            order.isPaid ? (
                <Chip 
                sx={{ my:2}}
                label={'Order Payed'}
                variant='outlined'
                color='success'
                icon={<CreditCardOutlined />}
    
            ></Chip>
            )
                         : (
                            <Chip 
                        sx={{ my:2}}
                        label={'Pending pay'}
                        variant='outlined'
                        color='error'
                        icon={<CreditCardOffOutlined />}

                    ></Chip>
                         )
        }
        

      
      
            <Grid container>
                <Grid item xs={12} sm={7}>
                       <CartList editable={false} products={order.orderItems}/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                       <CardContent>
                            <Typography variant='h2'>
                                Summary ( {order.numberOfItems} {order.numberOfItems>1?'products':'product'})
                            </Typography>
                            <Divider sx={{my:1}} />
                            <Typography variant='subtitle1'>Address </Typography>
                            <Box display={'flex'} justifyContent={'end'}>
                            </Box>
                            <Typography >{order.shippingAddress.firstName} {order.shippingAddress.lastName}</Typography>
                            <Typography >{order.shippingAddress.address} </Typography>
                            <Typography >{order.shippingAddress.city} {order.shippingAddress.zip} </Typography>
                            <Typography >{order.shippingAddress.country} </Typography>
                            <Typography >{order.shippingAddress.phone} </Typography>
                          
                            <Divider sx={{my:1}} />
                           
                            <Box display={'flex'} justifyContent={'end'}>
                               
                            </Box>
                          
                            <OrdenSummary orderValues = {
                                {
                                    numberOfItems : order.numberOfItems,
                                subTotal : order.subTotal,
                                total : order.total,
                                tax : order.tax
                               }
                            }/>
                            <Box sx={{ mt:3}} display={'flex'} flexDirection={'column'}>
                                {
                                    order.isPaid?(
                                        <Chip 
                                        sx={{ my:2}}
                                        label={'Order Payed'}
                                        variant='outlined'
                                        color='success'
                                        icon={<CreditCardOutlined />}
        
                                    ></Chip>
                                    ): (
                                        <Typography>Pay</Typography>
                                    )
                                }
                               
                            </Box>
                          
                        
                       </CardContent>
                            
                        
                    </Card>
                </Grid>
                
            </Grid>
       
    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    
    const { id = '' } = query  // your fetch function here 
 
    const session: any = await getSession({req})
  

    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString())

    if (!order ) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }
   // console.log('order.user -->', order.user)
   // console.log('session -->', session.user._id)

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}
export default OrderPage