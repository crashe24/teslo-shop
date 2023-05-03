import { Grid, Typography } from '@mui/material';


const OrdenSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography> Nro. Products</Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography> 3</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography> SubTotal</Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography> $ {`${155.5}`}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography> Taxes (15%)</Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography> $ {`${35.5}`}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:3}}>
            <Typography variant='subtitle1'> Total </Typography>
            
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{mt:3}}>
            <Typography variant='subtittle1'> $ {`${189.5}`}</Typography>
        </Grid>


    </Grid>
  )
}

export default OrdenSummary