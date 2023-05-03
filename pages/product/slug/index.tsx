import ShopLayout from '@/components/layouts/ShopLayout'
import ProductSlideshow from '@/components/products/ProductSlideshow'
import ItemCounter from '@/components/ui/ItemCounter'
import SizeSelector from '@/components/ui/SizeSelector'
import { initialData } from '@/database/products'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import React from 'react'

const product = initialData.products[0]

const Slug = () => {
  return (
    <ShopLayout title={ product.title } pageDescription= { product.description}>
            <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                        {/* SlideShow */}
                        <ProductSlideshow images= { product.images} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Typography variant='h1' component={'h1'}>
                                {product.title}
                            </Typography>
                            <Typography variant='subtitle1' component={'h2'}>
                                ${product.price}
                            </Typography>
                            <Box sx={{my:2}}>
                                   <Typography variant='subtitle2' >Count</Typography> 
                                   {/* Itmecounter */}
                                   <ItemCounter />
                                   <SizeSelector
                                   selectedSize={product.sizes[1]}
                                   sizes={product.sizes} />

                            </Box>
                            {/* agragar al carrito */}
                            <Button color='secondary' className='circular-btn'>
                                Add car
                            </Button>
                            {/* <Chip label='No exist' color='error' variant='outlined'></Chip> */}
                            <Box sx={{ mt:3}}>
                                <Typography variant='subtitle2'>Description</Typography>
                                <Typography variant='body2'>{product.description}</Typography>
                            </Box>
                        </Box>
                    </Grid>
            </Grid>
    </ShopLayout>
  )
}

export default Slug