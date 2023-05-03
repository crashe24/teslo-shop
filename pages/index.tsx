import ShopLayout from '@/components/layouts/ShopLayout'
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'

import { initialData } from '@/database/products'
import ProductList from '@/components/products/ProductList'

export default function Home() {
  return (
      <>
        <ShopLayout title={'Teslo Shop'} pageDescription={'searches the best products'}>
            <Typography variant='h1' component='h1'>Shop</Typography>
            <Typography variant='h2' sx={{ mb:1}} >All products</Typography>
         
              <ProductList products={initialData.products} />
            {/* <Grid container spacing={4}>
                  {
                    initialData.products.map( product => (
                  <Grid item xs= {6} sm={4} key={ product.slug }>
                        <Card>
                          <CardActionArea>
                            <CardMedia  component={'img'}
                              image={`products/${ product.images[0]}`} 
                              alt={ product.title }
                            />
                          </CardActionArea>
                        </Card>
                  </Grid>

                    ))
                  }
                  
            </Grid> */}
          </ShopLayout>
      </>
    )
}
