import ShopLayout from '@/components/layouts/ShopLayout';
import { Chip, Grid, Typography, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';
import NextLink from 'next/link';

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
            <NextLink href={`/orders/${params.row.view}`} legacyBehavior passHref>
                <Link underline='always'>
                    View
                </Link>
            </NextLink>

        )},
]

const rows = [
    { id:1, paid:true  ,fullname: 'Jorge Leon', view:'123'},
    { id:2, paid:false ,fullname: 'Gael Leon', view:'1234'},
    { id:3, paid:true  ,fullname: 'Martin Leon', view:'12345'},
    { id:4, paid:true  ,fullname: 'Alejandra Cunalata', view:'123444'},
    { id:5, paid:false ,fullname: 'Oswaldo Leon', view:'123441'},
    { id:6, paid:true  ,fullname: 'Luisa Sarmiento', view:'123111'},
    { id:7, paid:true  ,fullname: 'Jorge Cunalata', view:'123122'},
    { id:8, paid:true  ,fullname: 'Delia Miranda', view:'123123'},
]
 
const HistoryPages = () => {
  return (
    <ShopLayout title='History orders' pageDescription='Customer history'>
        <Typography variant='h1' component={'h1'}>Orders History</Typography>
        <Grid container>
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

export default HistoryPages;
