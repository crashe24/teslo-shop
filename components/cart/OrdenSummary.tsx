import { CartContext } from '@/context';
import {  Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { currency } from '@/utils';

const OrdenSummary = () => {

   const {numberOfItems, subTotal,total,tax} = useContext(CartContext) 
   const taxesPercent = Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography> Nro. Products</Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography> { numberOfItems} {numberOfItems >1 ? 'items': 'item'}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography> SubTotal</Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>  {currency.format(subTotal)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography> Taxes {taxesPercent}</Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>  {currency.format(tax)}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:3}}>
            <Typography variant='subtitle1'> Total </Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{mt:3}}>
            <Typography>  {currency.format(total)}</Typography>
        </Grid>


    </Grid>
  )
}

export default OrdenSummary