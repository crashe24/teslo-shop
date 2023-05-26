
import ShopLayout from '@/components/layouts/ShopLayout'
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'

import ProductList from '@/components/products/ProductList'
import { useProducts } from '@/hooks'
import FullScreenLoading from '@/components/ui/FullScreenLoading'

export default function Home() {
  
 const { products, isLoading } = useProducts('/products')

 

  return (
      <>
        <ShopLayout title={'Teslo Shop'} pageDescription={'searches the best products'}>
            <Typography variant='h1' component='h1'>Shop</Typography>
            <Typography variant='h2' sx={{ mb:1}} >All products</Typography>
         
              {
                isLoading
                ? <FullScreenLoading />
                : <ProductList products={products} />
                
              }
        
          </ShopLayout>
      </>
    )
}
