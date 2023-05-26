import { CartContext } from '@/context';
import {  Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { currency } from '@/utils';

interface Props {
    orderValues: {
        numberOfItems :number,
        subTotal      :number,
        total         :number,
        tax           :number,
    }
}

const OrdenSummary: FC<Props> = ({orderValues}) => {

    
    const {numberOfItems, subTotal,total,tax} = useContext(CartContext) 
    const taxesPercent = Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100
    
    const sumaryValues  =  orderValues? orderValues: {numberOfItems, subTotal,total,tax}


  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography> Nro. Products</Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography> { sumaryValues.numberOfItems} {sumaryValues.numberOfItems >1 ? 'items': 'item'}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography> SubTotal</Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>  {currency.format(sumaryValues.subTotal)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography> Taxes {taxesPercent}</Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>  {currency.format(sumaryValues.tax)}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:3}}>
            <Typography variant='subtitle1'> Total </Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{mt:3}}>
            <Typography>  {currency.format(sumaryValues.total)}</Typography>
        </Grid>


    </Grid>
  )
}

export default OrdenSummary