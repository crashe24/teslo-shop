import React from 'react';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import ShopLayout from '@/components/layouts/ShopLayout';
import { Chip, Grid, Typography, Link } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';


const columns: GridColDef[] = [
    {field:'id', headerName:'Id', width:100 },
    {field:'fullname', headerName:'Fullname', width:300 },
    {
        field: 'paid', headerName: 'Payed', description: 'Show information of orders (pay or pending)',
        width:200, 
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Payed' variant='outlined' />
                    : <Chip color='error' label='Not Pay' variant='outlined' />
            )
        }       
    },
    {field:'view', headerName: 'View Order', width:100, sortable:false,
        renderCell: (params: GridValueGetterParams)=> (
            <NextLink href={`/orders/${params.row.orderId}`} legacyBehavior passHref>
                <Link underline='always'>
                    View
                </Link>
            </NextLink>

        )},
]

interface Props {
        orders: IOrder[]
}
const HistoryPages:NextPage<Props> = ({orders}) => {

   const rows = orders.map( (order, index) => ({
    id: index +1,
    paid: order.isPaid,
    fullname: `${ order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id
   }) ) 
  return (
    <ShopLayout title='History orders' pageDescription='Customer history'>
        <Typography variant='h1' component={'h1'}>Orders History</Typography>
        <Grid container className='fadeIn' >
            <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                <DataGrid 
                    rows={ rows } 
                    columns={ columns }
                    pageSize={10}
                    rowPerPageOptions={[10]}
                > 

                </DataGrid>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({req}) => {
   // const { data } = await  // your fetch function here 

   const session: any = await getSession({ req})

   if (!session) {
    return {
        redirect: {
            destination: '/auth/login?p=/orders/history',
            permanent: false
        }
    }
   }

   const orders = await dbOrders.getOrdersByUser(session.user._id)

    return {
        props: {
            orders
        }
    }
}
export default HistoryPages;
