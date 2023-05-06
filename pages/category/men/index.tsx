import ShopLayout from '@/components/layouts/ShopLayout'
import { Typography } from '@mui/material'

import ProductList from '@/components/products/ProductList'
import { useProducts } from '@/hooks'
import FullScreenLoading from '@/components/ui/FullScreenLoading'

 const MenPage = () => {

 const { products, isLoading } = useProducts('/products?gender=men')

  return (
      <>
        <ShopLayout title={'Teslo Shop - Men'} pageDescription={'Men products'}>
            <Typography variant='h1' component='h1'>Shop-Men</Typography>
            <Typography variant='h2' sx={{ mb:1}} >Men products</Typography>
         
              {
                isLoading
                ? <FullScreenLoading />
                : <ProductList products={products} />
                
              }
            
          </ShopLayout>
      </>
    )
}

export default MenPage