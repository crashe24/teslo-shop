import ShopLayout from '@/components/layouts/ShopLayout'
import { Typography } from '@mui/material'

import ProductList from '@/components/products/ProductList'
import { useProducts } from '@/hooks'
import FullScreenLoading from '@/components/ui/FullScreenLoading'

 const WomenPage = () => {

 const { products, isLoading } = useProducts('/products?gender=women')

  return (
      <>
        <ShopLayout title={'Teslo Shop - Women'} pageDescription={'Women products'}>
            <Typography variant='h1' component='h1'>Shop-Women</Typography>
            <Typography variant='h2' sx={{ mb:1}} >Women products</Typography>
         
              {
                isLoading
                ? <FullScreenLoading />
                : <ProductList products={products} />
                
              }
            
          </ShopLayout>
      </>
    )
}

export default WomenPage